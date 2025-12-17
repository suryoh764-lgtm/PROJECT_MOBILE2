

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import TambahMenuScreen from '../screens/admin/TambahMenuScreen';
import EditMenuScreen from '../screens/admin/EditMenuScreen';
import EditStatusPesananScreen from '../screens/admin/EditStatusPesananScreen';
import AdminDrawerContent from '../components/AdminDrawerContent';


export type AdminStackParamList = {
    AdminLogin: undefined;
    AdminDrawer: undefined;
    TambahMenu: undefined;
    EditMenu: { 
        menuId?: string;
        mode: 'add' | 'edit';
    };
    EditStatusPesanan: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <AdminDrawerContent {...props} />}
    >
      <Drawer.Screen name="TambahMenu" component={TambahMenuScreen} />
      <Drawer.Screen name="EditMenu" component={EditMenuScreen} />
      <Drawer.Screen name="EditStatusPesanan" component={EditStatusPesananScreen} />
    </Drawer.Navigator>
  );
};

export default function AdminStack() {
  return (
    <Stack.Navigator
      initialRouteName="AdminLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="AdminDrawer" component={AdminDrawerNavigator} />
    </Stack.Navigator>
  );
}

