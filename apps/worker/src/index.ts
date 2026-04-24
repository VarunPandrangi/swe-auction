import { auctionLifecycleQueue } from '@shared/queue';
import { Job } from 'bull';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

logger.info('Worker starting...');

auctionLifecycleQueue.process(async (job: Job) => {
  logger.info(`Processing job ${job.id} of type ${job.name}`);
  // Job processing logic will be added in later sprints
  return { success: true };
});

logger.info('Worker is ready to process jobs');
