import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {InvoiceList} from '~/models/Invoice';
import styles from './styles';
import {toJS} from 'mobx';
import {Button, CreateInvoiceModal, FilterModal} from '~/components';
import {hp} from '~/constants/dimensions';
import colors from '~/constants/colors';
import {images} from '~/assets/images';

export const Home = observer(props => {
  const [invoices] = useState(() => new InvoiceList());
  const [filterModal, setFilterModal] = useState(false);
  const [createInvoiceModal, setCreateInvoiceModal] = useState(false);

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

  const toggleFilterModal = useCallback(() => {
    invoices.refresh();
    setFilterModal(s => !s);
  }, [setFilterModal, invoices]);

  const onInvoiceModalClose = invoice => {
    if (invoice) {
      invoices.createInvoice(invoice);
    }
    setCreateInvoiceModal(false);
  };

  // renderItem Function.
  const RenderItem = observer(({item, index}) => {
    return (
      <View style={styles.cardStyling} key={index}>
        <Text style={styles.invoiceNumberText}>{item?.invoiceNumber}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.balanceAmountText}>Balance Amount: </Text>
          <Text style={styles.balanceAmountText1}>{item?.balanceAmount}</Text>
          <Text style={styles.currency}>{item?.currency}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.description}>Description: </Text>
          <Text style={styles.description1}>{item?.description}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.dueDate}>Due Date: </Text>
          <Text style={styles.dueDate1}>{item?.dueDate}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceDate}>Invoice Date:</Text>
          <Text style={styles.invoiceDate1}>{item?.invoiceDate}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: hp('2%'),
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
      <View style={{marginTop: 15}} />
      <FlatList
        refreshing={invoices.isSearching}
        onRefresh={() => {}}
        extraData={toJS(invoices.list)}
        style={{flex: 1}}
        data={invoices.list}
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <RenderItem item={item} />}
        ListFooterComponent={FooterComponent}
      />
      <TouchableOpacity
        onPress={() => setCreateInvoiceModal(true)}
        style={styles.floatingButton}>
        <Image
          source={images.floatingImage}
          style={styles.floatingImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <FilterModal isVisible={filterModal} onClose={toggleFilterModal} />
      <CreateInvoiceModal
        isVisible={createInvoiceModal}
        onClose={onInvoiceModalClose}
      />
    </View>
  );
});
