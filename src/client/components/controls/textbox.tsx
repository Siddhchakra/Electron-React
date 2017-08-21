import * as React from 'react';

interface TextBoxProps {
  type: string,
  className: string
};

export default class TextBox extends React.Component<TextBoxProps, {}> {
  render() {
    return <input type={this.props.type} className={this.props.className}/>;
  }
};