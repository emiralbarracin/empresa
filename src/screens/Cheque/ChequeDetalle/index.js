import React, { useEffect, useState } from 'react';
import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { Title, Card, Appbar, Colors } from 'react-native-paper';
import styles from './styles';
import api from '../../../services/api';
import { useRoute } from '@react-navigation/native';
///import {dateFormat, numberFormat} from '../../../utils/Format';
import ButtonFooter from '../../../components/ButtonFooter';

const ChequeDetalle = ({ navigation }) => {
  const [variable, setVariable] = useState(false);

  const actualizarPantalla = () => {
    setVariable(!variable);
  };

  let focusListener = null;

  focusListener = navigation.addListener('focus', () => {
    actualizarPantalla();
  });

  const [numeroCheque, setNumeroCheque] = useState('');
  const [numeroComprobante, setNumeroComprobante] = useState('');
  const [importe, setImporte] = useState('');
  const [fechaGestion, setFechaGestion] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaAcreditacion, setFechaAcreditacion] = useState('');
  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState('');
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState('');
  const [banco, setBanco] = useState('');
  const [estado, setEstado] = useState('');

  const { datosChequeInforme } = useRoute().params;

  console.log(
    'tipoComprobanteChequeInforme >>>',
    datosChequeInforme.tipoComprobanteChequeInforme,
  );

  console.log('index >>>', datosChequeInforme.indexChequeInforme);

  const handleInicio = () => {
    navigation.navigate('inicioTab');
  };

  useEffect(() => {
    api
      .get(
        `api/BEInformeCarteraCli/RecuperarBEInformeCarteraCli?CodigoSucursal=20&Comprobante=${datosChequeInforme.tipoComprobanteChequeInforme}&FechaVencimiento=&IdMensaje=Sucursal+virtual`,
      )
      .then(res => {
        if (res.data) {
          //numeroCheque = res.data.output[0].comprobante
          setNumeroCheque(
            res.data.output[datosChequeInforme.indexChequeInforme].comprobante,
          );
          setNumeroComprobante(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .numeroComprobante,
          );
          setImporte(
            res.data.output[datosChequeInforme.indexChequeInforme].importe,
          );
          setFechaGestion(
            res.data.output[datosChequeInforme.indexChequeInforme].fechaGestion,
          );
          setFechaIngreso(
            res.data.output[datosChequeInforme.indexChequeInforme].fechaIngreso,
          );
          setFechaAcreditacion(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .fechaVencimiento,
          );
          setNumeroCuentaOrigen(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .codigoCuentaOrigen,
          );
          setNumeroCuentaDestino(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .codigoCuentaCredito,
          );
          setBanco(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .descripcionBanco,
          );
          setEstado(
            res.data.output[datosChequeInforme.indexChequeInforme]
              .descripcionEstado,
          );

          /* setInformeCarteraCliente(res.data.output); */
        }
      })
      .catch(error => {
        throw error;
      });
  }, [variable]);

  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <View style={styles.first}>
          {/* <Searchbar placeholder='Buscar...' style={{marginBottom: 20}}/> */}
          {/* <ScrollView> */}
          <View>
            {/* {informeCarteraCliente.length != 0 ? (
                informeCarteraCliente.map((item, index) => ( */}
            <Card /* key={index} */ style={styles.card}>
              <Card.Content>
                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>DEP</Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>{numeroComprobante}</Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>N° Cheque</Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>{numeroCheque}</Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>Importe</Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>
                      $ {numberFormat(importe)}
                    </Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>
                      Fecha de gestión
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>
                      {dateFormat(fechaGestion)}
                    </Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>
                      Fecha de ingreso
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>
                      {dateFormat(fechaIngreso)}
                    </Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>
                      Fecha de acreditación
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>
                      {dateFormat(fechaAcreditacion)}
                    </Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>
                      N° Cuenta origen
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>{numeroCuentaOrigen}</Title>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.listParagraph}>
                    <Paragraph style={styles.listText}>
                      N° Cuenta destino
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.listTitle}>
                      {numeroCuentaDestino}
                    </Title>
                  </View>
                </View>
              </Card.Content>
            </Card>
            {/*  ))
              ) : (
                <View style={styles.bodyTextContainer}>
                  <Paragraph style={{color: Colorapp.BLACK}}>...</Paragraph>
                </View>
              )} */}
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
      <ButtonFooter title="Inicio" onPress={handleInicio} />
    </View>
  );
};

export default ChequeDetalle;