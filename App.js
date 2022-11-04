import React, {useEffect} from 'react';
import {StatusBar, LogBox, Text, TextInput, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routing from './src/boot/routing';
import AppLoading from './src/context/AppLoading';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreAllLogs(true);
if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}
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
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <AppLoading>
        <Routing />
      </AppLoading>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
};
export default App;
