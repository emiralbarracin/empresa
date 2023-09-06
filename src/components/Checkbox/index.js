import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const Checkbox = ({ title, link, onPress }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!checked);
    };

    return (
        <View style={styles.container} >

            <TouchableOpacity onPress={handleToggle}>
                <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={onPress}>
                <Text style={styles.link}>{link}</Text>
            </TouchableOpacity>

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
    title: {
        marginLeft: '2%',
        color: colors.black,
        fontSize: size.medium
    },
    link: {
        paddingLeft: '1%',
        color: colors.colorA,
        fontWeight: 'bold',
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

export default Checkbox;