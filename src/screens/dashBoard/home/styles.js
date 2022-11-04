import {StyleSheet} from 'react-native';
import {hp, wp} from '~/constants/dimensions';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(7),
  },
  search: {
    height: hp(7),
    borderRadius: 20,
    fontSize: 14,
    padding: 20,
    backgroundColor: colors.background,
    width: '76%',
    borderColor: colors.blueButton,
    borderWidth: 0.5,
  },
  cardStyling: {
    marginVertical: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: hp('1.5%'),
    width: wp('90%'),
    justifyContent: 'center',
    paddingLeft: hp(1.5),
    borderRadius: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  invoiceNumberText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: hp('0.5%'),
  },
  balanceAmountText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.blueButton,
  },
  balanceAmountText1: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  currency: {
    fontWeight: 'bold',
    marginLeft: hp(0.5),
  },
  description: {
    color: colors.blueButton,
    fontWeight: 'bold',
  },
  description1: {},
  dueDate: {
    fontWeight: '200',
  },
  dueDate1: {
    fontWeight: '500',
  },
  invoiceDate: {
    fontWeight: '200',
    marginTop: hp('0.5%'),
  },
  invoiceDate1: {
    fontWeight: '500',
    marginTop: hp('0.5%'),
  },
  floatingButton: {
    height: hp(6),
    width: hp(6),
    backgroundColor: 'white',
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: hp('4%'),
    marginBottom: hp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  floatingImage: {
    height: hp(7),
    width: hp(7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default styles;
