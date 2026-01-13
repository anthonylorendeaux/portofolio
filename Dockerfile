# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock* ./

# use ignore-scripts to avoid building node modules like better-sqlite3
# NOTE: Si vous avez encore l'erreur de lockfile, retirez temporairement "--frozen-lockfile"
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

RUN bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production
RUN apk add --no-cache curl
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# run the app
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

# Healthcheck standard utilisant curl
HEALTHCHECK --interval=5s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://127.0.0.1:80/health || exit 1

ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
