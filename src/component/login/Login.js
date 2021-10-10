import React, { Component, Fragment } from 'react';
import LoginHeader from './LoginHeader';
import LoginLayout from './LoginLayout';
import Logo from '../Logo';
import { Segment } from 'semantic-ui-react';
import Log from './LoginForm';


export class Login extends Component {
  state = {
    loading: false,
  }

  loadingHandler = () => {
    this.setState({ loading: true });
  };
  
  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginLayout
            image={<Logo />}
            form={<Log onLoading={this.loadingHandler}/>}
            loading={this.state.loading}
          />
        </Segment.Group>
        <footer className="footer">
          <a href="https://www.freepik.com/free-photos-vectors/design">
            Avatar characters created by freepik - www.freepik.com
          </a>
        </footer>
      </Fragment>
    );
  }
}
export default Login;
