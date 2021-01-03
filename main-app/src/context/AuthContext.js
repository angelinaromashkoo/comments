import createDataContext from './createDataContext';
import tracker from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({name, email, password}) => {
    try {
      const response = await tracker.post('/signup', {name, email, password});
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

const signin = (dispatch) => {
  return ({name, email, password}) => {};
};

const signout = (dispatch) => {
  return () => {};
};

export const {Provider, Context} = createDataContext(authReducer, {
  signup,
  signin,
  signout,
});
