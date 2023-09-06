import { Platform, ScrollView, View, } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonFooter from '../../../components/ButtonFooter';
import styles from './styles';
import LinkSmall from '../../../components/LinkSmall';
import TableMedium from '../../../components/TableMedium';
import api from '../../../services/api';
import ModalError from '../../../components/ModalError';
import IconInputButton from '../../../components/IconInputButton';
import ButtonBody from '../../../components/ButtonBody';
import LinkLarge from '../../../components/LinkLarge';
import TitleLarge from '../../../components/TitleLarge';
import TableMediumLeft from '../../../components/TableMediumLeft';
import { useDispatch } from 'react-redux';
import { agregarUsuarioEncontrado } from '../../../store/slices/usuarioEncontradoSlice';
import DateConverter from '../../../utils/DateConverter';
import TitleLargeBold from '../../../components/TitleLargeBold';

const ClienteBusqueda = ({ navigation }) => {

    const dispatch = useDispatch();

    const [dniABuscar, setDniABuscar] = useState('37642213');
    const [numeroDocumento, setNumeroDocumento] = useState(null);
    const [clienteEncontrado, setClienteEncontrado] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const [cajasDeAhorroPesos, setCajasDeAhorroPesos] = useState([]);
    const [cajasDeAhorroDolares, setCajasDeAhorroDolares] = useState([]);
    const [creditos, setCreditos] = useState([]);
    const [plazosFijosPesos, setPlazosFijosPesos] = useState([]);
    const [plazosFijosDolares, setPlazosFijosDolares] = useState([]);

    const [mostrarCajasDeAhorroPesos, setMostrarCajasDeAhorroPesos] = useState(false);
    const [mostrarCajasDeAhorroDolares, setMostrarCajasDeAhorroDolares] = useState(false);
    const [mostrarCreditos, setMostrarCreditos] = useState(false);
    const [mostrarPlazosFijosPesos, setMostrarPlazosFijosPesos] = useState(false);
    const [mostrarPlazosFijosDolares, setMostrarPlazosFijosDolares] = useState(false);

    const handleAceptar = () => {
        setModalVisible(!modalVisible);
    };

    const handleDniABuscar = valor => {
        setDniABuscar(valor)
    }

   /*  const handleBuscar = async () => {
        try {

            const { data: res1 } = await api.get(`api/BTConsultaBuscaCliente/RecuperarBTConsultaBuscaCliente?CodigoSucursal=20&CodigoSistema=0&Origen=L&FormatoSalida=PANEL&Evalua=SI&ConceptoBusca=DOCUMENTO&ConceptoEval=null&TipoDocumento=1&NumeroDocumento=${dniABuscar}&TipoBusca=APROXIMADO&Denominacion=null&LlamadoDesde=IBS&CantidadFilas=null&CodigoCuenta=null&CodigoVinculo=null&CodigoPaisOrigen=null&CodigoBancoOrigen=null&CodigoSucursalOrigen=null&TipoDocumentoPrinc=null&NumeroDocumentoPrinc=null&ConsideraPrioridad=null&TipoDocAlfa=null&NumeroDocAlfa=null&IdMensaje=test`);

            if (res1.existe === 1) {
                setNumeroDocumento(res1.output[0].numeroDocumento);
                setClienteEncontrado(true);
                dispatch(agregarUsuarioEncontrado(res1.output[0]));
            } else {
                console.log('EL CLIENTE NO EXISTE');
                setModalVisible(!modalVisible);
                setMensajeModal('No se encontró ningún cliente');
                setClienteEncontrado(false);
            }

            const { data: res2 } = await api.get(`api/BTOnBoCtrlAlta/RecuperarBTOnBoCtrlAlta?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=20376422136&IdMensaje=PostmanBack`);
            if (res2) {

                console.log(' >>>>>>>>>>>>>>>>>>>>>>>>> ', JSON.stringify(res2, null, 4));

            } else {
                console.log('ERROR BTOnBoCtrlAlta');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        }
    };

    const [datosGeneralesIzquierda, setDatosGeneralesIzquierda] = useState([]);
    const [datosGeneralesDerecha, setDatosGeneralesDerecha] = useState([]);

    useEffect(() => {
        const obtenerDatosGenerales = async () => {
            try {

                const res = await api.get(`api/BTClienteDatosGenerales/RecuperarBTClienteDatosGenerales?TipoDocumentoCliente=8&NumeroDocumentoCliente=${numeroDocumento}&CodigoSucursal=20&IdMensaje=PostmanBack`);
                const respuestaDatosGenerales = res.data.output[0];

                //console.log('BTClienteDatosGenerales >>> ', JSON.stringify(respuestaDatosGenerales, null, 4))

                const modificarDatosGeneralesIzquierda = [
                    { label: 'CUIL', value: respuestaDatosGenerales.numeroDocumento },
                    { label: 'Apellido y Nombre', value: respuestaDatosGenerales.nombre },
                    { label: 'Fecha de nacimiento', value: <DateConverter date={respuestaDatosGenerales.fechaNacimientoCliente} /> },
                    { label: 'Sexo', value: respuestaDatosGenerales.sexoCliente },
                ];
                setDatosGeneralesIzquierda(modificarDatosGeneralesIzquierda);

                const modificarDatosGeneralesDerecha = [
                    { label: 'Domicilio', value: `${respuestaDatosGenerales.nombreDomicilio} ${respuestaDatosGenerales.numeroDomicilio}` },
                    { label: 'Teléfono', value: `${respuestaDatosGenerales.caracteristicaTelefono}-${respuestaDatosGenerales.numeroTelefono}` },
                    { label: 'Email', value: respuestaDatosGenerales.mailUsuario },
                ];
                setDatosGeneralesDerecha(modificarDatosGeneralesDerecha);

            } catch (error) {
                console.log('catch BTClienteDatosGenerales >>> ', error);
            }
        };

        obtenerDatosGenerales();
    }, [numeroDocumento]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                if (clienteEncontrado && numeroDocumento) {
                    const { data } = await api.get(`api/BTConsultaCuentaDoc/RecuperarBTConsultaCuentaDoc?TipoDocumentoCliente=8&NumeroDocumentoCliente=${numeroDocumento}&CodigoProceso=18&CodigoSucursal=20&Concepto=TODO&IdMensaje=test`);

                    if (data) {

                        //console.log('BTConsultaCuentaDoc >>> ', JSON.stringify(data.output, null, 4));

                        // filtro caja de ahorro en pesos
                        setCajasDeAhorroPesos(data.output.filter((cuenta) => cuenta.codigoSistema === 5 && cuenta.codigoMoneda === 0).map((cuenta) => ({
                            cuenta: cuenta.mascara,
                            sucursal: cuenta.descripcionSucursal,
                            operatoria: cuenta.sinteticoSistema,
                            saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                            estado: cuenta.descripcionEstadoCuenta,
                            tipoBloqueo: cuenta.descripcionTipoBloqueo,
                        }))
                        );

                        // filtro caja de ahorro en dolares
                        setCajasDeAhorroDolares(data.output.filter((cuenta) => cuenta.codigoSistema === 5 && cuenta.codigoMoneda === 2).map((cuenta) => ({
                            cuenta: cuenta.mascara,
                            sucursal: cuenta.descripcionSucursal,
                            operatoria: cuenta.sinteticoSistema,
                            saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                            estado: cuenta.descripcionEstadoCuenta,
                            tipoBloqueo: cuenta.descripcionTipoBloqueo,
                        }))
                        );

                        //filtro cuentas con operatoria 'cr'
                        setCreditos(data.output.filter((cuenta) => cuenta.sinteticoSistema === 'cr').map((cuenta) => ({
                            cuenta: cuenta.mascara,
                            sucursal: cuenta.descripcionSucursal,
                            operatoria: cuenta.sinteticoSistema,
                            saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                            estado: cuenta.descripcionEstadoCuenta,
                            tipoBloqueo: cuenta.descripcionTipoBloqueo,
                        }))
                        );

                        //filtro plazo fijo en pesos
                        setPlazosFijosPesos(data.output.filter((cuenta) => cuenta.codigoSistema === 4 && cuenta.codigoMoneda === 0).map((cuenta) => ({
                            cuenta: cuenta.mascara,
                            sucursal: cuenta.descripcionSucursal,
                            operatoria: cuenta.sinteticoSistema,
                            saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                            estado: cuenta.descripcionEstadoCuenta,
                            tipoBloqueo: cuenta.descripcionTipoBloqueo,
                        }))
                        );

                        //filtro plazo fijo en dolares
                        setPlazosFijosDolares(data.output.filter((cuenta) => cuenta.codigoSistema === 4 && cuenta.codigoMoneda === 2).map((cuenta) => ({
                            cuenta: cuenta.mascara,
                            sucursal: cuenta.descripcionSucursal,
                            operatoria: cuenta.sinteticoSistema,
                            saldo: `${cuenta.sintetico} ${cuenta.saldo}`,
                            estado: cuenta.descripcionEstadoCuenta,
                            tipoBloqueo: cuenta.descripcionTipoBloqueo,
                        }))
                        );

                    } else {
                        console.log('ERROR BTConsultaCuentaDoc');
                    }
                }
            } catch (error) {
                console.log('catch BTConsultaCuentaDoc >>> ', error);
            }
        };

        obtenerDatos();
    }, [clienteEncontrado, numeroDocumento]);
 */
    const handleDetalleCredito = () => {
        console.log('detalle del credito')
    }

    const titulosCajasDeAhorroPesos = ['Sucursal', 'Cuenta', 'Operatoria', 'Saldo', 'Estado', 'Tipo Bloqueo', 'Acción'];
    const datosCajasDeAhorroPesos = cajasDeAhorroPesos.map(cajaDeAhorroPesos => [
        cajaDeAhorroPesos.sucursal,
        cajaDeAhorroPesos.cuenta,
        cajaDeAhorroPesos.operatoria,
        cajaDeAhorroPesos.saldo,
        cajaDeAhorroPesos.estado,
        cajaDeAhorroPesos.tipoBloqueo,
        <LinkSmall title={'Ver detalle'} onPress={handleDetalleCredito} />
    ]);

    const titulosCajasDeAhorroDolares = ['Sucursal', 'Cuenta', 'Operatoria', 'Saldo', 'Estado', 'Tipo Bloqueo', 'Acción'];
    const datosCajasDeAhorroDolares = cajasDeAhorroDolares.map(cajaDeAhorroDolares => [
        cajaDeAhorroDolares.sucursal,
        cajaDeAhorroDolares.cuenta,
        cajaDeAhorroDolares.operatoria,
        cajaDeAhorroDolares.saldo,
        cajaDeAhorroDolares.estado,
        cajaDeAhorroDolares.tipoBloqueo,
        <LinkSmall title={'Ver detalle'} onPress={handleDetalleCredito} />
    ]);


    const titulosCreditos = ['Sucursal', 'Cuenta', 'Operatoria', 'Saldo', 'Estado', 'Tipo Bloqueo', 'Acción'];
    const datosCreditos = creditos.map(credito => [
        credito.sucursal,
        credito.cuenta,
        credito.operatoria,
        credito.saldo,
        credito.estado,
        credito.tipoBloqueo,
        <LinkSmall title={'Ver detalle'} onPress={handleDetalleCredito} />
    ]);

    const titulosPlazosFijosPesos = ['Sucursal', 'Cuenta', 'Operatoria', 'Saldo', 'Estado', 'Tipo Bloqueo', 'Acción'];
    const datosPlazosFijosPesos = plazosFijosPesos.map(plazoFijoPesos => [
        plazoFijoPesos.sucursal,
        plazoFijoPesos.cuenta,
        plazoFijoPesos.operatoria,
        plazoFijoPesos.saldo,
        plazoFijoPesos.estado,
        plazoFijoPesos.tipoBloqueo,
        <LinkSmall title={'Ver detalle'} onPress={handleDetalleCredito} />
    ]);


    const titulosPlazosDolares = ['Sucursal', 'Cuenta', 'Operatoria', 'Saldo', 'Estado', 'Tipo Bloqueo', 'Acción'];
    const datosPlazosFijosDolares = plazosFijosDolares.map(plazoFijoDolares => [
        plazoFijoDolares.sucursal,
        plazoFijoDolares.cuenta,
        plazoFijoDolares.operatoria,
        plazoFijoDolares.saldo,
        plazoFijoDolares.estado,
        plazoFijoDolares.tipoBloqueo,
        <LinkSmall title={'Ver detalle'} onPress={handleDetalleCredito} />
    ]);


    const handleSimularCredito = () => {
        navigation.navigate('CreditoSimulacion')
    }

    const handleMostrarCajasDeAhorroPesos = () => {
        setMostrarCajasDeAhorroPesos(!mostrarCajasDeAhorroPesos)
    }

    const handleMostrarCajasDeAhorroDolares = () => {
        setMostrarCajasDeAhorroDolares(!mostrarCajasDeAhorroDolares)
    }

    const handleMostrarCreditos = () => {
        setMostrarCreditos(!mostrarCreditos)
    }

    const handleMostrarPlazosFijosPesos = () => {
        setMostrarPlazosFijosPesos(!mostrarPlazosFijosPesos)
    }

    const handleMostrarPlazosFijosDolares = () => {
        setMostrarPlazosFijosDolares(!mostrarPlazosFijosDolares)
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <View style={styles.IconInputButton}>
                    <IconInputButton
                        onChangeText={handleDniABuscar}
                        iconName={'magnify'}
                        iconNameButton={'camera'}
                        placeholder={`Buscar..`}
                        value={dniABuscar}
                        keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    />
                    <View style={styles.botonBuscar}>
                        <ButtonBody title={'Buscar'} onPress={handleBuscar} />
                    </View>
                </View>

                {clienteEncontrado ? (
                    <View>

                        <TableMediumLeft data1={datosGeneralesIzquierda} data2={datosGeneralesDerecha} />
                        {/* <TableMedium headers={titulosPersona} data={datosPersona} />  */}

                        <View style={styles.titulo} >
                            <TitleLargeBold title={' Productos'} />
                        </View>

                        <LinkLarge title={mostrarCajasDeAhorroPesos ? '▼ Cajas de Ahorro en Pesos' : '▶ Cajas de Ahorro en Pesos'} onPress={handleMostrarCajasDeAhorroPesos} />
                        {mostrarCajasDeAhorroPesos ? (<TableMedium headers={titulosCajasDeAhorroPesos} data={datosCajasDeAhorroPesos} />) : null}

                        <LinkLarge title={mostrarCajasDeAhorroDolares ? '▼ Cajas de Ahorro en Dólares' : '▶ Cajas de Ahorro en Dólares'} onPress={handleMostrarCajasDeAhorroDolares} />
                        {mostrarCajasDeAhorroDolares ? (<TableMedium headers={titulosCajasDeAhorroDolares} data={datosCajasDeAhorroDolares} />) : null}

                        <LinkLarge title={mostrarCreditos ? '▼ Créditos' : '▶ Créditos'} onPress={handleMostrarCreditos} />
                        {mostrarCreditos ? (<TableMedium headers={titulosCreditos} data={datosCreditos} />) : null}

                        <LinkLarge title={mostrarPlazosFijosPesos ? '▼ Plazos Fijos en Pesos' : '▶ Plazos Fijos en Pesos'} onPress={handleMostrarPlazosFijosPesos} />
                        {mostrarPlazosFijosPesos ? (<TableMedium headers={titulosPlazosFijosPesos} data={datosPlazosFijosPesos} />) : null}

                        <LinkLarge title={mostrarPlazosFijosDolares ? '▼ Plazos Fijos en Dólares' : '▶ Plazos Fijos en Dólares'} onPress={handleMostrarPlazosFijosDolares} />
                        {mostrarPlazosFijosDolares ? (<TableMedium headers={titulosPlazosDolares} data={datosPlazosFijosDolares} />) : null}

                        <View style={styles.titulo} >
                            <TitleLargeBold title={' Nuevos productos'} />
                        </View>

                        <LinkLarge title={' +  Cuenta Corriente'} />

                    </View>
                ) : null}

            </ScrollView>

            <View style={styles.footer}>

                {clienteEncontrado ? (
                    <ButtonFooter
                        title={'Simular crédito'}
                        onPress={() => handleSimularCredito()}
                    />
                ) : null}

            </View>

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default ClienteBusqueda;


/* const [tipoDocumento, setTipoDocumento] = useState(null);
const [nombre, setNombre] = useState(null);

 const handleDetalleDato = () => {
    console.log('detalles..')
    navigation.navigate('ClienteBusquedaDetalle', { numeroDocumento })
}

const titulosPersona = ['Tipo Documento', 'N° Documento', 'Apellido y Nombre', 'Acción'];
const datosPersona = [
    [tipoDocumento, numeroDocumento, nombre, <LinkSmall title={'Ver detalle'} onPress={handleDetalleDato} />],
];  */