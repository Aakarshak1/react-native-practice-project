import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type PasswordDisplayType = {
  password: string;
};

function PasswordDisplay({ password }: PasswordDisplayType) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated Password:</Text>
      <Text selectable style={styles.password}>
        {password}
      </Text>
    </View>
  );
}

export default PasswordDisplay;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  password: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 5,
  },
});
