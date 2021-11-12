import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import Questions from './Questions';
import Result from './Result';
import Poll from './Poll';
import { colors } from '../utils/helpers';
import {TypesOfPoll, mapCardStateToProps} from './Map'



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

export default connect(mapCardStateToProps)(Cards);
