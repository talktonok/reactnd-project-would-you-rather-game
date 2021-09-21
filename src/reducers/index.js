import { combineReducers } from 'redux';
import authUser from '../reducers/AuthUsers';
import questions from '../reducers/Question';
import users from '../reducers/User';
import 'semantic-ui-css/semantic.min.css'

export default combineReducers({
  authUser,
  questions,
  users
});
