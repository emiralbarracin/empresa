import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const Card = ({ /* title, */ data }) => {
    return (
        <View style={styles.cardContainer}>
            {/* <Text style={styles.title}>{title}</Text> */}
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
        padding: '5%',
        marginVertical: '1%',
        marginHorizontal: '10%',
        //shadowColor: '#000000',
        //shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: 0.3,
        //shadowRadius: 2,
        elevation: 5,
    },
    /* title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '15%',
        color: colors.black
    }, */
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '3%',
    },
    subtitle: {
        fontSize: size.large,
        color: colors.black
    },
    value: {
        fontSize: size.large,
        color: colors.black,
        fontWeight: 'bold',
    },
});

export default Card;