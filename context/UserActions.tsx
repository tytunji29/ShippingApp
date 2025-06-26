import axios, { AxiosError } from "axios";
import {
  ACTION_TYPES,
  LoginCredentials,
  LoginResponse,
  PasswordCredentials,
  Ticket,
} from "../lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { APIURL } from "./Actions";

const showToast = (type: "success" | "error", message: string) => {
  Toast.show({
    type,
    text1: message,
    position: "bottom",
  });
};

const errorHandler = (dispatch: any, error: any, action: any) => {
  action.setLoading(dispatch, false);
  let errorMessage;
  if (error instanceof AxiosError) {
    errorMessage = error?.response?.data.message;
  } else if (error?.isCustom || error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred";
  }

  action.setError(dispatch, errorMessage);
};

const user = {
  setLoading: (dispatch: any, isLoading: boolean): void => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  },

  setError: (dispatch: any, error: string | null): void => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    showToast("error", error || "Error occurred");
  },

  loginUser: async (dispatch: any, credentials: LoginCredentials) => {
    try {
      user.setLoading(dispatch, true);

      const response = await axios.post(`${APIURL}/Auth/Login`, credentials);

      if (!response?.data) throw new Error();
      if (!response.data.status) {
        const err = new Error(response.data.message);
        (err as any).isCustom = true;
        throw err;
      }

      const data = response.data.data;

      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
      user.setLoading(dispatch, false);
      showToast("success", response.data.message);

      await AsyncStorage.setItem("vubids_token", data.token);
      await AsyncStorage.setItem("user_Type", data.isCompany?.toString());

      return data;
    } catch (error: any) {
      user.setLoading(dispatch, false);
      const msg =
        error instanceof AxiosError
          ? error?.response?.data.message
          : error?.message || "An unknown error occurred";
      user.setError(dispatch, msg);
    }
  },

  authUser: async (dispatch: any, token: string) => {
    try {
      user.setLoading(dispatch, true);

      const response = await axios.get(`${APIURL}/Auth/get-customer-profile`, {
        headers: { Authorization: token },
      });

      if (!response?.data || !response.data.status) {
        const err = new Error(response.data?.message || "Unauthorized");
        (err as any).isCustom = true;
        throw err;
      }

      const data = response.data.data as LoginResponse;
      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
      user.setLoading(dispatch, false);
      showToast("success", response.data.message);

      return data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  signupUser: async (dispatch: any, credentials: any, source: number) => {
    const url =
      source === 1
        ? `${APIURL}/Auth/Customer-SignUp`
        : `${APIURL}/Auth/corporate-SignUp`;

    try {
      user.setLoading(dispatch, true);
      const response = await axios.post(url, credentials);

      if (!response?.data || !response.data.status) {
        const err = new Error(response.data?.message || "Signup failed");
        (err as any).isCustom = true;
        throw err;
      }

      const data = response.data.data;
      user.setLoading(dispatch, false);
      showToast("success", response.data.message);
      return data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  updateProfile: async (dispatch: any, credentials: any) => {
    try {
      user.setLoading(dispatch, true);
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.patch(
        `${APIURL}/Auth/update-profile`,
        credentials,
        {
          headers: { Authorization: token },
        }
      );

      user.setLoading(dispatch, false);
      showToast("success", response.data.message);
      return response.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  changePassword: async (dispatch: any, credentials: PasswordCredentials) => {
    try {
      user.setLoading(dispatch, true);
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.post(
        `${APIURL}/Auth/change-password`,
        credentials,
        {
          headers: { Authorization: token },
        }
      );

      user.setLoading(dispatch, false);
      return response.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  addPayment: async (dispatch: any, credentials: any) => {
    try {
      user.setLoading(dispatch, true);
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.post(
        `${APIURL}/Payments/add-payment-detaills`,
        credentials,
        {
          headers: { Authorization: token },
        }
      );

      user.setLoading(dispatch, false);
      return response.data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  submitTicket: async (dispatch: any, body: Ticket) => {
    try {
      user.setLoading(dispatch, true);
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.post(
        `${APIURL}/Supports/submit-ticket`,
        body,
        {
          headers: { Authorization: token },
        }
      );

      user.setLoading(dispatch, false);
      showToast("success", response.data.message);
      return response.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  getTickets: async (dispatch: any) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.get(
        `${APIURL}/Supports/get-all-transporters`,
        {
          headers: { Authorization: token },
        }
      );

      return response.data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  getStates: async (dispatch: any) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.get(
        `${APIURL}/GeneralSetup/get-all-region-state`,
        {
          headers: { Authorization: token },
        }
      );

      return response.data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },

  getLgas: async (dispatch: any, id: string) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");

      const response = await axios.get(
        `${APIURL}/GeneralSetup/get-all-region-lga/${id}`,
        {
          headers: { Authorization: token },
        }
      );

      return response.data.data;
    } catch (error) {
      errorHandler(dispatch, error, user);
    }
  },
};

export default user;
