import fs from "fs";
import path from "path";
import { getImageSize } from "./image-size";

/**
 * 상세 갤러리 미디어 해석기 (빌드 타임).
 *
 * 폴더를 훑어 파일명 순서대로 자산 목록을 만든다. `04.mp4` `04.webm` `04.poster.jpg` 처럼
 * 같은 이름을 공유하는 묶음은 비디오 하나로 접는다 — 원래 `04.gif` 였던 자리다.
 * 모든 자산이 고유 치수를 함께 들고 나오므로 렌더 쪽에서 자리를 미리 잡을 수 있다.
 */

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTS = [".webm", ".mp4"] as const; // 나열 순서 = 브라우저 선호 순서
const MIME: Record<string, string> = { ".webm": "video/webm", ".mp4": "video/mp4" };

export interface MediaAsset {
  /** 정지 이미지 경로. 비디오면 poster(첫 프레임) */
  src: string;
  /** 있으면 비디오. webm 우선, mp4 폴백 */
  sources?: { src: string; type: string }[];
  /** 고유 치수. 헤더를 못 읽으면 null (호출부가 폴백) */
  width: number | null;
  height: number | null;
}

/** `04.poster.jpg` → `04`, `01.png` → `01` */
function baseName(file: string): string {
  return file.replace(/\.poster\.jpg$/i, "").replace(/\.[^.]+$/, "");
}

function sized(dir: string, publicPath: string, file: string): MediaAsset {
  const size = getImageSize(path.join(dir, file));
  return { src: `${publicPath}/${file}`, width: size?.width ?? null, height: size?.height ?? null };
}

/**
 * `dir` 안의 자산을 파일명 순서대로 반환한다.
 * `skip` 이 true 를 반환하는 파일은 제외한다 (예: thumbnail.*).
 */
export function readMediaAssets(
  dir: string,
  publicPath: string,
  skip: (file: string) => boolean = () => false
): MediaAsset[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => !skip(f));
  const videoBases = new Set(
    files.filter((f) => VIDEO_EXTS.some((e) => f.toLowerCase().endsWith(e))).map(baseName)
  );

  const assets = new Map<string, MediaAsset>();

  for (const file of files.sort()) {
    const base = baseName(file);
    const ext = path.extname(file).toLowerCase();

    if (videoBases.has(base)) {
      if (assets.has(base)) continue;
      const poster = files.find((f) => f === `${base}.poster.jpg`);
      // poster 가 있으면 그 치수가 곧 비디오 치수다 (같은 필터로 뽑았으므로).
      const still = poster
        ? sized(dir, publicPath, poster)
        : { src: "", width: null, height: null };
      assets.set(base, {
        ...still,
        sources: VIDEO_EXTS.filter((e) => files.includes(`${base}${e}`)).map((e) => ({
          src: `${publicPath}/${base}${e}`,
          type: MIME[e],
        })),
      });
      continue;
    }

    if (IMAGE_EXTS.has(ext)) assets.set(base, sized(dir, publicPath, file));
  }

  return [...assets.values()];
}
