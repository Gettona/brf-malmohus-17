import { execFileSync, spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const port = 3000;
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const windowsNode = "C:\\Program Files\\nodejs\\node.exe";
const nodeExe = process.platform === "win32" && existsSync(windowsNode) ? windowsNode : process.execPath;

stopPort(port);
const portClosed = await waitForPortToClose(port);

if (!portClosed) {
  if (await isHealthyDevServer()) {
    console.log(`Port ${port} is already running a healthy dev server.`);
    process.exit(0);
  }

  throw new Error(`Port ${port} is still in use and the existing server did not pass the CSS health check.`);
}

removeNextCache();
startNext();

function stopPort(targetPort) {
  if (process.platform !== "win32") {
    return;
  }

  const command = [
    `$connections = Get-NetTCPConnection -LocalPort ${targetPort} -ErrorAction SilentlyContinue`,
    "$owners = $connections | Where-Object { $_.OwningProcess -ne 0 } | Select-Object -ExpandProperty OwningProcess -Unique",
    "foreach ($owner in $owners) {",
    "  Stop-Process -Id $owner -Force -ErrorAction SilentlyContinue",
    "}",
  ].join("; ");

  execFileSync("powershell.exe", ["-NoProfile", "-Command", command], {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

function removeNextCache() {
  const nextDir = path.join(projectRoot, ".next");

  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
    console.log("Removed .next");
  }
}

function waitForPortToClose(targetPort) {
  const deadline = Date.now() + 10_000;

  return new Promise((resolve) => {
    const check = () => {
      const socket = net.createConnection({ host: "127.0.0.1", port: targetPort });

      socket.once("connect", () => {
        socket.destroy();

        if (Date.now() > deadline) {
          resolve(false);
          return;
        }

        setTimeout(check, 250);
      });

      socket.once("error", () => {
        resolve(true);
      });
    };

    check();
  });
}

async function isHealthyDevServer() {
  try {
    const html = await getText(`http://localhost:${port}/`);
    const cssHref = findCssHref(html);

    if (!cssHref) {
      return false;
    }

    const css = await getText(`http://localhost:${port}${cssHref}`);
    return css.includes("--tw") || css.includes(".flex") || css.includes(".grid");
  } catch {
    return false;
  }
}

function findCssHref(html) {
  const match = html.match(/href="([^"]*?_next\/static\/css\/[^"]+\.css[^"]*)"/);
  return match ? match[1].replaceAll("&amp;", "&") : "";
}

function getText(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
          response.resume();
          reject(new Error(`${url} returned ${response.statusCode}`));
          return;
        }

        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

function startNext() {
  const child = spawn(nodeExe, [nextBin, "dev", "--port", String(port)], {
    cwd: projectRoot,
    env: {
      ...process.env,
      PORT: String(port),
    },
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}
