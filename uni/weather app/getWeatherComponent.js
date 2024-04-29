const APIKey = 'ab2c9d8ba56c7e1446bf3bfbcdcea5b1'

async function searchWeather() {
  try {
    const town = document.getElementById('weather-town').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${APIKey}`);
    const responseData = await response.json();
    const weather = responseData.weather[0]
    document.getElementById('results').textContent = `${weather.main} (${weather.description})`;
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    document.getElementById('results').textContent = 'Error fetching weather. Please try again.'
  }
}
