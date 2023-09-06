import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import IconInput from '../../../components/IconInput';
import ButtonFooter from '../../../components/ButtonFooter';
import token from '../../../services/token';
import { environment } from '../../../services/environment';
import { onSetStorageToken } from '../../../store/storage/storageToken';
import ModalError from '../../../components/ModalError';

const RegistroInformacionPersonal = ({ navigation }) => {

    const [cuil, setCuil] = useState(null)

    const handleCuil = (valor) => {
        setCuil(valor)
    }

    const handleSiguiente = () => {

        const obtenerDatos = async () => {

            try {

                const { data: { access_token } } = await token.post('/Token', environment.payload);
                onSetStorageToken(access_token);

                const { data: res } = await api.get(`api/OnBoCtrlAlta/RecuperarOnBoCtrlAlta?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&IdMensaje=sucursalvirtual`);
                if (res) {

                    //console.log('OnBoCtrlAlta >>> ', JSON.stringify(res, null, 4))

                    let altaClienteIBS = res.altaClienteIBS
                    let altaClienteHB = res.altaClienteHB
                    let altaClienteOrganoDirectivo = res.altaClienteOrganoDirectivo

                    if (altaClienteIBS === 'SI') {
                        if (altaClienteHB === 'SI') {
                            setMensajeModal('El CUIL ingresado ya pertenece a un cliente activo de Home Banking.')
                            setModalVisible(true)
                        } else {
                            navigation.navigate('RegistroReducidoValidacionDato', { cuil })
                        }
                    } else {
                        setMensajeModal('El CUIL ingresado no pertenece a un cliente activo de IBS.')
                        setModalVisible(true)
                    }

                } else {
                    console.log('ERROR OnBoCtrlAlta');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <IconInput
                    iconName={'account-plus-outline'}
                    placeholder={'Ingrese el nro. de CUIL'}
                    onChangeText={handleCuil}
                    maxLength={11}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                />

            </View>

            <ButtonFooter title={'Siguiente'} onPress={() => handleSiguiente()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default RegistroInformacionPersonal;
