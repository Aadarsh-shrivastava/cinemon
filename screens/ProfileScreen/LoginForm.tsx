import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Button from 'components/Button';
import useAuth from 'contexts/authContext';

// Define the Zod schema
const schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
});

// Define the types using Zod inference
type FormInputs = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });
  const {signInWithEmailANdPassWord, signUp} = useAuth();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
    signInWithEmailANdPassWord(data.email, data.password);
    // Perform your login logic here, such as calling an API
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={text => setValue('email', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={'black'}
        secureTextEntry
        onChangeText={text => setValue('password', text)}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      <Button
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        width={'90%'}
        barStyle={{marginTop: 24}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // padding: 16,
    // margin: 10,
    width: '100%',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    padding: 8,
    width: '90%',
    height: 50,
    marginTop: 24,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export default LoginForm;
