import React, {useState, createContext} from 'react';
import {Modal, View,ActivityIndicator,Text} from 'react-native';
import colors from '../constants/colors';
import { CommonStrings } from '../constants/strings';
export const LoaderContext = createContext();

const AppLoading = ({children}) => {
  const [loader, setLoader] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loader,
        setLoader,
      }}>
      <View>
        <Modal transparent={true} onRequestClose={() => null} visible={loader}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000070',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 25,
              }}>
              <ActivityIndicator
                size="large"
                color={colors.powderBlue}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '200',
                  color: '#030031',
                  opacity: 1,
                }}>
                {CommonStrings.LOADING}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
      {children}
    </LoaderContext.Provider>
  );
};
export default AppLoading;
