#!/usr/bin/env bash
# 로컬 프로덕션 빌드를 띄우고 지정한 경로들을 Lighthouse로 감사한다.
# 사용: bash scripts/quality-gate.sh /portfolio/baby-hairpin / ...
set -euo pipefail

PORT=${PORT:-3100}
OUT=.audit
mkdir -p "$OUT"

./node_modules/.bin/next start -p "$PORT" >"$OUT/server.log" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  curl -sf "http://localhost:$PORT/" >/dev/null && break
  sleep 1
done

for route in "$@"; do
  name=$(echo "$route" | sed 's#^/##; s#/#_#g')
  [ -z "$name" ] && name=home
  echo "--- auditing $route ---"
  ./node_modules/.bin/lighthouse "http://localhost:$PORT$route" \
    --quiet --chrome-flags="--headless=new" \
    --output=json --output-path="$OUT/lh-$name.json"
done

echo "reports in $OUT/"
