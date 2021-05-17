const KEY = "YOUR KEY HERE"; // Chave criada no site https://api.hgbrasil.com/
const API = "https://api.hgbrasil.com/weather?key="+KEY+"&user_ip=remote&format=json-cors";

function getGeoLocation() {
    let x = document.getElementById("demo");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherInformation);
    } else {
      x.innerHTML = "GeoLocation is not supported for this browser";
    }
  }
  
  function getWeatherInformation(position) {
    // api from https://console.hgbrasil.com/
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = API + "&lat=" + lat + "&lon=" + lon;

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
      console.log(this.status);
      if (this.readyState == 4 && this.status == 200) {
        let resp = JSON.parse(this.response)
        updatePage(resp.results);
      }
      
  };
    request.send();
  };

  function updatePage(weather) {
    let temp = document.getElementById("temp");
    let city = document.getElementById("city");
    let date = document.getElementById("date");
    let desc = document.getElementById("desc");
    let scale = document.getElementById("scale");

    temp.innerHTML = weather.temp + "º";
    scale.innerHTML = "C";  // C = Celsius; F = Fahrenheit;
    city.innerHTML = weather.city + '. ';
    date.innerHTML = weather.date;
    desc.innerHTML = weather.description;
  };

  window.addEventListener('load', () => {
      getGeoLocation();
    })


// ========= Switch Scale =============

function switchScale() {
  let scale = document.getElementById("scale");
  let temp = document.getElementById("temp").innerHTML;
  temp = sanitizeTemp(temp);
  
  if (scale.innerHTML === "C") {
      document.getElementById("btnScale").innerHTML = "Celcius";
      document.getElementById("temp").innerHTML = (temp * 9/5) + 32 + 'º';
      document.getElementById("scale").innerHTML = "F";
  } else if (scale.innerHTML === "F") {
      document.getElementById("btnScale").innerHTML = "Fahrenheit";
      document.getElementById("temp").innerHTML = (temp - 32) * 5/9 + 'º';
      document.getElementById("scale").innerHTML = "C";
  }
}    

  document.getElementById("btnScale").addEventListener('click', switchScale);

  function sanitizeTemp(temp) {
    // remove de radius simbol (º)
    temp = temp.replace('º', '');
    // parse the temperature from String to float;
    temp = parseFloat(temp);
    return temp;
  }