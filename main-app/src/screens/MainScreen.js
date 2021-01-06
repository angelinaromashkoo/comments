import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../common/Spacer';
import tracker from '../api/tracker';

const MainScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const [data, setData] = useState([]);

  const [comments, setComment] = useState([]);

  useEffect(() => {
    result();
  });

  const result = () => {
    tracker.get('/users').then((res) => setData(res.data));
  };

  const handleClick = (id) => {
    tracker.get('/comments').then((comments) => setComment(comments));
    navigation.navigate('UserDetails', {comments, id});
  };

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity onPress={() => handleClick(item._id, item.comments)}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bababa',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    paddingLeft: 15,
  },
});

export default MainScreen;
