import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TitleMedium = ({ title, alignSelf }) => {
  return (
    <View style={{ marginBottom: '2%', alignSelf: alignSelf || 'center' }}>
      <Text style={{ color: colors.black, fontSize: size.medium }}>
        {title}
      </Text>
    </View>
  );
};

export default TitleMedium;
