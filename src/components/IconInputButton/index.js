import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconInputButton = ({
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    keyboardType,
    iconName,
    iconNameButton,
    onPress
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
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={onPress}>
                        <MaterialCommunityIcons
                            name={iconNameButton}
                            style={styles.iconButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default IconInputButton;