import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export const LabelInput = ({label = 'Label', ...props}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
  },
});
