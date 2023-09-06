import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  iconName,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputIconContainer}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name={iconName} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            cursorColor={colors.black}
            color={colors.black}
            keyboardType={keyboardType}
            maxLength={maxLength}
            autoCapitalize="none" // Agregado para activar minúscula en la primera letra
          />
        </View>
      </View>
    </View>
  );
};

export default IconInput;
