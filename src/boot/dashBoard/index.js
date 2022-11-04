import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../../screens/dashBoard';
import { ScreensName } from '../../constants/strings';

const StackAuth = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

export const DashBoardStack = () => {
  return (
    <StackAuth.Navigator initialRouteName={ScreensName.HOME}>
      <StackAuth.Screen
        name={ScreensName.HOME}
        component={Home}
        options={navOptionHandler}
      />
    </StackAuth.Navigator>
  );
};
