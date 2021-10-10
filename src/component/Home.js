import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import Card from './Cards';

export class Home extends Component {

  render() {
    const { userQuestionData } = this.props;

    return <Tab panes={tabPanes({ userQuestionData })} className="tab" />;
  }
}

const tabPanes = props => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map(ques => (
            <Card
              key={ques.id}
              questionID={ques.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map(ques => (
            <Card
              key={ques.id}
              questionID={ques.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authUser, users, questions }) {
  const answeredIDs = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter(ques => !answeredIDs.includes(ques.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(ques => answeredIDs.includes(ques.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);
