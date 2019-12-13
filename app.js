window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let humidityDegree = document.querySelector('.humidity-degree');
    let airpressureDegree = document.querySelector('.airpressure-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-column');
    let airpressureSection = document.querySelector('.airpressure-column');
    const temperatureSpan = document.querySelector('.temperature-column span');
    const airpressureSpan = document.querySelector('.airpressure-column span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/51f8b63cc14ab57b992168f3ce539d7e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon, humidity, pressure } = data.currently;
                    //Set DOM Elements from the API
                    console.log(data);
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    humidityDegree.textContent = humidity*100;
                    airpressureDegree.textContent = pressure;

                    //formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius/Fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                        temperatureSpan.textContent = "°F"
                            temperatureDegree.textContent = temperature;
                        };
                    });

                    //formula for mmHg
                    let mmHg = pressure * 0.750063755419211;

                    //Change pressure to mmHg/hPa
                    airpressureSection.addEventListener('click', () => {
                        if (airpressureSpan.textContent === "hPa") {
                            airpressureSpan.textContent = "mmHg";
                            airpressureDegree.textContent = Math.floor(mmHg);
                        }
                        else {
                        airpressureSpan.textContent = "hPa"
                            airpressureDegree.textContent = pressure;
                        };
                    });

                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace("-", "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});