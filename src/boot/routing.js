import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Stacks
import {AuthStack} from './authStack';
import {DashBoardStack} from './dashBoard';
//Navigation Ref
import {navigationRef} from './navigationService';
import {ScreensName} from '../constants/strings';

import {useSelector} from 'react-redux';
import {selectAuthUser} from '~/redux/reducers/authSlice';

const Stack = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
  //   animationEnabled: false,
});
const Routing = () => {
  const user = useSelector(selectAuthUser);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!user && (
          <Stack.Screen
            name={ScreensName.AUTH_STACK}
            component={AuthStack}
            options={navOptionHandler}
          />
        )}
        <Stack.Screen
          name={ScreensName.DASHBOARD_STACK}
          component={DashBoardStack}
          options={navOptionHandler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
