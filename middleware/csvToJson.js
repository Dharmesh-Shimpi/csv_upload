import csv from 'csvtojson';

export async function csvToJson(data, page, pageSize) {
	const jsonData = await csv().fromString(data);
	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedOutput = jsonData.slice(startIndex, endIndex);
	return paginatedOutput;
}
