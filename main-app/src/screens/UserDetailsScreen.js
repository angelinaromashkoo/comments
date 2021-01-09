import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Context as AppContext} from '../context/AppContext';
import Spacer from '../common/Spacer';
import {tracker} from '../api/tracker';
import {THEME} from '../theme';

const UserDetailsScreen = ({navigation, route}) => {
  const {comments, id} = route.params;
  const {state} = useContext(AppContext);
  const isCommentCreate = state.userId !== id;

  const [isModalVisible, setModalVisible] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [commentValue, setCommentValue] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onEditPress = () => {
    const {senderId, receiverId} = editComment;

    const body = {
      senderId,
      receiverId,
      comment: commentValue,
    };

    tracker
      .post(`/comments/edit?id=${id}`, body, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .catch((e) => console.log(e, 'ERORR'))
      .then((data) => data && toggleModal());
  };

  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <Spacer />
            <Input
              value={commentValue}
              onChangeText={(text) => setCommentValue(text)}
            />
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="Done"
                color={THEME.MAIN_COLOR}
                onPress={onEditPress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color={THEME.DANGER_COLOR}
                onPress={toggleModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const deleteComment = () => {
    tracker
      .delete(`/comments/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => console.log('Success'));
  };

  const onRemove = () => {
    Alert.alert(
      'Delete a comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Delete',
          onPress: () => {
            deleteComment();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = useCallback(({item}) => {
    const isUserProfile = state.userId === item.receiverId;
    const isUserComment = state.userId === item.senderId;

    return (
      <View style={{flex: 1}}>
        <View style={styles.buttonContainer}>
          <View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
          {isUserComment && (
            <>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  setEditComment(item);
                  setCommentValue(item.comment);
                }}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemove()}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </>
          )}

          {isUserProfile && (
            <TouchableOpacity onPress={() => onRemove()}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, []);

  const onCreateComment = useCallback(({senderId, receiverId, comment}) => {
    tracker
      .post('/comments/create', {senderId, receiverId, comment}, {})
      .then();
  }, []);

  return (
    <View style={{flex: 1}}>
      {isModalVisible && renderModal()}
      {comments.length ? (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.title}>No comments yet, please create them</Text>
      )}

      {isCommentCreate && (
        <Spacer>
          <Button
            title="Create comment"
            color={THEME.MAIN_COLOR}
            onPress={onCreateComment}
          />
        </Spacer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 10,
  },
  edit: {
    fontSize: 18,
    marginTop: 10,
    color: 'blue',
  },
  delete: {
    fontSize: 18,
    marginTop: 10,
    color: 'red',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default UserDetailsScreen;
