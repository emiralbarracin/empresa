import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardCuenta from '../../components/CardCuenta';
import api from '../../services/api';
import MoneyConverter from '../../utils/MoneyConverter';
import { useSelector } from 'react-redux';

const Cuenta = ({ navigation }) => {

    const ojoRTK = useSelector(state => state.cuentaStore.ojo);

    //console.log('ojoRTK >>>', ojoRTK)

    const [cuentas, setCuentas] = useState([])

    const [variableCuentas, setVariableCuentas] = useState(false);
    const actualizarCuentas = () => {
        setVariableCuentas(!variableCuentas);
    };
    let focusListener = null;
    focusListener = navigation.addListener('focus', () => { //dispara la funcion de adentro cuando esta en foco esta pantalla
        actualizarCuentas();
    });

    useEffect(() => {
        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=TODO&IdMensaje=sucursalvirtual`);
                if (res1) {

                    //console.log('HbConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                    setCuentas(res1.output)

                } else {
                    console.log('ERROR HbConsultaCuenta');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, [variableCuentas]);

    const handleMovimientos = (tipoCuenta, tipoMoneda, numeroCuenta, codigoMoneda, codigoSistema, codigoCuenta) => {

        navigation.navigate('MovimientoCuenta', { tipoCuenta, tipoMoneda, numeroCuenta, codigoMoneda, codigoSistema, codigoCuenta })

    };

    const handleCBU = (tipoCuenta, tipoMoneda, numeroCuenta, cbu) => {

        navigation.navigate('MovimientoCbu', { tipoCuenta, tipoMoneda, numeroCuenta, cbu })

    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                {cuentas
                    .filter((item) => item.codigoSistema === 3 || item.codigoSistema === 5)
                    .map((item) => (
                        <CardCuenta
                            key={item.codigoCuenta}
                            saldo={ojoRTK ? <MoneyConverter money={item.codigoMoneda} value={item.saldo} /> : '*****'}
                            tipoCuenta={item.codigoSistemaDesc}
                            tipoMoneda={item.codigoMonedaDesc}
                            numeroCuenta={item.mascara}
                            onPressMovimientos={() => handleMovimientos(
                                tipoCuenta = item.codigoSistemaDesc,
                                tipoMoneda = item.codigoMonedaDesc,
                                numeroCuenta = item.mascara,
                                codigoMoneda = item.codigoMoneda,
                                codigoSistema = item.codigoSistema,
                                codigoCuenta = item.codigoCuenta
                            )}
                            onPressCBU={() => handleCBU(
                                tipoCuenta = item.codigoSistemaDesc,
                                tipoMoneda = item.codigoMonedaDesc,
                                numeroCuenta = item.mascara,
                                cbu = `0${item.cbuBloque1}0${item.cbuBloque2}`
                            )}
                        />
                    ))}

            </ScrollView>

        </View>
    );
};

export default Cuenta;