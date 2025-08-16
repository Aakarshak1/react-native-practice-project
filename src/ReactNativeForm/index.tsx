import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

type ErrorObjType = { userName?: string; password?: string };

const App = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ErrorObjType>({});

  const validateForm = () => {
    let error: ErrorObjType = {};

    if (!userName) error.userName = 'username is Required';
    if (!password) error.password = 'password is Required';
    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      console.log('submitted');
      setPassword('');
      setUserName('');
      setError({});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : undefined}
      style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}> Username</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your username"
          value={userName}
          onChangeText={setUserName}
        />
        {error.userName ? (
          <Text style={styles.errorText}> {error.userName} </Text>
        ) : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error.password ? (
          <Text style={styles.errorText}> {error.password} </Text>
        ) : null}
        <Button title="Login" onPress={handleFormSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default App;
