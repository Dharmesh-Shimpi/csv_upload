import express from 'express';
import path from 'path';
import { getFile } from '../middleware/fileUpload.js';

const router = express.Router();

router.get('/:fileName', async (req, res) => {
	const fileName = req.params.fileName;
	const page = parseInt(req.query.page) || 1;
	const pageSize = 100; // Page size to 100 records
	const filePath = path.join('uploads', fileName);

	try {
		const { header, body } = await getFile(filePath, page, pageSize);
		res.render('file', { fileName, header, body, page, pageSize });
	} catch (err) {
		res.status(500).send('Error processing file');
	}
});

export default router;
