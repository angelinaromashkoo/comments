import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import tracker from '../api/tracker';
import * as NavigationService from '../navigationService/NavigationService';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const signup = (dispatch) => async ({name, email, password}) => {
  try {
    const response = await tracker.post('/signup', {name, email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    NavigationService.navigate('MainScreen');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch) => async ({name, email, password}) => {
  try {
    const response = await tracker.post('/signin', {name, email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
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
  dispatch({type: 'signout'});
  //navigate to sign up screen
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
  },
  {token: null, errorMessage: ''},
);
