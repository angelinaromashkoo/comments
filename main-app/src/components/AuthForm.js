import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Spacer from '../common/Spacer';
import {THEME} from '../theme';
import {TextStyle} from '../styles';

const AuthForm = ({errorMessage, onSubmit, onSubmitButtonText}) => {
  const [name, setName] = useState('Lina');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('mypassword');

  return (
    <View style={styles.container}>
      <Spacer />
      <Input label="Name" value={name} onChangeText={setName} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={onSubmitButtonText}
          onPress={() => onSubmit({name, email, password})}
          color={THEME.MAIN_COLOR}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: TextStyle.errorText,
  container: {
    flex: 1,
  },
});

export default AuthForm;
