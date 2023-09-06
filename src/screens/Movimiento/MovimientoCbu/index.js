import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import CardProducto from '../../../components/CardProducto';
import { useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard'; // Importa el nuevo módulo Clipboard

const MovimientoCbu = ({ navigation }) => {

    const { tipoCuenta, tipoMoneda, numeroCuenta, cbu } = useRoute().params;

    let datos = [
        { title: 'Tipo de cuenta', value: tipoCuenta },
        { title: 'Moneda', value: tipoMoneda },
        { title: 'N° de cuenta', value: numeroCuenta },
        { title: 'CBU', value: cbu },
    ];

    const handleCopiarCBU = () => {

        //obtengo el valor del CBU del objeto 'datos'
        const cbuCopiado = datos.find((item) => item.title === 'CBU')?.value;

        if (cbuCopiado) {
            //uso Clipboard API para copiar el CBU al portapapeles
            Clipboard.setString(cbuCopiado);

            //console.log('CBU copiado: ', cbuCopiado);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <CardProducto
                    data={datos}
                    button={'Copiar CBU'}
                    onPress={() => handleCopiarCBU()}
                />
            </View>
        </View>
    );
};

export default MovimientoCbu;