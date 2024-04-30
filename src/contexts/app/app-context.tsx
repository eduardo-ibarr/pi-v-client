import { createContext, useReducer } from "react";
import { appInitialState } from "../../reducers/app/app-initial-state";
import { appReducer } from "../../reducers/app/app-reducer";

export type AppContextType = {
  state: typeof appInitialState;
  dispatch: (action: any) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
