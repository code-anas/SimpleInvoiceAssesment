import React, {useContext} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {observer} from 'mobx-react-lite';

export const Button = observer(props => {
  const {
    title,
    onPress,
    style,
    titleStyle,
    sendToBuyerButtonStyle,
    AddInvoiceButton,
    AddInvoiceButtonTitle,
    disabled,
    loadingColor = 'white',
    isLoading = false,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, sendToBuyerButtonStyle, AddInvoiceButton]}>
      <Text style={[styles.title, titleStyle, AddInvoiceButtonTitle]}>{title}</Text>
      {isLoading && <ActivityIndicator size={20} color={loadingColor} />}
    </TouchableOpacity>
  );
});
