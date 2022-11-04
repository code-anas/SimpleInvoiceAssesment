import {StyleSheet} from 'react-native';
import {hp} from '~/constants/dimensions';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(7),
  },
  search: {
    height: hp(7),
    borderRadius: 100,
    marginHorizontal: 10,
    fontSize: 14,
    padding: 20,
    backgroundColor: colors.background,
  },
});

export default styles;
