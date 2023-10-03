import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

const LoadingIndicator = () => {

    const [opacityValue] = useState(new Animated.Value(0)); //estado local "opacityValue" utilizando useState


    const startOpacityAnimation = () => { //función para iniciar la animación de opacidad

        Animated.loop( //animación en bucle utilizando Animated.loop

            Animated.sequence([ //Animated.sequence para ejecutar dos animaciones en secuencia

                Animated.timing(opacityValue, { //primera animación: Cambio de opacidad de 0 a 1 en 1000 ms (1 segundo)
                    toValue: 1, //opacidad final
                    duration: 800, //duración de la animación en milisegundos
                    easing: Easing.ease, //tipo de easing (aceleración) de la animación
                    useNativeDriver: true, //habilitar el control nativo de animación
                }),

                Animated.timing(opacityValue, { //segunda animación: Cambio de opacidad de 1 a 0 en otros 1000 ms
                    toValue: 0, //opacidad final
                    duration: 800, //duración de la animación en milisegundos
                    easing: Easing.ease, //tipo de easing (aceleración) de la animación
                    useNativeDriver: true, //habilitar el control nativo de animación
                }),
            ])
        ).start(); //iniciar la animación en bucle
    };


    useEffect(() => { //ejecuto startOpacityAnimation solo cuando el componente se monta
        startOpacityAnimation();
    }, []);

    const opacity = opacityValue;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*Animated.Image para aplicar la animación de opacidad a la imagen */}
            <Animated.Image
                source={require('../../assets/images/logoBMV.png')} // imagen
                style={{ width: 100, height: 100, opacity }} //estilo con la propiedad de opacidad
            />
        </View>
    );
};

export default LoadingIndicator;