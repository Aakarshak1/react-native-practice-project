/* eslint-disable react/jsx-props-no-spreading */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { currencyByRupee } from './constant';
import CurrencyButton from './components/CurrencyButton';
import { Currency } from './types';

const CurrencyConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [resultValue, setResultValue] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter Value to Convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const amount = parseFloat(inputValue);

    if (Number.isNaN(amount)) {
      return Snackbar.show({
        text: 'Enter Value to Convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const convertedValue = amount * targetValue.value;
    const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
    setResultValue(result);
    setTargetCurrency(targetValue.name);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);

    if (text.trim() === '') {
      setResultValue(''); // or set to '--' or 0
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rupeesContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            maxLength={14}
            value={inputValue}
            clearButtonMode="always"
            keyboardType="number-pad"
            onChangeText={handleInputChange}
            placeholder="Enter Amount"
            style={styles.inputAmountField}
          />
        </View>
        <View style={styles.resultContainer}>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.button,
                targetCurrency === item.name && styles.selected,
              ]}
              onPress={() => buttonPressed(item)}>
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c', // Slightly darker for better contrast
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultContainer: {
    minHeight: 40,
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultTxt: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 12,
  },
  inputAmountField: {
    height: 44,
    width: 220,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  button: {
    width: '28%',
    margin: '2%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default CurrencyConverter;
