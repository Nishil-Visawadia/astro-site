FROM cgr.dev/chainguard/node:latest-dev AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM cgr.dev/chainguard/nginx:latest AS runtime
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
