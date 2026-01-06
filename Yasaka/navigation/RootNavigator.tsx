import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';


export type RootStackParamList = {
  User: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          headerShown: false,
          presentation: 'modal'
        }}
      >
        <Stack.Screen name="User" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const switchToUserMode = (navigation: any) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'User' }],
  });
};

