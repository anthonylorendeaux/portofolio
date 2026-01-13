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

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# run the app
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

HEALTHCHECK --interval=5s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1

ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
