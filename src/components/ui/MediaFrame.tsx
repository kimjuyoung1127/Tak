import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 이미지 슬롯 프리미티브 (에디토리얼 사각·플랫).
 * src가 있으면 이미지를, 없으면 라벨 플레이스홀더를 렌더한다.
 * 실사진이 들어오면 src만 넘기면 되도록 구조를 고정한다.
 */
type MediaFrameProps = {
  src?: string;
  alt?: string;
  /** 플레이스홀더 라벨 (src 없을 때) */
  label?: string;
  /** tailwind aspect 클래스 */
  aspect?: string;
  className?: string;
  /** 에디토리얼 그레이스케일 → hover 컬러 */
  grayscale?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function MediaFrame({
  src,
  alt = "",
  label = "이미지 준비중",
  aspect = "aspect-[4/3]",
  className,
  grayscale = false,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspect,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            grayscale &&
              "grayscale transition-[filter,transform] duration-500 hover:grayscale-0"
          )}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Camera size={28} className="opacity-40" />
          <span className="text-xs font-medium tracking-wide">{label}</span>
        </div>
      )}
    </div>
  );
}
