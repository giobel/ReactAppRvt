import React, { Component } from 'react';
import { defaults } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import _ from 'lodash';

defaults.global.defaultFontFamily = 'CircularStd'

class UsageHBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.datasets.label,
                        backgroundColor: this.props.datasets.colour,
                        borderColor: 'rgba(128,128,128,0.8)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(255,128,0,0.6)',
                        hoverBorderColor: 'rgba(128,128,128,1)',
                        data: this.props.datasets.number
                    }
                ]
            },
            
        }
    }

    static defaultProps = {
        // You can override these props if you set them from the App
        displayTitle: false,
        displayLegend: true,
        legendPosition: 'bottom',
        fontSize: 20,
        height: window.innerHeight * 0.85,
    }

    render() {
        return (
            <div className="chart">
                <HorizontalBar
                    data={this.state.chartData}
                    width={this.props.width}
                    height={this.props.height}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: this.props.displayTitle,
                            text: 'How many times has the toolbox been used?',
                            fontSize: this.props.fontSize
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                    suggestedMax: this.props.datasets.length,
                                }
                            }],
                            yAxes: [{
                                barPercentage: 0.5
                            }]
                        },
                        animation: {
                            easing: 'easeOutCubic'
                        },
                        layout: {
                            padding: {
                                left: 10,
                                right: 25,
                                top: 0,
                                bottom: 10
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default UsageHBarGraph;
