
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </OrderProvider>
    </CartProvider>
  );
}
