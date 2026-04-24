import { Server as HttpServer } from 'http';

import { env } from '@shared/env';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

export async function setupSocketServer(httpServer: HttpServer) {
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

  io.on('connection', (socket) => {
    console.log('socket server listening', socket.id);
  });

  console.log('Socket.IO server initialized');
  return io;
}
