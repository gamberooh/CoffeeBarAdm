# Build stage
FROM dhi.io/bun:1.x-dev AS build

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY index.ts tsconfig.json ./
RUN bun build ./index.ts --outdir ./dist --target bun

# Runtime stage
FROM dhi.io/bun:1.x

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "run", "dist/index.js"]

