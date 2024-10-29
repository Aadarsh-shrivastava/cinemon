import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Button from 'components/Button';
import useAuth from 'contexts/authContext';

const schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .nonempty('Name is required'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Please confirm your password'),
  // .refine((val, ctx) => val === ctx.parent.password, {
  //   message: "Passwords don't match",
  // }),
});

type SignUpFormInputs = z.infer<typeof schema>;

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(schema),
  });

  const {signUp} = useAuth();

  const onSubmit: SubmitHandler<SignUpFormInputs> = data => {
    console.log(data, 'form data is');
    signUp(data.email, data.password, data.name)
      .then(() => console.log('User signed up successfully'))
      .catch(error => console.error('Error signing up:', error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder="Enter your name"
        onChangeText={text => setValue('name', text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor={'black'}
        secureTextEntry
        onChangeText={text => setValue('confirmPassword', text)}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>
          {errors.confirmPassword.message?.toString()}
        </Text>
      )}

      <Button
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        width={'90%'}
        barStyle={{marginTop: 24}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SignUpForm;
