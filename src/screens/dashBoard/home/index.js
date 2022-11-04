import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {InvoiceList} from '~/models/Invoice';
import styles from './styles';
import {toJS} from 'mobx';
import {Button} from '~/components';

export const Home = observer(props => {
  const [invoices] = useState(() => new InvoiceList());

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

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search invoice"
        style={styles.search}
        onChangeText={invoices.onSearch}
      />
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
            </View>
          );
        }}
        ListFooterComponent={FooterComponent}
      />
    </View>
  );
});
