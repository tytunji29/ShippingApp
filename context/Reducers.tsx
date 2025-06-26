import { ACTION_TYPES, AppAction, AppState } from "../lib/types";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ACTION_TYPES.SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
