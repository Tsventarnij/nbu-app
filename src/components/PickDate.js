import React, { Component } from 'react';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {setDate} from "../actions/dateAction";

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
        setDate({
            startDate: this.state.startDate.format("DD.MM.YYYY"),
            endDate: this.state.startDate.format("DD.MM.YYYY"),
        });

    }

    handleChangeEnd(date) {
        this.setState({

            endDate: date
        });
        setDate({
            startDate: this.state.startDate.format("DD.MM.YYYY"),
            endDate: this.state.startDate.format("DD.MM.YYYY"),
        });
    }

    render() {
        console.log("Date - ",Date());
        console.log("this - ",this.state.startDate.format("DD.MM.YYYY"));
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
