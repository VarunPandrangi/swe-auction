import Queue from 'bull';

import { env } from '../env';

/**
 * Using Bull 4.x as specified in plan_v4.md.
 * Decision: Sticking with Bull 4.x instead of BullMQ per Sprint 0 prompt instructions.
 */
export const auctionLifecycleQueue = new Queue('auction-lifecycle-queue', env.REDIS_URL);
