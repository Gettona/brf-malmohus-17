import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = "wordpress-tools/dist/pdf-kontroll-filer";

const files = [
  {
    name: "arsredovisning-2025-brf-malmohus-17.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2025/11/Arsredovisning-2025-08-31-Brf-Malmohus-17_sign.pdf",
  },
  {
    name: "arsredovisning-2024-brf-malmohus-17.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2024/11/Arsredovisning-2024-08-31-Brf-Malmohus-17_sign.pdf",
  },
  {
    name: "stadgar-brf-malmohus-17.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2016/08/Stadgar-Brf-Malmöhus-nr-17-Registrerades-2016-06-14165992.pdf",
  },
  {
    name: "a-o-brf-malmohus-17.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2022/12/221222_A_Ö_Brf-Malmöhus-17_OK.pdf",
  },
  {
    name: "infomiljohus-200429.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2020/08/InfoMiljöhus200429_1-sida.pdf",
  },
  {
    name: "koinformation-parkering-2021.pdf",
    url: "https://malmohus17.se/wp-content/uploads/2021/04/Köinformation_2021.pdf",
  },
];

async function download(file) {
  const res = await fetch(file.url);
  if (!res.ok) throw new Error(`${file.url} returned ${res.status}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, file.name), bytes);
  return { ...file, size: bytes.length };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const downloaded = [];
  for (const file of files) {
    downloaded.push(await download(file));
  }

  await writeFile(
    "wordpress-tools/dist/PDF-KONTROLL-MANUELL.md",
    `# Manuell PDF-kontroll

Ladda upp PDF-filerna från \`pdf-kontroll-filer.zip\` i WordPress:

1. Media -> Lägg till ny
2. Ladda upp alla sex PDF-filer
3. Skapa sidan \`PDF-kontroll\`
4. Lägg in länkar eller filblock till varje PDF
5. Publicera sidan

Kontroll efter backup/restore:

- Sidan \`/pdf-kontroll/\` ska finnas
- Alla PDF-länkar ska öppna filer från \`malmohus17.brfpilot.se/wp-content/uploads/\`
- Inga PDF-länkar på kontrollsidan ska ge 404

Filer:

${downloaded.map((file) => `- ${file.name} (${file.size} bytes)`).join("\n")}
`,
    "utf8"
  );

  console.log(`Downloaded ${downloaded.length} PDF files`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
