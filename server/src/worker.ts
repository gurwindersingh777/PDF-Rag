import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(job.data);
  },
  {
    concurrency: 100,
    connection,
  }
);
