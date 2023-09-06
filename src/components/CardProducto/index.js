import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const CardProducto = ({ data, button, onPress }) => {
    return (
        <View style={styles.cardContainer}>

            {data.map((item) => (
                <View style={styles.row} key={item.title}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.button}>{button}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: '4%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '2%',
    },
    title: {
        flex: 2,
        fontSize: size.medium,
        color: colors.black
    },
    value: {
        flex: 4,
        textAlign: 'right',
        fontSize: size.medium,
        color: colors.black,
        fontWeight: 'bold',
    },
    button: {
        fontSize: size.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '4%',
        color: colors.colorA
    },
});

export default CardProducto;