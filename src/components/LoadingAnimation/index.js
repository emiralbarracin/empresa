import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const LogoAnimation = ({ onAnimationComplete }) => {
    const logoScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoScale, {
                toValue: 1.2, //tamaño logo
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
                toValue: 0, //tamaño logo
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onAnimationComplete();  //llama a la función proporcionada cuando la animación se completa
        });
    }, [logoScale, onAnimationComplete]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/logoSucredito.png')}
                style={[styles.image, { transform: [{ scale: logoScale }] }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
    },
    image: {
        resizeMode: 'contain',
        height: 50,
    },
});

export default LogoAnimation;
