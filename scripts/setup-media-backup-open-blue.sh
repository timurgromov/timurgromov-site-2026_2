#!/usr/bin/env bash
set -euo pipefail

BASE="/srv/tg26-media-backup"
PUBLIC_DIR="$BASE/public"
NGINX_DIR="$BASE/nginx"
CONTAINER_NAME="tg26-media-backup"

mkdir -p "$PUBLIC_DIR" "$NGINX_DIR"

cat > "$NGINX_DIR/default.conf" <<'EOF'
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  location / {
    try_files $uri =404;
    add_header Access-Control-Allow-Origin "*" always;
    add_header Cache-Control "public, max-age=3600";
  }
}
EOF

download() {
  local name="$1"
  local url="$2"
  local destination="$PUBLIC_DIR/$name"
  local temporary="$PUBLIC_DIR/.$name.tmp"

  if [[ -s "$destination" ]]; then
    return
  fi

  curl -L --fail --retry 3 --connect-timeout 20 -o "$temporary" "$url"
  mv "$temporary" "$destination"
}

download hero_desc_RF28.mp4 https://bs.boomstream.dev/balancer/RCIJ56KS-EuQeQgfF.mp4
download hero_mob_RF28.mp4 https://bs.boomstream.dev/balancer/0VGkkqV8-EuQeQgfF.mp4
download demo_komoRF28.mp4 https://bs.boomstream.dev/balancer/N2LPspm9-jAhiWugB.mp4
download demo_morozRF28_576.mp4 https://bs.boomstream.dev/balancer/M05OCeUp-jAhiWugB.mp4
download demo_toscanaRF28.mp4 https://bs.boomstream.dev/balancer/Oumx0U4Z-jAhiWugB.mp4
download demo_nemchRF28_576.mp4 https://bs.boomstream.dev/balancer/gzJNWWi6-EuQeQgfF.mp4
download morozovkaRF24.mp4 https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4
download KomoRF26.mp4 https://cdnv.boomstream.com/balancer/AKPfzEht-EuQeQgfF.mp4
download ToscanaRF26.mp4 https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4
download NemchinovkaRF28.mp4 https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4
download review_anton_kristina_RF.mp4 https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4
download tg26_advice_wedding_laughter_20260602.mp4 https://cdnv.boomstream.com/balancer/roHksxqq-SxJPiQup.mp4
download tg26_advice_awkward_toasts_20260602.mp4 https://cdnv.boomstream.com/balancer/aszKpzRZ-SxJPiQup.mp4
download tg26_advice_wedding_chaos_20260602.mp4 https://cdnv.boomstream.com/balancer/qzinNGjh-SxJPiQup.mp4
download materials_popup_1_20260617.mp4 https://cdnv.boomstream.com/balancer/pCq9x3Jn-SxJPiQup.mp4
download materials_popup_2_20260617.mp4 https://cdnv.boomstream.com/balancer/rSg5jRyU-SxJPiQup.mp4
download materials_popup_3_20260617.mp4 https://cdnv.boomstream.com/balancer/r9seULNi-SxJPiQup.mp4
download materials_popup_4_20260617.mp4 https://cdnv.boomstream.com/balancer/RNUDagDY-SxJPiQup.mp4
download materials_popup_5_20260617.mp4 https://cdnv.boomstream.com/balancer/ytQQEk4L-SxJPiQup.mp4
download materials_popup_6_20260617.mp4 https://cdnv.boomstream.com/balancer/y8riDaTB-SxJPiQup.mp4

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p 127.0.0.1:8092:80 \
  -v "$PUBLIC_DIR:/usr/share/nginx/html:ro" \
  -v "$NGINX_DIR/default.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:1.29-alpine

curl -fsSI -H 'Range: bytes=0-1' \
  http://127.0.0.1:8092/hero_desc_RF28.mp4
