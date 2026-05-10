import http from "node:http";

const routes = ["/", "/for-boende", "/for-boende/nyheter", "/kontakt", "/felguide", "/dokument", "/maklare"];
const baseUrl = "http://localhost:3000";
let failed = false;

for (const route of routes) {
  const result = await checkRoute(route);
  const status = result.ok ? "OK" : "FAIL";

  console.log(
    `${status} ${route} status=${result.status} css=${result.cssStatus} cssLength=${result.cssLength} runtimeError=${result.runtimeError} cannotFindModule=${result.cannotFindModule}`,
  );

  if (!result.ok) {
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

async function checkRoute(route) {
  try {
    const htmlResponse = await getText(`${baseUrl}${route}`);
    const cssHref = findCssHref(htmlResponse.body);
    let cssStatus = "NO_LINK";
    let cssLength = 0;
    let cssLooksValid = false;

    if (cssHref) {
      const cssResponse = await getText(`${baseUrl}${cssHref}`);
      cssStatus = cssResponse.statusCode;
      cssLength = cssResponse.body.length;
      cssLooksValid = cssResponse.body.includes("--tw") || cssResponse.body.includes(".flex") || cssResponse.body.includes(".grid");
    }

    const runtimeError = htmlResponse.body.includes("Runtime Error");
    const cannotFindModule = htmlResponse.body.includes("Cannot find module");

    return {
      status: htmlResponse.statusCode,
      cssStatus,
      cssLength,
      runtimeError,
      cannotFindModule,
      ok: htmlResponse.statusCode === 200 && cssLooksValid && !runtimeError && !cannotFindModule,
    };
  } catch (error) {
    return {
      status: "ERROR",
      cssStatus: "ERROR",
      cssLength: 0,
      runtimeError: false,
      cannotFindModule: false,
      ok: false,
      error,
    };
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
        response.on("end", () => {
          resolve({ body, statusCode: response.statusCode });
        });
      })
      .on("error", reject);
  });
}
