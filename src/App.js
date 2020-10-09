import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './components/weather';
import  City from './components/weathercity';
   
//fetch the data from this api call(need to call this link for current data)
const Api_key = '<your api>';


class App extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       city: undefined,
       country: undefined,
       icon: undefined,
       main: undefined,
       celsius: undefined,
       temp_max: undefined,
       temp_min: undefined,
       description: "",
       error: false
     };

     this.weatherIcon = {
       Thunderstorm: "wi-thunderstorm",
       Drizzle: "wi-sleet",
       Rain: "wi-storm-showers",
       Snow: "wi-snow",
       Atmosphere: "wi-fog",
       Clear: "wi-day-sunny",
       Clouds: "wi-day-fog"
     };
   }

//convert kelvin to celsius
 calCelsius(temp) {
   let cell = Math.floor(temp - 273.15);
   return cell;
 }

 getWeatherIcon(icons, rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;  
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
          this.setState({icon: this.weatherIcon.Clouds});
      }
 }


//fetch data from api call link
getWeather = async(e) => {
  
  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  if(city && country) {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`);

    const response = await api_call.json(); //convert all data in json format
    console.log(response);
  
    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      error: false
    });
  
    // access the weatehr index and its property to get weather from id
     this.getWeatherIcon(this.weatherIcon, response.weather[0].id); 
  } else {
    this.setState({error: true});
  }
 
};

  render() {
    return (
      <div className="App">
      <City loadweather={this.getWeather} error={this.state.error} />
      <Weather city={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celsius} 
      temp_max={this.state.temp_max} 
      temp_min={this.state.temp_min} 
      description={this.state.description} 
      weatherIcon={this.state.icon}
      />

    </div>
    );
  }
}

export default App;
