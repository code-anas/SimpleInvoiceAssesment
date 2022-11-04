import React, {useEffect} from 'react';
import {StatusBar, LogBox, Text, TextInput} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routing from './src/boot/routing';
import AppLoading from './src/context/AppLoading';

LogBox.ignoreAllLogs(true);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');
// StatusBar.setBarStyle('dark-content');
// StatusBar.setBackgroundColor(colors.purple)
const App = () => {
  useEffect(() => {
    if (Text.defaultProps) {
      Text.defaultProps.allowFontScaling = false;
    } else {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
    }

    // Override Text scaling in input fields
    if (TextInput.defaultProps) {
      TextInput.defaultProps.allowFontScaling = false;
    } else {
      TextInput.defaultProps = {};
      TextInput.defaultProps.allowFontScaling = false;
    }
  }, []);
  return (
    <SafeAreaProvider>
      <AppLoading>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
          translucent={true}
        />
        <Routing />
      </AppLoading>
    </SafeAreaProvider>
  );
};
export default App;
