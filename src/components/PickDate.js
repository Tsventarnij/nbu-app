import React, { Component } from 'react';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import {setDate} from "../actions/dateAction";
import styled from 'styled-components'
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
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleChangeStart(date) {
        if(date.format('X')>this.state.endDate.format('X')){
            this.setState({
                startDate: this.state.endDate,
                endDate: date
            });
            this.props.setDate({
                startDate: this.state.endDate.format("DD.MM.YYYY"),
                endDate: date.format("DD.MM.YYYY"),
            });
        }else {
            this.setState({
                startDate: date
            });
            this.props.setDate({
                startDate: date.format("DD.MM.YYYY"),
                endDate: this.state.endDate.format("DD.MM.YYYY"),
            });
        }
    }

    handleChangeEnd(date) {
        if(date.format('X')<this.state.startDate.format('X')){
            this.setState({
                startDate: date,
                endDate: this.state.startDate
            });
            this.props.setDate({
                startDate: date.format("DD.MM.YYYY"),
                endDate: this.state.startDate.format("DD.MM.YYYY"),
            });
        }else {
            this.setState({

                endDate: date
            });
            this.props.setDate({
                startDate: this.state.startDate.format("DD.MM.YYYY"),
                endDate: date.format("DD.MM.YYYY"),
            });
        }
    }

    getArrayDate(format){

        const startDate=moment(this.props.date.startDate, "DD.MM.YYYY");
        const endDate= moment(this.props.date.endDate, "DD.MM.YYYY");
        let contDate=[startDate.format(format)];
        if(endDate.diff(startDate, "years")<2) {
            while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
                contDate.push(startDate.add(1, 'day').format(format))
            }
        }else{
            alert("Too long a gap between dates");
        }
        return contDate;
    }

    handleButtonClick(){
        console.log('APP')
        const arrDate = this.getArrayDate("DD.MM.YYYY");
        console.log("1props", this.props, "state", this.state)
        //массив данных по курсу
        let propsData =this.props.data
        let isData=false;
        let oldData=0;

        this.props.selected.forEach((currenc,index)=>{
            isData=false;
            this.props.selected[index].data=[];
            arrDate.forEach(date => {

                propsData.some(item => {
                    if (date === item.exchangedate&&currenc.label===item.cc) {
                        this.props.selected[index].data.push(item.rate)
                        // cursData.push(item.rate)
                        oldData=item.rate;
                        isData=true;
                        return true;
                    }
                    return false;
                })
                if(!isData){
                    // cursData.push(oldData)
                    this.props.selected[index].data.push(oldData)
                }
            })
        })

        console.log("2props", this.props, "state", this.state)
            // this.setState();
        // this.forceUpdate();
    }
    render() {
      return (
        <div>
          {/*<Table responsive>*/}
            {/*<tbody>*/}
              {/*<tr><td>*/}
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
                {/*</td><td>*/}
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
              <StyledBlock>
                <Button bsStyle="primary" onClick={this.handleButtonClick}>Render</Button>
              </StyledBlock>
            </span>
                {/*</td>*/}
              {/*</tr>*/}
            {/*</tbody>*/}
          {/*</Table>*/}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickDate)

const StyledBlock = styled.div`
   float: left;
   margin: 10px;
   
   
`;
