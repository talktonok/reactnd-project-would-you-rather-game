import React, { Component } from 'react';
import { Header, Form } from 'semantic-ui-react';
import { setUserAuth } from '../../actions/AuthUsers';
import { connect } from 'react-redux';
import {mapUsersStateToProps} from '../Map'

class LoginForm extends Component {
    state = {
        value: ''
      };
    
      onChange = (e, { value }) => {
        this.setState({ value });
      };
    
      dropDownDataGenerator = () => {
        const { users } = this.props;
    
        return users.map(u => ({
          key: u.id,
          text: u.name,
          value: u.id,
          image: { avatar: true, src: u.avatarURL }
        }));
      };
    
      submitHandler = e => {
        e.preventDefault();
        const { onLoading, setUserAuth } = this.props;
        const authUser = this.state.value;
    
        new Promise((res, rej) => {
          onLoading();
          setTimeout(() => res(), 500);
        }).then(() => setUserAuth(authUser));
      };
  
    render() {
        const { value } = this.state;
    const disabled = value === '' ? true : false;  
  
      return (
        <Form onSubmit={this.submitHandler}>
          <Header as="h2" color="green">
            Sign In
          </Header>
          <Form.Dropdown
            placeholder="Select a Friend"
            fluid
            selection
            scrolling
            options={this.dropDownDataGenerator()}
            value={value}
            onChange={this.onChange}
            required
          />
          <Form.Button content="Login" positive disabled={disabled} fluid />
        </Form>
      );
    }
  }

  export default connect(
    mapUsersStateToProps,
    { setUserAuth }
  )(LoginForm);