import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import { useDispatch } from 'react-redux';
import { agregarEmpresa } from '../../../store/slices/usuarioSlice';

const IngresoEmpresaListado = ({ navigation }) => {

    const [empresas, setEmpresas] = useState([])
    const [idEmpresa, setIdEmpresa] = useState(null)

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEListaEmpresaPorUsuario/RecuperarBEListaEmpresaPorUsuario?CodigoSucursal=20&IdMensaje=Sucursal+Virtual`);

                if (res1) {

                    //console.log('BEListaEmpresaPorUsuario >>> ', res1)
                    setEmpresas(res1.output)

                } else {
                    console.log('ERROR BEListaEmpresaPorUsuario');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const dispatch = useDispatch()

    const handleEmpresaSeleccionada = (item) => {

        dispatch(agregarEmpresa(item));
        navigation.navigate('InicioTab')

    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.body}>

                    {
                        empresas.map((item) => (
                            <ButtonFooter
                                key={item.idEmpresaUsu}
                                title={item.denominacionCliente}
                                onPress={() => handleEmpresaSeleccionada(item)}
                            />
                        ))
                    }

                </View>

            </View>
        </>
    );
};

export default IngresoEmpresaListado;