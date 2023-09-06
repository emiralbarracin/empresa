import { Platform, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import LinkMedium from '../../../components/LinkMedium';

const RegistroConfirmacion = ({ navigation }) => {


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

            <ScrollView style={styles.body}>

                <IconInput iconName={'cellphone-lock'} placeholder={'Código SMS'} keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'} />
                <LinkMedium title={'Enviar código SMS'} />

                <IconInput iconName={'email-lock'} placeholder={'Código Email'} keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'} />
                <LinkMedium title={'Enviar código Email'} />

            </ScrollView>

            <ButtonFooter title={'Crear cuenta'} onPress={() => navigation.navigate('IngresoNuevo')} />

        </View>
    );
};

export default RegistroConfirmacion;
