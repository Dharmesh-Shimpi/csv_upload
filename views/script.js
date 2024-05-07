function createChart(data) {
	const ctx = document.getElementById('myChart').getContext('2d');
	const labels = data.map((item) => item.description);
	const values = data.map((item) => item.value);

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Value',
					data: values,
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		},
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput');

	//event listener to search input
	searchInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const searchText = searchInput.value.toLowerCase();
			const data = JSON.parse(localStorage.getItem('data'));
			const filteredData = data.filter((item) => {
				const description = item.description.toLowerCase();
				return description.includes(searchText);
			});
			createChart(filteredData);
		}
	});
});

function getFile(fileName) {
	const encodedFileName = encodeURIComponent(fileName);
	console.log(encodedFileName);
	window.location.href = `/file/${encodedFileName}?page=1`;
}