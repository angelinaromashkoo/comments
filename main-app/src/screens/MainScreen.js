import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../common/Spacer';

const MainScreen = () => {
  const {signout} = useContext(AuthContext);

  return (
    <>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
