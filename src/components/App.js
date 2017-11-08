import React, { Component } from 'react';
import {connect} from 'react-redux'
import Chart from './Chart';
import PickDate from './PickDate'
import {getCurrency, setCurrency} from "../actions/currencyAction";
import Select from 'react-select';
import { Navbar, Grid, Row, Col, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import {getNbuData, fillNbuData} from '../actions/dataAction'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: ["USD"],
            date: [],
            selected: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

    }
    componentWillUpdate(nextProps){
        this.props.fillNbuData(this.props.data, this.props.date);
    }

    componentDidMount() {
        console.log("APP-componentDidMount")
        this.props.getCurrency();
        this.props.setCurrency([{value:"USD"}]);
    }

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
        this.props.setCurrency(value);
        value.forEach(selected => {
            this.props.getNbuData(selected.value, this.props.date, this.props.data);
        })

	}
    handleButtonClick(){
        console.log("state", this.state);

        this.setState({
            date : this.props.date,
            selected : this.props.selected
        });
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

                  <Button bsStyle="primary" onClick={this.handleButtonClick}>Render</Button>

                </Col>

              </Row>

            <Chart date={this.state.date} selected={this.state.selected}/>

            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

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
        getNbuData: (code, date, data) =>{
            dispatch(getNbuData(code, date, data));
        },
        fillNbuData: (data, date) =>{
            dispatch(fillNbuData(data, date));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
