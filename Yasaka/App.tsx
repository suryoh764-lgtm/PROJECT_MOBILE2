
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';
import DrawerNavigator from './navigation/DrawerNavigator';
import AdminStackWrapper from './navigation/AdminStackWrapper';

export type RootStackParamList = {
  User: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <AdminProvider>
          <NavigationContainer>

            <Stack.Navigator
              screenOptions={{ 
                headerShown: false,
                presentation: 'card'
              }}
            >
              <Stack.Screen name="User" component={DrawerNavigator} />
              <Stack.Screen name="Admin" component={AdminStackWrapper} />
            </Stack.Navigator>
          </NavigationContainer>
        </AdminProvider>
      </OrderProvider>
    </CartProvider>
  );
}

