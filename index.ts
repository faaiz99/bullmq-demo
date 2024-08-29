import Server from "./app";


const server = new Server(3000);
server.start();

const job = {
	name: 'myJobName',
	data: { foo: 'bar' }
}
server.addJob(job)
server.processJob(job)
