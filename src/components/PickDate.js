import React, { Component } from 'react';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import {setDate} from "../actions/dateAction";
import {fillNbuData} from "../actions/dataAction";
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css';
import {getNbuData} from '../actions/dataAction'

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
    componentWillUpdate(nextProps){
        // this.updateData(this.props.date);
    }

    componentDidUpdate(nextProps){
        // this.props.fillNbuData(this.props.data, this.props.date);
    }
// дубл из Chart
    getArrayDate(objDate){
        const startDate=objDate.startDate;
        const endDate= objDate.endDate;
        let contDate=[startDate.format("DD.MM.YYYY")];
        if(endDate.diff(startDate, "years")<2) {
            while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
                contDate.push(startDate.add(1, 'day').format("DD.MM.YYYY"))
            }
        }else{
            alert("Too long a gap between dates");
        }
        return contDate;
    }

    updateData(arrDate){

        this.props.selected.forEach(selected => {
            // console.log("updateData",selected.label, this.props.date, this.props.data)
            this.props.getNbuData(selected.label, arrDate, this.props.data);
        })
    }

    handleChangeStart(date) {
        // console.log("handleChangeStart->date",date)
        if(!this.props.selected.isLoading) {
            // let arrDate=[];
            if (date.format('X') > this.state.endDate.format('X')) {
                // console.log("date", date)
                this.setState({
                    startDate: this.state.endDate,
                    endDate: date
                });
                this.props.setDate({
                    startDate: this.state.endDate.format("DD.MM.YYYY"),
                    endDate: date.format("DD.MM.YYYY"),
                });
                // arrDate=this.getArrayDate({
                //     startDate: this.state.endDate,
                //     endDate: date
                // })
                // console.log("state.endDate", this.state.endDate)
            } else {
                // console.log("date", date)
                this.setState({
                    startDate: date
                });
                this.props.setDate({
                    startDate: date.format("DD.MM.YYYY"),
                    endDate: this.state.endDate.format("DD.MM.YYYY"),
                });
                // arrDate=this.getArrayDate({
                //     startDate: date,
                //     endDate: this.state.endDate
                // })
                // console.log("state.endDate", this.state.endDate)
            }
        }
        // console.log("handleChangeStart->updateData",this.props.selected, this.props.date, this.props.data)
        // this.updateData(arrDate);
    }

    handleChangeEnd(date) {
        let arrDate=[];
        if(!this.props.selected.isLoading) {
            if (date.format('X') < this.state.startDate.format('X')) {
                this.setState({
                    startDate: date,
                    endDate: this.state.startDate
                });
                this.props.setDate({
                    startDate: date.format("DD.MM.YYYY"),
                    endDate: this.state.startDate.format("DD.MM.YYYY"),
                });
                // arrDate=this.getArrayDate({
                //     startDate: date,
                //     endDate: this.state.startDate
                // });
            } else {
                this.setState({

                    endDate: date
                });
                this.props.setDate({
                    startDate: this.state.startDate.format("DD.MM.YYYY"),
                    endDate: date.format("DD.MM.YYYY"),
                });

                // arrDate=this.getArrayDate({
                //     startDate: this.state.startDate,
                //     endDate: date,
                // });
            }
        }
        // this.updateData(arrDate);
    }

    render() {
      return (
        <div>
              <span>
              <StyledBlock>
                <label>Start date</label>
              </StyledBlock>
            <StyledBlock>
                <DatePicker
                    className="picker"
                    selected={this.state.startDate}
                    maxDate={moment()}
                    dateFormat="DD.MM.YYYY"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}/>
              </StyledBlock>
              </span>
            <span>
            <StyledBlock>
            <label>End date</label>
            </StyledBlock>
            <StyledBlock>
                <DatePicker
                    className="picker"
                    selected = {this.state.endDate}
                    maxDate={moment()}
                    dateFormat="DD.MM.YYYY"
                    selectsEnd
                    startDate = {this.state.startDate}
                    endDate = {this.state.endDate}
                    onChange = {this.handleChangeEnd}/>
            </StyledBlock>
            </span>
        </div>
      )
    }
}

function mapStateToProps(state) {
    return {
        date: state.date,
        currency: state.currency,
        data: state.data,
        selected: state.selected

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: (object) => {
            dispatch(setDate(object));
        },
        fillNbuData: (object, date) => {
            dispatch(fillNbuData(object, date))
        },
        getNbuData: (data, date) =>{
            dispatch(getNbuData(data, date));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickDate)

const StyledBlock = styled.div`
   float: left;
   margin: 10px;
   .react-datepicker{
        font-size: 10px;
        font-family: sans-serif;
    }
   
`;
