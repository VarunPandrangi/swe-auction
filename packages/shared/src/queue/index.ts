import Queue from 'bull';

import { env } from '../env';

export const auctionLifecycleQueue = new Queue('auction-lifecycle-queue', env.REDIS_URL);

// Log queue events
auctionLifecycleQueue.on('error', (error) => {
  console.error('Queue Error:', error);
});

auctionLifecycleQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} is waiting`);
});
