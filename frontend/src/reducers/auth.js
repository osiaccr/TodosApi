import Cookie from "js-cookie";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  csrftoken: Cookie.get("csrftoken"),
  isAuthenticated: false,
  isLoading: false,
  user: {
    pk: null,
    username: null,
    email: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        csrftoken: Cookie.get("csrftoken"),
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("csrftoken");
      localStorage.removeItem("sessionid");
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
