import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonPress } from '../actions/index';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevValue: '',
      waitingForOperand: true,
      displayValue: '0',
      operator: '',
    };
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (!waitingForOperand) {
      this.setState({ prevValue: displayValue, displayValue: String(digit), waitingForOperand: true });
    } else {
      this.setState({ displayValue: displayValue === '0' ? String(digit) : displayValue + digit });
    }
  }

  handleOperator(operatorInput) {
    const { prevValue } = this.state;

    this.setState({ waitingForOperand: false, operator: operatorInput });
    if (prevValue !== '') {
      this.performOperation();
    }
  }

  performOperation() {
    const { operator, prevValue, displayValue } = this.state;

    switch (operator) {
      case '+':
        this.add(prevValue, displayValue);
        break;
      default:
        break;
    }
    // waiting for digit input after operation
    this.setState({ waitingForOperand: false });
  }

  clear() {
    // reset all to original state
    this.setState({ prevValue: '', waitingForOperand: false, displayValue: '0', operator: '' });
  }

  equals() {
    const { operator } = this.state;

    if (operator !== '') {
      this.performOperation();
      // reset the previous value and operator on equals to start a new equation
      this.setState({ operator: '', prevValue: '' });
    }
  }

  add(prevNum, nextNum) {
    this.setState({ displayValue: String(Number(prevNum) + Number(nextNum)) });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div>
        <div>{displayValue}</div>
        <div>
          {console.log(this.state)}
          <button onClick={() => this.clear()}>C</button>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.handleOperator('+')}>+</button>
          <button onClick={() => this.equals()}>=</button>
        </div>
      </div>
    );
  }
}
