import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {InvoiceList} from '~/models/Invoice';
import styles from './styles';
import {toJS} from 'mobx';
import {Button, FilterModal} from '~/components';

export const Home = observer(props => {
  const [invoices] = useState(() => new InvoiceList());
  const [filterModal, setFilterModal] = useState(false);

  const FooterComponent = observer(() => {
    if (invoices.hasMoreRecorrds) {
      return (
        <Button
          isLoading={invoices.loading}
          title={'Load more'}
          style={{marginBottom: 30, alignSelf: 'center'}}
          onPress={invoices.getInvoices}
        />
      );
    }
    return null;
  });

  console.log(filterModal);
  const toggleFilterModal = useCallback(() => {
    setFilterModal(s => !s);
  }, [setFilterModal]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TextInput
          placeholder="Search invoice"
          style={styles.search}
          onChangeText={invoices.onSearch}
        />
        <Button
          title="Filter"
          style={{width: '20%', marginLeft: 10}}
          onPress={toggleFilterModal}
        />
      </View>
      <FlatList
        extraData={toJS(invoices.list)}
        style={{flex: 1}}
        data={invoices.list}
        keyExtractor={item => item.invoiceId}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={{marginVertical: 10}}>
              <Text>{item?.invoiceNumber}</Text>
              <Text>{item?.balanceAmount}</Text>
              <Text>{item?.currency}</Text>
              <Text>{item?.description}</Text>
              <Text>dueDate: {item?.dueDate}</Text>
              <Text>invoiceDate: {item?.invoiceDate}</Text>
            </View>
          );
        }}
        ListFooterComponent={FooterComponent}
      />
      <FilterModal isVisible={filterModal} onClose={toggleFilterModal} />
    </View>
  );
});
