import path from "path";
import { readMediaAssets, type MediaAsset } from "./media";

const TEMPLATES_DIR = path.join(process.cwd(), "public/templates");

/**
 * slug(= 폴더명) 기준으로 상세 자산을 순서대로 반환.
 * 파일명 01,02,... 알파벳 정렬 = 노출 순서. (포트폴리오 detailImages와 동일 규약)
 */
export function getTemplateImages(slug: string): MediaAsset[] {
  return readMediaAssets(
    path.join(TEMPLATES_DIR, slug),
    `/templates/${slug}`,
    // thumbnail.* 는 카드 썸네일 전용 — 상세 스택에서 제외
    (f) => f.toLowerCase().startsWith("thumbnail")
  );
}
