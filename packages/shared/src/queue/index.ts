import Queue from 'bull';
/**
 * Using Bull 4.x as specified in plan_v4.md.
 * Decision: Sticking with Bull 4.x instead of BullMQ per Sprint 0 prompt instructions.
 */

import { env } from '../env';

export const auctionLifecycleQueue = new Queue('auction-lifecycle-queue', env.REDIS_URL);

// Log queue events
auctionLifecycleQueue.on('error', (error) => {
  console.error('Queue Error:', error);
});

auctionLifecycleQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} is waiting`);
});
