import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/user/HomeScreen';
import MenuScreen from '../screens/user/MenuScreen';
import KeranjangScreen from '../screens/user/KeranjangScreen';
import PesananDiterimaScreen from '../screens/user/PesananDiterimaScreen';
import ReviewPesananScreen from '../screens/user/ReviewPesananScreen';
import StatusPesananScreen from '../screens/user/StatusPesananScreen';  
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
    Keranjang: { selectedTable: string };
    PesananDiterima: { orderId: string };
    ReviewPesanan: undefined;
    StatusPesanan: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Keranjang" component={KeranjangScreen} />
      <Stack.Screen name="PesananDiterima" component={PesananDiterimaScreen} />
      <Stack.Screen name="ReviewPesanan" component={ReviewPesananScreen} />
      <Stack.Screen name="StatusPesanan" component={StatusPesananScreen} />
    </Stack.Navigator>
  );
}
