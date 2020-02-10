import {Actions} from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGGING_USER,
} from './types';
import firebase from 'firebase';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    //immediately dispatch logging user (to show spinner)
    //when loginUser action creator is called
    dispatch({type: LOGGING_USER});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => logInUserSuccess(dispatch, user))
      .catch(error => {
        console.log(error);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => logInUserSuccess(dispatch, user))
          .catch(() => logInUserFail(dispatch));
      });
  };
};

const logInUserSuccess = (dispatch, user) => {
  dispatch({type: LOGIN_USER_SUCCESS, payload: user});
  //employeelist refers to the key in the scene
  Actions.main();
};

const logInUserFail = dispatch => {
  dispatch({type: LOGIN_USER_FAIL});
};
