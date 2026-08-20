#!/usr/bin/env bash
set -euo pipefail

DOMAIN="media.213-176-94-245.sslip.io"
SITE_NAME="tg26-media-backup"
AVAILABLE="/etc/nginx/sites-available/$SITE_NAME"
ENABLED="/etc/nginx/sites-enabled/$SITE_NAME"

cat > "$AVAILABLE" <<'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name media.213-176-94-245.sslip.io;
  client_max_body_size 1m;

  location / {
    proxy_pass http://127.0.0.1:8092;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_force_ranges on;
  }
}
EOF

ln -sfn "$AVAILABLE" "$ENABLED"
nginx -t
systemctl reload nginx

curl -fsSI \
  -H "Host: $DOMAIN" \
  -H 'Range: bytes=0-1' \
  http://127.0.0.1/hero_desc_RF28.mp4

certbot --nginx \
  --domain "$DOMAIN" \
  --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --redirect

nginx -t
systemctl reload nginx

curl -fsSI -H 'Range: bytes=0-1' \
  "https://$DOMAIN/hero_desc_RF28.mp4"
