const API_KEY = "your_openweathermap_api_key"; 
const weatherDataDiv = document.getElementById("weatherData");
const cityNameSpan = document.getElementById("cityName");
const temperatureP = document.getElementById("temperature");
const conditionsP = document.getElementById("conditions");
const humidityP = document.getElementById("humidity");

const form = document.getElementById("locationForm");
const locationInput = document.getElementById("locationInput");
const currentLocationBtn = document.getElementById("currentLocationBtn");

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

function displayWeather(data) {
    cityNameSpan.textContent = data.name;
    temperatureP.textContent = `Temperature: ${data.main.temp}°C`;
    conditionsP.textContent = `Conditions: ${data.weather[0].description}`;
    humidityP.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDataDiv.classList.remove("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = locationInput.value.trim();

    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a location.");
    }
});

currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Could not get your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
