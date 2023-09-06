import React from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const ModalError = ({visible, title, titleButton, onPressButton}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centerContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Text style={styles.text}>{titleButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalError;
