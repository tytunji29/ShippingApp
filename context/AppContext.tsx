// AppProvider.tsx (React Native Version)
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, ACTION_TYPES, AppContextType } from "../lib/types"; // Adjust import path
import actions from "./Actions";
import { appReducer } from "./Reducers";

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, shipments } = actions;

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("vubids_token");
      if (token) {
        validateAuthToken(token);
      }
    };
    loadToken();
  }, []);

  const validateAuthToken = async (token: string) => {
    const isValid = await user.authUser(dispatch, token);
    if (isValid) {
      dispatch({ type: ACTION_TYPES.SET_AUTH });
    } else {
      logoutUser();
    }
  };

  const logoutUser = async (): Promise<void> => {
    await AsyncStorage.removeItem("vubids_token");
    await AsyncStorage.removeItem("user_Type");
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  const contextValue: AppContextType = {
    state,
    loginUser: (credentials) => user.loginUser(dispatch, credentials),
    authUser: (token) => user.authUser(dispatch, token),
    logoutUser,
    setError: (error) => user.setError(dispatch, error),
    signupUser: (credentials) => user.signupUser(dispatch, credentials, 1),
    signupCompanyUser: (credentials) => user.signupUser(dispatch, credentials, 2),
    updateProfile: (credentials) => user.updateProfile(dispatch, credentials),
    addPayment: (credentials) => user.addPayment(dispatch, credentials),
    createShipment: (details) => shipments.create(dispatch, details),
    allShipments: () => shipments.all(dispatch),
    itemCategories: () => shipments.itemCategories(dispatch),
    fetchQuotes: () => shipments.fetchQuotes(dispatch),
    itemTypes: (id) => shipments.itemTypes(dispatch, id),
    submitTicket: (body) => user.submitTicket(dispatch, body),
    getTickets: () => user.getTickets(dispatch),
    changePassword: (credentials) => user.changePassword(dispatch, credentials),
    regionStates: () => user.getStates(dispatch),
    regionLga: (id) => user.getLgas(dispatch, id),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
