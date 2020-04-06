import React from "react";

import { weatherApi } from "./api";

import "./App.css";

const App = () => {
  const [location, setLocation] = React.useState({
    lat: "",
    long: ""
  });

  const coord = position =>
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });

  const [error, setError] = React.useState(null);
  const [weather, setWeather] = React.useState(null);
  const [unit, setUnit] = React.useState("C");

  React.useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coord);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  React.useEffect(() => {
    if (location.lat && location.long) {
      weatherApi(location).then(data => {
        setWeather(data);
      });
    }
  }, [location]);

  const toggleUnit = () => {
    if (unit === "C") {
      setUnit("F");
    } else {
      setUnit("C");
    }
  };

  

  if (error) {
    return <p>{error}</p>;
  } else if (weather) {
    const fahrenheit = Math.round((weather.main.temp * 9) / 5) + 32;
    const celsius = Math.round(weather.main.temp)
    return (
      <div className="weather-card">
        <p>{weather.name}</p>
        <p>
          {unit === "C" ? celsius : fahrenheit} {unit}
        </p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" />
        <p>{weather.weather[0].description}</p>
        <button className="switch-btn" onClick={toggleUnit}>Switch temperature</button>
        
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default App;
