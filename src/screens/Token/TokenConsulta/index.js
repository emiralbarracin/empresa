import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import api from '../../../services/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';

const TokenConsulta = ({ navigation }) => {

    const [tokenSeguridad, setTokenSeguridad] = useState(null)
    const [generaToken, setGeneraToken] = useState(false);
    const [contador, setContador] = useState(60);

    let parametros = {
        CodigoSucursal: 20,
        IdMensaje: 'Consulta token',
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const { data: res1 } = await api.post(`api/GeneracionToken/RegistrarGeneracionToken`, parametros);
                if (res1) {
                    //console.log('GeneracionToken >>>', res1)
                    setTokenSeguridad(res1.tokenSeguridad);
                } else {
                    console.log('ERROR GeneracionToken');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };
        obtenerDatos();
    }, [generaToken]);

    const generarToken = () => {
        setGeneraToken(!generaToken);
        setContador(60);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setContador(contador - 1);
        }, 960);
        if (contador === 0) {
            setContador(60);
            generarToken();
        }
        return () => clearInterval(interval);
    }, [contador]);

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <View style={styles.tarjeta}>

                    <MaterialCommunityIcons
                        name="lock-open-outline"
                        color={colors.colorA}
                        size={24}
                    />

                    <View style={{ marginVertical: '4%' }}>
                        <Text style={{ fontSize: 20, color: colors.black }}>{tokenSeguridad}</Text>
                    </View>

                    <Text style={{ fontSize: 12, color: colors.black }}>Tiempo restante: {contador} segundos</Text>

                </View>

            </View>

            <ButtonFooter title={'Generar nuevo token'} onPress={() => generarToken()} />

        </View>
    );
};

export default TokenConsulta;