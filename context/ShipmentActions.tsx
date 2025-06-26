import axios, { AxiosError } from "axios";
import { APIURL, position } from "./Actions";
import { ACTION_TYPES, ShipmentDetails } from "../lib/types";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const showError = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    //position,
  });
};

const showSuccess = (message: string) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
   // position,
  });
};

const shipments = {
  setLoading: (dispatch: any, isLoading: boolean): void => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  },

  setError: (dispatch: any, error: string | null): void => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    if (error) showError(error);
  },

  create: async (
    dispatch: any,
    details: ShipmentDetails
  ): Promise<{ success: boolean; message: string }> => {
    try {
      shipments.setLoading(dispatch, true);
      const token = await AsyncStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      const response = await axios.post(
        `${APIURL}/Shipments/create-shipment`,
        details,
        { headers: { Authorization: auth } }
      );

      shipments.setLoading(dispatch, false);
      const result = response.data;

      if (result?.status === true) {
        showSuccess(result.message || "Shipment created");
        return {
          success: true,
          message: result.message || "Shipment created successfully",
        };
      } else {
        const errorMsg = result?.message || "Operation failed";
        showError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      shipments.setLoading(dispatch, false);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : "An unknown error occurred";
      showError(errorMessage);
      return { success: false, message: errorMessage };
    }
  },

  fetchQuotes: async (dispatch: any) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      const response = await axios.get(
        `${APIURL}/Shipments/get-all-shipment-landing`,
        {
          headers: { Authorization: auth },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : "An unknown error occurred";
      showError(errorMessage);
    }
  },

  itemCategories: async (dispatch: any) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      const response = await axios.get(
        `${APIURL}/Items/get-all-item-categories`,
        {
          headers: { Authorization: auth },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : "An unknown error occurred";
      showError(errorMessage);
    }
  },

  itemTypes: async (dispatch: any, id: string) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      const response = await axios.get(
        `${APIURL}/Items/get-all-item-types-by-category-id?categoryId=${id}`,
        {
          headers: { Authorization: auth },
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : "An unknown error occurred";
      showError(errorMessage);
    }
  },

  all: async (dispatch: any) => {
    try {
      const token = await AsyncStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      shipments.setLoading(dispatch, true);
      const response = await axios.get(`${APIURL}/Shipments/get-all-shipment`, {
        headers: { Authorization: auth },
      });
      shipments.setLoading(dispatch, false);
      return response.data.data;
    } catch (error) {
      shipments.setLoading(dispatch, false);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : "An unknown error occurred";
      showError(errorMessage);
    }
  },
};

export default shipments;
