import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonSquare = ({ onPress, iconName, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name={iconName} style={styles.icon} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSquare;