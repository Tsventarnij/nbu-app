import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class PickDate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment()
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date) {

        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({

            endDate: date
        });

    }

    render() {
        console.log(moment());
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    maxDate={moment()}
                    dateFormat="DD/MM/YYYY"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}/>

                <DatePicker
                    selected = {this.state.endDate}
                    maxDate={moment()}
                    dateFormat="DD/MM/YYYY"
                    selectsEnd
                    startDate = {this.state.startDate}
                    endDate = {this.state.endDate}
                    onChange = {this.handleChangeEnd}/>
            </div>
        )
    }
}

export default PickDate