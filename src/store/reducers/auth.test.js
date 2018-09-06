import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(wrapper);
  });

  it('should store the token on login', () => {
    expect(reducer(wrapper, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});
