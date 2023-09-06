import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import TitleMediumBold from '../../../components/TitleMediumBold';
import { useRoute } from '@react-navigation/native';
import TitleMedium from '../../../components/TitleMedium';

const PosicionConsolidadaTipoOperacion = ({ navigation }) => {

    const { codigoMoneda } = useRoute().params

    console.log('codigoMoneda >>> ', codigoMoneda)

    const handleGenerarInforme = () => {
        navigation.navigate('PosicionConsolidadaInforme')
    }

    let tipoOperacion

    const handleCarteraCliente = () => {
        tipoOperacion = 1
        navigation.navigate('PosicionConsolidadaInforme', { tipoOperacion })
    }

    const handlePasivaPesos = () => {
        tipoOperacion = 2
        navigation.navigate('PosicionConsolidadaInforme', { tipoOperacion })
    }

    const handleActivaPesos = () => {
        tipoOperacion = 3
        navigation.navigate('PosicionConsolidadaInforme', { tipoOperacion })
    }

    const handleActivaDolares = () => {
        tipoOperacion = 4
        navigation.navigate('PosicionConsolidadaInforme', { tipoOperacion })
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <TitleMediumBold title={'Seleccione el tipo de operación'} />

                {codigoMoneda === 0 ? (
                    <View>
                        <ButtonFooter title={'Cartera cliente'} onPress={() => handleCarteraCliente()} />
                        <ButtonFooter title={'Operaciones pasivas en pesos'} onPress={() => handlePasivaPesos()} />
                        <ButtonFooter title={'Operaciones activas en pesos'} onPress={() => handleActivaPesos()} />
                    </View>
                ) : codigoMoneda === 2 ? (
                    <View>
                        <ButtonFooter title={'Operaciones activas en dólares'} onPress={() => handleActivaDolares()} />
                    </View>
                ) : codigoMoneda === 4 ? (
                    <View>
                        <ButtonFooter title={'Cartera cliente'} onPress={() => handleCarteraCliente()} />
                        <ButtonFooter title={'Operaciones pasivas en pesos'} onPress={() => handlePasivaPesos()} />
                        <ButtonFooter title={'Operaciones activas en pesos'} onPress={() => handleActivaPesos()} />
                        <ButtonFooter title={'Operaciones activas en dólares'} onPress={() => handleActivaDolares()} />
                    </View>
                ) : (
                    <TitleMedium title={''} />
                )}

            </View>

        </View>
    );
};

export default PosicionConsolidadaTipoOperacion;
