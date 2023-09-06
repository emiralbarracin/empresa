import { View, TextInput, Text, Platform } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconInputMoneyDollar = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  const parsedValue = parseFloat(value);
  const formattedValue = isNaN(parsedValue)
    ? ''
    : `u$s ${parsedValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;


  return (
    <View style={styles.container}>
      <View style={styles.inputIconContainer}>
        <View style={styles.inputContainer}>
          {/* <FontAwesome name={'money'} style={styles.icon} /> */}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            cursorColor={colors.white} //cambia el color del cursor a blanco
            selectionColor={colors.white} //cambia el color del cursor a blanco
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            color={colors.white}
          />
          {value !== '' && (
            <Text style={[styles.overlayText, { opacity: value !== '' ? 1 : 0 }]}>
              {formattedValue}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default IconInputMoneyDollar;