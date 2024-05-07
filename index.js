import server from './routes/routes.js';
import mongoose from 'mongoose';

async function connectDatabase() {
	try {
		await mongoose.connect('mongodb://localhost:27017');
	} catch (error) {
		console.log(error);
	}
}

server.listen(5000, () => {
	connectDatabase();
	console.log('server is listening at port 5000');
});
