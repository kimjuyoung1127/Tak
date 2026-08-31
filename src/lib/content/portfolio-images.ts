import fs from "fs";
import path from "path";
import { readMediaAssets, type MediaAsset } from "./media";

const PORTFOLIO_DIR = path.join(process.cwd(), "public/portfolio");
const THUMB_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export interface PortfolioImageSet {
  thumbnail: string;
  detailImages: MediaAsset[];
}

/** slug(= 폴더명) 기반으로 썸네일 + 디테일 자산을 반환 */
export function getPortfolioImages(slug: string): PortfolioImageSet {
  const dir = path.join(PORTFOLIO_DIR, slug);
  if (!fs.existsSync(dir)) return { thumbnail: "", detailImages: [] };

  const basePath = `/portfolio/${slug}`;
  const thumbnailFile = fs
    .readdirSync(dir)
    .find((f) => f.startsWith("thumbnail") && THUMB_EXTS.has(path.extname(f).toLowerCase()));

  return {
    thumbnail: thumbnailFile ? `${basePath}/${thumbnailFile}` : "",
    // 01.ext, 02.ext ... 알파벳순 정렬이면 충분
    detailImages: readMediaAssets(dir, basePath, (f) => f.startsWith("thumbnail")),
  };
}
