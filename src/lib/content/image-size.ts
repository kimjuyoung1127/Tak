import fs from "fs";

/**
 * 이미지 헤더에서 고유 치수를 읽는다 (빌드 타임 전용, 동기).
 *
 * 왜 직접 읽나 — 상세 갤러리는 파일 시스템을 훑어 경로를 만들기 때문에 정적 import 로
 * next/image 가 치수를 추론하지 못한다. 치수 없이 렌더하면 이미지가 뜰 때마다 화면이 밀린다
 * (실측: /portfolio/baby-hairpin CLS 1.656). sharp 를 앱 번들에 끌어들이는 대신 헤더만 읽는다.
 *
 * ponytail: PNG·JPEG 만 지원한다 — 현재 public/portfolio·public/templates 에 있는 형식 전부.
 * 다른 형식이 들어오면 null 을 반환해 호출부가 치수 없이 렌더한다(기존 동작으로 안전 저하).
 * WebP·AVIF 가 필요해지면 이 파일에 리더를 추가한다.
 */
export interface Dimensions {
  width: number;
  height: number;
}

function readPng(buf: Buffer): Dimensions | null {
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readJpeg(buf: Buffer): Dimensions | null {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    // SOF0~SOF15 가 프레임 헤더. DHT(c4)·JPG(c8)·DAC(cc) 는 프레임이 아니라 제외.
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrame) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return null;
}

/** `filePath` 는 절대 경로. 읽기 실패·미지원 형식이면 null. */
export function getImageSize(filePath: string): Dimensions | null {
  let buf: Buffer;
  try {
    // 헤더만 필요하므로 앞부분만 읽는다. 프로그레시브 JPEG 의 SOF 도 이 범위 안에 든다.
    const fd = fs.openSync(filePath, "r");
    buf = Buffer.alloc(65536);
    const read = fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, read);
  } catch {
    return null;
  }

  const size = readPng(buf) ?? readJpeg(buf);
  return size && size.width > 0 && size.height > 0 ? size : null;
}
