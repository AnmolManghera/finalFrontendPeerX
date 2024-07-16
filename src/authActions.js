export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTH_ERROR = "AUTH_ERROR";

export const loginAction = (user) => ({
    type: LOGIN_USER,
    payload: { user },
  });
  
  export const logoutAction = () => ({
    type: LOGOUT_USER,
  });
  
  export const authErrorAction = (error) => ({
    type: AUTH_ERROR,
    payload: { error },
  });
  