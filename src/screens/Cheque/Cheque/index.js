import React, { useEffect, useState } from 'react';
import { View, Platform, StyleSheet, ScrollView, StatusBar, Button, } from 'react-native';
import { Title, Card, Appbar } from 'react-native-paper';
import api from '../../../services/api';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { dateFormat, dateFormatApi3 } from '../../../utils/Format';
import ButtonFooter from '../../../components/ButtonFooter';
import ButtonFooterOut from '../../../components/ButtonFooterOut';
import colors from '../../../styles/colors';

const Cheque = ({ navigation }) => {
  const [comprobantes, setComprobantes] = useState();

  const [variable, setVariable] = useState(false);

  const actualizarPantalla = () => {
    setVariable(!variable);
  };

  let focusListener = null;

  focusListener = navigation.addListener('focus', () => {
    actualizarPantalla();
    setEligeFecha(0);
  });

  useEffect(() => {
    api
      .get(
        `api/BETipoComprobCheque/RecuperarBETipoComprobCheque?CodigoSucursal=20&IdMensaje=Sucursal+virtual`,
      )
      .then(response => {
        if (response) {
          console.log('res >>>', response.data);
          const itemsComprobantes = response.data.output.map(x => ({
            label: x.descripcion,
            value: x.codigoFormTerceros,
          }));
          setComprobantes(itemsComprobantes);
        }
      })
      .catch(err => console.log('ErrorBETipoComprobCheque> ', err));
  }, [variable]);

  const [openComprobante, setOpenComprobante] = useState(false);
  const [valueComprobante, setValueComprobante] = useState(null);
  const [tipoComprobanteSeleccionado, setTipoComprobanteSeleccionado] = useState('');

  const handleComprobantes = item => {
    console.log('comprobante >>>', item.value);
    setTipoComprobanteSeleccionado(item.value);
  };

  const items = [
    { label: 'Todos', value: '-1' },
    { label: 'Cheques de Viajeros', value: '1' },
    { label: 'Cheques Fisicos', value: '2' },
    { label: 'Titulos', value: '3' },
    { label: 'Cheques Electrónicos', value: '4' },
  ];

  /* const items= (comprobantes) */



  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [fechaSeleccionadaAMostrar, setFechaSeleccionadaAMostrar] = useState('-');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [eligeFecha, setEligeFecha] = useState(0);

  const handleConfirm = date => {
    console.log('fecha seleccionada >>> ', dateFormatApi3(date));
    setFechaSeleccionada(dateFormatApi3(date));
    setEligeFecha(1);
    setFechaSeleccionadaAMostrar(dateFormat(date));
    hideDatePicker();
  };

  const generarInforme = () => {

    /* console.log('tipoComprobanteCheque >>> ', tipoComprobanteSeleccionado);
    console.log('fechaCheque >>> ', fechaSeleccionada);
    console.log('eligeFecha >>> ', eligeFecha); */

    navigation.navigate('ChequeInforme', {
      datosCheque: {
        tipoComprobanteCheque: tipoComprobanteSeleccionado,
        fechaCheque: fechaSeleccionada,
        eligeFecha: eligeFecha,
      },
    });
    setFechaSeleccionadaAMostrar('-');
  };

  const handleInicio = () => {
    navigation.navigate('Home');
    setFechaSeleccionadaAMostrar('-');
  };

  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <View>
          <Title style={styles.text_header}>
            Seleccione los filtros para generar un informe
          </Title>
          <Card style={styles.card}>
            <Card.Content>
              <View style={{ alignItems: 'center' }}>
                <Title style={styles.text_body}>Tipo de comprobante</Title>

                <View style={{ marginTop: 7 }}>
                  <DropDownPicker
                    placeholder="Seleccione un tipo de comprobante"
                    open={openComprobante}
                    value={valueComprobante}
                    setOpen={setOpenComprobante}
                    setValue={setValueComprobante}
                    items={items}
                    //defaultValue={}
                    onSelectItem={item => handleComprobantes(item)}
                    style={{
                      backgroundColor: '#fafafa',
                      flexDirection: 'row-reverse',
                    }}
                    labelStyle={{
                      textAlign: 'right',
                    }}
                    itemStyle={{
                      justifyContent: 'flex-end',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    containerStyle={{ marginBottom: 0 }}
                    maxHeight={200}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Title style={styles.text_body}>Fecha de acreditación</Title>

                  <Button
                    title="Seleccionar fecha"
                    onPress={showDatePicker}
                    color={colors.black}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Title style={styles.text_body}>Fecha seleccionada</Title>
                  <Title style={styles.text_body}>
                    {fechaSeleccionadaAMostrar}
                  </Title>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonFooter title="Generar informe" onPress={generarInforme} />
        <ButtonFooterOut title="Inicio" onPress={handleInicio} />
      </View>
    </View>
  );
};

export default Cheque;