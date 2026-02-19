import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(process.cwd(), "public/portfolio");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

export interface PortfolioImageSet {
  thumbnail: string;
  detailImages: string[];
}

/** slug(= 폴더명) 기반으로 썸네일 + 디테일 이미지 경로를 반환 */
export function getPortfolioImages(slug: string): PortfolioImageSet {
  const dir = path.join(PORTFOLIO_DIR, slug);
  if (!fs.existsSync(dir)) return { thumbnail: "", detailImages: [] };

  const files = fs.readdirSync(dir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext);
  });

  const thumbnailFile = files.find((f) => f.startsWith("thumbnail"));
  const detailFiles = files
    .filter((f) => !f.startsWith("thumbnail"))
    .sort(); // 01.ext, 02.ext ... 알파벳순 정렬이면 충분

  const basePath = `/portfolio/${slug}`;

  return {
    thumbnail: thumbnailFile ? `${basePath}/${thumbnailFile}` : "",
    detailImages: detailFiles.map((f) => `${basePath}/${f}`),
  };
}
