import React, { Component } from 'react';
import {connect} from 'react-redux'
import Chart from './Chart';
import PickDate from './PickDate'
import {getCurrency} from "../actions/currencyAction";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends Component {

    componentDidMount() {
        //console.log("componentDidMount")
        this.props.getCurrency();
    }

    updateValue (arrCode) {


    }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to NBU APP</h1>
        </header>
          <Select
              id="state-select"
              ref="stateSelect"
              // options={arr}
              name="selected-state"
              onChange={this.updateValue}

          />
        <PickDate />
        <Chart/>
      </div>
    );
  }
}

function mapStateToProps(state) {
//console.log("State - ", state)
    return {
        currency: state.currency,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrency: () => {
            dispatch(getCurrency());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

