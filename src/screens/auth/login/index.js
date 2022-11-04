import React, {useMemo} from 'react';
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
import {Button} from '@/components';

export const LogIn = props => {
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
          <Button title={'Login'} />
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
  header: {
    height: hp(40),
  },
  cardDesign: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  signText: {
    fontSize: 30,
    color: Colors.BlueColor1st,
    fontWeight: '700',
    marginTop: '10%',
  },
  signInText: {
    color: Colors.White,
    fontWeight: 'bold',
  },
  inputs: {
    marginTop: '10%',
  },
  signInBtn: {
    width: wp(60),
  },
  forgotBtn: {
    backgroundColor: Colors.Transparent,
    alignItems: 'flex-end',
    elevation: 0,
    hadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  forgotText: {
    textAlign: 'right',
    fontWeight: '500',
    color: Colors.BlueColor3rd,
    // elevation: 0
  },
  guestBtn: {
    backgroundColor: Colors.Transparent,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    marginTop: '10%',
  },
  guestText: {
    fontWeight: '500',
    color: Colors.ColorPrimary,
    fontSize: 18,
    textAlign: 'center',
    width: wp('60%'),
  },
  centerContent: {
    alignItems: 'center',
    marginVertical: '20%',
  },

  container2: {
    flex: 1,
  },

  // KeyBoard
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },

  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
