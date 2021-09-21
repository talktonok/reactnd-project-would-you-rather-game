import { getInitialData } from '../utils/api';
import { receiveQuestions } from '../actions/Question';
import { receiveUsers } from '../actions/User';

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}