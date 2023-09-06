import { View } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const HorizontalLine = () => {
    return (
        <View
            style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 1,
                width: '100%',
                marginTop: '1%'
            }}
        />
    );
};

export default HorizontalLine;