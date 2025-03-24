const apiKey = '6b89f23f36e2be84ca3193fd282e30bf'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (city) => {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateUI = (data) => {
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('weatherDescription').textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('weatherInfo').style.display = 'block';
};

const handleError = (error) => {
  alert('An error occurred while fetching the weather data.');
  console.error(error);
};

document.getElementById('getWeather').addEventListener('click', async () => {
  const city = document.getElementById('city').value;
  if (city === '') {
    alert('Please enter a city');
    return;
  }

  try {
    const data = await getWeatherData(city);
    if (data.cod !== 200) {
      alert('City not found!');
      return;
    }
    updateUI(data);
  } catch (error) {
    handleError(error);
  }
});
