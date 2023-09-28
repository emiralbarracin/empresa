import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import ButtonMenu from '../../components/ButtonMenu';
import TitleMedium from '../../components/TitleMedium';
import ButtonFooterOut from '../../components/ButtonFooterOut';
import ModalError from '../../components/ModalError';
import { onClearStorage } from '../../store/storage/storageToken';

const Mas = ({ navigation }) => {

    const handleSalir = () => {
        onClearStorage() //elimina datos almacenados en el almacenamiento local
        navigation.navigate('IngresoNuevo')
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleMantenimiento = () => {
        setMensajeModal('Sección en mantenimiento.')
        setModalVisible(true)
    }

    const handleAceptar = () => {
        setModalVisible(false)
    }

    return (
        <>
            <View style={styles.container}>

                <ScrollView style={styles.body}>
                    <View>

                        {/* operaciones */}

                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Créditos" />
                        </View>
                        <ButtonMenu iconName="handshake" title="Solicitar crédito" onPress={() => navigation.navigate('CreditoProducto')} />
                        <ButtonMenu iconName="format-list-bulleted" title="Mis créditos" onPress={() => handleMantenimiento()} />


                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Plazos fijos" />
                        </View>
                        <ButtonMenu iconName="arrow-top-right" title="Simular y constituir" onPress={() => navigation.navigate('PlazoFijoProducto')} />
                        <ButtonMenu iconName="arrow-u-down-left" title="Precancelables" onPress={() => handleMantenimiento()} />
                        <ButtonMenu iconName="format-list-bulleted-triangle" title="Mis plazos fijos" onPress={() => handleMantenimiento()} />


                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Transacciones" />
                        </View>
                        <ButtonMenu iconName="currency-usd" title="Compra y venta de dólares" onPress={() => handleMantenimiento()} />
                        <ButtonMenu iconName="arrow-left-top" title="Transferencias" onPress={() => navigation.navigate('TransferenciaNueva')} />
                        <ButtonMenu iconName="cellphone" title="Recarga de celular" onPress={() => handleMantenimiento()} />
                        <ButtonMenu iconName="qrcode-scan" title="Pago con QR" onPress={() => handleMantenimiento()} />
                        <ButtonMenu iconName="format-list-bulleted-square" title="Comprobantes" onPress={() => handleMantenimiento()} />
                        <ButtonMenu iconName="pencil-box-outline" title="Cheques" onPress={() => navigation.navigate('Cheque')} />


                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Turnos" />
                        </View>
                        <ButtonMenu iconName="calendar-arrow-right" title="Solicitar turno" onPress={() => navigation.navigate('TurnoNuevo')} />
                        <ButtonMenu iconName="calendar-check" title="Mis turnos" onPress={() => navigation.navigate('TurnoListado')} />


                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Consultas" />
                        </View>
                        <ButtonMenu iconName="format-list-text" title="Posición consolidada" onPress={() => navigation.navigate('PosicionConsolidadaTipoInforme')} />


                        <View style={styles.buttonTitle}>
                            <TitleMedium title="Token" />
                        </View>
                        <ButtonMenu iconName="lock-open-outline" title="Consultar token" onPress={() => navigation.navigate('TokenConsulta')} />


                        <TitleMedium title="" />
                        <ButtonFooterOut title={'Cerrar sesión'} onPress={() => handleSalir()} />

                    </View>
                </ScrollView>

                <ModalError
                    visible={modalVisible}
                    title={mensajeModal}
                    titleButton="Aceptar"
                    onPressButton={handleAceptar}
                />

            </View>
        </>
    );
};

export default Mas;