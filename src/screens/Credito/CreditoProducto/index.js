import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardProducto from '../../../components/CardProducto';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';

const CreditoProducto = ({ navigation }) => {

    const [productos, setProductos] = useState([])
    const [codigoProducto, setCodigoProducto] = useState(null)
    const [nombreProducto, setNombreProducto] = useState(null)

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`/api/BEProductosHB/RecuperarBEProductosHB?CodigoSucursalProducto=0&CodigoSistema=2&CodigoMoneda=0&WebMobile=2&CodigoSucursal=20&IdMensaje=Sucursal+Virtual`);
                if (res1) {

                    //console.log('HBProductosHB >>>', JSON.stringify(res1.output, null, 4))
                    setProductos(res1.output)

                } else {
                    console.log('ERROR BEProductosHB');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const handleSimular = (item) => {

        console.log('codigoProducto >>> ', item.codigoProducto)
        let codigoProducto = item.codigoProducto
        let nombreProducto = item.nombreProducto
        let idProdWebMobile = item.idProdWebMobile
        let rendimientoMaximo = item.rendimientoMaximo

        navigation.navigate('CreditoSimulacion', { codigoProducto, nombreProducto, idProdWebMobile, rendimientoMaximo })
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>
                <View onStartShouldSetResponder={() => true}>

                    {productos.map((item, index) => (
                        <CardProducto
                            key={index}
                            data={[
                                { title: 'Producto', value: item.nombreProducto },
                                { title: 'Moneda', value: item.descripcionMoneda },
                                { title: 'TNA', value: `${item.rendimientoMaximo} %` },
                                { title: 'Plazo máximo', value: `${item.plazoMaximoOperacion} cuotas` },
                                { title: 'Monto máximo', value: <MoneyConverter value={item.montoMaximoOperacion} /> },
                            ]}
                            button={'Simular'}
                            onPress={() => handleSimular(item)}
                        />
                    ))}

                </View>
            </ScrollView>

        </View>
    );
};

export default CreditoProducto;
