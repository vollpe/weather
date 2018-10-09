import React, {Component} from "react";

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            weatherData: []
        }
    }

    loadCityWeather() {
        if (!this.props.city) {
            return null;
        }
        let cityName = this.props.city;
        if (!this.getLoadedCityWeather()) {
            fetch("/json/" + cityName + ".json")
                .then(response => response.text())
                .then(text => {
                    let json = null;
                    try {
                        json = JSON.parse(text);
                        this.setState({error: null});
                        this.setState(prevState => ({
                            weatherData: [...prevState.weatherData, {[this.props.city]: json}]
                        }));
                    } catch (error) {
                        this.setState({error: `There is no data for ${cityName}`});
                    }
                })
        }
    }

    getLoadedCityWeather() {
        return this.state.weatherData.find(e => e.hasOwnProperty(this.props.city));
    }

    render() {
        function addZero(minutes) {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes;
        }
        let content = <div className="weather-nocity"><p>Please search your city</p></div>;
        if (this.props.city && this.state.error && this.state.error.includes(this.props.city)) {
            content = <div className="weather-error">Oops! {this.state.error}</div>;
        } else if (!this.getLoadedCityWeather()) {
            this.loadCityWeather();
        } else {
            let cityWeather = this.getLoadedCityWeather()[this.props.city];
            if (cityWeather) {
                let now = new Date();
                let todayDate = now.toLocaleString("en-us", {month: 'long'}) + ' ' + now.getDate() + ', ' + now.getHours() + ':' + addZero(now.getMinutes());
                let weatherIconClass = "weather-icon weather-icon-" + cityWeather.weather[0].icon;
                content = <div className="weather-data">
                    <div className="weather-today_date">{todayDate}</div>
                    <div className="weather-day_night">
                        <p className="weather-text">Day {(cityWeather.main.temp_max - 273.15).toFixed(0)} &deg;&uarr; &bull;
                            Night {(cityWeather.main.temp_min - 273.15).toFixed(0)} &deg;&darr;</p>
                    </div>
                    <div className="wrapper">
                        <div className="weather-current_temperature">
                            <h1 className="weather-current-temperature-h1">{(cityWeather.main.temp - 273.15).toFixed(0)}</h1>
                            <h2 className="weather-current-temperature-h2">&deg;C</h2>
                        </div>
                        <div className={weatherIconClass}/>
                    </div>
                    <div className="wrapper">
                        <div className="weather-humidity">
                            <p className="weather-text">Humidity {cityWeather.main.humidity}%</p>
                        </div>
                        <div className="weather-description">
                            <p className="weather-text">{cityWeather.weather[0].description}</p>
                        </div>
                    </div>
                </div>
            }
        }
        return <section className="weather">
            {content}
        </section>
    }
}

export {Weather}