import multer from 'multer';
import fs from 'fs/promises'; // Use the promises API
import { csvToJson } from './csvToJson.js'; // Ensure this function is correctly implemented

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'text/csv') {
		cb(null, true);
	} else {
		cb(new Error('Only CSV files are allowed.'), false);
	}
};

export const upload = multer({ storage, fileFilter });

export const files = async () => {
	try {
		const files = await fs.readdir('uploads/');
		return files;
	} catch (error) {
		console.error('Error reading uploaded files:', error);
		return [];
	}
};

export async function getFile(filePath, page, pageSize) {
	try {
		const data = await fs.readFile(filePath, 'utf8');
		const body = await csvToJson(data, page, pageSize);

		const header = Object.keys(body[0]);

		return { header, body };
	} catch (err) {
		console.error('Error processing file:', err);
		throw new Error('Error processing file');
	}
}
