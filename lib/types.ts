export interface User {
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
  token: string;
  address?: string;
  dateOfBirth?: string;
  fullName: string;
  email: string;
  IsCompany: string;
}
export interface quoteList{
  id: string;
  customer: string;
  from: string;
  to: string;
  item: { name: string; description: string };
  status: string;
  statuss: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}


export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
}
export interface CorporateCredentials {
  firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    gender: string;
    typeOfService: string;
    region: string;
    noOfVeicles: string;
    loadingNo: string;
    rate: string;
    availability: string;
}

export type RootStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export interface PasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Ticket {
  subject: string;
  description: string;
}

export interface ProfileCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

export interface PaymentInfo {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface LoginResponse {
  user: User;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ShipmentDetails {
  itemsRequest: {
    vehicleTypeId: number;
    itemCategoryId: number;
    itemTypeId: number;
    length: number;
    weight: number;
    height: number;
    quantity: number;
    imageUrl: string;
    instructions: string;
    regionState: string;
    regionLgaId: string;
  };
  deliveryPickupRequest: {
    pickUpAddress: string;
    deliveryAddress: string;
    pickupDate: string;
    deliveryDate: string;
    pickupLongitude: number;
    pickupLatitude: number;
    // deliveryLongitude: number;
    // deliveryLatitude: number;
  };
}

export enum ACTION_TYPES {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_USER = "SET_USER",
  SET_AUTH = "SET_AUTH",
  LOGOUT = "LOGOUT",
}

export type AppAction =
  | { type: ACTION_TYPES.SET_LOADING; payload: boolean }
  | { type: ACTION_TYPES.SET_ERROR; payload: string | null }
  | { type: ACTION_TYPES.SET_USER; payload: User }
  | { type: ACTION_TYPES.SET_AUTH }
  | { type: ACTION_TYPES.LOGOUT };

export interface AppContextType {
  state: AppState;
  loginUser: (credentials: LoginCredentials) => Promise<LoginResponse>;
  authUser: (token: string) => any;
  logoutUser: () => void;
  setError: (dispatch: any, error: string | null) => void;
  signupUser: (credentials: SignupCredentials) => Promise<string>;
  signupCompanyUser: (credentials: CorporateCredentials) => Promise<string>;
  updateProfile: (credentials: ProfileCredentials) => Promise<string>;
  addPayment: (credentials: PaymentInfo) => Promise<string>;
  createShipment: (details: ShipmentDetails) => Promise<{ success: boolean; message: string }>;
  allShipments: () => Promise<[{}]>;
  itemCategories: () => Promise<[{}]>;
  fetchQuotes: () => Promise<quoteList[]>;
  itemTypes: (id: string) => Promise<[{}]>;
  regionStates: () => Promise<[{}]>;
  regionLga: (id: string) => Promise<[{}]>;
  submitTicket: (body: Ticket) => Promise<string>;
  getTickets: () => Promise<[{}]>;
  changePassword: (credentials: PasswordCredentials) => Promise<string>;
}

// Important dates
// Support and Escalation Path
// Project Size
// Mentors responsiblities and roles
// Communication
// Important Emails
// Evaluations
// Commmunity Engagement
// Code of Conduct and Ethics
