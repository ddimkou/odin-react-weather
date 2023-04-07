import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// const key = "d83aee15964e64ab31cbe1e531fae73c";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Athens");
  const [metric, setMetric] = useState("C");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d83aee15964e64ab31cbe1e531fae73c`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [location]);
  const search = (e) => {
    if (e.key === "Enter") {
      setLocation(e.target.value);
    }
  };
  const changeMetric = (e) => {
    setMetric(metric === "C" ? "F" : "C");
  };
  useEffect(() => {
    const weather = data.weather?.[0]?.main;

    const body = document.querySelector("body");
    body.classList.remove("clear", "snow", "rain", "clouds");

    if (weather === "Clear") {
      body.classList.add("clear");
    } else if (weather === "Snow") {
      body.classList.add("snow");
    } else if (weather === "Rain") {
      body.classList.add("rain");
    } else {
      body.classList.add("clouds");
    }
  }, [data]);
  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Enter your city..."
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={search}
            value={location}
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>{" "}
          </div>
          <button onClick={changeMetric}>°{metric}</button>
        </div>
        <div className="middle">
          <div className="temp">
            <h1>
              {metric === "C"
                ? `${Math.floor(data.main?.temp)}°C`
                : `${Math.floor(data.main?.temp * 1.8 + 32)}°F`}
            </h1>{" "}
          </div>
          <div className="description">
            <p>{data.weather?.[0]?.main}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="light">Feels Like</p>
            {/* <p className="bold">{Math.floor(data.main?.feels_like)}°C</p> */}
            <p className="bold">
              {metric === "C"
                ? `${Math.floor(data.main?.feels_like)}°C`
                : `${Math.floor(data.main?.feels_like * 1.8 + 32)}°F`}
            </p>
          </div>
          <div className="humidity">
            <p className="light">Humidity</p>
            <p className="bold">{data.main?.humidity}%</p>
          </div>
          <div className="wind">
            <p className="light">Wind Speed</p>
            <p className="bold">{data.wind?.speed} MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
