export const SET_USER_AUTH = 'SET_USER_AUTH';

export function setUserAuth(id) {
  return {
    type: SET_USER_AUTH,
    id
  };
}
