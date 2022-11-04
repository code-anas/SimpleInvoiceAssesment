import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import colors from '~/constants/colors';
import {hp} from '~/constants/dimensions';
import {InvoiceService} from '~/services';
import styles from './styles';

export const Home = props => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    InvoiceService.find().then(res => {
      setInvoices(res.data.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search invoice" style={styles.search} />
      <FlatList
        fla
        style={{flex: 1}}
        data={invoices}
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <View>
              <Text>{item?.type}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
