import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Snackbar from 'react-native-snackbar';

import { AuthStackParamList } from '../routes/AuthStack';
import { useAppwriteContext } from '../appwrite/AppwriteContext';

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is required'),
});

// Types
type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const { appwrite, setIsLoggedIn } = useAppwriteContext();

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      const response = await appwrite.login({ email, password });
      if (response) {
        setIsLoggedIn(true);
        Snackbar.show({
          text: 'Login successful',
          duration: Snackbar.LENGTH_SHORT,
        });
        reset();
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert('Login Failed', e.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Test Auth</Text>

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setValue('email', text)}
          {...register('email')}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={text => setValue('password', text)}
          {...register('password')}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <View style={styles.buttonGroup}>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={[styles.btn, { marginTop: errors ? 10 : 20 }]}>
            <Text style={[styles.btnText, { color: '#888888' }]}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => reset()}
            style={[styles.btn, { marginTop: errors ? 10 : 20 }]}>
            <Text style={[styles.btnText, styles.btnSecondary]}>Reset</Text>
          </Pressable>

          {/* Sign up navigation */}
          <Pressable
            onPress={() => navigation.navigate('Signup')}
            style={styles.signUpContainer}>
            <Text style={styles.noAccountLabel}>
              Don't have an account?{'  '}
              <Text style={styles.signUpLabel}>Create an account</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,
    maxWidth: 100,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
  btnSecondary: {
    color: '#888888',
  },
});
