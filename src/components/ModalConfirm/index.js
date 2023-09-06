import React from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const ModalConfirm = ({
  visible,
  title,
  titleButtonLeft,
  titleButtonRight,
  onPressButtonLeft,
  onPressButtonRight,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centerContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonLeft} onPress={onPressButtonLeft}>
              <Text style={styles.text}>{titleButtonLeft}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={onPressButtonRight}>
              <Text style={styles.text}>{titleButtonRight}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;
