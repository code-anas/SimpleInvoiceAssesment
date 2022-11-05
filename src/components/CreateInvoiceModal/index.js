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

export const CreateInvoiceModal = observer(
  ({isVisible, onClose = () => {}}) => {
    const Accounts = ['Normal', 'Abnormal', 'Serious', 'Very Serious'];

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.createInvoiceText}>Create Invoice:</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
            <SelectDropdown
              data={Accounts}
              defaultButtonText="Select an account"
              buttonStyle={styles.textInput}
              buttonTextStyle={styles.dropdownText}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <TextInput placeholder="Invoice Number" style={styles.textInput} />
            <TextInput placeholder="Price" style={styles.textInput} />
            <TextInput placeholder="Currency" style={styles.textInput} />
            <TextInput placeholder="Invoice Date" style={styles.textInput} />
            <TextInput placeholder="Due Date" style={styles.textInput} />
          </ScrollView>
          {/* Button */}
          <View>
            <Button
              title="Add Invoice"
              AddInvoiceButton={styles.AddInvoiceButton}
              AddInvoiceButtonTitle={styles.AddInvoiceButtonTitle}
              onPress={() => {
                alert('Invoice Added...!');
                onClose();
              }}
            />
          </View>
        </View>
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
  AddInvoiceButton: {
    height: hp('5%'),
    width: wp('90%'),
    marginTop: hp(1),
  },
  AddInvoiceButtonTitle: {
    fontSize: 16,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.placeholder,
    textAlign: 'left',
  },
});
