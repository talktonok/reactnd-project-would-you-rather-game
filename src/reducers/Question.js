import {
    QUESTIONS_RECEIVED,
    ANSWER_TO_QUESTION_ADD,
    QUESTION_ADD
  } from '../actions/index';
//import Questions from '../component/Questions';
  
  function Question(state = {}, action) {
    switch (action.type) {
      case QUESTIONS_RECEIVED:
        return {
          ...state,
          ...action.questions
        };
      case ANSWER_TO_QUESTION_ADD:
        const { authUser, qid, answer } = action;
  
        return {
          ...state,
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: state[qid][answer].votes.concat(authUser)
            }
          }
        };
      case QUESTION_ADD:
        const { question } = action;
  
        return {
          ...state,
          [question.id]: question
        };
      default:
        return state;
    }
  }

  export default Question
  