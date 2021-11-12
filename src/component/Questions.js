import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Form, Radio } from 'semantic-ui-react';
import { saveQuestionsAnswerHandler } from '../actions/User';
import {mapAuthStateToProps} from './Map'

export class Questions extends Component {
  state = {
    value: ''
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authUser, question, saveQuestionsAnswerHandler } = this.props;
      saveQuestionsAnswerHandler(authUser, question.id, this.state.value);
    }
  };

  changeHandler = (e, { value }) => this.setState({ value: value });

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment key={question.id}>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.submitHandler}>
          <Form.Field>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === 'optionOne'}
              onChange={this.changeHandler}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === 'optionTwo'}
              onChange={this.changeHandler}
            />
          </Form.Field>
          <Form.Field>
            <Button
              color="green"
              size="tiny"
              fluid
              positive
              disabled={disabled}
              content="Submit"
            />
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}



export default connect(
  mapAuthStateToProps,
  { saveQuestionsAnswerHandler }
)(Questions);
