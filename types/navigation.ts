export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  MainApp: undefined;
   CreateShipment: undefined;
   MyShipments: undefined;
   Profiles: undefined;
   SelectOnMapScreen: {
  onLocationSelected: (location: { address: string; latitude: number; longitude: number }) => void;
};
   AvailableShipmentScreen: undefined;
};
