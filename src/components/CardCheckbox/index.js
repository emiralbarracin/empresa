import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import size from '../../styles/size'; //prueba

const CardCheckbox = ({ title, iconName, onPress }) => {
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

            </TouchableOpacity>

        </View>
    );
};

const styles = {
    container: {
        backgroundColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.colorB : null),
        borderRadius: 10,
        padding: '4%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        elevation: 4,
        borderColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
        borderWidth: 0.5,
    },
    datosContainer: {
        flexDirection: 'row',
    },
    productoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    title: {
        color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
        fontWeight: 'bold',
        fontSize: size.medium,
    },
    importeContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    icono: {
        color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
        fontWeight: 'bold',
        fontSize: size.medium,
    },
    icon: {
        color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
        fontSize: 20,
    },
};

export default CardCheckbox;