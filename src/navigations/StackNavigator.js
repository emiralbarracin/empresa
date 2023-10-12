import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IngresoNuevo from '../screens/Ingreso/IngresoNuevo';
import IngresoMetodo from '../screens/Ingreso/IngresoMetodo';
import IngresoVerificacion from '../screens/Ingreso/IngresoVerificacion';
import ButtonBack from '../components/ButtonBack';
import TabNavigator from './TabNavigator';
import Cuenta from '../screens/Cuenta';
import Mas from '../screens/Mas';
import PlazoFijoProducto from '../screens/PlazoFijo/PlazoFijoProducto';
import PlazoFijoSimulacion from '../screens/PlazoFijo/PlazoFijoSimulacion';
import PlazoFijoUvaSimulacion from '../screens/PlazoFijo/PlazoFijoUvaSimulacion';
import PlazoFijoConfirmacion from '../screens/PlazoFijo/PlazoFijoConfirmacion';
import PlazoFijoDetalle from '../screens/PlazoFijo/PlazoFijoDetalle';
import PlazoFijoListado from '../screens/PlazoFijo/PlazoFijoListado';
import PlazoFijoListadoDetalle from '../screens/PlazoFijo/PlazoFijoListadoDetalle';
import PlazoFijoPrecancelableListado from '../screens/PlazoFijo/PlazoFijoPrecancelableListado';
import PlazoFijoPrecancelableConfirmacion from '../screens/PlazoFijo/PlazoFijoPrecancelableConfirmacion';
import PlazoFijoPrecancelableDetalle from '../screens/PlazoFijo/PlazoFijoPrecancelableDetalle';
import CreditoProducto from '../screens/Credito/CreditoProducto';
import CreditoSimulacion from '../screens/Credito/CreditoSimulacion';
import CreditoConfirmacion from '../screens/Credito/CreditoConfirmacion';
import CreditoDetalle from '../screens/Credito/CreditoDetalle';
import CreditoListado from '../screens/Credito/CreditoListado';
import CreditoListadoDetalle from '../screens/Credito/CreditoListadoDetalle';
import CreditoListadoDetalleCuota from '../screens/Credito/CreditoListadoDetalleCuota';
import CreditoListadoDetalleCuotaPago from '../screens/Credito/CreditoListadoDetalleCuotaPago';
import CreditoListadoDetalleCuotaPagoExitoso from '../screens/Credito/CreditoListadoDetalleCuotaPagoExitoso';
import Perfil from '../screens/Perfil';
import MovimientoCuenta from '../screens/Movimiento/MovimientoCuenta';
import MovimientoDetalle from '../screens/Movimiento/MovimientoDetalle';
import MovimientoCbu from '../screens/Movimiento/MovimientoCbu';
import RegistroInformacionPersonal from '../screens/Registro/RegistroInformacionPersonal';
import RegistroVerificacion from '../screens/Registro/RegistroVerificacion';
import RegistroInformacionAdicional from '../screens/Registro/RegistroInformacionAdicional';
import RegistroDatoCuenta from '../screens/Registro/RegistroDatoCuenta';
import RegistroConfirmacion from '../screens/Registro/RegistroConfirmacion';
import LegalContrato from '../screens/Legal/LegalContrato';
import LegalTerminoYCondicion from '../screens/Legal/LegalTerminoYCondicion';
import TransferenciaNueva from '../screens/Transferencia/TransferenciaNueva';
import TransferenciaConfirmacion from '../screens/Transferencia/TransferenciaConfirmacion';
import TransferenciaDetalle from '../screens/Transferencia/TransferenciaDetalle';
import size from '../styles/size';
import CompraVentaDolarCotizacion from '../screens/CompraVentaDolar/CompraVentaDolarCotizacion';
import CompraVentaDolarConfirmacionCompra from '../screens/CompraVentaDolar/CompraVentaDolarConfirmacionCompra';
import CompraVentaDolarConfirmacionVenta from '../screens/CompraVentaDolar/CompraVentaDolarConfirmacionVenta';
import CompraVentaDolarAcreditacion from '../screens/CompraVentaDolar/CompraVentaDolarAcreditacion';
import RegistroReducidoValidacionDato from '../screens/Registro/RegistroReducidoValidacionDato';
import RegistroReducidoDatoCuenta from '../screens/Registro/RegistroReducidoDatoCuenta';
import RegistroReducidoConfirmacion from '../screens/Registro/RegistroReducidoConfirmacion';
import RegistroExitoso from '../screens/Registro/RegistroExitoso';
import RecargaNueva from '../screens/Recarga/RecargaNueva';
import RecargaExitosa from '../screens/Recarga/RecargaExitosa';
import TokenConsulta from '../screens/Token/TokenConsulta';
import TurnoNuevo from '../screens/Turno/TurnoNuevo';
import TurnoConfirmacion from '../screens/Turno/TurnoConfirmacion';
import TurnoListado from '../screens/Turno/TurnoListado';
import TurnoConfirmado from '../screens/Turno/TurnoConfirmado';
import UsuarioInformacionPerfil from '../screens/Usuario/UsuarioInformacionPerfil';
import UsuarioCambioContrasena from '../screens/Usuario/UsuarioCambioContrasena';
import IngresoEmpresaListado from '../screens/Ingreso/IngresoEmpresaListado';
import PosicionConsolidadaTipoInforme from '../screens/PosicionConsolidada/PosicionConsolidadaTipoInforme';
import PosicionConsolidadaTipoOperacion from '../screens/PosicionConsolidada/PosicionConsolidadaTipoOperacion';
import PosicionConsolidadaInforme from '../screens/PosicionConsolidada/PosicionConsolidadaInforme';
import Cheque from '../screens/Cheque/Cheque';
import ChequeInforme from '../screens/Cheque/ChequeInforme';
import ChequeDetalle from '../screens/Cheque/ChequeDetalle';
import FondoComunInversion from '../screens/FondoComun/FondoComunInversion';


const Stack = createStackNavigator();

/* const usuarioEncontradoQueLlega = useSelector(state => state.usuarioEncontradoStore)

const nombreUsuarioEncontrado = usuarioEncontradoQueLlega.nombre */

let headerTintColor = colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null)

const StackNavigator = () => {

  return (
    <Stack.Navigator /* initialRouteName="Ingreso" */>



      {/************************************************ Ingreso ************************************************/}
      <Stack.Screen
        name="IngresoNuevo" //nombre para reconocer a este componente stack
        component={IngresoNuevo} //componente que renderiza este componente stack
        options={{ headerShown: false }} //headerShown: false -> oculta la barra superior stack
      />
      <Stack.Screen
        name="IngresoMetodo"
        component={IngresoMetodo}
        options={{
          title: 'Elegí el método de verificación',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }} //title -> titulo en barra superior stack / headerTintColor -> color flecha y titulo / headerLeft: contenido de la parte izquierda de la cabecera
      />
      <Stack.Screen
        name="IngresoVerificacion"
        component={IngresoVerificacion}
        options={{
          title: 'Verificación de identidad',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="IngresoEmpresaListado"
        component={IngresoEmpresaListado}
        options={{
          title: 'Seleccione la empresa',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />



      {/************************************************ Registro ************************************************/}
      <Stack.Screen
        name="RegistroInformacionPersonal"
        component={RegistroInformacionPersonal}
        options={{
          title: 'Información personal',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroVerificacion"
        component={RegistroVerificacion}
        options={{
          title: 'Verificación',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroInformacionAdicional"
        component={RegistroInformacionAdicional}
        options={{
          title: 'Información adicional',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroDatoCuenta"
        component={RegistroDatoCuenta}
        options={{
          title: 'Datos de la cuenta',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroConfirmacion"
        component={RegistroConfirmacion}
        options={{
          title: 'Confirmación',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroReducidoValidacionDato"
        component={RegistroReducidoValidacionDato}
        options={{
          title: 'Validación de datos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroReducidoDatoCuenta"
        component={RegistroReducidoDatoCuenta}
        options={{
          title: 'Datos de la cuenta',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroReducidoConfirmacion"
        component={RegistroReducidoConfirmacion}
        options={{
          title: 'Confirmación',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RegistroExitoso"
        component={RegistroExitoso}
        options={{
          title: '¡Registro exitoso!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />



      {/************************************************ Legal ************************************************/}
      <Stack.Screen
        name="LegalContrato"
        component={LegalContrato}
        options={{
          title: 'Contrato',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="LegalTerminoYCondicion"
        component={LegalTerminoYCondicion}
        options={{
          title: 'Términos y Condiciones',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />



      {/************************************************ Inicio ************************************************/}
      <Stack.Screen
        name="InicioTab"
        component={TabNavigator}
        options={{
          headerShown: false,
          headerLeft: () => <ButtonBack screenName={'IngresoNuevo'} />,
        }}

      />



      {/************************************************ Cuentas ************************************************/}
      <Stack.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          title: 'Cuentas',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: null,
        }}
      />



      {/************************************************ Perfil ************************************************/}
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: 'Emir Albarracin',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: null,
        }}
      />


      {/************************************************ Mas ************************************************/}
      <Stack.Screen
        name="Mas"
        component={Mas}
        options={{
          title: 'Más',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: null,
        }}
      />

        {/************************************************ Fondo Comun ************************************************/}
      <Stack.Screen
        name="FondoComunInversion"
        component={FondoComunInversion}
        options={{
          title: 'FondoComunInversion',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: null,
        }}
      />


      {/************************************************ Credito ************************************************/}
      <Stack.Screen
        name="CreditoProducto"
        component={CreditoProducto}
        options={{
          title: 'Créditos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoSimulacion"
        component={CreditoSimulacion}
        options={{
          title: 'Simulación del crédito',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoConfirmacion"
        component={CreditoConfirmacion}
        options={{
          title: 'Confirmación del crédito',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoDetalle"
        component={CreditoDetalle}
        options={{
          title: '¡Acreditación exitosa!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          //headerLeft: () => <ButtonBack screenName={'InicioTab'} />,
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />
      <Stack.Screen
        name="CreditoListado"
        component={CreditoListado}
        options={{
          title: 'Mis créditos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoListadoDetalle"
        component={CreditoListadoDetalle}
        options={{
          title: 'Detalle del crédito',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoListadoDetalleCuota"
        component={CreditoListadoDetalleCuota}
        options={{
          title: 'Cuotas',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoListadoDetalleCuotaPago"
        component={CreditoListadoDetalleCuotaPago}
        options={{
          title: 'Pago de cuota',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CreditoListadoDetalleCuotaPagoExitoso"
        component={CreditoListadoDetalleCuotaPagoExitoso}
        options={{
          title: '¡Cuota pagada!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />



      {/************************************************ Plazo Fijo ************************************************/}
      <Stack.Screen
        name="PlazoFijoProducto"
        component={PlazoFijoProducto}
        options={{
          title: 'Plazos fijos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoSimulacion"
        component={PlazoFijoSimulacion}
        options={{
          title: 'Simulación del plazo fijo',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoUvaSimulacion"
        component={PlazoFijoUvaSimulacion}
        options={{
          title: 'Simulación del plazo fijo',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoConfirmacion"
        component={PlazoFijoConfirmacion}
        options={{
          title: 'Confirmación del plazo fijo',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoDetalle"
        component={PlazoFijoDetalle}
        options={{
          title: '¡Plazo fijo constituido!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          //headerLeft: () => <ButtonBack screenName={'InicioTab'} />,
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoListado"
        component={PlazoFijoListado}
        options={{
          title: 'Mis plazos fijos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoListadoDetalle"
        component={PlazoFijoListadoDetalle}
        options={{
          title: 'Detalle del plazo fijo',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoPrecancelableListado"
        component={PlazoFijoPrecancelableListado}
        options={{
          title: 'Plazos fijos para cancelar',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoPrecancelableConfirmacion"
        component={PlazoFijoPrecancelableConfirmacion}
        options={{
          title: 'Cancelación anticipada del plazo fijo',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PlazoFijoPrecancelableDetalle"
        component={PlazoFijoPrecancelableDetalle}
        options={{
          title: '¡Plazo fijo cancelado!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />



      {/************************************************ Movimiento ************************************************/}
      <Stack.Screen
        name="MovimientoCuenta"
        component={MovimientoCuenta}
        options={{
          title: 'Movimientos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="MovimientoDetalle"
        component={MovimientoDetalle}
        options={{
          title: 'Detalle del movimiento',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="MovimientoCbu"
        component={MovimientoCbu}
        options={{
          title: 'Detalles de la cuenta',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />



      {/************************************************ Transferencia ************************************************/}
      <Stack.Screen
        name="TransferenciaNueva"
        component={TransferenciaNueva}
        options={{
          title: 'Nueva transferencia',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="TransferenciaConfirmacion"
        component={TransferenciaConfirmacion}
        options={{
          title: 'Confirmación de la transferencia',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="TransferenciaDetalle"
        component={TransferenciaDetalle}
        options={{
          title: '¡Transferencia realizada!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />



      {/************************************************ CompraVentadDolar ************************************************/}
      <Stack.Screen
        name="CompraVentaDolarCotizacion"
        component={CompraVentaDolarCotizacion}
        options={{
          title: 'Cotización',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CompraVentaDolarConfirmacionCompra"
        component={CompraVentaDolarConfirmacionCompra}
        options={{
          title: 'Confirmación de la compra',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CompraVentaDolarConfirmacionVenta"
        component={CompraVentaDolarConfirmacionVenta}
        options={{
          title: 'Confirmación de la venta',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="CompraVentaDolarAcreditacion"
        component={CompraVentaDolarAcreditacion}
        options={{
          title: '¡Acredtación exitosa!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />

      {/* Recarga */}
      <Stack.Screen
        name="RecargaNueva"
        component={RecargaNueva}
        options={{
          title: 'Recarga de celular',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="RecargaExitosa"
        component={RecargaExitosa}
        options={{
          title: '¡Recarga exitosa!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />



      {/************************************************ Token ************************************************/}
      <Stack.Screen
        name="TokenConsulta"
        component={TokenConsulta}
        options={{
          title: 'Token de seguridad',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />



      {/************************************************ Turno ************************************************/}
      <Stack.Screen
        name="TurnoNuevo"
        component={TurnoNuevo}
        options={{
          title: 'Nuevo turno',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="TurnoConfirmacion"
        component={TurnoConfirmacion}
        options={{
          title: 'Confirmación del turno',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="TurnoConfirmado"
        component={TurnoConfirmado}
        options={{
          title: '¡Turno confirmado!',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <MaterialCommunityIcons name={'check-circle'} style={{ fontSize: 30, color: colors.colorA, marginLeft: 14 }} />,
        }}
      />
      <Stack.Screen
        name="TurnoListado"
        component={TurnoListado}
        options={{
          title: 'Mis turnos',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />


      {/************************************************ Usuario ************************************************/}
      <Stack.Screen
        name="UsuarioInformacionPerfil"
        component={UsuarioInformacionPerfil}
        options={{
          title: 'Información del perfil',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="UsuarioCambioContrasena"
        component={UsuarioCambioContrasena}
        options={{
          title: 'Cambio de contraseña',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />


      {/************************************************ Posicion consolidada ************************************************/}
      <Stack.Screen
        name="PosicionConsolidadaTipoInforme"
        component={PosicionConsolidadaTipoInforme}
        options={{
          title: 'Posición consolidada',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PosicionConsolidadaTipoOperacion"
        component={PosicionConsolidadaTipoOperacion}
        options={{
          title: 'Posición consolidada',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="PosicionConsolidadaInforme"
        component={PosicionConsolidadaInforme}
        options={{
          title: 'Posición consolidada',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />

      {/************************************************ Cheque ************************************************/}
      <Stack.Screen
        name="Cheque"
        component={Cheque}
        options={{
          title: 'Cheque',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="ChequeInforme"
        component={ChequeInforme}
        options={{
          title: 'Informe',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />
      <Stack.Screen
        name="ChequeDetalle"
        component={ChequeDetalle}
        options={{
          title: 'Detalle del cheque',
          headerTintColor: headerTintColor,
          headerTitleAlign: 'flex-start',
          headerTitleStyle: { fontSize: size.large },
          headerLeft: () => <ButtonBack />,
        }}
      />


    </Stack.Navigator>
  );
};

export default StackNavigator;
