import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextBox from '../controls/textbox';
import { Button } from '../controls/button';

interface LoginComponentState {
  loginClick: Function,
  buttonText: any,
  loginBtnDisabled: boolean,
  usernameTextBoxVal: string,
  passwordTextBoxVal: string
};

export default class LoginComponent extends React.Component<{}, LoginComponentState> {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.loginClick = this.loginClick.bind(this);

    this.state = {
      loginClick: this.loginClick,
      buttonText: "Log In",
      loginBtnDisabled: null,
      usernameTextBoxVal: "",
      passwordTextBoxVal: ""
    };
  }

  loginClick() {
    let username: any;
    let password: string;

    username = document.getElementsByClassName('username')[0];

    this.setState({
      usernameTextBoxVal: username.value
    }, () => alert(`username: ${this.state.usernameTextBoxVal}`));
  }

  render() {
    return <div>
      <div>
        <TextBox type="text" className="username" />
      </div>
      <div>
        <TextBox type="password" className="password" />
      </div>
      <div>
        <Button buttonLabel={this.state.buttonText}
          buttonDisabled={this.state.loginBtnDisabled}
          buttonClick={this.state.loginClick}
          buttonValue={this.state.buttonText} />
      </div>
    </div>;
  }
};
