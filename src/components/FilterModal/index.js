import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '~/constants/colors';
import invoiceFilter from '~/models/InvoiceFilter';
import DatePicker from 'react-native-date-picker';
import {hp, wp} from '~/constants/dimensions';
import {images} from '~/assets/images';

// Note: This is a bad component (Not optimized due to time constaints)

// TODO:
// 1- Remove inline styles.
// 2- Create component for repetitive code

export const FilterModal = observer(({isVisible, onClose = () => {}}) => {
  const [dateBy, setDateBy] = useState('');

  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.createInvoiceText}>Filter Invoices:</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image
              source={images.close}
              style={styles.closeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.heading}>Order</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {invoiceFilter.orders.map(order => {
              return (
                <TouchableOpacity
                  onPress={() => invoiceFilter.setOrder(order)}
                  style={{
                    width: '48%',
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:
                      invoiceFilter.order === order ? 'green' : 'black',
                  }}>
                  <Text style={{textTransform: 'capitalize'}}>{order}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <Text style={styles.heading}>Sort By</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {invoiceFilter.sorts.map(sort => {
                return (
                  <TouchableOpacity
                    onPress={() => invoiceFilter.setSortBy(sort)}
                    style={{
                      marginVertical: 5,
                      width: '48%',
                      height: 50,
                      borderWidth: 2,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor:
                        invoiceFilter.sortBy === sort ? 'green' : 'black',
                    }}>
                    <Text style={{textTransform: 'capitalize'}}>{sort}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Select Date Range</Text>
            <View>
              <Text>From Date: </Text>
              <TouchableOpacity
                onPress={() => setDateBy('fromDate')}
                style={{
                  marginVertical: 5,
                  width: '100%',
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{textTransform: 'capitalize'}}>
                  {invoiceFilter?.fromDate?.toDateString?.() || 'Select Date'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>To Date: </Text>
              <TouchableOpacity
                onPress={() => setDateBy('toDate')}
                style={{
                  marginVertical: 5,
                  width: '100%',
                  height: 50,
                  borderWidth: 2,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{textTransform: 'capitalize'}}>
                  {invoiceFilter?.toDate?.toDateString?.() || 'Select Date'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.heading}>Status By</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            }}>
            {invoiceFilter.statuses.map(status => {
              return (
                <TouchableOpacity
                  onPress={() => invoiceFilter.setStatusBy(status)}
                  style={{
                    marginVertical: 5,
                    width: '40%',
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:
                      invoiceFilter.status === status ? 'green' : 'black',
                  }}>
                  <Text style={{textTransform: 'capitalize'}}>{status}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <DatePicker
          mode="date"
          modal
          open={!!dateBy}
          date={invoiceFilter[dateBy] || new Date()}
          onConfirm={date => {
            invoiceFilter.setAttribute(dateBy, date);
            setDateBy('');
          }}
          onCancel={() => {
            setDateBy('');
          }}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaeaea',
    height: hp('70%'),
    width: wp(100),
    marginTop: hp('20%'),
    alignSelf: 'center',
    borderRadius: hp(2),
    marginBottom: -20,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
  createInvoiceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blueButton,
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
});
