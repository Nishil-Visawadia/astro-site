# Build stage: Security hardened Node image
FROM cgr.dev/chainguard/node:latest-dev AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev for build tools)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Type check and build
RUN npm run check && npm run build

# Runtime stage: Security hardened Nginx image
FROM cgr.dev/chainguard/nginx:latest AS runtime

# Add security headers via nginx config
COPY <<EOF /etc/nginx/conf.d/security.conf
# Security headers for documentation site
server_tokens off;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://pagefind.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" always;

# Caching strategy
location ~* \.(js|css|png|jpg|svg|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.html?$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}

# Gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1024;
gzip_level 6;
EOF

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Set secure permissions (read-only for nginx user)
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod -R 644 /usr/share/nginx/html/*

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Expose secure port
EXPOSE 8080

# Default command (nginx runs as non-root in Chainguard image)
CMD ["nginx", "-g", "daemon off;"]
