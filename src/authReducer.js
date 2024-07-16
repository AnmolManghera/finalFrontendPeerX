import { LOGIN_USER,LOGOUT_USER,AUTH_ERROR } from "./authActions";

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          error: null,
        };
      case LOGOUT_USER:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
      case AUTH_ERROR:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;