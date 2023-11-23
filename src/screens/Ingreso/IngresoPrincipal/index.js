import { View, Animated, Text, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooterOut from '../../../components/ButtonFooterOut';

const IngresoPrincipal = ({ navigation }) => {

    const [logoScale] = useState(new Animated.Value(0)); //inicializa el valor de la animación en 0

    useEffect(() => {

        //crea una animación para escalar el logo desde 0 a 1
        Animated.timing(logoScale, {
            toValue: 1,
            duration: 1000, //duración de la animación en milisegundos
            useNativeDriver: true, //usa el driver nativo para mejorar el rendimiento
        }).start(); //inicia la animación al montar el componente

    }, []);

    const handleIniciar = () => {
        navigation.navigate('IngresoNuevo')
    }

    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/images/principalSucredito.jpeg')}
                style={styles.backgroundImage}
            >

                <View style={styles.header}>
                    <Animated.Image //Animated.Image para aplicar la animación
                        //source={require('../../../assets/images/logoBMV.png')}
                        source={require('../../../assets/images/logoSucredito.png')}
                        style={[styles.image, { transform: [{ scale: logoScale }] }]} //aplica la escala según el valor de la animación
                    />
                </View>

                <View style={styles.body}>

                </View>

                <ButtonFooterOut title={'Iniciar'} onPress={() => handleIniciar()} />

                <Text style={{ alignSelf: 'center', fontSize: 5, color: 'black' }}>TEST</Text>

            </ImageBackground>

        </View>


    );
};

export default IngresoPrincipal;
