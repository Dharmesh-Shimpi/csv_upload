import multer from 'multer';
import fs from 'fs';
import { csvToJson } from './csvToJson.js';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// below are all the controllers for the file upload
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'text/csv') {
		cb(null, true);
	} else {
		cb(new Error('Only CSV files are allowed.'), false);
	}
};

export const upload = multer({ storage, fileFilter });

export const files = () => {
	try {
		const files = fs.readdirSync('uploads/');
		return files;
	} catch (error) {
		console.error('Error reading uploaded files:', error);
		return [];
	}
};

export function getFile(fileName, filePath, page, pageSize, res) {
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return res.status(500).send('Error reading file');
		}
		csvToJson(data, page, pageSize, (err, jsonData) => {
			if (err) {
				console.error('Error converting CSV to JSON:', err);
				return res.status(500).send('Error converting CSV to JSON');
			}

			const headerRegex = /^([^\s,]+)(?:,\s*([^\s,]+))*/gm;
			const matches = data.match(headerRegex);
			let header;
			if (matches) {
				header = matches[0].split(',');
			} else {
				throw new Error('Headers not found in CSV');
			}

			const body = jsonData.slice(1);
			res.render('file', { fileName, header, body, page, pageSize });
		});
	});
}
