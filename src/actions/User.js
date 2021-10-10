import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/index';

export const USERS_RECEIVED = 'USERS_RECEIVED';
export const ANSWER_TO_USER_ADD = 'ANSWER_TO_USER_ADD';
export const QUESTION_TO_USER_ADD = 'QUESTION_TO_USER_ADD';

export function usersReceiver(users) {
  return {
    type: USERS_RECEIVED,
    users
  };
}

function addAnswerToUser(authUser, qid, answer) {
  return {
    type: ANSWER_TO_USER_ADD,
    authUser,
    qid,
    answer
  };
}

export function saveQuestionsAnswerHandler(authUser, questionID, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, questionID, answer));
    dispatch(addAnswerToQuestion(authUser, questionID, answer));

    return saveQuestionAnswer(authUser, questionID, answer).catch(e => {
      console.warn('Error in saveQuestionsAnswerHandler:', e);
    });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: QUESTION_TO_USER_ADD,
    id,
    author
  };
}
