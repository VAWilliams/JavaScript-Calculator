import React from 'react';
import { Component } from 'react';
import './App.css';

const BUTTONS = [
  {
    id: "clear",
    value: "AC",
    type: "operator"
  },{
    id: "divide",
    value: "/",
    type: "operator"
  },{
    id: "multiply",
    value: "X",
    type: "operator"
  },{
    id: "seven",
    value: "7",
    type: "number"
  },{
    id: "eight",
    value: "8",
    type: "number"
  },{
    id: "nine",
    value: "9",
    type: "number"
  },{
    id: "subtract",
    value: "-",
    type: "operator"
  },{
    id: "four",
    value: "4",
    type: "number"
  },{
    id: "five",
    value: "5",
    type: "number"
  },{
    id: "six",
    value: "6",
    type: "number"
  },{
    id: "add",
    value: "+",
    type: "operator"
  },{
    id: "one",
    value: "1",
    type: "number"
  },{
    id: "two",
    value: "2",
    type: "number"
  },{
    id: "three",
    value: "3",
    type: "number"
  },{
    id: "equals",
    value: "=",
    type: "operator"
  },{
    id: "zero",
    value: "0",
    type: "number"
  },{
    id: "decimal",
    value: ".",
    type: "number"
  }
];
const
      //doesStartWithZero = /^0/,
      doesEndWithOperator = /[*/+-]$/,
      isDecimal = /\d+\.\d+/, //isAbnormalDecimal = /\.\./,
      isOperator = /[*/+-]/;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleNumber   = this.handleNumber.bind(this);
    this.state = {
      currentValue: 0,
      expression: ""
    };
  }
  handleOperator(event) {
    let id    = event.target.getAttribute('id'),
        value = event.target.getAttribute('data-value');
    
    this.setState(state => {
        let { currentValue, expression } = state;
        switch(id) {
            case 'equals':
                let result = eval(expression);
                return {
                    currentValue: result,
                    expression: result
                };
            case 'clear':
                return {
                    currentValue: 0,
                    expression: 0
                };
            default:
              let newValue = null;
              if (!doesEndWithOperator.test(expression)) {
                  newValue = value;
              } else {
                  newValue = isOperator.test((currentValue === 0 ? "" : currentValue))
                             ? ((currentValue === 0 ? "" : currentValue)).replace(isOperator, value)
                             : (currentValue === 0 ? "" : currentValue) + value;
              }
              return {
                  currentValue: newValue,
                  expression: ((doesEndWithOperator.test((expression === 0 ? "" : expression)) && value !== '-') || /-$/.test(expression))
                              ? ((expression === 0 ? "" : expression)).replace(/[*/+-]+$/, value) 
                              : (expression === 0 ? "" : expression) + value
              }
        }
    });
  }
  handleNumber(event) {
    let value = event.target.getAttribute('data-value');
    
    this.setState(state => {
      let { currentValue, expression } = state;
      let newValue = null;
      if (doesEndWithOperator.test(expression)) {
        newValue = value;
      } else {
        newValue = (currentValue === 0 ? "" : currentValue) + value;
      }
      if (isDecimal.test(currentValue) && value === '.') return state;
      if (`${currentValue}`.endsWith('.') && value === '.') return state;
      
      return {
          currentValue: newValue,
          expression: (expression === 0 ? "" : expression) +
                      (currentValue === 0 && value === 0 ? 0 : value)
      }
      
    });
  }
  render() {
    let buttons = BUTTONS.map(button => {
      let { id, type, value } = button;
      return (
        <button
          id={id}
          onClick={type === "operator" ? this.handleOperator : this.handleNumber}
          data-type={type}
          data-value={value === 'X' ? '*' : value}
        >
          {value}
        </button>
      );
    });
    let { expression, currentValue } = this.state;
    return (
      <div id="calculator">
        <div id="screen">
          <div id="display">
            {expression}
          </div>
          <div>
            {currentValue}
          </div>
        </div>
        <div id="buttons">
          {buttons}
        </div>
      </div>
    );
  }
}

export default App;
