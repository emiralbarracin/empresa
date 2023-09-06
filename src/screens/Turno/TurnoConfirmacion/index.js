import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import ModalError from '../../../components/ModalError';
import { useRoute } from '@react-navigation/native';
import Dropdown from '../../../components/DropDown';
import TitleMediumBold from '../../../components/TitleMediumBold';
import ModalConfirm from '../../../components/ModalConfirm';
import DateConverter from '../../../utils/DateConverter';

const TurnoConfirmacion = ({ navigation }) => {

    const { motivoSeleccionado, atencionSeleccionada } = useRoute().params
    console.log('atencionSeleccionada >>> ', atencionSeleccionada)

    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res } = await api.get('api/Sucursal/RecuperarSucursal?CodigoSucursal=20&IdMensaje=Sucursal+virtual+turnos');

                if (res && res.output) {

                    //console.log('Sucursal >>> ', res.output)
                    setSucursales(res.output);

                } else {
                    console.log('ERROR Sucursal');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null)

    const handleSucursalSeleccionada = (value) => {
        setSucursalSeleccionada(value.descripcionSucursal)
    };


    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${anio}/${mesFormateado}/${dia}`;

    // Agregar 21 días a la fecha actual
    const fechaDespues21Dias = new Date(anio, mes - 1, dia + 21);
    const diaDespues21Dias = fechaDespues21Dias.getDate();
    const mesDespues21Dias = fechaDespues21Dias.getMonth() + 1;
    const anioDespues21Dias = fechaDespues21Dias.getFullYear();
    const mesFormateadoDespues21Dias = mesDespues21Dias.toString().padStart(2, '0');
    const fechaFormateadaDespues21Dias = `${anioDespues21Dias}/${mesFormateadoDespues21Dias}/${diaDespues21Dias}`;

    const [dias, setDias] = useState([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res } = await api.get(`api/DiaTurno/RecuperarDiaTurno?CodigoSucursal=20&Inicio=${fechaFormateada}&Fin=${fechaFormateadaDespues21Dias}&IdMensaje=Sucursal+virtual+turnos`);

                if (res) {

                    //console.log('DiaTurno >>>', res.output)
                    setDias(res.output);

                } else {
                    console.log('Error DiaTurno');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }
        };
        obtenerDatos();
    }, []);

    const [diaSeleccionado, setDiaSeleccionado] = useState(null)

    const handleDiaSeleccionado = (value) => {
        console.log('fecha seleccionada >>> ', value.diaTurno)
        setDiaSeleccionado(value.diaTurno)
    };



    const [horas, setHoras] = useState([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res } = await api.get(`api/HoraTurno/RecuperarHoraTurno?CodigoSucursal=20&ConceptoTurnoCod=1&DiaTurno=${diaSeleccionado}&IdMensaje=Sucursal+virtual+turnos`);

                if (res) {

                    //console.log('HoraTurno >>>', res.output)
                    setHoras(res.output)

                } else {
                    console.log('Error HoraTurno');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }
        };
        obtenerDatos();
    }, [diaSeleccionado]);

    const [horaSeleccionada, setHoraSeleccionada] = useState(null)
    const [idHoraSeleccionada, setIdHoraSeleccionada] = useState(null)

    const handleHoraSeleccionada = (value) => {
        setHoraSeleccionada(value.horaTurno)
        setIdHoraSeleccionada(value.idHoraTurno)
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);


    const handleSiguiente = () => {

        if (!sucursalSeleccionada || !diaSeleccionado || !horaSeleccionada) {

            setMensajeModal('Debe seleccionar todos los campos.')
            setModalVisible(true)

        } else {


            setMensajeModalConfirm('¿Está seguro/a que desea confirmar el turno?')
            setModalConfirmVisible(true)


        }
    };

    const handleAceptar = () => {
        setModalVisible(false)
    }


    const handleAceptarConfirm = () => {

        setModalConfirmVisible(false);

        const obtenerDatos = async () => {

            try {

                let parametros = {
                    CodigoMotivo: motivoSeleccionado,
                    CodigoSucursal: 20,
                    ConceptoTurnoCod: atencionSeleccionada,
                    Descripcion: "",
                    DiaTurno: diaSeleccionado,
                    Email: "ntorres@censys.com.ar",
                    IdHoraTurno: idHoraSeleccionada,
                    IdMensaje: "Sucursal virtual turnos",
                    NumeroDocumento: 0,
                    Telefono: "5493865676249",
                    TipoDocumento: 0,
                }

                const { data: res } = await api.post(`api/TurnoOnline/RegistrarTurnoOnline`, parametros);

                if (res) {

                    //console.log('TurnoOnline >>>', res)
                    navigation.navigate('TurnoConfirmado', { diaSeleccionado, horaSeleccionada, sucursalSeleccionada })

                } else {
                    console.log('Error TurnoOnline');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }

        };

        obtenerDatos();

    };

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <TitleMediumBold title={'Datos de la solicitud'} />

                <Dropdown
                    items={sucursales.map((sucursal) => ({ label: sucursal.descripcionSucursal, value: sucursal }))}
                    placeholder={'Seleccione la sucursal'}
                    onSelectItem={(item) => handleSucursalSeleccionada(item.value)}
                    zIndex={300}
                />

                <Dropdown
                    items={dias.map((dia) => ({ label: <DateConverter date={dia.diaTurno} />, value: dia }))}
                    placeholder={'Seleccione el día'}
                    onSelectItem={(item) => handleDiaSeleccionado(item.value)}
                    zIndex={200}
                />

                <Dropdown
                    items={horas.map((hora) => ({ label: hora.horaTurno.slice(11, 16), value: hora }))}
                    placeholder={'Seleccione la hora'}
                    onSelectItem={(item) => handleHoraSeleccionada(item.value)}
                    zIndex={100}
                />


            </View>

            <ButtonFooter title={'Confirmar'} onPress={() => handleSiguiente()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

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

export default TurnoConfirmacion;