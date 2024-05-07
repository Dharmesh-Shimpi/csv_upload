import * as csv from 'csv';

export function csvToJson(data, page, pageSize, callback) {
	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	csv.parse(data, { delimiter: ',', length: endIndex }, (err, output) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			const paginatedOutput = output.slice(startIndex, endIndex);
			callback(null, paginatedOutput);
		}
	});
}