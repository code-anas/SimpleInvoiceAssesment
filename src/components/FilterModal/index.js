import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from '~/constants/colors';
import invoiceFilter from '~/models/InvoiceFilter';
import DatePicker from 'react-native-date-picker';

export const FilterModal = observer(({isVisible, onClose = () => {}}) => {
  const [dateBy, setDateBy] = useState('');

  return (
    <Modal
      isVisible={isVisible}
      style={{
        backgroundColor: colors.background,
        borderRadius: 10,
      }}>
      <View style={{flex: 1, padding: 20}}>
        <Button title="Hide modal" onPress={onClose} />

        <View>
          <Text>Order</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {invoiceFilter.orders.map(order => {
              return (
                <TouchableOpacity
                  onPress={() => invoiceFilter.setOrder(order)}
                  style={{
                    width: '40%',
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
            <Text>Sort By</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}>
              {invoiceFilter.sorts.map(sort => {
                return (
                  <TouchableOpacity
                    onPress={() => invoiceFilter.setSortBy(sort)}
                    style={{
                      marginVertical: 5,
                      width: '40%',
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
            <Text>Date Range</Text>
            <View>
              <Text>From Data: </Text>
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
                  {invoiceFilter?.fromDate?.toDateString?.() || 'Slect Date'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>To Data: </Text>
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
                  {invoiceFilter?.toDate?.toDateString?.() || 'Slect Date'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text>Status By</Text>
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
