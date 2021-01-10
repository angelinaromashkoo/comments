import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {Context as AppContext} from '../context/AppContext';
import Spacer from '../common/Spacer';
import {tracker} from '../api/tracker';
import {THEME} from '../theme';
import {TextStyle, ViewStyle} from '../styles';

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
        navigation.navigate('UserDetails', {
          comments: comments.data,
          chosenUserId: id,
        });
      })
      .catch((e) => console.log(e));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleClick(item._id)}>
      <View style={styles.container}>
        <Text style={styles.userTitle}>
          {state.userId === item._id ? 'My Profile' : item.name}
        </Text>
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
        <Button title="Sign Out" onPress={signout} color={THEME.MAIN_COLOR} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  container: ViewStyle.viewContainer,
  userTitle: TextStyle.userTitle,
});

export default MainScreen;
