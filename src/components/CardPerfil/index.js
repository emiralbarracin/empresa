import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import size from '../../styles/size'; //prueba

const CardPerfil = ({ title, iconName, subtitle, onPress }) => {
    return (
        <View >

            <TouchableOpacity onPress={onPress} style={styles.container}>

                <View style={styles.datosContainer}>
                    <View style={styles.productoContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.importeContainer}>
                        <MaterialCommunityIcons name={iconName} style={styles.icon} />
                    </View>
                </View>
                <Text style={styles.subtitle}>{subtitle}</Text>

            </TouchableOpacity>

        </View>
    );
};

const styles = {
    container: {
        backgroundColor: colors.colorA,
        borderRadius: 10,
        padding: '4%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        elevation: 4,
    },
    datosContainer: {
        flexDirection: 'row',
    },
    productoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: size.medium,
    },
    importeContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    icono: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: size.medium,
    },
    subtitle: {
        color: colors.white,
        fontSize: size.small,
        marginTop: '2%'
    },
    icon: {
        color: colors.white,
        fontSize: 20,
    },
};

export default CardPerfil;