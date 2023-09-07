import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux'; //con el hook useSelector puedo acceder al estado global de la app y traer los datos que me interesan
import ButtonSquare from '../../components/ButtonSquare';
import CardCuenta from '../../components/CardCuenta';
import CardMovimiento from '../../components/CardMovimiento';
import TitleMedium from '../../components/TitleMedium';
import api from '../../services/api';
import MoneyConverter from '../../utils/MoneyConverter';
import DateConverter from '../../utils/DateConverter';
import { agregarCuentas } from '../../store/slices/cuentaSlice';
import { cambiarOjo } from '../../store/slices/cuentaSlice';
import TitleSmall from '../../components/TitleSmall';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import base64 from 'react-native-base64';
import { onSetStorageToken, onSetStorageUser } from '../../store/storage/storageToken';
import { onSetStorageIdEmpresa } from '../../store/storage/storageIdEmpresa';
import tokenWithCompany from '../../services/tokenWithCompany';
import { environment } from '../../services/environment';
import HorizontalLine from '../../components/HorizontalLinea';
import LoadingIndicator from '../../components/LoadingIndicator';

const Inicio = ({ navigation }) => {

  const [cargando, setCargando] = useState(true);

  //useSelector recibe el estado global y luego le indico que solo quiero el estado del slice que es manejado por el identificador usuarioStore (el estado llega a useSelector gracias al componente Provider al cual le pasamos el store)
  const usuarioQueLlega = useSelector(state => state.usuarioStore);
  //console.log('usuarioQueLlega >>> ', usuarioQueLlega)
  //accedo al estado del slice y guardo los valores en nombreQueLlega y correoQueLlega
  const nombreQueLlega = usuarioQueLlega.nombre;
  //const correoQueLlega = usuarioQueLlega.correo;

  const nombreEmpresaRTK = useSelector(state => state.usuarioStore.nombreEmpresa);
  const idEmpresaRTK = useSelector(state => state.usuarioStore.idEmpresa);
  //console.log('nombreEmpresaRTK >>> ', nombreEmpresaRTK)
  //console.log('idEmpresaRTK >>> ', idEmpresaRTK)

  const nombreUsuarioRTK = useSelector(state => state.usuarioStore.nombreUsuario);
  const contrasenaUsuarioRTK = useSelector(state => state.usuarioStore.contrasenaUsuario);
  //console.log('nombreEmpresaRTK >>> ', nombreUsuarioRTK)

  const [saldo, setSaldo] = useState(null)
  const [tipoCuenta, setTipoCuenta] = useState(null)
  const [codigoMoneda, setCodigoMoneda] = useState(null)
  const [codigoSistema, setCodigoSistema] = useState(null)
  const [codigoCuenta, setCodigoCuenta] = useState(null)
  const [tipoMoneda, setTipoMoneda] = useState(null)
  const [numeroCuenta, setNumeroCuenta] = useState(null)

  const [cbu, setCbu] = useState(null)

  const [ultimosMovimientos, setUltimosMovimientos] = useState([]);

  const [variableMovimientos, setVariableMovimientos] = useState(false);

  const actualizarMovimientos = () => {
    setVariableMovimientos(!variableMovimientos);
  };

  let focusListener = null;

  focusListener = navigation.addListener('focus', () => { //dispara la funcion de adentro cuando esta en foco esta pantalla
    //console.log('HomeScreen en foco..');
    actualizarMovimientos();
  });

  const dispatch = useDispatch()

  useEffect(() => {

    const obtenerDatos = async () => {

      try {

        const base64Usuario = base64.encode(`${nombreUsuarioRTK}:${contrasenaUsuarioRTK}`);
        const base64IdEmpresa = base64.encode(`${idEmpresaRTK}`);

        onSetStorageIdEmpresa(base64IdEmpresa);
        onSetStorageUser(base64Usuario);

        const { data: { access_token } } = await tokenWithCompany.post('/Token', environment.payload);
        //console.log('tokenWithCompany >>> ', access_token);
        onSetStorageToken(access_token); //guarda el token en el almacenamiento local

        const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=TODO&IdMensaje=sucursalvirtual`);
        if (res1) {

          //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1, null, 4))
          let cbu1 = res1.output[0].cbuBloque1
          let cbu2 = res1.output[0].cbuBloque2
          let codigoMoneda = res1.output[0].codigoMoneda
          let codigoCuenta = res1.output[0].codigoCuenta
          let codigoSistema = res1.output[0].codigoSistema
          setSaldo(res1.output[0].saldo)
          setTipoCuenta(res1.output[0].codigoSistemaDesc)
          setCodigoMoneda(res1.output[0].codigoMoneda)
          setCodigoSistema(res1.output[0].codigoSistema)
          setCodigoCuenta(res1.output[0].codigoCuenta)
          setTipoMoneda(res1.output[0].codigoMonedaDesc)
          setNumeroCuenta(res1.output[0].mascara)
          setCbu(`0${cbu1}0${cbu2}`)

          dispatch(agregarCuentas(res1)) //seteo el sliceCuenta con los valores de esta api que trae todas las cuentas

          const { data: res2 } = await api.get(`api/BECuentaUltimosMovimientos/RecuperarBECuentaUltimosMovimientos?CodigoSucursal=20&CodigoSistema=${codigoSistema}&CodigoMoneda=${codigoMoneda}&CodigoCuenta=${codigoCuenta}&Pagina=1&IdMensaje=sucursalvirtual`);
          if (res2) {

            //console.log('HbCuentaUltimosMovimientos >>> ', JSON.stringify(res2, null, 4))
            setUltimosMovimientos(res2.output)
            setCargando(false)

          } else {
            console.log('ERROR BECuentaUltimosMovimientos');
          }

        } else {
          console.log('ERROR BECuentaUltimosMovimientos');
        }

      } catch (error) {
        console.log('catch >>> ', error);
      }
    };

    obtenerDatos();
  }, [variableMovimientos]);

  const handleMovimientos = () => {
    navigation.navigate('MovimientoCuenta', { tipoCuenta, tipoMoneda, numeroCuenta, codigoMoneda, codigoSistema, codigoCuenta })
  };

  const handleCBU = () => {
    navigation.navigate('MovimientoCbu', { tipoCuenta, tipoMoneda, numeroCuenta, cbu })
  };

  const [ojoAbierto, setOjoAbierto] = useState(true)

  const handleOjo = () => {
    setOjoAbierto(!ojoAbierto)
    dispatch(cambiarOjo(!ojoAbierto))
  }

  return (
    <View style={styles.container}>

      {cargando ? (
        <LoadingIndicator />
      ) : (

        <View style={styles.body}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: '1%' }}>

            <View style={styles.usuario}>
               <TitleSmall title={`${nombreEmpresaRTK} | ${nombreQueLlega}`} /> 
            </View>

            <View style={{ marginRight: '4%', alignItems: 'flex-end' }}>

              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => navigation.navigate('IngresoEmpresaListado')}>
                  <MaterialCommunityIcons name={'sync'} style={{ fontSize: 20, color: colors.colorA, marginRight: '10%' }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOjo}>
                  <MaterialCommunityIcons name={ojoAbierto ? 'eye' : 'eye-off'} style={{ fontSize: 20, color: colors.colorA }} />
                </TouchableOpacity>

              </View>

            </View>

          </View>

          <CardCuenta
            saldo={ojoAbierto ? <MoneyConverter money={codigoMoneda} value={saldo} /> : '*****'}
            tipoCuenta={tipoCuenta}
            tipoMoneda={tipoMoneda}
            numeroCuenta={numeroCuenta}
            onPressMovimientos={handleMovimientos}
            onPressCBU={handleCBU}
          />

          <View style={styles.buttonsContainer}>
            <ButtonSquare iconName="handshake" title={'Créditos'} onPress={() => navigation.navigate('CreditoProducto')} />
            <ButtonSquare iconName="arrow-top-right" title={'Plazos fijos'} onPress={() => navigation.navigate('PlazoFijoProducto')} />
            <ButtonSquare iconName="arrow-left-top" title={'Transferencia'} onPress={() => navigation.navigate('TransferenciaNueva')} />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonSquare iconName="lock-open-outline" title={'Token'} onPress={() => navigation.navigate('TokenConsulta')} />
            <ButtonSquare iconName="form-select" title={'Informes'}  onPress={() => navigation.navigate('PosicionConsolidadaTipoInforme')}  />
            <ButtonSquare iconName="calendar-arrow-right" title={'Turno'} onPress={() => navigation.navigate('TurnoNuevo')} />
          </View>

          <TitleMedium title={'Últimos movimientos'} />

          <HorizontalLine />
          <ScrollView>
            {ultimosMovimientos.map((item) => (
              <CardMovimiento
                producto={item.descripcion}
                fecha={<DateConverter date={item.fechaReal} />}
                importe={<MoneyConverter money={item.codigoMoneda} value={item.importeAccesorio} />}
                tipoFuncion={item.tipoFuncion}
                onPress={() => navigation.navigate('MovimientoDetalle', {
                  descripcion: item.descripcion,
                  fecha: item.fechaReal,
                  importe: item.importeAccesorio,
                  numeroComprobante: item.numeroComprobante,
                })}
              />
            ))}
          </ScrollView>

        </View>

      )}

    </View>
  );
};

export default Inicio;
