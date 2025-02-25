import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import PasswordForm from './components/PasswordForm';
import PasswordDisplay from './components/PasswordDisplay';
import usePasswordGenerator from './hooks/usePasswordGenerator';

export default function App() {
  const {
    password,
    isPasswordGenerated,
    generatePasswordString,
    resetPasswordState,
    options,
    toggleOption,
  } = usePasswordGenerator();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <PasswordForm
            generatePassword={generatePasswordString}
            resetPassword={resetPasswordState}
            options={options}
            toggleOption={toggleOption}
          />
        </View>
        {isPasswordGenerated && <PasswordDisplay password={password} />}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
});
