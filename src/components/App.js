import React, { Component } from 'react';
import {connect} from 'react-redux'
import Chart from './Chart';
import PickDate from './PickDate'
import {getCurrency, setCurrency} from "../actions/currencyAction";
import Select from 'react-select';
import { Navbar, Grid, Row, Col, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import {getNbuData, fillNbuData, startLoadingData} from '../actions/dataAction'
import styled from 'styled-components'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: [],
            date: [],
            selected: [],
            loadEnded: false
        };
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

        if ((this.props.selected.isLoading === 0) && nextProps.selected.isLoading){
            this.setState({
                loadEnded: false,
            });
            return true;
        }

        if (this.props.selected.isLoading === 1 && nextProps.selected.isLoading === 0){
            this.setState({
                loadEnded: true,
                date : this.props.date,
                selected : nextProps.selected.data
            });
        }

        if (nextProps.selected.isLoading) return false;

        return true;
    }

    componentDidMount() {
        this.props.getCurrency();
    }

	handleSelectChange (value) {
        if(!this.props.selected.isLoading) {
            this.setState({value});
            this.props.setCurrency(value);
        }
	}

    handleButtonClick(){
        this.props.startLoadingData(this.props.selected.data.length*this.props.date.length);

        this.props.selected.data.forEach((selected, indexCode) => {
            this.props.date.forEach((date, indexDate) => {
                this.props.getNbuData(selected.label, date, indexCode, indexDate);
            })
        })
    }

  render() {
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
                <Col>

                    <Select
                    multi
                    closeOnSelect={false}
                    onChange={this.handleSelectChange}
                    placeholder="Select currency(s)"
                    value={this.state.value}
                    id="state-select"
                    ref="stateSelect"
                    options={this.props.currency}
                    name="selected-state" />

                </Col>
              </Row>
              <Row>
                <Col>
                  <ButtonStyle>

                      <PickDate />
                      <Button bsStyle="primary" onClick={this.handleButtonClick}>{this.props.selected.isLoading ? 'Loading...' : 'Render'}</Button>

                  </ButtonStyle>
                </Col>
              </Row>

            <Chart date={this.state.date} selected={this.state.selected} loading={this.props.selected.isLoading} loadEnded={this.state.loadEnded}/>

            </Col>
          </Row>
        </Grid>

      </div>
    );
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

const ButtonStyle = styled.div`
    margin:10px
`
