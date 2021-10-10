import {
    USERS_RECEIVED,
    ANSWER_TO_USER_ADD,
    QUESTION_TO_USER_ADD
  } from '../actions/User';
  
  function User(state = {}, action) {
    switch (action.type) {
      case USERS_RECEIVED:
        return {
          ...state,
          ...action.users
        };
      case ANSWER_TO_USER_ADD:
        const { authUser, qid, answer } = action;
  
        return {
          ...state,
          [authUser]: {
            ...state[authUser],
            answers: {
              ...state[authUser].answers,
              [qid]: answer
            }
          }
        };
      case QUESTION_TO_USER_ADD:
        const { id, author } = action;
  
        return {
          ...state,
          [author]: {
            ...state[author],
            questions: state[author].questions.concat(id)
          }
        };
      default:
        return state;
    }
  }
  export default User