import React, {useState, createContext} from 'react';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import colors from '../constants/colors';
import {CommonStrings} from '../constants/strings';
export const LoaderContext = createContext();

const AppLoading = ({children}) => {
  const [loader, setLoader] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loader,
        setLoader,
      }}>
      {children}
    </LoaderContext.Provider>
  );
};
export default AppLoading;
