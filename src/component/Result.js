
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import VoteLabel from './VoteLabel';
import {
  Header,
  Segment,
  Progress,
  Button
} from 'semantic-ui-react';
import { styles } from '../utils/helpers';


export class Result extends Component {

  clickHandler = () => {
    const url = this.props
    url.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionAVotes = question.optionOne.votes.length;
    const optionBVotes = question.optionTwo.votes.length;
    const votesTotal = optionAVotes + optionBVotes;
    const userVote = user.answers[question.id];

    let optionA = styles.secondary,
      optionB = styles.secondary;
    if (optionAVotes > optionBVotes) {
      optionA = styles.primary;
    } else if (optionBVotes > optionAVotes) {
      optionB = styles.primary;
    }

    return (
      <Fragment key={question.id}>
        <Header as="h3">
          Results:
          <Header.Subheader style={{ fontWeight: 'bold' }}>
            Would you rather
          </Header.Subheader>
        </Header>
        <Segment
          color={optionA.color}
          style={{ backgroundColor: `${optionA.bgColor}` }}
        >
          {userVote === 'optionOne' && <VoteLabel />}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent={((optionAVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={optionA.color}
          >
            {optionAVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Segment
          color={optionB.color}
          style={{ backgroundColor: `${optionB.bgColor}` }}
        >
          {userVote === 'optionTwo' && <VoteLabel />}

          <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
          <Progress
            percent={((optionBVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={optionB.color}
          >
            {optionBVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Button size="tiny" floated="right" onClick={this.clickHandler}>
          Back
        </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Result));
