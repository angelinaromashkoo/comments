import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const UserDetailsScreen = ({navigation, route}) => {
  const {comments, id} = route.params;

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Details</Text>
      <Text>itemId: {id}</Text>
      <Text>comments: {comments}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserDetailsScreen;
