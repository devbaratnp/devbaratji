import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildStructuredData, getSeoPage, seoPages, absoluteUrl } from "../src/seo.js";

const distDirectory = path.resolve("dist");
const template = await readFile(path.join(distDirectory, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceOrInsert(html, pattern, tag) {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(page) {
  const metadata = getSeoPage(page);
  const structuredData = JSON.stringify(buildStructuredData(page)).replaceAll("<", "\\u003c");
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);

  html = replaceOrInsert(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(metadata.description)}" />`);
  html = replaceOrInsert(html, /<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="index,follow" />');
  html = replaceOrInsert(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(absoluteUrl(metadata.image))}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:type"[^>]*>/i, '<meta property="og:type" content="website" />');
  html = replaceOrInsert(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapeHtml(absoluteUrl(metadata.path))}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:card"[^>]*>/i, '<meta name="twitter:card" content="summary_large_image" />');
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(absoluteUrl(metadata.image))}" />`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(absoluteUrl(metadata.path))}" />`);
  html = html.replace(/<script\s+type="application\/ld\+json"\s+id="structured-data">[\s\S]*?<\/script>/i, `<script type="application/ld+json" id="structured-data">${structuredData}</script>`);

  if (!html.includes('id="structured-data"')) {
    html = html.replace("</head>", `    <script type="application/ld+json" id="structured-data">${structuredData}</script>\n  </head>`);
  }

  return html;
}

for (const page of Object.keys(seoPages)) {
  if (page === "home") {
    await writeFile(path.join(distDirectory, "index.html"), renderPage(page), "utf8");
    continue;
  }

  await writeFile(path.join(distDirectory, `${page}.html`), renderPage(page), "utf8");
}

console.log(`Generated ${Object.keys(seoPages).length} SEO-ready route documents.`);
