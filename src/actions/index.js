import { getInitialData } from '../utils/api';
import { usersReceiver } from '../actions/User';
import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/User';

export function initialDataHandler() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(questionsReceived(questions));
      dispatch(usersReceiver(users));
    });
  };
}


export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';
export const ANSWER_TO_QUESTION_ADD = 'ANSWER_TO_QUESSTION_ADD';
export const QUESTION_ADD = 'QUESTION_ADD';

export function questionsReceived(questions) {
  return {
    type: QUESTIONS_RECEIVED,
    questions
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ANSWER_TO_QUESTION_ADD,
    authUser,
    qid,
    answer
  };
}

function addQuestion(question) {
  return {
    type: QUESTION_ADD,
    question
  };
}

export function saveQuestionHandler(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
