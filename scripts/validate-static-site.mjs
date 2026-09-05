import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("dist");
const required = ["index.html", "styles.css", "script.js"];

for (const file of required) {
  await access(resolve(root, file));
}

const html = await readFile(resolve(root, "index.html"), "utf8");
const localReferences = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
  .map((match) => match[1].split(/[?#]/, 1)[0])
  .filter((value) => value && !/^(?:https?:|mailto:|tel:|javascript:|#)/i.test(value));

const missing = [];
for (const reference of new Set(localReferences)) {
  const relativePath = reference.replace(/^\//, "");
  try {
    await access(resolve(root, relativePath));
  } catch {
    missing.push(relativePath);
  }
}

if (missing.length) {
  throw new Error(`Arquivos locais ausentes:\n- ${missing.join("\n- ")}`);
}

console.log(`Site validado: ${required.length} arquivos essenciais e ${localReferences.length} referencias locais.`);
