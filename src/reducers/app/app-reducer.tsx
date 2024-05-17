import { AppAction, AppState } from "../../models/app";
import { appInitialState } from "./app-initial-state";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return appInitialState;
    default:
      return state;
  }
};
