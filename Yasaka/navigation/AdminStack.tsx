



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';

// Placeholder components for screens that may not be fully implemented
const TambahMenuScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>TambahMenu Screen (Coming Soon)</Text>
  </View>
);

const EditMenuScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>EditMenu Screen (Coming Soon)</Text>
  </View>
);

const EditStatusPesananScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>EditStatusPesanan Screen (Coming Soon)</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});


export type AdminStackParamList = {
    AdminLogin: undefined;
    TambahMenu: undefined;
    EditMenu: { menuId: string };
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

