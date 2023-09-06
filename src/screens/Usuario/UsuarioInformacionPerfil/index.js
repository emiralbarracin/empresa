import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import CardInformacionPerfil from '../../../components/CardInformacionPerfil';

const UsuarioInformacionPerfil = ({ navigation }) => {

    const [nombreUsuario, setNombreUsuario] = useState(null)
    const [domicilio, setDomicilio] = useState(null)
    const [celular, setCelular] = useState(null)
    const [email, setEmail] = useState(null)
    /* const [usuario, setUsuario] = useState(null) */

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/ClienteDatosGenerales/RecuperarClienteDatosGenerales?CodigoSucursal=20&IdMensaje=sucursalvirtual`);
                if (res1) {

                    //console.log('ClienteDatosGenerales >>>', JSON.stringify(res1.output, null, 4))
                    setNombreUsuario(res1.output[0].nombre)
                    setDomicilio(`${res1.output[0].nombreDomicilio} ${res1.output[0].numeroDomicilio}, ${res1.output[0].descripcionProvincia}`)
                    setCelular(`${res1.output[0].caracteristicaTelefono}-${res1.output[0].numeroTelefono}`)
                    setEmail(res1.output[0].mailUsuario)

                } else {
                    console.log('ERROR ClienteDatosGenerales');
                }

                /* const { data: res2 } = await api.get(`api/HBOficialAsignado/RecuperarHBOficialAsignado?CodigoSucursal=20&IdMensaje=sucursalvirtual`);
                if (res2) {

                    //console.log('HBOficialAsignado >>>', JSON.stringify(res2, null, 4))
                    setUsuario(`${res2.descripcionUsuario} | ${res2.correoUsuario}`)

                } else {
                    console.log('ERROR HBOficialAsignado');
                } */

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);



    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardInformacionPerfil
                    title={nombreUsuario}
                    iconName="account"
                />

                <CardInformacionPerfil
                    title={domicilio}
                    iconName="map-marker"
                />

                <CardInformacionPerfil
                    title={'381-6316145'}
                    iconName="cellphone"
                />

                {/* <CardInformacionPerfil
                    title={email}
                    iconName="email"
                /> */}

                {/*  <CardInformacionPerfil
                    title={usuario}
                    iconName="account-check"
                /> */}

            </View>

        </View>
    );
};

export default UsuarioInformacionPerfil;
