FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

CMD ["bun", "x", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
