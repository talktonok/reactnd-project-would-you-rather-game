import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { saveQuestionHandler } from '../actions/index';

export class NewPoll extends Component {
  state = {
    validSubmit: false,
    isLoading: false,
    optionA: '',
    optionB: ''
  };

  submitHandler = e => {
    e.preventDefault();
    const { authUser, saveQuestionHandler } = this.props;
    const { optionA, optionB } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      saveQuestionHandler(optionA, optionB, authUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        optionA: '',
        optionB: ''
      });
      this.setState({ validSubmit: true });
    });
  };
  

  changeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  render() {
    const disabled = this.state.optionA === '' || this.state.optionB === '';

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Segment.Group>
        <Header as="h3" textAlign="left" block attached="top">
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form onSubmit={this.submitHandler}>
              <Form.Input
                id="optionA"
                placeholder="Enter option one..."
                value={this.state.optionA}
                onChange={this.changeHandler}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="optionB"
                placeholder="Enter option two..."
                value={this.state.optionB}
                onChange={this.changeHandler}
                required
              />
              <Form.Button positive size="tiny" fluid disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { saveQuestionHandler }
)(NewPoll);
