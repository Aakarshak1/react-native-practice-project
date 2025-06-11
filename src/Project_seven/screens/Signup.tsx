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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Snackbar from 'react-native-snackbar';

import { AuthStackParamList } from '../routes/AuthStack';
import { useAppwriteContext } from '../appwrite/AppwriteContext';

const SignUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type SignUpFormData = z.infer<typeof SignUpSchema>;

type _SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

/**
  onPress={() => navigation.navigate('Home')}
  onPress={() => navigation.goBack()} // one Screen Back
  onPress={() => navigation.pop(1)}
  onPress={() => navigation.popToTop()}
 */

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const { appwrite, setIsLoggedIn } = useAppwriteContext();

  const onSubmit = async (data: SignUpFormData) => {
    const user = {
      email: data.email,
      password: data.password,
      name: data.name,
    };

    try {
      const response = await appwrite.createUserAccount(user);
      if (response) {
        setIsLoggedIn(true);
        Snackbar.show({
          text: 'Signup success',
          duration: Snackbar.LENGTH_SHORT,
        });
        reset(); // reset form on success
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert('Signup Error', e.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Test App</Text>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setValue('name', text)}
          {...register('name')}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
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

        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={text => setValue('confirmPassword', text)}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        <View style={styles.buttonGroup}>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={[styles.btn, { marginTop: errors ? 10 : 20 }]}>
            <Text style={styles.btnText}>Signup</Text>
          </Pressable>
          <Pressable onPress={() => reset()}>
            <Text style={styles.btnText}>Reset</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;

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
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});
