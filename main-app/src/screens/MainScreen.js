import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../common/Spacer';
import tracker from '../api/tracker';

const MainScreen = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const [data, setData] = useState([]);

  /*const [comments, setComments] = useState([]);*/

  useEffect(() => {
    result();
  }, []);

  const result = () => {
    tracker.get('/users').then((res) => setData(res.data));
  };

  const handleClick = (id) => {
    debugger;
    tracker
      .get(`/comments?receiverId=${id}`, {
        headers: {
          "Authorization":
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmYwOGY5YTg5M2Q4ZTM4YTg1Y2Y3ZDkiLCJpYXQiOjE2MDk2MDc2OTl9.KSccDmjNPIBHtyh7GZMn1Rejlkh01V1V0ZwU-CeLygg',
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
        <Text style={styles.title}>{item.name}</Text>
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
