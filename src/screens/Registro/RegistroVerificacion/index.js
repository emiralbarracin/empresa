import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';

const RegistroVerificacion = ({ navigation }) => {


    /* useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(``);
                if (res1) {

                    console.log(' >>> ', JSON.stringify(res1.output, null, 4))

                } else {
                    console.log('ERROR ');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []); */

    return (
        <View style={styles.container}>

            <View style={styles.body}>


            </View>

            <ButtonFooter title={'Siguiente'} onPress={() => navigation.navigate('RegistroInformacionAdicional')} />

        </View>
    );
};

export default RegistroVerificacion;
