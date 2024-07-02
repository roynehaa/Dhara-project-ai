import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=38bc064ee4fb78ffad5e6badc18dfc88`;

      axios.get(url).then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38bc064ee4fb78ffad5e6badc18dfc88`;

          axios.get(weatherUrl).then((weatherResponse) => {
            setData(weatherResponse.data);
            console.log(weatherResponse.data);
          });
        } else {
          console.log("Location not found");
        }
      });

      setLocation('');
    }
  }

  const kelvinToCelsius = (kelvin) => {
    return ((kelvin - 273.15)).toFixed();
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{kelvinToCelsius(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{kelvinToCelsius(data.main.feels_like)}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
