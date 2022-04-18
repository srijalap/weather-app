const getLatestMeasurement = () => {
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
};

const getTemperature = async (interval) => {
    let tableRows = `<tr><th>Row Number</th><th>Measurement Date</th>
    <th>Measurement Time</th><th>Temperature</th></tr>`;
    let dateTimeArray = [];
    let tempArray = [];
    let url = '';

    switch (interval) {
        case 'now':
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature';
            break;
        case '24hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23';
            break;
        case '48hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47';
            break;
        case '72hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71';
            break;
        case '1week':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167';
            break;
        default:
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature';
    }

    await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const temp = data[i].temperature;
                const dateTime = data[i].date_time;
                const dateObject = new Date(dateTime);
                dateTimeArray.push(dateTime);
                tempArray.push(temp);

                tableRows += `<tr><td>${
                    i + 1
                }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${temp}</td></tr>`;
            }
        });

    const table = document.querySelector('#table2');
    table.innerHTML = tableRows;

    showChart(dateTimeArray, tempArray, 'tempChart', 'Temperature');
};




const getWindSpeed = async (interval) => {
    let tableRows = `<tr>
    <th>Row Number</th>
    <th>Measurement Date</th>
    <th>Measurement Time</th>
     <th>wind Speed</th>
    </tr>`;
    
    let dateTimeArray = [];
    
    let windSpeedArray = [];
    let url = '';
    switch (interval) {
        case 'now':
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed';
            break;
        case '24hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23';
            break;
        case '48hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47';
            break;
        case '72hour':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71';
            break;
        case '1week':
            url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167';
            break;
        default:
            url = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed';
    }

    await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const windSpeed = data[i].wind_speed;
                const dateTime = data[i].date_time;
                const dateObject = new Date(dateTime);
                dateTimeArray.push(dateTime);
                windSpeedArray.push(windSpeed);

                tableRows += `<tr><td>${
                    i + 1
                }</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${windSpeed}</td></tr>`;
            }
        });

        const table = document.querySelector('#table3');
    table.innerHTML = tableRows;
    showChart(dateTimeArray, windSpeedArray, 'windChart', 'Wind speed');
    }

function showChart(labelsArray, data, canvasId, label) {
    // get chart in the given canvas id
    const chart = Chart.getChart(canvasId);

    if (chart) {
        // If chart already exists in the given canvas, destroy it first before creating another
        chart.destroy();
    }
    const ctx = document.getElementById(canvasId);
    const myChart = new Chart(ctx, {
        type: 'bar',
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
    var value = document.getElementById('timeInterval').value;
    getTemperature(value);
}

function changeWindTimeInterval() {
    var value = document.getElementById('windTimeInterval').value;
    getWindSpeed(value);
}

getLatestMeasurement();
getTemperature('now');
getWindSpeed('now');
