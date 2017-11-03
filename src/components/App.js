import React, { Component } from 'react';
import Chart from './Chart';
import PickDate from './PickDate'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to NBU APP</h1>
        </header>
        <PickDate />
        <Chart/>
      </div>
    );
  }
}

export default App;
