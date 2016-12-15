import React from 'react';

const CalculatorButton = (props) => (
  <div>
    <button onClick={() => props.handleClick()}>{props.button}</button>
  </div>
);

export default CalculatorButton;
