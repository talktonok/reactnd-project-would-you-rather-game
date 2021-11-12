import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import Card from './Cards';
import {mapHomeStateToProps} from './Map'

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



export default connect(mapHomeStateToProps)(Home);
