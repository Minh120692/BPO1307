import { readFile } from "fs/promises";
import path from "path";

function extractBodyContent(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    return html;
  }

  return bodyMatch[1]
    .replace(/<noscript>[\s\S]*?<\/noscript>/i, "")
    .replace(/<script>[\s\S]*?<\/script>/i, "")
    .replace(/^\/\/.*$/gm, "")
    .trim();
}

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "index.html");
  const html = await readFile(filePath, "utf8");
  const bodyContent = extractBodyContent(html);

  return <main dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
