import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as AppContext} from '../context/AppContext';
import Spacer from '../common/Spacer';

const UserDetailsScreen = ({navigation, route}) => {
  const {comments} = route.params;

  const {state} = useContext(AppContext);

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.comment}>{item.comment}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onCreateComment = useCallback(() => {}, []);

  const onAddComment = useCallback(() => {}, []);

  return (
    <>
      {comments.length ? (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.title}>No comments yet, please create them</Text>
      )}

      <Spacer>
        <Button
          title="Create comment"
          onPress={comments.length ? onAddComment : onCreateComment}
        />
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
  comment: {
    fontSize: 18,
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default UserDetailsScreen;
