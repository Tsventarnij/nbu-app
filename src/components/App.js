import React, { Component } from 'react';
import {connect} from 'react-redux'
import Chart from './Chart';
import PickDate from './PickDate'
import {getCurrency, setCurrency} from "../actions/currencyAction";
import Select from 'react-select';
import { Navbar, Grid, Row, Col, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import {getNbuData, fillNbuData, startLoadingData} from '../actions/dataAction'
// import spinner from '../../public/spinner.gif'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: [],
            date: [],
            selected: []
        };
        // console.log(this.props.selected)
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    /**
     *
     *
     */
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate ->")
        console.log("nextProps", nextProps,"Props", this.props)
        console.log("nextState",nextState, "State",this.state)

        if ((this.props.selected.isLoading === 0) && nextProps.selected.isLoading) return true;

        if (this.props.selected.isLoading === 1 && nextProps.selected.isLoading===0){
            this.setState({
                date : this.props.date,
                selected : nextProps.selected.data
            });
        }

        if (nextProps.selected.isLoading) return false;

        return true;
    }
    // componentWillUpdate(nextProps){
    //     this.props.fillNbuData(this.props.data, this.props.date);
    // }

    componentDidMount() {
        // console.log("APP-componentDidMount")
        this.props.getCurrency();
        //this.props.setCurrency([{value:"USD"}]);
    }

	handleSelectChange (value) {
		// console.log('You\'ve selected:', value);
        if(!this.props.selected.isLoading) {
            this.setState({value});
            this.props.setCurrency(value);
        }
        // value.forEach(selected => {
        //     this.props.getNbuData(selected.value, this.props.date, this.props.data);
        // })

	}
    handleButtonClick(){
        // console.log("state", this.state);
        this.props.startLoadingData(this.props.selected.data.length*this.props.date.length);

        this.props.selected.data.forEach((selected, indexCode) => {
            this.props.date.forEach((date, indexDate) => {
                this.props.getNbuData(selected.label, date, indexCode, indexDate);
            })
        })

    }

  render() {

    //console.log("this.currency", this.state)
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Exchange rate from the National Bank of Ukraine</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row className="show-grid">
            <Col md={10} mdOffset={1}>
              <Row className="nav-grid">
                {/*<Col md={4}>*/}
                <Col>
                  <Select
                    multi
                    closeOnSelect={false}
                    onChange={this.handleSelectChange}
                    placeholder="Select currenc(s)"
                    value={this.state.value}
                    id="state-select"
                    ref="stateSelect"
                    options={this.props.currency}
                    name="selected-state" />
                </Col>
              </Row>
              <Row>
                <Col>

                  <PickDate />

                  <Button bsStyle="primary" onClick={this.handleButtonClick}>{this.props.selected.isLoading ? 'Loading...' : 'Render'}</Button>

                </Col>

              </Row>
                {/*<img src='spinner.gif' />*/}
                {/*{this.props.selected.isLoading ? <img src='spinner.gif' /> : ''}*/}
            <Chart date={this.state.date} selected={this.state.selected} loading={this.props.selected.isLoading}/>

            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

/* width: 50%; */


function mapStateToProps(state) {
//console.log("State - ", state)
    return {
        date: state.date,
        currency: state.currency,
        data: state.data,
        selected: state.selected

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrency: () => {
            dispatch(getCurrency());
        },
        setCurrency: (code) => {
            dispatch(setCurrency(code));
        },
        getNbuData: (code, date, indexCode, indexDate) =>{
            dispatch(getNbuData(code, date, indexCode, indexDate));
        },
        fillNbuData: (data, date) =>{
            dispatch(fillNbuData(data, date));
        },
        startLoadingData: (count) =>{
            dispatch(startLoadingData(count));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
