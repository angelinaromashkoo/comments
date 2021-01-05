import React, {useContext} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UsersContext} from '../context/UsersContext';
import Spacer from '../common/Spacer';

const MainScreen = () => {
  const {signout} = useContext(AuthContext);
  const {fetchUsers} = useContext(UsersContext);
  console.log(fetchUsers);

  return (
    <View>
      <FlatList
        data={fetchUsers}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <ListItem chevron title={item.name} />;
            </TouchableOpacity>
          );
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
