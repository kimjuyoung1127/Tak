import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * 포트폴리오·템플릿의 GIF를 mp4 + webm + poster 로 변환한다.
 *
 * GIF는 프레임마다 팔레트 이미지를 통째로 담아 같은 화면을 h264 대비 20~50배 무겁게 만든다.
 * (실측: baby-hairpin/04.gif 52.7MB → 상세 1페이지 전송량 82MB)
 * 변환 후 원본은 ASSETS_SRC 로 옮겨 보존한다 — public 밖이라 배포에 실리지 않는다.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TARGET_DIRS = ["public/portfolio", "public/templates"];
const ASSETS_SRC = path.join(ROOT, "assets-src/gif-originals");

const MAX_WIDTH = 1400;

function ffprobe(file) {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", file],
    { encoding: "utf8" }
  ).trim();
  const [width, height] = out.split(",").map(Number);
  return { width, height };
}

/** h264/vp9 는 짝수 치수를 요구한다. 폭 상한도 여기서 함께 건다. */
function targetSize({ width, height }) {
  const w = Math.min(width, MAX_WIDTH);
  const even = (n) => Math.max(2, Math.round(n / 2) * 2);
  return { w: even(w), h: even((height * w) / width) };
}

/**
 * GIF는 ffmpeg에서 항상 알파 채널(bgra)로 디코드된다.
 * 알파를 그대로 넘기면 vp9가 gbrap 픽셀 포맷을 거부하고, 그냥 버리면 투명부가 검게 깔린다.
 * 카드·상세 배경이 흰색이므로 흰 바탕에 합성한 뒤 yuv420p로 넘긴다.
 */
function flattenFilter({ w, h }) {
  return `color=white:s=${w}x${h}[bg];[0:v]scale=${w}:${h}:flags=lanczos[s];[bg][s]overlay=shortest=1,format=yuv420p`;
}

function encode(input, output, filter, args) {
  execFileSync("ffmpeg", ["-y", "-i", input, "-filter_complex", filter, ...args, output], {
    stdio: "pipe",
  });
  return fs.statSync(output).size;
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${bytes}B`;
}

function collectGifs(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const found = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const p = path.join(abs, entry.name);
    if (entry.isDirectory()) found.push(...collectGifs(path.join(dir, entry.name)));
    else if (entry.name.toLowerCase().endsWith(".gif")) found.push(p);
  }
  return found;
}

function main() {
  const gifs = TARGET_DIRS.flatMap(collectGifs);
  if (gifs.length === 0) {
    console.log("변환할 GIF 없음 (이미 전환 완료)");
    return;
  }

  console.log(`=== GIF → video (${gifs.length}개) ===\n`);
  let before = 0;
  let after = 0;
  const oversized = [];

  for (const gif of gifs) {
    const rel = path.relative(ROOT, gif);
    const base = gif.replace(/\.gif$/i, "");
    const size = targetSize(ffprobe(gif));
    const filter = flattenFilter(size);
    const src = fs.statSync(gif).size;

    const mp4 = encode(gif, `${base}.mp4`, filter, [
      "-movflags", "faststart",
      "-c:v", "libx264", "-crf", "28", "-preset", "slow",
      "-an",
    ]);
    const webm = encode(gif, `${base}.webm`, filter, [
      "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1",
      "-an",
    ]);
    // poster = 첫 프레임. 비디오 로드 전에도 같은 그림이 보여야 CLS가 0으로 남는다.
    encode(gif, `${base}.poster.jpg`, filter, ["-vframes", "1", "-q:v", "4"]);

    const dest = path.join(ASSETS_SRC, rel.replace(/^public\//, ""));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(gif, dest);

    const largest = Math.max(mp4, webm);
    if (largest > 2 * 1024 * 1024) oversized.push({ rel, largest });

    before += src;
    after += mp4 + webm;
    console.log(`  ${rel}: ${fmt(src)} → mp4 ${fmt(mp4)} / webm ${fmt(webm)}`);
  }

  console.log(`\n=== ${fmt(before)} → ${fmt(after)} (${fmt(before - after)} 절감) ===`);
  console.log(`원본 보존: ${path.relative(ROOT, ASSETS_SRC)}`);

  if (oversized.length > 0) {
    console.error(`\n예산 초과(2MB) ${oversized.length}개:`);
    for (const o of oversized) console.error(`  ${o.rel}: ${fmt(o.largest)}`);
    process.exit(1);
  }
}

main();
