import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, TradingGraphs, TradingHome } from '../screens';

const MainNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'allCoins'} component={TradingHome} />
        <Stack.Screen name={'coinDetails'} component={TradingGraphs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
