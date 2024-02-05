import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TitleLarge = ({ title, alignSelf }) => {
  return (
    <View style={{ alignSelf: alignSelf || 'center', margin: '1%', }}>
      <Text style={{ color: colors.black, fontSize: size.large, }}>
        {title}
      </Text>
    </View>
  );
};

export default TitleLarge;