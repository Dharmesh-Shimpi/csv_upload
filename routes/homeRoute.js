import express from 'express';
import { upload, files } from '../middleware/fileUpload.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const fileList = await files();
	res.render('home', { files: fileList });
});

router.post('/', upload.single('csvFile'), (req, res) => {
	if (!req.file) {
		return res.status(400).send('No CSV file uploaded.');
	}
	const fileList = files();
	res.render('home', { files: fileList });  
});

export default router;
