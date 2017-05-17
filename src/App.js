import React, { Component } from 'react';
import './App.css';

const CITIES = [
  { name: "Dnipro", id: "709930" },
  { name: "Kyiv", id: "703448" },
  { name: "Zaporizhzhya", id: "687700" },
  { name: "Lviv", id: "702550" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const cityId = this.props.city;
    const Url = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&appid=47d81b69e5d0ff07a91c9c6bd7ca311e&units=metric";
    fetch(Url).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°C</p>
        <p>High: {weatherData.main.temp_max}°C</p>
        <p>Low: {weatherData.main.temp_min}°C</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeCity: 0
    };
  }
  render() {
    const activeCity = this.state.activeCity;
    return (
      <div className="App">
        {CITIES.map((city, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({activeCity: index});
            }}
          >
            {city.name}
          </button>
        ))}
        <WeatherDisplay
          key={activeCity}
          city={CITIES[activeCity].id}
        />
      </div>
    );
  }
}

export default App;
