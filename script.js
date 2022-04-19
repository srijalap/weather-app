function getLatestMeasurement() {
    fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather')
        .then((data) => data.json())
        .then((data) => {
            const latestThirtyMeasurements = data.slice(0, 30);
            let tableRows = '';

            for (let i = 0; i < latestThirtyMeasurements.length; i++) {
                const measurementType = Object.keys(latestThirtyMeasurements[i].data)[0];
                const measuredValue = latestThirtyMeasurements[i].data[measurementType];
                const dateTime = latestThirtyMeasurements[i].date_time;
                const dateObject = new Date(latestThirtyMeasurements[i].date_time);

                tableRows += `<tr><td>${
                    i + 1
                }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurementType}</td><td>${measuredValue}</td></tr>`;
            }

            const table = document.querySelector('#table1>tbody');
            table.innerHTML += tableRows;
        });
}

async function displayWeatherDataTableAndChart(measurementType, interval, tableId) {
    
    let tableRows = '';
    let label = '';
    switch (measurementType) {
        case 'temperature':
            tableRows += `<tr><th>Row Number</th><th>Measurement Date</th>
            <th>Measurement Time</th><th>Temperature</th></tr>`;
            label = 'Temperature';
            break;

        case 'wind_speed':
            tableRows += `<tr>
            <th>Row Number</th>
            <th>Measurement Date</th>
            <th>Measurement Time</th>
             <th>Wind Speed</th>
            </tr>`;
            label = 'Wind Speed';
            break;

        case 'rain':
            tableRows += `<tr>
                <th>Row Number</th>
                <th>Measurement Date</th>
                <th>Measurement Time</th>
                <th>Rain</th>
                </tr>`;
            label = 'rain';
            break;

        case 'wind_direction':
            tableRows += `<tr>
                    <th>Row Number</th>
                    <th>Measurement Date</th>
                    <th>Measurement Time</th>
                     <th>Wind Direction</th>
                    </tr>`;
            label = 'Wind Direction';
            break;

        case 'light':
            tableRows += `<tr>
                        <th>Row Number</th>
                        <th>Measurement Date</th>
                        <th>Measurement Time</th>
                         <th>light</th>
                        </tr>`;
            label = 'light';
            break;
    }

    let dateTimeArray = [];
    let measurementArray = [];
    let url = '';

    switch (interval) {
        case 'now':
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType;
            break;
        case '24hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType + '/23';
            break;
        case '48hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType + '/47';
            break;
        case '72hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType + '/71';
            break;
        case '1week':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType + '/167';
            break;
        default:
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + measurementType;
    }

    await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const measurement = data[i][measurementType];
                const dateTime = data[i].date_time;
                const dateObject = new Date(dateTime);
                dateTimeArray.push(dateTime);
                measurementArray.push(measurement);

                switch (measurementType) {
                    case 'temperature':
                        tableRows += `<tr><td>${
                            i + 1
                        }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurement}</td></tr>`;
                        break;
                    case 'wind_speed':
                        tableRows += `<tr><td>${
                            i + 1
                        }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurement}</td></tr>`;
                        break;

                    case 'rain':
                        tableRows += `<tr><td>${
                            i + 1
                        }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurement}</td></tr>`;
                        break;

                    case 'wind_direction':
                        tableRows += `<tr><td>${
                            i + 1
                        }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurement}</td></tr>`;
                        break;

                    case 'light':
                        tableRows += `<tr><td>${
                            i + 1
                        }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurement}</td></tr>`;
                        break;
                }
            }
        });

    const table = document.querySelector('#' + tableId);
    table.innerHTML = tableRows;

    // Canvas id depends on the tableId
    let canvasId = '';
    let chartType ='';
    if (tableId === 'table2') {
        canvasId = 'tempChart';
        chartType='bar';
    } else if (tableId === 'table3') {
        canvasId = 'windChart';
        chartType ='bar'
    } else if (tableId === 'table4') {
        canvasId = 'customChart';
        chartType ='line';
    }

    showChart(dateTimeArray, measurementArray, canvasId, label, chartType);
}

function showChart(labelsArray, data, canvasId, label,chartType) {
    // get chart in the given canvas id
    const chart = Chart.getChart(canvasId);

    if (chart) {
        // If chart already exists in the given canvas, destroy it first before creating another
        chart.destroy();
    }
    const ctx = document.getElementById(canvasId);
    const myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labelsArray,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function changeInterval() {
    var value = document.getElementById('tempTimeInterval').value;
    displayWeatherDataTableAndChart('temperature', value, 'table2');
}

function changeWindTimeInterval() {
    var value = document.getElementById('windTimeInterval').value;
    displayWeatherDataTableAndChart('wind_speed', value, 'table3');
}

function changeMeasurementTypeAndTimeInterval() {
    var timeInterval = document.getElementById('timeInterval').value;
    var measurementType = document.getElementById('measurementType').value;

    displayWeatherDataTableAndChart(measurementType, timeInterval, 'table4');
}

getLatestMeasurement();
displayWeatherDataTableAndChart('temperature', 'now', 'table2');
displayWeatherDataTableAndChart('wind_speed', 'now', 'table3');
displayWeatherDataTableAndChart('rain', 'now', 'table4');
