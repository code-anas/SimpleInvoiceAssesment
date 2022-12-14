import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.blueButton,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('7%'),
    borderRadius: 20,
    flexDirection: 'row',
    
  },
  title: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '400',
  },
});

export default styles;
