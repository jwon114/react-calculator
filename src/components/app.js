import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonPress } from '../actions/index';
import Style from '../../style/style.css';
import CalculatorButton from './CalculatorButton/CalculatorButton';

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
        this.setState({ displayValue: String(Number(prevValue) + Number(displayValue)) });
        break;
      case '-':
        this.setState({ displayValue: String(Number(prevValue) - Number(displayValue)) });
        break;
      case '*':
        this.setState({ displayValue: String(Number(prevValue) * Number(displayValue)) });
        break;
      case '/':
        this.setState({ displayValue: String(Number(prevValue) / Number(displayValue)) });
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
            <CalculatorButton handleClick={() => this.inputDigit(0)} button={0} />
            <CalculatorButton handleClick={() => this.inputDigit(1)} button={1} />
            <CalculatorButton handleClick={() => this.inputDigit(2)} button={2} />
            <CalculatorButton handleClick={() => this.inputDigit(3)} button={3} />
            <CalculatorButton handleClick={() => this.inputDigit(4)} button={4} />
            <CalculatorButton handleClick={() => this.inputDigit(5)} button={5} />
            <CalculatorButton handleClick={() => this.inputDigit(6)} button={6} />
            <CalculatorButton handleClick={() => this.inputDigit(7)} button={7} />
            <CalculatorButton handleClick={() => this.inputDigit(8)} button={8} />
            <CalculatorButton handleClick={() => this.inputDigit(9)} button={9} />
          </div>
          <div className={Style.operators}>
            <button onClick={() => this.handleOperator('+')}>+</button>
            <button onClick={() => this.handleOperator('-')}>-</button>
            <button onClick={() => this.handleOperator('*')}>*</button>
            <button onClick={() => this.handleOperator('/')}>/</button>
            <button onClick={() => this.equals()}>=</button>
          </div>
        </div>
      </div>
    );
  }
}
