import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const CardSimulacion = ({ data, title }) => {
    return (
        <View style={styles.cardContainer}>

            <Text style={styles.title}>{title}</Text>

            {data.map((item) => (
                <View style={styles.row} key={item.title}>
                    <Text style={styles.subtitle}>{item.title}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}

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
        fontSize: size.medium,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '5%',
        color: colors.gray
    },
    subtitle: {
        fontSize: size.medium,
        color: colors.black
    },
    value: {
        fontSize: size.medium,
        color: colors.black,
        fontWeight: 'bold',
    },
});

export default CardSimulacion;