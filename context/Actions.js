import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACTION_TYPES } from '../lib/types'; 
import user from './UserActions';
import shipments from './ShipmentActions';

export const APIURL = "https://temitayo01-001-site1.ktempurl.com/app/v1";
export const position = "bottom-center";

// Async getters (use inside async functions)
export const getVubidsUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem("vubids_token");
    return token;
  } catch (error) {
    console.error("Error fetching token from storage", error);
    return null;
  }
};

export const getMainUserType = async () => {
  try {
    const userType = await AsyncStorage.getItem("user_Type");
    return userType;
  } catch (error) {
    console.error("Error fetching user type", error);
    return null;
  }
};

const actions = {
  user,
  shipments,
};

export default actions;
