import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TitleMediumBold = ({ title, alignSelf }) => {
  return (
    <View style={{ alignSelf: alignSelf || 'center', marginBottom: '2%' }}>
      <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: size.medium, }}>
        {title}
      </Text>
    </View>
  );
};

export default TitleMediumBold;