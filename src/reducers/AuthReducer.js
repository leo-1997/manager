import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGING_USER,
} from '../actions/types';

/**
 * Responsible for the whole Authentication process
 * The state must be immutable
 */
const INITIAL_STATE = {
  loading: false,
  error: '',
  email: '',
  password: '',
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload};
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Authentication Failed!',
        password: '',
      };
    case LOGGING_USER:
      return {...state, loading: true, error: ''};
    default:
      return state;
  }
};
