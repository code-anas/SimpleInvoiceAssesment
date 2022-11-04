import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LogIn} from '../../screens/auth';
import { ScreensName } from '../../constants/strings';

const StackAuth = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

export const AuthStack = () => {
  return (
    <StackAuth.Navigator initialRouteName={ScreensName.LOGIN}>
      <StackAuth.Screen
        name={ScreensName.LOGIN}
        component={LogIn}
        options={navOptionHandler}
      />
    </StackAuth.Navigator>
  );
};
