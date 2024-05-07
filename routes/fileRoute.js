import express from 'express';
const router = express.Router();
import { getFile } from '../middleware/fileUpload.js';

router.get('/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	console.log(fileName);
	const page = parseInt(req.query.page) || 1;
	const pageSize = 100; // page size to 100 records
	const filePath = `uploads/${fileName}`;

	getFile(fileName, filePath, page, pageSize, res);
});

export default router;