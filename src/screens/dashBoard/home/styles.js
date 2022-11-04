import {StyleSheet} from 'react-native';
import {hp} from '~/constants/dimensions';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${colors.background}`,
    paddingTop: hp(7),
  },
});

export default styles;
