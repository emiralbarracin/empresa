import { View } from 'react-native';
import React from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import DateConverter from '../../../utils/DateConverter';

const TurnoConfirmado = ({ navigation }) => {

    const { diaSeleccionado, horaSeleccionada, sucursalSeleccionada } = useRoute().params

    const datosTurno = [
        { title: 'Día', value: <DateConverter date={diaSeleccionado} /> },
        { title: 'Hora', value: horaSeleccionada.slice(11, 16) },
        { title: 'Sucursal', value: sucursalSeleccionada.slice(13, 40) },
    ];

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Detalles del turno'} data={datosTurno} />

            </View>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default TurnoConfirmado;
