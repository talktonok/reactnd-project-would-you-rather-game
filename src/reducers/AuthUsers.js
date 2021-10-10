import { SET_USER_AUTH } from '../actions/AuthUsers';

export default function authUsers(state = null, action) {
  if (action.type === SET_USER_AUTH) {
    return action.id;
  }
  return state;
}
