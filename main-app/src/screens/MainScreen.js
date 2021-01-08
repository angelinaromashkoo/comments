import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AppContext} from '../context/AppContext';
import Spacer from '../common/Spacer';
import tracker from '../api/tracker';

const MainScreen = ({navigation}) => {
  const {state, signout} = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    result();
  }, []);

  const result = () => {
    tracker.get('/users').then((res) => setData(res.data));
  };

  const handleClick = (id) => {
    tracker
      .get(`/comments?receiverId=${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((comments) => {
        console.log(comments.data, 'comments');
        navigation.navigate('UserDetails', {comments: comments.data});
      })
      .catch((e) => console.log(e));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleClick(item._id)}>
      <View style={styles.container}>
        {state.userId === item._id ? (
          <Text style={styles.title}>My Profile</Text>
        ) : (
          <Text style={styles.title}>{item.name}</Text>
        )}
      </View>
    </TouchableOpacity>
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
