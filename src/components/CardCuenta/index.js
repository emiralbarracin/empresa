import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import size from '../../styles/size';

const CardCuenta = ({ saldo, tipoCuenta, tipoMoneda, numeroCuenta, onPressMovimientos, onPressCBU }) => {
    return (
        <View style={styles.container}>

            <View style={styles.datosContainer}>
                <View style={styles.saldoContainer}>
                    <Text style={styles.saldo}>{saldo}</Text>
                </View>
                {/* <View style={styles.ojoContainer}>
                    <MaterialCommunityIcons name="eye-outline" style={styles.icon} />
                </View> */}
            </View>

            <Text style={styles.tipoCuenta}>{tipoCuenta} {tipoMoneda}</Text>
            <Text style={styles.numeroCuenta}>{numeroCuenta}</Text>

            <View style={styles.linksContainer}>

                <View style={styles.movimientosContainer}>
                    <TouchableOpacity onPress={onPressMovimientos} >
                        <Text style={styles.linkMovimientos}>Movimientos</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cbuContainer}>
                    <TouchableOpacity onPress={onPressCBU} >
                        <Text style={styles.linkCbu}>Mi CBU</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
};

const styles = {
    container: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: '4%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        elevation: 4,
    },
    datosContainer: {
        flexDirection: 'row',
    },
    saldoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginBottom: '2%',
    },
    saldo: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: size.large,
        color: colors.black,
    },
    ojoContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: '2%',
    },
    ojo: {
        fontWeight: 'bold',
        fontSize: size.large,
    },
    tipoCuenta: {
        color: colors.black,
        fontSize: size.medium,
        marginBottom: '2%',
        color: colors.black,
    },
    numeroCuenta: {
        color: colors.black,
        fontSize: size.medium,
        marginBottom: '2%',
        color: colors.black,
    },
    linksContainer: {
        flexDirection: 'row',
    },
    movimientosContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: '1%',
    },
    cbuContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: '1%',
    },
    linkMovimientos: {
        fontSize: size.medium,
        color: colors.colorA,
        fontWeight: 'bold',
    },
    linkCbu: {
        fontSize: size.medium,
        color: colors.colorA,
        fontWeight: 'bold',
    },
    icon: {
        color: colors.black,
        fontSize: 18,
    },
};

export default CardCuenta;
