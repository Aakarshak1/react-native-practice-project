import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CheckBoxOption from './CheckboxOption';
import { InitialOptionsType } from '../constant';

const passwordSchema = z.object({
  passwordLength: z.number().min(4).max(16),
});

type PasswordFormProps = {
  generatePassword: (passwordLength: number) => void;
  resetPassword: () => void;
  toggleOption: (value: string) => void;
  options: InitialOptionsType;
};

export default function PasswordForm({
  generatePassword,
  resetPassword,
  toggleOption,
  options,
}: PasswordFormProps) {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { passwordLength: 8 },
  });

  const handleGenerate = handleSubmit(data => {
    if (!Object.values(options).includes(true)) {
      Alert.alert('Please select at least one option');
      return;
    }
    generatePassword(data.passwordLength);
  });

  return (
    <View>
      <Controller
        control={control}
        name="passwordLength"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Text>Password Length</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(value)}
              onChangeText={val => onChange(Number(val))}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
      <CheckBoxOption options={options} toggleOption={toggleOption} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGenerate} style={styles.button}>
          <Text>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            reset();
            resetPassword();
          }}
          style={styles.button}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  error: {
    color: 'red',
  },
});
