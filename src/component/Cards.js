import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import Questions from './Questions';
import Result from './Result';
import Poll from './Poll';
import { colors } from '../utils/helpers';

const TypesOfPoll = {
  POLL: 'POLL',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const ContentOfPoll = props => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case TypesOfPoll.POLL:
      return <Poll question={question} unanswered={unanswered} />;
    case TypesOfPoll.QUESTION:
      return <Questions question={question} />;
    case TypesOfPoll.RESULT:
      return <Result question={question} />;
    default:
      return;
  }
};

export class Cards extends Component {
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null
    } = this.props;

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    const tabColor = unanswered === true ? colors.green : colors.blue;
    const borderTop =
      unanswered === null
        ? `1.5px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`;

    return (
      <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          style={{ borderTop: borderTop }}
        >
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <ContentOfPoll
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, questionID }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (questionID !== undefined) {
    question = questions[questionID];
    author = users[question.author];
    pollType = TypesOfPoll.POLL;
  } else {
    const { questionID } = match.params;
    question = questions[questionID];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = TypesOfPoll.QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = TypesOfPoll.RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  };
}

export default connect(mapStateToProps)(Cards);
