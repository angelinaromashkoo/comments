import React, {useCallback} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../common/Spacer';

const UserDetailsScreen = ({navigation, route}) => {
  const {comments} = route.params;

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.comment}</Text>
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
        <Text>No comments yet, please create them</Text>
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

const styles = StyleSheet.create({});

export default UserDetailsScreen;
