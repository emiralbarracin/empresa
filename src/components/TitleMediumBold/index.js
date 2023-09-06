import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const TitleMediumBold = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default TitleMediumBold;
