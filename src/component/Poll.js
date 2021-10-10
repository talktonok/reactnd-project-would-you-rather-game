import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { colors } from '../utils/helpers';

class Poll extends Component {

  state = {
    viewPoll: false
  };
  clickHandler = e => {
    this.setState(previousState => ({
      viewPoll: !previousState.viewPoll
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const buttonContent = unanswered === true ? 'Answer Poll' : 'Results';
    const buttonColor = unanswered === true ? colors.green : colors.blue;
    

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment key={question.id}>
        <Header as="h5" textAlign="left">
          Would you rather
        </Header>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          color={buttonColor.name}
          size="tiny"
          fluid
          onClick={this.clickHandler}
          content={buttonContent}
        />
      </Fragment>
    );
  }
}

export default Poll;
