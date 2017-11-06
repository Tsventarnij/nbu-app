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
        this.props.setDate({
            startDate: date.format("DD.MM.YYYY"),
            endDate: this.state.endDate.format("DD.MM.YYYY"),
        });

    }

    handleChangeEnd(date) {
        this.setState({

            endDate: date
        });
        this.props.setDate({
            startDate: this.state.startDate.format("DD.MM.YYYY"),
            endDate: date.format("DD.MM.YYYY"),
        });

    }

    render() {

        return (
            <div>
                Start date<DatePicker
                    selected={this.state.startDate}
                    maxDate={moment()}
                    dateFormat="DD.MM.YYYY"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}/>

                End date<DatePicker
                    selected = {this.state.endDate}
                    maxDate={moment()}
                    dateFormat="DD.MM.YYYY"
                    selectsEnd
                    startDate = {this.state.startDate}
                    endDate = {this.state.endDate}
                    onChange = {this.handleChangeEnd}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        date: state.date,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: (object) => {
            dispatch(setDate(object));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickDate)

