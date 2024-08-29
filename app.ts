import Express from 'express';
import Producer from './producer';
import JobWorker from './worker';
import config from './config/config';

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';


import { Job } from './types/JobType';

class Server {
	private app: Express.Application;
	private port: number;
	private producer: Producer;
	private worker: JobWorker;

	constructor(port: number) {
		this.app = Express();
		this.port = port;
		this.producer = new Producer();
		this.worker = new JobWorker();
		
        // Set up Bull Board
        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath('/admin');
		createBullBoard({
			queues: [new BullMQAdapter(this.producer.getQueue())],
			serverAdapter,
		  });

        // Use Bull Board routes
        this.app.use('/admin', serverAdapter.getRouter());

	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`${config.server.node_env} Server started on http://localhost:${this.port}`);
		});
	}
	public async addJob(job:Job) {
		this.producer.addJob(job)
	}
	public async processJob(job: any) {
		this.worker.processJob(job)
	}	
}


export default Server;