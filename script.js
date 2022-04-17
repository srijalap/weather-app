const getLatestMeasurement= () =>{
    fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
    .then((data) => data.json())
    .then((data) => {
        const latestThirtyMeasurements = data.slice(0,30);
        let tableRows = '';

        for (let i = 0; i < latestThirtyMeasurements.length; i++) {
            const measurementType = Object.keys(latestThirtyMeasurements[i].data)[0];
            const measuredValue = latestThirtyMeasurements[i].data[measurementType];
            const dateTime = latestThirtyMeasurements[i].date_time;
            const dateObject = new Date(latestThirtyMeasurements[i].date_time);

            tableRows += `<tr><td>${i+1}</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${measurementType}</td><td>${measuredValue}</td></tr>`;
        }

        const table = document.querySelector('#table1>tbody');
        table.innerHTML += tableRows;

    });

};

getLatestMeasurement();

const getTemperature= () =>{
    fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature")
    .then((data) => data.json())
    .then((data) => {
        let tableRows = '';

        for (let i = 0; i < data.length; i++) {
            const temp = data[i].temperature;
            const dateTime = data[i].date_time;
            const dateObject = new Date(data[i].date_time);
            console.log(temp);
            console.log(dateObject.toLocaleTimeString());

            tableRows += `<tr><td>${i+1}</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${temp}</td></tr>`;
        }

        const table = document.querySelector('#table2>tbody');
        table.innerHTML += tableRows;

    });
};

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getTemperature();


  const getWindSpeeds= () =>{
    fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed")
    .then((data) => data.json())
    .then((data) => {
        let tableRows = '';

        for (let i = 0; i < data.length; i++) {
            const windSpeeds = data[i].wind_speed;
            const dateTime = data[i].date_time;
            const dateObject = new Date(data[i].date_time);

            tableRows += `<tr><td>${i+1}</td><td>${dateObject.toLocaleDateString()}</td><td>${dateObject.toLocaleTimeString()}</td><td>${windSpeeds}</td></tr>`;
        }

        const table = document.querySelector('#table3>tbody');
        table.innerHTML += tableRows;

    });
};

getWindSpeeds();