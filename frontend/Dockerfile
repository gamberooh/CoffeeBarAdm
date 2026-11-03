FROM oven/bun:latest

WORKDIR /app

# Copiamo prima solo i file delle dipendenze per sfruttare la cache di Docker
COPY package.json bun.lock ./
RUN bun install

# Il codice vero e proprio verrà montato tramite volume dal docker-compose,
# ma definiamo qui il comando di avvio standard per Angular in Docker.
# --host 0.0.0.0 è obbligatorio per esporre la porta all'esterno del container.
# --poll 2000 assicura che il live-reload funzioni attraverso il file system di Docker.
CMD ["bun", "x", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
