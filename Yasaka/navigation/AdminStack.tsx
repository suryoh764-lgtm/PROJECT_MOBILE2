import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import TambahMenuScreen from '../screens/admin/TambahMenuScreen';
import EditMenuScreen from '../screens/admin/EditMenuScreen';
import EditStatusPesananScreen from '../screens/admin/EditStatusPesananScreen';


export type AdminStackParamList = {
    AdminLogin: undefined;
    TambahMenu: undefined;
    EditMenu: { 
        menuId?: string;
        mode: 'add' | 'edit';
    };
    EditStatusPesanan: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator
      initialRouteName="AdminLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="TambahMenu" component={TambahMenuScreen} />
      <Stack.Screen name="EditMenu" component={EditMenuScreen} />
      <Stack.Screen name="EditStatusPesanan" component={EditStatusPesananScreen} />
    </Stack.Navigator>
  );
}

