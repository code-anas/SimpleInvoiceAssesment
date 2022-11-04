import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export const Button = props => {
  const {title, onPress, style, titleStyle, sendToBuyerButtonStyle, disabled} =
    props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style, sendToBuyerButtonStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
