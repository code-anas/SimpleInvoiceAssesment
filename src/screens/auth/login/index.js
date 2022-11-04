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
import {Button, LabelInput} from '~/components';
import utilityMethods from '~/utils/utilityMethods';
import {AuthService, InvoiceService} from '~/services';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, selectAuthUser} from '~/redux/reducers/authSlice';
const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

export const LogIn = props => {
  const [username, setUsername] = useState(AuthService.username);
  const [password, setPassword] = useState(AuthService.password);
  const dispatch = useDispatch();

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
      if (res.error) {
        showMessage({
          message: res.error_description,
          type: 'danger',
        });
      }

      if (res.userId) {
        showMessage({
          message: 'User successfully login!',
          type: 'success',
        });

        dispatch(setUser(res));
        // InvoiceService.find().then(res => {
        //   console.log('res', JSON.stringify(res.data.data));
        // });
      }
    });
  }, [username, password]);

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.logo}>101 Digital</Text>
        <View>
          <LabelInput
            label="Email Address"
            value={username}
            style={styles.email}
            placeholder="demo@demo.com"
            onChangeText={setUsername}
          />
          <LabelInput
            label="Password"
            value={password}
            style={styles.password}
            secureTextEntry={true}
            placeholder="*******"
            onChangeText={setPassword}
          />
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
