import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Context as AppContext} from '../context/AppContext';
import Spacer from '../common/Spacer';
import {tracker} from '../api/tracker';
import {THEME} from '../theme';
import {ModalInfoScreen} from '../common/ModalInfoScreen';
import {ButtonsStyle, TextStyle, ViewStyle} from '../styles';

const UserDetailsScreen = ({route}) => {
  const {comments, chosenUserId} = route.params;
  const {state} = useContext(AppContext);
  const isCommentCreate = state.userId !== chosenUserId;

  const [commentsData, setCommentsData] = useState(comments);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [commentValue, setCommentValue] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefreshComments = () => {
    setIsRefreshing(true);
    tracker
      .get(`/comments?receiverId=${chosenUserId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((data) => setCommentsData(data.data))
      .finally(() => setIsRefreshing(false));
  };

  const onEditPress = () => {
    const {senderId, receiverId, _id} = editComment;

    tracker
      .post(
        `/comments/edit?id=${_id}`,
        {
          senderId,
          receiverId,
          comment: commentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      )
      .then((data) => data && toggleModal())
      .catch((e) => console.log(e, 'ERORR'));
  };

  const deleteComment = (commentId) => {
    tracker.delete(`/comments/delete?id=${commentId}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const onCreateComment = useCallback(() => {
    tracker
      .post(
        '/comments/create',
        {
          senderId: state.userId,
          receiverId: chosenUserId,
          comment: commentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .finally(() => {
        setIsCreate(false);
        toggleModal();
      });
  }, [state.userId, chosenUserId, commentValue]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderModal = () => {
    return (
      <ModalInfoScreen
        isModalVisible={isModalVisible}
        inputValue={commentValue}
        inputOnChangeText={(text) => setCommentValue(text)}
        doneButtonPress={isCreate ? onCreateComment : onEditPress}
        cancelButtonPress={() => {
          toggleModal();
          isCreate && setIsCreate(false);
        }}
      />
    );
  };

  const renderRemoveAlert = (commentId) => {
    Alert.alert(
      'Delete a comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Delete',
          onPress: () => deleteComment(commentId),
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
        <View style={styles.container}>
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
              <TouchableOpacity onPress={() => renderRemoveAlert(item._id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </>
          )}

          {isUserProfile && (
            <TouchableOpacity onPress={() => renderRemoveAlert(item._id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      {isModalVisible && renderModal()}
      {comments?.length ? (
        <FlatList
          data={commentsData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={onRefreshComments}
        />
      ) : (
        <Text style={styles.title}>No comments yet, please create them</Text>
      )}

      {isCommentCreate && (
        <Spacer>
          <Button
            title="Create comment"
            color={THEME.MAIN_COLOR}
            onPress={() => {
              setIsCreate(true);
              toggleModal();
            }}
          />
        </Spacer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: ViewStyle.viewContainer,
  comment: TextStyle.comment,
  title: TextStyle.title,
  edit: TextStyle.edit,
  delete: TextStyle.deleteTitle,
  button: ButtonsStyle.button,
  buttons: ButtonsStyle.buttons,
});

export default UserDetailsScreen;
