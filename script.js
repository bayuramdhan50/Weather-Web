// API configuration
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');

// Event listeners
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Initialize with default city
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('Jakarta'); // Default city
});

// Fetch weather data from API
async function getWeatherData(city) {
    try {
        // For demo purposes, we'll use mock data instead of actual API calls
        // In a real application, you would use:
        // const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        // const data = await response.json();
        
        // Mock current weather data
        const mockCurrentData = getMockCurrentWeather(city);
        updateCurrentWeather(mockCurrentData);
        
        // Mock forecast data
        const mockForecastData = getMockForecastData();
        updateForecast(mockForecastData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Update UI with current weather data
function updateCurrentWeather(data) {
    // Update city name
    cityName.textContent = data.name;
    
    // Update date
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = date.toLocaleDateString('en-US', options);
    
    // Update temperature
    temperature.textContent = Math.round(data.main.temp);
    
    // Update weather description
    weatherDescription.textContent = data.weather[0].description;
    
    // Update weather icon
    updateWeatherIcon(weatherIcon, data.weather[0].id);
    
    // Update details
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Update UI with forecast data
function updateForecast(forecastData) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    // Add forecast cards
    forecastData.forEach(day => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        
        const forecastDate = document.createElement('p');
        forecastDate.className = 'forecast-date';
        forecastDate.textContent = day.date;
        
        const forecastIconContainer = document.createElement('div');
        forecastIconContainer.className = 'forecast-icon';
        const forecastIcon = document.createElement('i');
        updateWeatherIcon(forecastIcon, day.weatherId);
        forecastIconContainer.appendChild(forecastIcon);
        
        const forecastTemp = document.createElement('p');
        forecastTemp.className = 'forecast-temp';
        forecastTemp.textContent = `${Math.round(day.temp)}°C`;
        
        const forecastDesc = document.createElement('p');
        forecastDesc.className = 'forecast-description';
        forecastDesc.textContent = day.description;
        
        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(forecastIconContainer);
        forecastCard.appendChild(forecastTemp);
        forecastCard.appendChild(forecastDesc);
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Update weather icon based on weather condition ID
function updateWeatherIcon(iconElement, weatherId) {
    // Weather icon mapping based on OpenWeatherMap condition codes
    // https://openweathermap.org/weather-conditions
    iconElement.className = ''; // Clear previous classes
    
    if (weatherId >= 200 && weatherId < 300) {
        iconElement.className = 'fas fa-bolt'; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        iconElement.className = 'fas fa-cloud-rain'; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        iconElement.className = 'fas fa-cloud-showers-heavy'; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        iconElement.className = 'fas fa-snowflake'; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        iconElement.className = 'fas fa-smog'; // Atmosphere (fog, mist, etc.)
    } else if (weatherId === 800) {
        iconElement.className = 'fas fa-sun'; // Clear sky
    } else if (weatherId > 800) {
        iconElement.className = 'fas fa-cloud'; // Clouds
    } else {
        iconElement.className = 'fas fa-cloud'; // Default
    }
}

// Mock data for demonstration purposes
function getMockCurrentWeather(city) {
    return {
        name: city,
        main: {
            temp: 28 + Math.random() * 5, // Random temperature between 28-33°C
            humidity: Math.floor(60 + Math.random() * 30), // Random humidity between 60-90%
            pressure: Math.floor(1000 + Math.random() * 20) // Random pressure
        },
        weather: [
            {
                id: [800, 801, 500, 300][Math.floor(Math.random() * 4)], // Random weather condition
                description: ['clear sky', 'few clouds', 'light rain', 'scattered clouds'][Math.floor(Math.random() * 4)]
            }
        ],
        wind: {
            speed: Math.floor(5 + Math.random() * 20) // Random wind speed
        }
    };
}

function getMockForecastData() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const weatherTypes = [
        { id: 800, description: 'clear sky' },
        { id: 801, description: 'few clouds' },
        { id: 500, description: 'light rain' },
        { id: 300, description: 'drizzle' },
        { id: 600, description: 'light snow' }
    ];
    
    return days.map((day, index) => {
        const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        return {
            date: day,
            temp: 25 + Math.random() * 8, // Random temperature
            weatherId: weather.id,
            description: weather.description
        };
    });
}