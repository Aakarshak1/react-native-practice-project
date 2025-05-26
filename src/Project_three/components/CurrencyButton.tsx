import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = ({ flag, name }: CurrencyButtonProps) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.flag}>{flag}</Text>
    <Text style={styles.country}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#2d3436',
  },
});

export default CurrencyButton;
