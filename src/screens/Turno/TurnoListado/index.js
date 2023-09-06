import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardProducto from '../../../components/CardProducto';
import api from '../../../services/api';
import DateConverter from '../../../utils/DateConverter';
import ModalConfirm from '../../../components/ModalConfirm';
import TitleMediumBold from '../../../components/TitleMediumBold';

const TurnoListado = ({ navigation }) => {

    const [turnos, setTurnos] = useState([])

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${anio}/${mesFormateado}/${dia}`;

    const [variableTurnos, setVariableTurnos] = useState(false);
    const actualizarListadoTurnos = () => {
        setVariableTurnos(!variableTurnos);
    };
    let focusListener = null;
    focusListener = navigation.addListener('focus', () => { //dispara la funcion de adentro cuando esta en foco esta pantalla
        actualizarListadoTurnos();
    });

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/TurnoOnline/RecuperarTurnoOnline?CodigoSucursal=20&DiaTurno=${fechaFormateada}&IdMensaje=Sucursal+virtual+turnos`);

                if (res1) {

                    //console.log('RecuperarTurnoOnline >>>', res1.output)
                    setTurnos(res1.output)

                } else {
                    console.log('ERROR RecuperarTurnoOnline');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, [variableTurnos]);

    const [idTurno, setIdTurno] = useState(null)

    const handleEliminarTurno = (item) => {

        setIdTurno(item.idTurno)

        setMensajeModalConfirm('¿Está seguro/a que desea eliminar el turno?')
        setModalConfirmVisible(true)

    }

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);

    const handleAceptarConfirm = () => {

        setModalConfirmVisible(false)
        console.log('idTurno >>> ', idTurno)

        const obtenerDatos = async () => {

            let parametros = {
                CodigoSucursal: 20,
                idTurno: idTurno,
                IdMensaje: 'Borrar turno mobile',
            };

            try {

                const { data: res1 } = await api.delete(`api/TurnoOnline/EliminarTurnoOnline`, { data: parametros }); //DELETE -> data: parametros

                if (res1) {

                    //console.log('EliminarTurnoOnline >>>', res1)
                    actualizarListadoTurnos();

                } else {
                    console.log('ERROR HBProductosHB');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    };

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }


    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>
                <View onStartShouldSetResponder={() => true}>

                    {turnos.length === 0 ? ( //verifica si la lista de turnos está vacía
                        <TitleMediumBold title={'No hay turnos programados.'} />
                    ) : (
                        turnos.map((item, index) => (
                            <CardProducto
                                key={index}
                                data={[
                                    { title: 'Día', value: <DateConverter date={item.diaTurno} /> },
                                    { title: 'Hora', value: item.hora },
                                    { title: 'Sucursal', value: item.descripcionSucursal.slice(7, 40) },
                                    { title: 'Domicilio sucursal', value: item.domicilioSucursal },
                                    { title: 'Descripción', value: item.descripcion },
                                ]}
                                button={'Eliminar turno'}
                                onPress={() => handleEliminarTurno(item)}
                            />
                        ))
                    )}

                </View>
            </ScrollView>

            <ModalConfirm
                visible={modalConfirmVisible}
                title={mensajeModalConfirm}
                titleButtonLeft={'Cancelar'}
                titleButtonRight={'Aceptar'}
                onPressButtonLeft={handleCancelarConfirm}
                onPressButtonRight={handleAceptarConfirm}
            />

        </View>
    );
};

export default TurnoListado;
