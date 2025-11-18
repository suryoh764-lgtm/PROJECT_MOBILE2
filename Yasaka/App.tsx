import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './navigation/UserStack';

export default function App() {
  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
}
