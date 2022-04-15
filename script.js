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

            tableRows += `<tr><td>${i+1}</td><td>${dateTime}</td><td>${measurementType}</td><td>${measuredValue}</td></tr>`;
        }

        const table = document.querySelector('#table1>tbody');
        table.innerHTML += tableRows;

    });

};

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getLatestMeasurement();

  