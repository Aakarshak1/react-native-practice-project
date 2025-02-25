import React from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { InitialOptionsType } from '../constant';

type CheckBoxOptionProps = {
  options: InitialOptionsType;
  toggleOption: (option: string) => void;
};

export default function CheckBoxOption({
  options,
  toggleOption,
}: CheckBoxOptionProps) {
  return (
    <View style={styles.checkboxContainer}>
      {Object.keys(options).map(key => (
        <View style={styles.checkboxView} key={key}>
          <BouncyCheckbox
            useBuiltInState={false}
            isChecked={options[key as keyof InitialOptionsType]}
            onPress={() => toggleOption(key)}
            text={key.charAt(0).toUpperCase() + key.slice(1)}
            fillColor="#29AB87"
            textStyle={styles.textStyle}
            size={20}
            iconStyle={styles.iconStyle}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    textDecorationLine: 'none',
  },
  checkboxContainer: {
    marginTop: 5,
  },
  checkboxView: {
    padding: 5,
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
});
