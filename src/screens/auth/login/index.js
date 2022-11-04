import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from '~/components';
import utilityMethods from '~/utils/utilityMethods';
import {AuthService} from '~/services';

export const LogIn = props => {
  const [username, setUsername] = useState(AuthService.username);
  const [password, setPassword] = useState(AuthService.password);

  const onLoginPress = useCallback(() => {
    if (!utilityMethods.isEmailValid(username)) {
      alert('Please type correct email!');
      return;
    }

    if (password === '') {
      alert('Please enter the password');
      return;
    }

    AuthService.login({username, password}).then(res => {
      console.log('Res', res);
    });
  }, [username, password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.logo}>101 Digital</Text>
        <View>
          <View>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.email}
              placeholder="demo@demo.com"></TextInput>
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.password}
              secureTextEntry={true}
              placeholder="*******"></TextInput>
          </View>
          <Button title={'Login'} style={styles.login} onPress={onLoginPress} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginTop: hp(15),
  },
  logo: {
    fontSize: 36,
    marginBottom: 50,
    alignSelf: 'center',
  },
  inputWrapper: {
    padding: 5,
    margin: 5,
    flex: 1,
  },
  label: {
    marginVertical: 5,
  },
  email: {
    height: 50,
    backgroundColor: Colors.background,
    padding: 5,
    borderRadius: 5,
  },
  password: {
    height: 50,
    backgroundColor: Colors.background,
    padding: 5,
    borderRadius: 5,
  },
  login: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
