import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../styles/colors';

const ButtonFooter = ({ title, onPress, loading }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonFooter;