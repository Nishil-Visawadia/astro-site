FROM cgr.dev/chainguard/node:latest-dev AS base
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM cgr.dev/chainguard/caddy:latest AS runtime
COPY --from=base /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
