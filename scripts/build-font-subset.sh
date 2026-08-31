#!/usr/bin/env bash
# Pretendard Variable 을 이 사이트가 쓰는 글자만 남기고 잘라 src/app/fonts/ 에 넣는다.
#
# 원본 2.0MB → 서브셋 ~442KB. 서브셋 대상:
#   1) KS X 1001 상용 한글 2,350자 — 문의폼·진단폼에 사용자가 입력한 글자도 렌더돼야 한다
#   2) src/ 안의 모든 소스에 등장하는 문자 — 카피에 쓰인 기호·한자·특수문자 누락 방지
#   3) 라틴·구두점·전각·호환자모 블록
#
# 폰트를 바꾸거나 카피에 새 문자군이 들어오면 다시 돌린다. 필요: python3, 인터넷.
set -euo pipefail

PRETENDARD_VERSION=${PRETENDARD_VERSION:-1.3.9}
ROOT=$(cd "$(dirname "$0")/.." && pwd)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

echo "1/4 원본 내려받기 (pretendard@$PRETENDARD_VERSION)"
cd "$WORK"
npm pack "pretendard@$PRETENDARD_VERSION" >/dev/null 2>&1
tar -xzf "pretendard-$PRETENDARD_VERSION.tgz" package/dist/web/variable/woff2/PretendardVariable.woff2 package/LICENSE

echo "2/4 서브셋 문자 집합 만들기"
python3 - "$ROOT" <<'PY'
import glob, sys
root = sys.argv[1]
chars = set()
for pat in (f"{root}/src/**/*.ts", f"{root}/src/**/*.tsx"):
    for f in glob.glob(pat, recursive=True):
        chars |= set(open(f, encoding="utf-8").read())

# KS X 1001 수록분 = EUC-KR 2바이트가 둘 다 0xA1~0xFE 인 음절 (cp949 는 11,172자 전부라 걸러야 한다)
ks = set()
for cp in range(0xAC00, 0xD7A4):
    ch = chr(cp)
    try:
        b = ch.encode("cp949")
    except UnicodeEncodeError:
        continue
    if len(b) == 2 and 0xA1 <= b[0] <= 0xFE and 0xA1 <= b[1] <= 0xFE:
        ks.add(ch)

ranges = [(0x20, 0x7E), (0xA0, 0xFF), (0x2000, 0x206F), (0x20A9, 0x20AC),
          (0x3000, 0x303F), (0x3130, 0x318F), (0xFF01, 0xFF5E)]
base = {chr(c) for a, b in ranges for c in range(a, b + 1)}

final = sorted(c for c in (chars | ks | base) if ord(c) >= 0x20)
open("subset-chars.txt", "w", encoding="utf-8").write("".join(final))
print(f"   사이트 {len(chars)}자 + KS X 1001 {len(ks)}자 → 총 {len(final)}자")
PY

echo "3/4 서브셋 (fonttools + brotli)"
python3 -m venv venv
./venv/bin/pip install --quiet fonttools brotli
./venv/bin/python -m fontTools.subset \
  package/dist/web/variable/woff2/PretendardVariable.woff2 \
  --text-file=subset-chars.txt --flavor=woff2 \
  --output-file=PretendardVariable.subset.woff2

echo "4/4 설치"
mkdir -p "$ROOT/src/app/fonts"
cp PretendardVariable.subset.woff2 "$ROOT/src/app/fonts/"
cp package/LICENSE "$ROOT/src/app/fonts/OFL.txt"
ls -la "$ROOT/src/app/fonts/"
