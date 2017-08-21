import * as React from 'react';

interface ButtonProps {
  buttonDisabled: boolean,
  buttonClick: any,
  buttonLabel: any,
  buttonValue: any
};

export class Button extends React.Component<ButtonProps, {}> {
  render() {
    return <div>
      <button disabled={this.props.buttonDisabled} value={this.props.buttonValue} onClick={this.props.buttonClick}>
        {this.props.buttonLabel}
      </button>
    </div>;
  }
};