import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../common/Spacer';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';

const SigninScreen = () => {
  const {state, signin} = useContext(AuthContext);

  const {container, link} = styles;

  return (
    <View style={container}>
      <AuthForm
        errorMessage={state.errorMessage}
        onSubmitButtonText="Sign In"
        onSubmit={signin}
      />
      <TouchableOpacity onPress={() => {}}>
        <Spacer>
          <Text style={link}>Don't have an account? Sign up instead</Text>
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

export default SigninScreen;
