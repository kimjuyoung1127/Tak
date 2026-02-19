import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_DIR = path.join(__dirname, "..", "public", "portfolio");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const DETAIL_MAX_WIDTH = 1400;
const THUMB_MAX_WIDTH = 800;
const DETAIL_QUALITY = 80;
const THUMB_QUALITY = 75;

const COMPRESS_THRESHOLD = 500 * 1024; // 500KB — compress even without resize

async function optimizeImage(filePath, maxWidth, quality) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return null;

  const inputBuffer = fs.readFileSync(filePath);
  const before = inputBuffer.length;
  const meta = await sharp(inputBuffer).metadata();

  const needsResize = meta.width && meta.width > maxWidth;
  const needsCompress = before > COMPRESS_THRESHOLD;

  if (!needsResize && !needsCompress) return null;

  const pipeline = sharp(inputBuffer);
  if (needsResize) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  let finalBuffer;
  if (ext === ".png") {
    finalBuffer = await pipeline.png({ quality, compressionLevel: 9 }).toBuffer();
  } else if (ext === ".webp") {
    finalBuffer = await pipeline.webp({ quality }).toBuffer();
  } else {
    finalBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
  }

  if (!finalBuffer || finalBuffer.length >= before) return null;

  fs.writeFileSync(filePath, finalBuffer);
  return { before, after: finalBuffer.length, saved: before - finalBuffer.length };
}

async function processFolder(folderPath) {
  const folderName = path.basename(folderPath);
  const files = fs.readdirSync(folderPath);
  const results = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const ext = path.extname(file).toLowerCase();

    // Skip GIFs
    if (ext === ".gif") continue;
    if (!IMAGE_EXTS.has(ext)) continue;

    const isThumbnail = file.startsWith("thumbnail");
    const maxWidth = isThumbnail ? THUMB_MAX_WIDTH : DETAIL_MAX_WIDTH;
    const quality = isThumbnail ? THUMB_QUALITY : DETAIL_QUALITY;

    try {
      const result = await optimizeImage(filePath, maxWidth, quality);
      if (result) {
        results.push({ file, ...result });
        console.log(
          `  ${folderName}/${file}: ${fmt(result.before)} → ${fmt(result.after)} (${fmt(result.saved)} saved)`
        );
      }
    } catch (err) {
      console.error(`  ERROR ${folderName}/${file}: ${err.message}`);
    }
  }

  return results;
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${bytes}B`;
}

function getFolderSize(folderPath) {
  let total = 0;
  for (const f of fs.readdirSync(folderPath)) {
    total += fs.statSync(path.join(folderPath, f)).size;
  }
  return total;
}

async function main() {
  console.log("=== Portfolio Image Optimization ===\n");

  const folders = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((f) => fs.statSync(path.join(PORTFOLIO_DIR, f)).isDirectory());

  // Before report
  let totalBefore = 0;
  const folderSizesBefore = {};
  for (const folder of folders) {
    const size = getFolderSize(path.join(PORTFOLIO_DIR, folder));
    folderSizesBefore[folder] = size;
    totalBefore += size;
  }
  console.log(`Before: ${fmt(totalBefore)} total\n`);

  // Optimize
  let totalSaved = 0;
  for (const folder of folders) {
    console.log(`[${folder}]`);
    const results = await processFolder(path.join(PORTFOLIO_DIR, folder));
    const saved = results.reduce((sum, r) => sum + r.saved, 0);
    totalSaved += saved;
    if (results.length === 0) console.log("  (no resize needed)");
  }

  // After report
  console.log("\n=== Report ===\n");
  let totalAfter = 0;
  for (const folder of folders) {
    const sizeAfter = getFolderSize(path.join(PORTFOLIO_DIR, folder));
    totalAfter += sizeAfter;
    const sizeBefore = folderSizesBefore[folder];
    const diff = sizeBefore - sizeAfter;
    console.log(
      `${folder.padEnd(20)} ${fmt(sizeBefore).padStart(8)} → ${fmt(sizeAfter).padStart(8)}  ${diff > 0 ? `-${fmt(diff)}` : "no change"}`
    );
  }
  console.log(
    `${"TOTAL".padEnd(20)} ${fmt(totalBefore).padStart(8)} → ${fmt(totalAfter).padStart(8)}  -${fmt(totalBefore - totalAfter)}`
  );
}

main().catch(console.error);
