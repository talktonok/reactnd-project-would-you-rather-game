
export function mazaje({ users }) {
    const board = Object.values(users)
      .map(u => ({
        id: u.id,
        name: u.name,
        avatarURL: u.avatarURL,
        answerCount: Object.values(u.answers).length,
        questionCount: u.questions.length,
        total: Object.values(u.answers).length + u.questions.length
      }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3);
    return {
      board
    }
};

export function mapAuthStateToProps({ authUser }) {
    return {
      authUser
    }
};

export function mapAuthUserStateToProps({ users, authUser }) {
    const user = users[authUser];
    return {
      user,
      authUser,
      users
    }
  };

  export function mapUsersStateToProps({ users }) {
      const user = Object.values(users)
    return {
        users: user
    }
  };

  export const TypesOfPoll = {
    POLL: 'POLL',
    QUESTION: 'QUESTION',
    RESULT: 'RESULT'
  };

  export function mapCardStateToProps(
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
    }
  };

  export function mapHomeStateToProps({ authUser, users, questions }) {
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
    }
  };

  
