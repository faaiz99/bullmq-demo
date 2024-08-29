import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import config from './config/config';

class JobWorker {
  private worker: Worker;
  private connection: IORedis;

  constructor() {
    this.connection = new IORedis({
      host: config.redis.host,
      port: config.redis.port,
      maxRetriesPerRequest: null,
    });

    this.worker = new Worker('foo', this.processJob, { connection: this.connection });

    this.worker.on('completed', this.onCompleted);
    this.worker.on('failed', this.onFailed);
  }

  public async processJob(job: Job) {
	console.log(job.data);
  }

  private onCompleted(job: Job) {
    console.log(`${job.id} has completed!`);
  }

  private onFailed(job: Job | undefined, err: Error) {
    console.log(`${job?.id} has failed with ${err.message}`);
  }
}

export default JobWorker;