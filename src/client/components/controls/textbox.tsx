import * as React from 'react';

interface TextBoxProps {
  text: string;
};

export default class TextBox extends React.Component<TextBoxProps, {}> {
  render() {
    return <input type="text" />;
  }
};