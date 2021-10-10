import { getInitialData } from '../utils/api';
import { questionsReceived } from '../actions/Question';
import { usersReceiver } from '../actions/User';

export function initialDataHandler() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(questionsReceived(questions));
      dispatch(usersReceiver(users));
    });
  };
}