import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react'
import { getHistory } from './../API'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPointsTemp = [];
var dataPointsPer = [];
var dataPointsHum = [];
var chart = {};

// This components shows all 3 graphs
class Graph extends Component {

    // Get history data on Initialise
    constructor(props) {
        super(props);
        getHistory(this.props.value, this.handleData);
    }

    state = {
    }

    render() {
        return (
            <div>
                <CanvasJSChart options={this.state.optionsTemp}
                    onRef={ref => chart.chartTemp = ref}
                />
                <CanvasJSChart options={this.state.optionsPer}
                    onRef={ref => chart.chartPer = ref}
                />
                <CanvasJSChart options={this.state.optionsHum}
                    onRef={ref => chart.chartHum = ref}
                />
            </div>
        );
    }

    // This funtion will be called when props or state is changed
    // Handle next request for history here
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.value);

        if (prevState !== this.state) {
            chart.chartTemp.render();
            chart.chartPer.render();
            chart.chartHum.render();
        }

        if (prevProps.value !== this.props.value) {
            dataPointsHum = [];
            dataPointsPer = [];
            dataPointsTemp = [];
            getHistory(this.props.value, this.handleData);
        }
    }

    // Callback function when history data is recieved
    handleData = (data, i) => {

        const forecast = data.forecast.forecastday[0];

        dataPointsTemp.push({
            x: new Date(forecast.date),
            y: forecast.day.avgtemp_c
        });

        dataPointsPer.push({
            x: new Date(forecast.date),
            y: forecast.day.totalprecip_in
        });

        dataPointsHum.push({
            x: new Date(forecast.date),
            y: forecast.day.avghumidity
        });

        console.log(dataPointsTemp.length);

        if (dataPointsTemp.length == 7) {
            dataPointsTemp.sort(this.compareDate);
            dataPointsPer.sort(this.compareDate);
            dataPointsHum.sort(this.compareDate);

            this.updateState();
        }
    }

    // Update datapoints of graph
    updateState = () => {
        this.setState({
            optionsTemp: {
                theme: "light2",
                title: {
                    text: "Last 7 days Temperature"
                },
                axisY: {
                    title: "Temperature",
                    includeZero: false
                },
                data: [{
                    type: "line",
                    yValueFormatString: "## C",
                    dataPoints: dataPointsTemp
                }]
            },
            optionsPer: {
                theme: "light2",
                title: {
                    text: "Last 7 days Precipitation"
                },
                axisY: {
                    title: "Precipitation",
                    includeZero: false
                },
                data: [{
                    type: "line",
                    yValueFormatString: "#,##0.00 in",
                    dataPoints: dataPointsPer
                }]
            },
            optionsHum: {
                theme: "light2",
                title: {
                    text: "Last 7 days Humidity"
                },
                axisY: {
                    title: "Humidity",
                    includeZero: false
                },
                data: [{
                    type: "line",
                    yValueFormatString: "# '%'",
                    dataPoints: dataPointsHum
                }]
            }
        })
    }

    // Sort Datapoints based on Weather date
    compareDate = (a, b) => {
        return a.x.getTime() - b.x.getTime();
    }
}

export default Graph;