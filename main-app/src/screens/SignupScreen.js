import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../common/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import * as NavigationService from '../navigationService/NavigationService';

const SignupScreen = () => {
  const {state, signup} = useContext(AuthContext);

  const onClick = () => {
    NavigationService.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <AuthForm
        errorMessage={state.errorMessage}
        onSubmitButtonText="Sign Up"
        onSubmit={signup}
      />
      <TouchableOpacity onPress={onClick}>
        <Spacer>
          <Text style={styles.link}>
            Already have an account? Sign in instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
  link: {
    color: 'blue',
    marginBottom: 10,
  },
});

export default SignupScreen;
