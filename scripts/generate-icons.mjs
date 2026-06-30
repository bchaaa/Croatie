// Génère les icônes PNG de la PWA à partir d'un SVG (vague + ancre stylisée).
// Exécuté automatiquement avant le build (script "prebuild").
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Icône standard : vague + soleil sur fond bleu mer.
function svg({ maskable = false } = {}) {
  // padding plus large pour les icônes maskable (safe zone).
  const pad = maskable ? 96 : 40;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E4D7B"/>
      <stop offset="100%" stop-color="#22B5C8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(${pad},${pad}) scale(${(512 - pad * 2) / 512})">
    <!-- soleil -->
    <circle cx="360" cy="150" r="58" fill="#F5E6C8"/>
    <!-- vagues -->
    <path d="M40 330 q60 -55 120 0 t120 0 t120 0 t120 0 v160 H40 Z" fill="#F5E6C8" opacity="0.95"/>
    <path d="M40 380 q60 -55 120 0 t120 0 t120 0 t120 0 v120 H40 Z" fill="#E8614A" opacity="0.92"/>
  </g>
</svg>`;
}

async function main() {
  if (!existsSync(publicDir)) await mkdir(publicDir, { recursive: true });

  const standard = Buffer.from(svg());
  const maskable = Buffer.from(svg({ maskable: true }));

  await Promise.all([
    sharp(standard).resize(192, 192).png().toFile(join(publicDir, "icon-192.png")),
    sharp(standard).resize(512, 512).png().toFile(join(publicDir, "icon-512.png")),
    sharp(standard).resize(180, 180).png().toFile(join(publicDir, "apple-touch-icon.png")),
    sharp(maskable).resize(512, 512).png().toFile(join(publicDir, "icon-maskable-512.png")),
    sharp(standard).resize(32, 32).png().toFile(join(publicDir, "favicon.png")),
  ]);

  // SVG source conservé pour référence/édition.
  await writeFile(join(publicDir, "icon.svg"), svg());

  console.log("✓ Icônes PWA générées dans /public");
}

main().catch((err) => {
  console.error("Échec génération icônes :", err);
  process.exit(1);
});
