import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonFooter from '../../../components/ButtonFooter';
import styles from './styles';
import api from '../../../services/api';
import TitleMedium from '../../../components/TitleMedium';
import TableMedium from '../../../components/TableMedium';
import { useRoute } from '@react-navigation/native';

const ClienteBusquedaDetalle = ({ navigation }) => {

    const numeroDocumentoClienteBusqueda = useRoute().params.numeroDocumento

    const [datosPersonales, setDatosPersonales] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [domicilios, setDomicilios] = useState([]);
    const [homeBankings, setHomeBankings] = useState([]);
    const [otros, setOtros] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [plazosFijos, setPlazosFijos] = useState([]);
    const [creditos, setCreditos] = useState([]);

    /* useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const { data: { output: datosGenerales } } = await api.get(`api/BTClienteDatosGenerales/RecuperarBTClienteDatosGenerales?TipoDocumentoCliente=8&NumeroDocumentoCliente=${numeroDocumentoClienteBusqueda}&CodigoSucursal=20&IdMensaje=PostmanBack`);
                if (datosGenerales) {
                    console.log('RecuperarBOClienteDatosGenerales >>> ', JSON.stringify(datosGenerales, null, 4));
                    setDatosPersonales(datosGenerales.map((dato) => ({
                        nombre: dato.nombre,
                        tipoDocumento: dato.tipoDocumentoDesc,
                        numeroDocumento: dato.numeroDocumento,
                        fechaNacimiento: dato.fechaNacimientoCliente
                    })));
                    setContactos(datosGenerales.map((dato) => ({
                        email: dato.mailUsuario,
                        telefono: `${dato.caracteristicaTelefono}-${dato.numeroTelefono}`
                    })));
                    setDomicilios(datosGenerales.map((dato) => ({
                        direccion: dato.nombreDomicilio,
                        numeroDomicilio: dato.numeroDomicilio,
                        piso: dato.pisoDomicilio,
                        departamento: dato.departamentoDomicilio,
                        localidad: dato.codigoLocalidad,
                        provincia: dato.descripcionProvincia,
                        codigoPostal: dato.codigoPostalDomicilio
                    })));
                } else {
                    console.log('ERROR RecuperarBOClienteDatosGenerales');
                }

                const { data: { output: datosHB } } = await api.get(`api/BTConsultaUsuarioHB/RecuperarBTConsultaUsuarioHB?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${numeroDocumentoClienteBusqueda}&IdMensaje=IdMensaje`);
                if (datosHB) {
                    console.log('RecuperarBTConsultaUsuarioHB >>> ', JSON.stringify(datosHB, null, 4));
                    setHomeBankings(datosHB.map((dato) => ({
                        userName: dato.userName,
                        fechaAlta: dato.fechaUsuarioAlta,
                        estado: dato.estado === '0' ? 'Activo' : ''
                    })));
                } else {
                    console.log('ERROR RecuperarBTConsultaUsuarioHB');
                }

                const { data: { output: datosOtros } } = await api.get(`api/BTRecuperaAgenteOficalySituacion/RecuperarBTRecuperaAgenteOficalySituacion?TipoDocumento=8&NumeroDocumento=${numeroDocumentoClienteBusqueda}&IdMensaje=IdMensaje`);
                if (datosOtros) {
                    console.log('RecuperarBTRecuperaAgenteOficalySituacion >>> ', JSON.stringify(datosOtros, null, 4));
                    setOtros(datosOtros.map((dato) => ({
                        agente: dato.descripcionTipoAgente,
                        situacion: dato.descripcionSituacion,
                        oficial: dato.descripcionUsuario
                    })));
                } else {
                    console.log('ERROR RecuperarBTRecuperaAgenteOficalySituacion');
                }

                const { data: { output: datosCuenta } } = await api.get(`api/BTConsultaCuentaDoc/RecuperarBTConsultaCuentaDoc?TipoDocumentoCliente=8&NumeroDocumentoCliente=${numeroDocumentoClienteBusqueda}&CodigoProceso=18&CodigoSucursal=20&Concepto=TODO&IdMensaje=test`);
                if (datosCuenta) {
                    console.log('RecuperarBTConsultaCuentaDoc >>> ', JSON.stringify(datosCuenta, null, 4));
                    setCuentas(datosCuenta.map((dato) => ({
                        cuenta: dato.mascara,
                        sucursal: dato.descripcionSucursal,
                        operatoria: dato.sinteticoSistema,
                        saldo: `${dato.sintetico} ${dato.saldo}`,
                        estado: dato.descripcionEstadoCuenta,
                        tipoBloqueo: dato.descripcionTipoBloqueo
                    })));


                    //filtro cuentas con operatoria 'pf'
                    setPlazosFijos(datosCuenta.filter(cuenta => cuenta.sinteticoSistema === 'pf').map(cuenta => ({
                        cuenta: cuenta.mascara,
                        sucursal: cuenta.descripcionSucursal,
                        operatoria: cuenta.sinteticoSistema,
                        saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                        estado: cuenta.descripcionEstadoCuenta,
                        tipoBloqueo: cuenta.descripcionTipoBloqueo
                    })));

                    //filtro cuentas con operatoria 'cr'
                    setCreditos(datosCuenta.filter(cuenta => cuenta.sinteticoSistema === 'cr').map(cuenta => ({
                        cuenta: cuenta.mascara,
                        sucursal: cuenta.descripcionSucursal,
                        operatoria: cuenta.sinteticoSistema,
                        saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                        estado: cuenta.descripcionEstadoCuenta,
                        tipoBloqueo: cuenta.descripcionTipoBloqueo
                    })));

                } else {
                    console.log('ERROR RecuperarBTConsultaCuentaDoc');
                }



            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []); */


    const titulosDatosPersonales = ['Apellido/s y Nombre/s', 'Tipo de Documento', 'N° Documento', 'Fecha de Nacimiento'];
    const datosDatosPersonales = datosPersonales.map((datoPersonal) => [
        datoPersonal.nombre,
        datoPersonal.tipoDocumento,
        datoPersonal.numeroDocumento,
        datoPersonal.fechaNacimiento,
    ]);

    const titulosContacto = ['Email', 'Teléfono'];
    const datosContacto = contactos.map((contacto) => [
        contacto.email,
        contacto.telefono,
    ]);

    const titulosDomicilio = ['Dirección', 'N° Domicilio', 'Piso', 'Departamento', 'Localidad', 'Provincia', 'Código postal'];
    const datosDomicilio = domicilios.map((domicilio) => [
        domicilio.direccion,
        domicilio.numeroDomicilio,
        domicilio.piso,
        domicilio.departamento,
        domicilio.localidad,
        domicilio.provincia,
        domicilio.codigoPostal,

    ]);

    const titulosHB = ['Nombre de Usuario', 'Fecha de Alta', 'Estado'];
    const datosHB = homeBankings.map((homeBanking) => [
        homeBanking.userName,
        homeBanking.fechaAlta,
        homeBanking.estado,
    ]);

    const titulosOtros = ['Agente', 'Sitación', 'Oficial'];
    const datosOtros = otros.map((otro) => [
        otro.agente,
        otro.situacion,
        otro.oficial,
    ]);

    //genero las filas de la tabla con los datos de cada cuenta
    const titulosCuenta = ['Cuenta', 'Sucursal', 'Operatoria', 'Saldo', 'Estado', 'Tipo de bloqueo'];
    const datosCuenta = cuentas.map((cuenta) => [
        cuenta.cuenta,
        cuenta.sucursal,
        cuenta.operatoria,
        cuenta.saldo,
        cuenta.estado,
        cuenta.tipoBloqueo
    ]);

    const titulosPlazosFijos = ['Cuenta', 'Sucursal', 'Operatoria', 'Saldo', 'Estado', 'Tipo de bloqueo'];
    const datosPlazosFijos = plazosFijos.map(cuenta => [
        cuenta.cuenta,
        cuenta.sucursal,
        cuenta.operatoria,
        cuenta.saldo,
        cuenta.estado,
        cuenta.tipoBloqueo
    ]);

    const titulosCreditos = ['Cuenta', 'Sucursal', 'Operatoria', 'Saldo', 'Estado', 'Tipo de bloqueo'];
    const datosCreditos = creditos.map(cuenta => [
        cuenta.cuenta,
        cuenta.sucursal,
        cuenta.operatoria,
        cuenta.saldo,
        cuenta.estado,
        cuenta.tipoBloqueo
    ]);

    const handleInicio = () => {
        navigation.navigate('ClienteBusqueda')
        navigation.navigate('InicioDrawer')
    }


    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <TitleMedium title={'Datos personales'} />
                <TableMedium headers={titulosDatosPersonales} data={datosDatosPersonales} />

                <TitleMedium title={'Contacto'} />
                <TableMedium headers={titulosContacto} data={datosContacto} />

                <TitleMedium title={'Domicilio'} />
                <TableMedium headers={titulosDomicilio} data={datosDomicilio} />

                <TitleMedium title={'Home Banking'} />
                <TableMedium headers={titulosHB} data={datosHB} />

                <TitleMedium title={'Otros'} />
                <TableMedium headers={titulosOtros} data={datosOtros} />

                <TitleMedium title={'Cuentas'} />
                <TableMedium headers={titulosCuenta} data={datosCuenta} />

                <TitleMedium title={'Plazos Fijos'} />
                <TableMedium headers={titulosPlazosFijos} data={datosPlazosFijos} />

                <TitleMedium title={'Créditos'} />
                <TableMedium headers={titulosCreditos} data={datosCreditos} />

            </ScrollView>

            <View style={styles.footer}>
                <ButtonFooter
                    title={'Inicio'}
                    onPress={() => handleInicio()}
                />
            </View>

        </View>
    );
};

export default ClienteBusquedaDetalle;
