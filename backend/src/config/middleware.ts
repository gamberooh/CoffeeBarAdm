import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export default function setupMiddlewares(app: Express): void {
  // per Nginx del lab, serve per https
  app.set('trust proxy', 1);

  // header di sicurezza con helmet, escluso CSP e CORP per non bloccare asset cross-origin e socket
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
  }));

  // CORS
  const allowedOrigins = [
    // 'http://localhost:4200', //angular default
    'http://localhost:35841', //frontend angular
    'http://localhost:8000' //backend
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(`CORS Error: Origin ${origin} not allowed`));
      }
    },
    credentials: true
  }));

  // rate limiter
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minuti in millisecondi
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,  // per rimuovere header deprecati
    message: { success: false, error: 'Too many requests, please try again later.' }
  });
  app.use('/api', apiLimiter);

  // log per richieste backend: stampa anche status code e durata
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
  });

  // body parser per ottenere subito oggetti js. Aumentato anche limite da 100k a 10m
  app.use(express.json({ limit: '10mb' }));
}

export { setupMiddlewares };
