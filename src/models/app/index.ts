import { User } from "../users";

export interface AppState {
  user: User | null;
  authenticated: boolean;
}

export interface AppAction {
  type: "SET_USER" | "SET_AUTHENTICATED" | "SET_UNAUTHENTICATED";
  payload?: any;
}
