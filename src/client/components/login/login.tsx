import * as React from 'react';
import TextBox from '../controls/textbox';
import { Button } from '../controls/button';

interface LoginComponentState {
  loginClick: Function,
  buttonText: any,
  loginBtnDisabled: boolean
};

export default class LoginComponent extends React.Component<{}, LoginComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      loginClick: null,
      buttonText: "Hit me !",
      loginBtnDisabled: null
    };

    // This binding is necessary to make `this` work in the callback
    this.loginClick = this.loginClick.bind(this);
  }

  loginClick() {
    console.log('Clicked');

    this.setState({
      buttonText: 'Jello'
    })
  }

  render() {
    return <div>
      <Button buttonLabel={this.state.buttonText} 
              buttonDisabled={this.state.loginBtnDisabled} 
              buttonClick={this.state.loginClick} 
              buttonValue={this.state.buttonText} />
    </div>;
  }
};
