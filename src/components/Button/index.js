import React, {useContext} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export const Button = props => {
  const {
    title,
    onPress,
    style,
    titleStyle,
    sendToBuyerButtonStyle,
    disabled,
    loadingColor = 'white',
    isLoading = false,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, sendToBuyerButtonStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {isLoading && <ActivityIndicator size={20} color={loadingColor} />}
    </TouchableOpacity>
  );
};
