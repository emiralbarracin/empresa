import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardProducto from '../../../components/CardProducto';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import ModalError from '../../../components/ModalError';

const PlazoFijoProducto = ({ navigation }) => {

    const [productos, setProductos] = useState([])
    const [codigoProducto, setCodigoProducto] = useState(null)
    const [nombreProducto, setNombreProducto] = useState(null)

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEProductosHB/RecuperarBEProductosHB?CodigoSucursalProducto=0&CodigoSistema=4&CodigoMoneda=-1&WebMobile=2&CodigoSucursal=20&IdMensaje=Sucursal+Virtual`);
                if (res1) {

                    //console.log('HBProductosHB >>>', res1.output)
                    setProductos(res1.output)

                } else {
                    console.log('ERROR HBProductosHB');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const handleSimular = (item) => {

        //console.log('codigoProducto >>> ', item.codigoProducto)
        let codigoProducto = item.codigoProducto
        let nombreProducto = item.nombreProducto
        let idProdWebMobile = item.idProdWebMobile
        let descripcionMoneda = item.descripcionMoneda
        let codigoMoneda = item.codigoMoneda

        if (nombreProducto === 'Inversión a Plazo UVA') {

            //setMensajeModal('Sección en mantenimiento.')
            //setModalVisible(true)
            navigation.navigate('PlazoFijoUvaSimulacion', { codigoProducto, nombreProducto, idProdWebMobile, descripcionMoneda })

        } else {

            navigation.navigate('PlazoFijoSimulacion', { codigoProducto, nombreProducto, idProdWebMobile, descripcionMoneda, codigoMoneda })

        }

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false)
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
                                { title: 'Plazo máximo', value: `${item.plazoMaximoOperacion} días` },
                                { title: 'Monto máximo', value: <MoneyConverter money={item.codigoMoneda} value={item.montoMaximoOperacion} /> },
                            ]}
                            button={'Simular'}
                            onPress={() => handleSimular(item)}
                        />
                    ))}

                </View>
            </ScrollView>

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default PlazoFijoProducto;
