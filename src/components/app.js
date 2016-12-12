import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonPress } from '../actions/index';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputDigit: '',
      prevValue: 0,
      nextValue: '',
      displayValue: 0,
      operator: '',
    };
  }

  inputDigit(digit) {
    this.setState({ inputDigit: digit });
  }

  // handleOperator(operator) {
  //   const { displayValue } = this.state;
  //   if (displayValue !== '') {
  //     this.setState()
  //   }
  //
  // }

  add(prevNum, nextNum) {
    this.setState({ result: prevNum + nextNum });
  }

  render() {
    const { displayValue, prevValue, inputDigit } = this.state;
    return (
      <div>
        <div>{inputDigit}</div>
        <div>
          {console.log(this.state)}
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.handleOperator('+')}>+</button>
          <button onClick={() => this.handleOperator('=')}>=</button>
        </div>
      </div>
    );
  }
}
