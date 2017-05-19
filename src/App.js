import React, { Component } from 'react'
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap'

const CITIES = [
  { name: 'Dnipro', id: '709930' },
  { name: 'Kyiv', id: '703448' },
  { name: 'Zaporizhzhya', id: '687700' },
  { name: 'Lviv', id: '702550' }
]

class WeatherDisplay extends Component {
  constructor () {
    super()
    this.state = {
      weatherData: null
    }
  }
  componentDidMount () {
    const cityId = this.props.city
    const Url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=47d81b69e5d0ff07a91c9c6bd7ca311e&units=metric'
    fetch(Url).then(res => res.json()).then(json => {
      this.setState({ weatherData: json })
    })
  }
  render () {
    const weatherData = this.state.weatherData
    if (!weatherData) return <div>Loading...</div>
    const weather = weatherData.weather[0]
    const iconUrl = 'https://openweathermap.org/img/w/' + weather.icon + '.png'
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
    )
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      activeCity: 0
    }
  }
  render () {
    const activeCity = this.state.activeCity
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle='pills'
                stacked
                activeKey={activeCity}
                onSelect={index => {
                  this.setState({ activeCity: index })
                }}
              >
                {CITIES.map((city, index) => (
                  <NavItem key={index} eventKey={index}>{city.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activeCity} city={CITIES[activeCity].id} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
