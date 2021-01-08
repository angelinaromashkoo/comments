import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import {SIGNIN, SIGNOUT, ADD_ERROR} from './types';
import tracker from '../api/tracker';
import * as NavigationService from '../navigationService/NavigationService';

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {...state, errorMessage: action.payload};
    case SIGNIN:
      return {
        errorMessage: '',
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case SIGNOUT:
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const signup = (dispatch) => async ({name, email, password}) => {
  try {
    const response = await tracker.post('/signup', {name, email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: SIGNIN, payload: response.data});
    NavigationService.navigate('MainScreen');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch) => async ({name, email, password}) => {
  try {
    const response = await tracker.post('/signin', {name, email, password});

    await AsyncStorage.setItem('token', response.data.token);
    /* await AsyncStorage.setItem('userId', response.data.userId);*/
    dispatch({type: SIGNIN, payload: response.data});
    NavigationService.navigate('MainScreen');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: SIGNOUT});
  NavigationService.navigate('SignIn');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
  },
  {
    token: null,
    userId: null,
    errorMessage: '',
  },
);
