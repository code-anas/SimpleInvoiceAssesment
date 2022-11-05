import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {images} from '~/assets/images';
import colors from '~/constants/colors';
import {hp, wp} from '~/constants/dimensions';
import {Button} from '../Button';
import SelectDropdown from 'react-native-select-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {Invoice} from '~/models/Invoice';
import FlashMessage from 'react-native-flash-message';

export const CreateInvoiceModal = observer(
  ({isVisible, onClose = () => {}}) => {
    const [invoice, setInvoice] = useState(() => new Invoice());
    const [dateBy, setDateBy] = useState('');

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.createInvoiceText}>Create Invoice:</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.closeButton}>
              <Image
                source={images.close}
                style={styles.closeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {/* Text Fields */}
          <ScrollView
            style={styles.TextInputContainer}
            showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Invoice Number"
              style={styles.textInput}
              value={invoice.invoiceNumber}
              onChangeText={t => invoice.setAttribute('invoiceNumber', t)}
            />

            <SelectDropdown
              data={invoice.banks}
              defaultButtonText="Select an account"
              buttonStyle={styles.textInput}
              buttonTextStyle={{
                ...styles.dropdownText,
                color: invoice.bankAccount ? colors.black : colors.placeholder,
              }}
              onSelect={(bank, index) => {
                invoice.setAttribute('bankAccount', bank);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.accountName;
              }}
              rowTextForSelection={(item, index) => {
                return item.accountName;
              }}
            />
            <TextInput
              placeholder="Balance Amount"
              style={styles.textInput}
              value={invoice.balanceAmount}
              onChangeText={t => invoice.setAttribute('balanceAmount', t)}
            />
            <TextInput
              placeholder="Description"
              style={styles.textInput}
              value={invoice.description}
              onChangeText={t => invoice.setAttribute('description', t)}
            />
            <TouchableOpacity
              onPress={() => setDateBy('dueDate')}
              style={styles.label}>
              <Text
                style={{
                  color: invoice?.dueDate ? colors.black : colors.placeholder,
                }}>
                {invoice.dueDate?.toDateString?.() || 'Due Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDateBy('invoiceDate')}
              style={styles.label}>
              <Text
                style={{
                  color: invoice?.invoiceDate
                    ? colors.black
                    : colors.placeholder,
                }}>
                {invoice?.invoiceDate?.toDateString?.() || 'Invoice Date'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Button */}
          <View>
            <Button
              title="Add Invoice"
              style={styles.btn}
              titleStyle={styles.btnTitle}
              onPress={() => {
                if (invoice.validate()) {
                  onClose(invoice.getPayload());
                  setInvoice(new Invoice());
                }
              }}
            />
          </View>
          <FlashMessage
            position="top"
            ref={invoice.messageRef}
            style={{
              width: wp('100%'),
            }}
          />
        </View>
        <DatePicker
          mode="date"
          modal
          open={!!dateBy}
          date={new Date()}
          onConfirm={date => {
            invoice.setAttribute(dateBy, date);
            setDateBy('');
          }}
          onCancel={() => {
            setDateBy('');
          }}
        />
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaeaea',
    height: hp('70%'),
    width: wp('100%'),
    marginTop: hp('30%'),
    alignSelf: 'center',
    borderRadius: hp(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.blueButton,
    paddingBottom: hp('1%'),
  },
  closeImage: {
    height: hp(3),
    width: hp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  closeButton: {
    marginLeft: hp('7%'),
  },
  createInvoiceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blueButton,
  },
  TextInputContainer: {
    marginTop: hp('1%'),
  },
  textInput: {
    height: hp(6),
    borderRadius: 5,
    fontSize: 14,
    padding: 10,
    backgroundColor: colors.background,
    width: '100%',
    borderColor: colors.blueButton,
    borderWidth: 0.5,
    marginVertical: hp(0.5),
  },
  label: {
    height: hp(6),
    borderRadius: 5,
    fontSize: 14,
    padding: 10,
    backgroundColor: colors.background,
    width: '100%',
    borderColor: colors.blueButton,
    borderWidth: 0.5,
    marginVertical: hp(0.5),
    justifyContent: 'center',
  },
  date: {
    color: '#c9c9cb',
  },
  btn: {
    height: hp('5%'),
    width: wp('90%'),
    marginTop: hp(1),
  },
  btnTitle: {
    fontSize: 16,
  },
  dropdownText: {
    fontSize: 14,
    // color: colors.placeholder,
    textAlign: 'left',
  },
});
