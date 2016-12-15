import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonPress } from '../actions/index';
import Style from '../../style/style.css';

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

    if (!waitingForOperand) {
      this.setState({ prevValue: displayValue, displayValue: String(digit), waitingForOperand: true });
    } else {
      this.setState({ displayValue: displayValue === '0' ? String(digit) : displayValue + digit });
    }
  }

  handleOperator(operatorInput) {
    const { prevValue } = this.state;

    this.setState({ operator: operatorInput });
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
    // waiting for digit input after operation, clear the previous value
    this.setState({ prevValue: '', waitingForOperand: false });
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
      this.setState({ operator: '' });
    }
  }

  add(prevNum, nextNum) {
    this.setState({ displayValue: String(Number(prevNum) + Number(nextNum)) });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div className={Style.calculator}>
        <div className={Style.display}>{displayValue}</div>
        <div className={Style.keypad}>
          {console.log(this.state)}
          <div className={Style.functionKeys}>
            <button onClick={() => this.clear()}>C</button>
          </div>
          <div className={Style.digitKeys}>
            <button onClick={() => this.inputDigit(1)}>1</button>
            <button onClick={() => this.inputDigit(2)}>2</button>
            <button onClick={() => this.inputDigit(3)}>3</button>
            <button onClick={() => this.inputDigit(4)}>4</button>
            <button onClick={() => this.inputDigit(5)}>5</button>
            <button onClick={() => this.inputDigit(6)}>6</button>
            <button onClick={() => this.inputDigit(7)}>7</button>
            <button onClick={() => this.inputDigit(8)}>8</button>
            <button onClick={() => this.inputDigit(9)}>9</button>
            <button onClick={() => this.inputDigit(0)}>0</button>
          </div>
          <div className={Style.operators}>
            <button onClick={() => this.handleOperator('+')}>+</button>
            <button onClick={() => this.equals()}>=</button>
          </div>
        </div>
      </div>
    );
  }
}
