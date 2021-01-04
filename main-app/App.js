import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainScreen from './src/screens/MainScreen';
import DetailUserScreen from './src/screens/DetailUserScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as UsersProvider} from './src/context/UsersContext';
import {navigationRef} from './src/navigationService/NavigationService';
import {isReadyRef} from './src/navigationService/NavigationService';

const Stack = createStackNavigator();

function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{
            title: 'Sign in',
            headerStyle: {
              backgroundColor: '#1ed4f4',
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{
            title: 'Sign up',
            headerStyle: {
              backgroundColor: '#1ed4f4',
            },
          }}
        />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="UserDetails" component={DetailUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <UsersProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UsersProvider>
  );
};
