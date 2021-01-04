import createDataContext from './createDataContext';
import tracker from '../api/tracker';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_users':
      return action.payload;
    default:
      return state;
  }
};

const fetchUsers = (dispatch) => async () => {
  const response = await tracker.get('/users');
  dispatch({type: 'fetch_users', payload: response.data});
};

export const {Provider, Context} = createDataContext(
  userReducer,
  {
    fetchUsers,
  },
  [],
);
