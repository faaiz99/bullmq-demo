import { Queue } from 'bullmq';
import { Job } from "./types/JobType"

class Producer {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('foo');
  }

  public async addJob(job:Job) {
    await this.queue.add(job.name, job.data);
  }

  public getQueue() {
    return this.queue;
  }
}

export default Producer;


