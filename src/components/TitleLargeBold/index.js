import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TitleLargeBold = ({ title, alignSelf }) => {
  return (
    <View style={{ alignSelf: alignSelf || 'center', marginHorizontal: '4%', marginBottom: '4%', }}>
      <Text style={{ color: colors.black, fontSize: size.large, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
  );
};

export default TitleLargeBold;