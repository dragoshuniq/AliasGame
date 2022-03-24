import React from 'react';
import AppNavigation from './AppStack.navigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigation />
    </NavigationContainer>
  );
}
