import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  INITIALISE_CREATE,
  EMPLOYEE_SAVE,
} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const initialiseCreate = () => {
  return {
    type: INITIALISE_CREATE,
  };
};

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value},
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  return dispatch => {
    //reference to json format
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({name, phone, shift})
      .then(() => {
        Actions.pop();
        dispatch({type: EMPLOYEE_CREATE});
      });
  };
};

export const employeesFetch = () => {
  return dispatch => {
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const employeeSave = ({name, phone, shift, uid}) => {
  return dispatch => {
    //reference to json format
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({name, phone, shift})
      .then(() => {
        Actions.pop();
        dispatch({type: EMPLOYEE_SAVE});
      });
  };
};

export const employeeDelete = ({uid}) => {
  console.log('received uid is ', uid);
  return () => {
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
};
