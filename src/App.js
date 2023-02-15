import React from 'react'
import { useState } from 'react';
let api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "48f1ba05fa469348a733fe9788660ad6"
}

const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const searchaction = async (e) => {
    if (e.key === "Enter") {
      const response = await fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      const result = await response.json()
      setWeather(result)
      setQuery("")
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main !== "undefined") ? (weather.main.temp - 273 < 17 ? "app" : "app-warm") : "app"}>
      <main>
        <div className="search-box">
          <input type="text"
            onKeyPress={searchaction} placeholder='search...' onChange={e => {
              setQuery(e.target.value)
            }} value={query} className="serachbar" />
        </div>{(typeof weather.main !== "undefined") ? (
          <>
            <div className="location-box">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date-box">
              <div>{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="weather-part">
                {Math.round(weather.main.temp - 273)}°c
              </div>
            </div></>) :('')}

      </main>
    </div>

  )
}

export default App