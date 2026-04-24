import { createServer } from 'http';

import { env } from '@shared/env';
import { createAdapter } from '@socket.io/redis-adapter';
import pino from 'pino';
import { createClient } from 'redis';
import { Server } from 'socket.io';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function main() {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  const pubClient = createClient({ url: env.REDIS_URL });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', () => undefined);

  const port = 4001;
  httpServer.listen(port, () => {
    logger.info({ port }, 'socket server listening');
  });
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
