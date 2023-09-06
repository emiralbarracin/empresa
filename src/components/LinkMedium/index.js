import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const LinkMedium = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkMedium;
