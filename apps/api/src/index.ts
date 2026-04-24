import { createServer } from 'http';

import express from 'express';
import pino from 'pino';

import { setupSocketServer } from './socket/server';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();
const httpServer = createServer(app);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function main() {
  await setupSocketServer(httpServer);

  const port = 4000;
  httpServer.listen(port, () => {
    logger.info(`API server listening on port ${port}`);
  });
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
