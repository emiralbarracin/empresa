import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CardPerfil from '../../components/CardPerfil';


const Perfil = ({ navigation }) => {

    return (
        <>
            <View style={styles.container}>

                <View style={styles.body}>

                    <CardPerfil
                        title="Ver perfil"
                        subtitle="Información del perfil"
                        iconName="account"
                        onPress={() => { navigation.navigate('UsuarioInformacionPerfil') }}
                    />
                    <CardPerfil
                        title="Cambiar contraseña"
                        subtitle="Su contraseña vence en 79 días"
                        iconName="form-textbox-password"
                        onPress={() => { navigation.navigate('UsuarioCambioContrasena') }}
                    />
                    <CardPerfil
                        title="Configurar PIN"
                        subtitle="Modificar el PIN para el ingreso"
                        iconName="dialpad"
                    />
                    <CardPerfil
                        title="Configurar huella"
                        subtitle="Modificar la huella para el ingreso"
                        iconName="fingerprint"
                    />

                </View>

            </View>
        </>
    );
};

export default Perfil;