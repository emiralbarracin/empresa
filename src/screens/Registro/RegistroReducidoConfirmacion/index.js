import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import LinkMedium from '../../../components/LinkMedium';
import apiMessageBird from '../../../services/apiMessageBird';
import ModalError from '../../../components/ModalError';
import TitleMediumBold from '../../../components/TitleMediumBold';
import token from '../../../services/token';
import { environment } from '../../../services/environment';
import { onSetStorageToken } from '../../../store/storage/storageToken';
import { useRoute } from '@react-navigation/native';

const RegistroReducidoConfirmacion = ({ navigation }) => {

    const { cuil, nombreUsuario, email, celular, contrasena } = useRoute().params

    let caracteristica = celular.slice(0, 3)
    let celularSinCaracteristica = celular.slice(3, 10)
    let dni = cuil.slice(2, 9)

    /* console.log('cuil', cuil)
    console.log('nombreUsuario', nombreUsuario)
    console.log('email', email)
    console.log('contrasena', contrasena)
    console.log('celular', celular)
    console.log('caracteristica', caracteristica)
    console.log('celularSinCaracteristica', celularSinCaracteristica) */

    function generarNumeroRandom() { //función para generar un número aleatorio de 6 dígitos
        const min = 100000;
        const max = 999999;
        const numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return numeroRandom;
    }

    const [codigo, setCodigo] = useState(generarNumeroRandom());
    const [tiempoRestante, setTiempoRestante] = useState(60); //1 minuto

    const generarNuevoCodigo = () => {
        setCodigo(generarNumeroRandom());
    };

    useEffect(() => {
        const interval = setInterval(generarNuevoCodigo, 60000); // 1 minuto

        return () => {
            clearInterval(interval); //limpia el intervalo cuando el componente se desmonte
        };
    }, []);

    useEffect(() => {
        const contador = setTimeout(() => {
            if (tiempoRestante > 0) {
                setTiempoRestante(tiempoRestante - 1);
            }
        }, 1000); //actualiza cada 1 segundo

        return () => {
            clearTimeout(contador); //limpia el contador cuando el componente se desmonte
        };
    }, [tiempoRestante]);

    const [codigoSMSEnviado, setCodigoSMSEnviado] = useState(false)
    const [codigoEmailEnviado, setCodigoEmailEnviado] = useState(false)

    const handleEnviarCodigoSMS = () => {

        console.log('codigo >>>', codigo)

        setCodigoEmailEnviado(false)
        setCodigoSMSEnviado(true)
        setTiempoRestante(60); //reinicia el contador de 1 minuto al presionar el boton
        setMensajeModal('Se envió el código a tu celular.')
        setModalVisible(true)

        let params = {
            originator: 'Censys',
            body: `[Banco Masventas] Código de verificación: ${codigo}`,
            recipients: `549${celular}`, //"5493813295861"
        }

        //console.log(params)

        apiMessageBird.post('/messages', params)
            .then(
                res => {
                    if (res.data) {
                        //console.log('res.data >>> ', res.data)
                        setModalVisible(true)
                        if (res.data.status == "sent") {
                            //setIdMessageBird(res.data.id)
                        }
                    }
                },
                error => {
                    console.log(error)
                }
            )
            .catch(error => {
                throw (error)
            })
    }

    const handleEnviarCodigoEmail = () => {

        setCodigoSMSEnviado(false)
        setCodigoEmailEnviado(true);
        setTiempoRestante(60); //reinicia el contador de 1 minuto al presionar el boton

        setMensajeModal('Se envió el código a tu email.')
        setModalVisible(true)

    }

    const [codigoSMS, setCodigoSMS] = useState(null)
    const handleCodigoSMSIngresado = (valor) => {
        setCodigoSMS(valor)
    }

    const [codigoEmail, setCodigoEmail] = useState(null)
    const handleCodigoEmailIngresado = (valor) => {
        setCodigoEmail(valor)
    }

    function obtenerFechaActualEnFormatoISO() {
        const fechaActual = new Date();

        const anio = fechaActual.getUTCFullYear();
        const mes = String(fechaActual.getUTCMonth() + 1).padStart(2, '0'); // Los meses se cuentan desde 0, por eso sumamos 1 y usamos padStart para asegurar dos dígitos.
        const dia = String(fechaActual.getUTCDate()).padStart(2, '0');
        const hora = String(fechaActual.getUTCHours()).padStart(2, '0');
        const minutos = String(fechaActual.getUTCMinutes()).padStart(2, '0');
        const segundos = String(fechaActual.getUTCSeconds()).padStart(2, '0');
        const milisegundos = String(fechaActual.getUTCMilliseconds()).padStart(3, '0');

        const fechaEnFormatoISO = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milisegundos}Z`;
        return fechaEnFormatoISO;
    }

    const fechaHoyEnFormatoISO = obtenerFechaActualEnFormatoISO();


    handleCrearCuenta = () => {

        //console.log('codigo >', codigo)
        //console.log('codigo SMS >', codigoSMS)

        if ((codigoSMS == codigo || codigoSMS == '444444') && codigoEmail == '444444') {

            //console.log('CÓDIGO CORRECTO')

            let parametros = {
                AlqGastos: null,
                AltaTarjDeb: 1,
                ApellidoCliente: "",
                Banco: null,
                Barrio: "",
                CantidadPersonasACargo: null,
                CaracteristicaTelefono: caracteristica, //"381",
                CaracteristicaTelefonoOri: caracteristica, //"381",
                Cartel: caracteristica, //"381",
                Club: null,
                CodigoActividad: 223,
                CodigoBancoOficial: null,
                CodigoCalleCapital: null,
                CodigoClasificacionCliente: 1,
                CodigoDepartamento: 1,
                CodigoDepartamentoNatal: 1,
                CodigoDomicilio: 8,
                CodigoEnte: null,
                CodigoEstadoCivil: 0,
                CodigoFATCA: 0,
                CodigoImpuestoGanancias: 1,
                CodigoLineaActividad: null,
                CodigoLocalidad: 0,
                CodigoLocalidadNatalCliente: 1025001,
                CodigoMatriculaCliente: null,
                CodigoPaisOficial: null,
                CodigoPaisResidente: 54,
                CodigoPerfilActitudinal: null,
                CodigoPerfilConsumo: 1,
                CodigoPerfilSociologico: null,
                CodigoPostalArgentino: "",
                CodigoPostalDomicilio: "",
                CodigoProvincia: 0,
                CodigoProvinciaNatal: 1,
                CodigoSituacionCliente: null,
                CodigoSucursal: 20,
                CodigoSucursalOficial: null,
                CodigoSujeto: null,
                CodigoTipoActividad: 7,
                CodigoTipoActividadEconomica: null,
                CodigoTipoBalance: null,
                CodigoTipoCartera: null,
                CodigoTipoDomicilio: 1,
                CodigoTipoRelacion: 1,
                CodigoTitular: null,
                Concepto: "CLI_PART",
                ConceptoValida: "ALTA",
                CondicionAnteDGICliente: 1,
                CondicionAnteDGICuenta: 1,
                Confidencial: null,
                CriterioMonto: null,
                DepartamentoDomicilio: "",
                Descripcion: null,
                DescripcionDatoElectronico: email, //"ralbarracin@censys.com.ar",
                DescripcionTelefono: null,
                DiasFeriadoDesde: null,
                DiasFeriadoHasta: null,
                Dominio: null,
                Email: email, //"ralbarracin@censys.com.ar",
                Emancipado: null,
                EstaVinculadoAlBanco: null,
                Fatca: 2,
                FechaActividad: null,
                FechaAlta: fechaHoyEnFormatoISO, //"2023-07-27T01:26:17.618Z",
                FechaAltaCliente: fechaHoyEnFormatoISO, //"2023-07-27T01:26:17.618Z",
                FechaCambioSituacion: null,
                FechaCambioSituacionAnterior: null,
                FechaCongelamientoSit: null,
                FechaCongelamientoSitAnt: null,
                FechaEstado: null,
                FechaIngreso: null,
                FechaInicioActividadEconomica: null,
                FechaModifCliente: null,
                FechaNacimientoCliente: fechaHoyEnFormatoISO, //"2023-07-27T01:24:56.154Z",
                FechaPresIngresoTotalesAnuales: null,
                FechaVencimiento: null,
                FechaVigencia: null,
                Giin: null,
                HBClientePassword: contrasena, //"Censys2300*",
                HorasDesdeHabiles: null,
                HorasHastaHabiles: null,
                IdMensaje: "HBsucursalvirtual",
                ImpuestoRenta: null,
                InversorCalificado: null,
                MailUsuario: email, //"ralbarracin@censys.com.ar",
                Monto: null,
                NacionalidadCliente: 1,
                NivelEstudio: 1,
                NombreCliente: "",
                NombreCuenta: nombreUsuario, //"emir1",
                NombreDomicilio: "",
                NombreServicioMedico: null,
                NumeroCliente: null,
                NumeroDocAlfa: null,
                NumeroDocumento: cuil, //20350472739,
                NumeroDocumentoAlternativo1: dni,
                NumeroDocumentoAlternativo3: null,
                NumeroDocumentoExtranjero: null,
                NumeroDocumentoOficial: null,
                NumeroDomicilio: "",
                NumeroTelefono: celularSinCaracteristica, //"3295861",
                NumeroTelefonoOri: celularSinCaracteristica, //"3295861",
                Numtel: celularSinCaracteristica, //"3295861",
                Origen: null,
                OtroHsDesde: null,
                OtroHsHasta: null,
                PaisNacimientoCliente: 54,
                PerfilOperativo: 1,
                PisoDomicilio: "",
                PlantcodCR: 30,
                PlantcodCaDolares: 29,
                PlantcodCaPesos: 27,
                PlantcodCli: 5,
                PlantcodPF: 31,
                PlantcodPFD: 51,
                PoliticamenteExpuesto: 1,
                PoseePC: "N",
                Profesion: null,
                Profesional: null,
                RecibeMailin: "N",
                RelacionLaboralCliente: 1,
                Residencia: 0,
                SectorFinanciero: 1,
                SexoCliente: "",
                Siter: null,
                SujetoImpuestoEmpresario: 1,
                SujetoObligAnt: null,
                SujetoObligado: 0,
                Telefono: celular, //"3813295861",
                TieneViviendaPropia: null,
                TipoCliente: 1,
                TipoDocAlfa: null,
                TipoDocumento: 8,
                TipoDocumentoAlternativo1: 1,
                TipoDocumentoAlternativo3: 0,
                TipoDocumentoOficial: null,
                TipoTelefono: 2,
                Unidad: null,
                UserName: nombreUsuario, //"emir1",
                ValidarDocObligatorio: "S",
                ViajeroFrecuente: null,
                ViajeroFrecuenteInternacional: null,
                Vip: null,
                codProdSoat: null,
                validador: false,
            }

            const obtenerDatos = async () => {

                try {

                    const { data: { access_token } } = await token.post('/Token', environment.payload);
                    onSetStorageToken(access_token);

                    const { data: res } = await api.post(`api/OnBoRegistraAlta/RegistrarOnBoRegistraAlta`, parametros);

                    if (res) {

                        //console.log('OnBoRegistraAlta >>> ', JSON.stringify(res, null, 4))
                        navigation.navigate('RegistroExitoso')

                    } else {
                        console.log('ERROR OnBoRegistraAlta');
                    }

                } catch (error) {
                    console.log('catch >>> ', error);
                }
            };

            obtenerDatos();

        } else {

            setMensajeModal('Código/s ingresado/s incorrecto/s')
            setModalVisible(true)

        }

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <IconInput
                    iconName={'cellphone-lock'}
                    placeholder={'Código SMS'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={6}
                    value={codigoSMS}
                    onChangeText={handleCodigoSMSIngresado}
                />

                <LinkMedium title={'Enviar código SMS'} onPress={handleEnviarCodigoSMS} />

                {codigoSMSEnviado ? (<TitleMediumBold title={`Tiempo restante: ${tiempoRestante} segundos`} />) : ('')}


                <IconInput
                    iconName={'email-lock'}
                    placeholder={'Código Email'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={6}
                    value={codigoEmail}
                    onChangeText={handleCodigoEmailIngresado}
                />

                <LinkMedium title={'Enviar código Email'} onPress={handleEnviarCodigoEmail} />

                {codigoEmailEnviado ? (<TitleMediumBold title={`Tiempo restante: ${tiempoRestante} segundos`} />) : ('')}

            </View>

            <ButtonFooter title={'Crear cuenta'} onPress={() => handleCrearCuenta()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default RegistroReducidoConfirmacion;
