import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from './login.actions';

export const initialLoginState = false;

const _loginReducer = createReducer(
  initialLoginState,
  on(loginAction, (state) => true),
  on(logoutAction, (state) => false)
);

export const loginReducer = (state, action) => {
  return _loginReducer(state, action);
};
