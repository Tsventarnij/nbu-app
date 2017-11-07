import React, { Component } from 'react';
import {connect} from 'react-redux'
import Chart from './Chart';
import PickDate from './PickDate'
import {getCurrency, setCurrency} from "../actions/currencyAction";
import Select from 'react-select';
import { Navbar, Grid, Row, Col, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import moment from 'moment';

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: ["USD"],
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        console.log("APP-componentDidMount")
        this.props.getCurrency();
        this.props.setCurrency([{value:"USD"}]);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('t',this.props)
    //     console.log('n',nextProps)
    //
    // }

	handleSelectChange (value) {
		//console.log('You\'ve selected:', value);
		this.setState({ value });
        this.props.setCurrency(value);

	}





  render() {
      this.props.currency.sort(function (a, b) {
          if (a.label > b.label) {
              return 1;
          }
          if (a.label < b.label) {
              return -1;
          }
          // a должно быть равным b
          return 0;
      });
    //console.log("this.currency", this.state)
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">NBU APP</a>
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

                </Col>
                <Col>




                </Col>
              </Row>

            <Chart/>

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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
