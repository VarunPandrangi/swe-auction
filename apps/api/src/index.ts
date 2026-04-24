import { env } from '@shared/env';
import cors from 'cors';
import express from 'express';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function main() {
  const port = 4000;
  app.listen(port, () => {
    logger.info({ port }, 'api server listening');
  });
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
