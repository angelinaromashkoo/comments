import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../common/Spacer';
import tracker from '../api/tracker';

const MainScreen = () => {
  const {signout} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    result();
  });

  const result = () => {
    tracker.get('/users').then((res) => setData(res.data));
  };

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.container}>
        <TouchableOpacity>
          <View>
            <Text>{item.name}</Text>;
          </View>
        </TouchableOpacity>
      </View>
    ),
    [],
  );
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
