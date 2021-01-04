import React, {useContext} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UsersContext} from '../context/UsersContext';
import Spacer from '../common/Spacer';

const MainScreen = () => {
  const {signout} = useContext(AuthContext);
  const {state, fetchUsers} = useContext(UsersContext);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          return <ListItem chevron title={item.name} />;
        }}
      />
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
