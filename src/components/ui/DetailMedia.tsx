"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaAsset } from "@/lib/content/media";

/**
 * 상세 갤러리 한 칸. 이미지면 next/image, 비디오면 poster 를 깐 <video>.
 *
 * 자동재생은 서버 마크업이 아니라 마운트 후 클라이언트에서 건다 —
 * `prefers-reduced-motion: reduce` 사용자에게는 재생하지 않고 poster 정지컷을 남긴다.
 * (autoplay 속성은 미디어 쿼리로 끌 수 없어서 이 분기가 필요하다.)
 *
 * 치수는 항상 마크업에 박는다. 없으면 미디어가 뜰 때마다 아래 내용이 밀린다
 * (실측: /portfolio/baby-hairpin CLS 1.656).
 */
type Props = {
  asset: MediaAsset;
  alt: string;
  /** 첫 칸은 뷰포트 안에 있으므로 미리 받는다 */
  priority?: boolean;
  sizes: string;
};

const FALLBACK_WIDTH = 860;

export function DetailMedia({ asset, alt, priority = false, sizes }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.loop = true;

    // 상세 스택은 화면 몇 개 분량으로 길다. 마운트 즉시 전부 재생하면
    // 아직 보이지도 않은 비디오까지 통째로 내려받는다 — 보일 때만 튼다.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* 자동재생 차단 — poster 를 그대로 둔다 */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (asset.sources) {
    return (
      <video
        ref={videoRef}
        className="block h-auto w-full"
        width={asset.width ?? undefined}
        height={asset.height ?? undefined}
        poster={asset.src || undefined}
        preload={priority ? "auto" : "metadata"}
        muted
        playsInline
        aria-label={alt}
      >
        {asset.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    );
  }

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width ?? FALLBACK_WIDTH}
      height={asset.height ?? 0}
      sizes={sizes}
      className="block h-auto w-full"
      style={{ height: "auto" }}
      priority={priority}
    />
  );
}
