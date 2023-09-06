import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const CheckboxGroup = ({ options, onOptionSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        const newSelectedOption = option === selectedOption ? null : option;
        setSelectedOption(newSelectedOption);
        onOptionSelect(newSelectedOption);
    };

    return (
        <View>
            {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => handleOptionSelect(option)}>
                    <View style={[styles.container, selectedOption === option && styles.containerChecked]}>
                        <View style={[styles.checkbox, selectedOption === option && styles.checkboxChecked]} />
                        <Text style={styles.title}>{option}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginBottom: '4%',
    },
    containerChecked: {
        // backgroundColor: colors.colorA,
    },
    title: {
        marginLeft: '2%',
        color: colors.black,
        fontSize: size.medium,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: colors.colorA,
        borderRadius: 10,
    },
    checkboxChecked: {
        backgroundColor: colors.colorA,
    },
});

export default CheckboxGroup;