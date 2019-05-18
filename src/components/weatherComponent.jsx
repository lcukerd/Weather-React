import React, { Component } from 'react';
import { getForecast } from './../API'

// This component will show all forecast data
class Weather extends Component {

    // Get forecast data on Component initialise
    constructor(props) {
        super(props);
        this.getWeather();
    }

    state = {
        temp: "Loading...",
        perp: "Loading...",
        hum: "Loading..."
    }
    render() {
        return (<div>
            <p>Temperature for next 4 days:</p>
            <span>{this.state.temp}</span>
            <div>Precipitation: {this.state.perp}</div>
            <div>Humidity: {this.state.hum}</div>
        </div>);
    }

    // This funtion will be called when props or state is changed
    // Handle next request for forecast here
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.value);

        if (prevProps.value != this.props.value) {
            this.getWeather();
        }
    }

    getWeather = () => {
        getForecast(this.props.value, this.handleWeather);
    }

    // Callback function when forecast is recieved
    handleWeather = (data) => {

        // Handle error
        if (typeof data == "number") {
            alert("Error: Response code: " + data)
            window.location.reload();
        }
        console.log(data);
        let ttemp = "";
        data.forecast.forecastday.forEach((value) => {
            ttemp += value.date + " : " + value.day.avgtemp_c + "C \n ";
        });
        ttemp = ttemp.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        this.setState({
            perp: data.current.precip_in + " inches",
            hum: data.current.humidity + "%",
            temp: ttemp
        });
    }
}

export default Weather;