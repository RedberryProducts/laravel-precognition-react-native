# Laravel Precognition React Native

## Introduction

Laravel Precognition React Native allows you to anticipate the outcome of a future HTTP request. One of the primary use cases of Precognition is the ability to provide "live" validation in your react native application.

### Install

#### npm

```bash
npm i @rayredberry/laravel-precognition-react-native
```

#### yarn

```bash
yarn add @rayredberry/laravel-precognition-react-native
```

### Wrapper

import PrecognitionWrapper in your App.tsx file and put your code inside

```bash
import PrecognitionWrapper from '@rayredberry/laravel-precognition-react-native';

<PrecognitionWrapper>
  {children}
</PrecognitionWrapper>

```

### Initial Precognition

import Precognition module in your App.tsx file and call init method

```bash
import {Precognition} from '@rayredberry/laravel-precognition-react-native';

Precognition.init({
  url: '', // your restAPI
  headers: {
    'Authorization':'Bearer ${token}'
    ...additional headers
    },
});
```

### usePrecognition Hook

usePrecognition is generic custom hook which takes one parameter and value types

```bash
const {} = usePrecognition<{
    // value types
    first_name: string;
    last_name: string;
    password: string;
    ...other form values
  }>({
    method: " 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'GET' ",
    endpoint: 'your restAPI endpoint',
  });
```

### Value Table

| Returned Values |                                   Types                                    |                             Description                             |
| --------------- | :------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| submit          |          (values: T) => Promise<ResponseReturType \| undefined>;           |                             form values                             |
| validateValues  | (vals: Partial<Record<keyof T, any>>, fieldName?: string) => Promise<void> | vals is form values, fieldName is string to catch touched textinput |
| errors          |                                 T \| null                                  |                                                                     |
| setErrors       |              React.Dispatch<React.SetStateAction<T \| null>>               |                                                                     |
| setDisabled     |               React.Dispatch<React.SetStateAction<boolean>>                |                                                                     |
| disabled        |                                  boolean                                   |                                                                     |
| touched         |                                 T \| null                                  |                                                                     |
| loading         |                                  boolean                                   |                                                                     |

### Sample Form usage

```bash
import {View, StyleSheet, TextInput, Text, Button, Switch} from 'react-native';
import React from 'react';
import usePrecognition from '@rayredberry/laravel-precognition-react-native';

const SomeForm = () => {
  const {validateValues, errors, touched, submit, disabled} = usePrecognition<{
    first_name: string;
    last_name: string;
    tin: string;
    password: string;
    consent_term: boolean;
  }>({
    method: 'POST',
    endpoint: 'register',
  });

  const [values, setValues] = React.useState<{
    first_name: string;
    last_name: string;
    tin: string;
    password: string;
    password_confirmation: string;
    consent_term: boolean;
  }>({
    first_name: '',
    last_name: '',
    tin: '',
    password: '',
    password_confirmation: '',
    consent_term: true,
  });

  const handleChange = (val: any, key: string) => {
    setValues(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="first_name"
          placeholderTextColor={'#000000'}
          value={values.first_name}
          onChangeText={text => handleChange(text, 'first_name')}
          onBlur={() =>
            validateValues(
              {
                ...values,
                first_name: values.first_name,
              },
              'first_name',
            )
          }
        />
        {errors?.first_name && touched?.first_name && (
          <Text style={{color: 'red', fontSize: 18}}>{errors?.first_name}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="last_name"
          placeholderTextColor={'#000000'}
          value={values.last_name}
          onChangeText={text => handleChange(text, 'last_name')}
          onBlur={() =>
            validateValues(
              {
                ...values,
                last_name: values.last_name,
              },
              'last_name',
            )
          }
        />
        {errors?.last_name && touched?.last_name && (
          <Text style={{color: 'red', fontSize: 18}}>{errors?.last_name}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="tin"
          placeholderTextColor={'#000000'}
          value={values.tin}
          onChangeText={text => handleChange(text, 'tin')}
          onBlur={() =>
            validateValues(
              {
                ...values,
                tin: values.tin,
              },
              'tin',
            )
          }
        />
        {errors?.tin && touched?.tin && (
          <Text style={{color: 'red', fontSize: 18}}>{errors?.tin}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor={'#000000'}
          value={values.password}
          onChangeText={text => handleChange(text, 'password')}
          onBlur={() =>
            validateValues(
              {
                ...values,
                password: values.password,
              },
              'password',
            )
          }
        />
        {errors?.password && touched?.password && (
          <Text style={{color: 'red', fontSize: 18}}>{errors?.password}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor={'#000000'}
          value={values.password_confirmation}
          onChangeText={text => handleChange(text, 'password_confirmation')}
          onBlur={() =>
            validateValues(
              {
                ...values,
                password: values.password,
              },
              'password',
            )
          }
        />
        {errors?.password && touched?.password && (
          <Text style={{color: 'red', fontSize: 18}}>{errors?.password}</Text>
        )}
      </View>
      <View>
        <Switch
          value={values.consent_term}
          onValueChange={val => {
            handleChange(val, 'consent_term');
            validateValues(
              {
                ...values,
                consent_term: val,
              },
              'consent_term',
            );
          }}
        />
        {errors?.consent_term && touched?.consent_term && (
          <Text style={{color: 'red', fontSize: 18}}>
            {errors?.consent_term}
          </Text>
        )}
      </View>
      <Button
        title="submit"
        onPress={() => submit(values)}
        disabled={disabled}
      />
    </View>
  );
};

export default SomeForm;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 42,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

```
