import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component {


    render() {

        const data = {
            labels: ["01.05.2017", "02.05.2017"], //this.props.label,
            datasets: [
                {
                    label: 'Temp of all cities',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 5,
                    data: [25, 26]//this.props.data
                }
            ]
        };

        return (
            <div>
                <Line  data={data} />
            </div>
        )
    }
}

export default Chart
