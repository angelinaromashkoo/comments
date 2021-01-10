import React, {memo} from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';
import Spacer from './Spacer';
import {Input} from 'react-native-elements';
import {THEME} from '../theme';
import {ButtonsStyle, ViewStyle} from '../styles';

export const ModalInfoScreen = memo(
  ({
    isModalVisible,
    inputValue,
    inputOnChangeText,
    doneButtonPress,
    cancelButtonPress,
  }) => {
    return (
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.container}>
          <View>
            <Spacer />
            <Input value={inputValue} onChangeText={inputOnChangeText} />
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="Done"
                color={THEME.MAIN_COLOR}
                onPress={doneButtonPress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color={THEME.DANGER_COLOR}
                onPress={cancelButtonPress}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  container: ViewStyle.modalContainer,
  button: ButtonsStyle.button,
  buttons: ButtonsStyle.buttons,
});
