import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AppContext';
import * as NavigationService from '../navigationService/NavigationService';
import {TextStyle, ViewStyle} from '../styles';

const SigninScreen = () => {
  const {state, signin} = useContext(AuthContext);

  const onClick = () => {
    NavigationService.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <AuthForm
        errorMessage={state.errorMessage}
        onSubmitButtonText="Sign In"
        onSubmit={signin}
      />
      <TouchableOpacity onPress={onClick}>
        <Spacer>
          <Text style={styles.link}>
            Don't have an account? Sign up instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: ViewStyle.authContainer,
  link: TextStyle.linkText,
});

export default SigninScreen;
