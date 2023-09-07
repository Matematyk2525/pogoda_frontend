const tableBody = document.getElementById("TableBody");

const fetchData = async () => {
	const respone = await fetch("http://localhost:5000/dane-pogodowe");
	const data = await respone.json();
	console.log(data);

	data.forEach((x) => {
		createTableRow(x);
	});

	const humidityValues = data
		.map((item) => item.humidity)
		.slice(data.length - 10, data.length);
	const timeValues = data
		.map((item) => item.time.slice(item.time.length - 5, item.time.length))
		.slice(data.length - 10, data.length);

	createChart(humidityValues, timeValues);

	const tempValues = data
		.map((item) => item.temp)
		.slice(data.length - 10, data.length);

	const feelTempValues = data
		.map((item) => item.feels_like)
		.slice(data.length - 10, data.length);

	tempChart(timeValues, tempValues, feelTempValues);
};

fetchData();

const createTableRow = (element) => {
	const row = document.createElement("tr");
	row.innerHTML = `
    <td>${element.time}</td>
    <td>${element.temp}</td>
    <td>${element.feels_like}</td>
    <td>${element.pressure}</td>
    <td>${element.humidity}</td>
    <td>${element.clouds}</td>
    `;

	tableBody.append(row);
};
const createChart = (xVal, yVal) => {
	const x = [xVal[0] - 10, ...xVal, xVal[xVal.length - 1] + 10];

	new Chart("myChart", {
		type: "line",
		data: {
			labels: yVal,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "rgba(0,0,255,1.0)",
					borderColor: "rgba(0,0,255,0.1)",
					data: x,
				},
			],
		},

		options: {
			legend: { display: false },
			scales: {
				yAxes: [{ ticks: { min: 0, max: 100 } }],
			},
		},
	});
};

const tempChart = (xVal, temp, feelTemp) => {
	const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

	new Chart("TempChart", {
		type: "line",
		data: {
			labels: xVal,
			datasets: [
				{
					data: temp,
					borderColor: "red",
					fill: false,
				},
				{
					data: feelTemp,
					borderColor: "green",
					fill: false,
				},
			],
		},
		options: {
			legend: { display: false },
			scales: {
				yAxes: [{ ticks: { min: -50, max: 50 } }],
			},
		},
	});
};
