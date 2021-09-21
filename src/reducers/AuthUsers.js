import { SET_AUTH_USER } from '../actions/AuthUsers';

export default function authUsers(state = null, action) {
  if (action.type === SET_AUTH_USER) {
    return action.id;
  }
  return state;
}
