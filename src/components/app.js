import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonPress } from '../actions/index';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevValue: '',
      waitingForOperand: false,
      displayValue: '0',
      operator: '',
    };
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({ displayValue: String(digit), waitingForOperand: false });
    } else {
      this.setState({ displayValue: displayValue === '0' ? String(digit) : displayValue + digit });
    }
  }

  handleOperator(operator) {
    const { displayValue, prevValue } = this.state;

    this.setState({ waitingForOperand: true });

    if (prevValue === 0) {
      this.setState({ operator, prevValue: displayValue });
    } else {
      switch (operator) {
        case '+':
          this.add(prevValue, displayValue);
          break;
        default:
          this.setState({ displayValue: '' });
      }
    }
  }

  add(prevNum, nextNum) {
    this.setState({ displayValue: prevNum + nextNum });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div>
        <div>{displayValue}</div>
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
