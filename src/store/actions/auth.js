import axios from 'axios';
import * as keys from '../../apiKeys';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    const key = keys.newUserAPIKey;
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + key, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err));
    });
  }
}
