import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import express from 'express';
import http from 'http';
import { closeDB, connectDB } from './config/db';
import setupMiddlewares from './config/middleware';
import { loadRoutes } from './config/routerLoader';

const app = express();
const server = http.createServer(app);

// CHECK PORT VAR
const PORT = process.env.PORT || 8000;
const nodeEnv = process.env.NODE_ENV || 'production';
// L'ordine di ciò che viene registrato in Express è importante, perchè per ogni rotta Express farà proprio in quell'ordine i passaggi

setupMiddlewares(app);

loadRoutes(app);

async function startServer() {
  // aspetta connessione al db
  await connectDB();

  server.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT} in ${nodeEnv} mode`);
  });
}

startServer();

// per lo spegnimento forte, così vengono chiuse connessioni a db e server http prima di chiudere
const gracefulShutdown = async (signal: NodeJS.Signals) => {
  console.log(`[Server] ${signal} signal received. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      await closeDB();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Server] Uncaught Exception thrown:', err);
});
