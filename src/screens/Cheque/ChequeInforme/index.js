import React, {useEffect, useState} from 'react';
import {View, Platform, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Paragraph, Text, Button} from 'react-native-paper';
import {Title, Card, Appbar} from 'react-native-paper';
import styles from './styles';
import api from '../../../services/api';
import {useRoute} from '@react-navigation/native';
import {dateFormat, numberFormat} from '../../../utils/Format';
import ButtonFooter from '../../../components/ButtonFooter';
import colors from '../../../styles/colors';

const ChequeInforme = ({navigation}) => {
  const [variable, setVariable] = useState(false);

  const actualizarPantalla = () => {
    setVariable(!variable);
  };

  let focusListener = null;

  focusListener = navigation.addListener('focus', () => {
    actualizarPantalla();
  });

  const [informeCarteraCliente, setInformeCarteraCliente] = useState([]);

  const {datosCheque} = useRoute().params;

  /* console.log('tipoComprobanteCheque >>>', datosCheque.tipoComprobanteCheque);
  console.log('fechaCheque >>>', datosCheque.fechaCheque);
  console.log('eligeFecha >>>', datosCheque.eligeFecha);
 */
  useEffect(() => {
    api.get(
        datosCheque.eligeFecha == 0
          ? `api/BEInformeCarteraCli/RecuperarBEInformeCarteraCli?CodigoSucursal=20&Comprobante=${datosCheque.tipoComprobanteCheque}&FechaVencimiento=&IdMensaje=Sucursal+virtual`
          : `api/BEInformeCarteraCli/RecuperarBEInformeCarteraCli?CodigoSucursal=20&Comprobante=${datosCheque.tipoComprobanteCheque}&FechaVencimiento=${datosCheque.fechaCheque}&IdMensaje=Sucursal+virtual`,
      )
      .then(res => {
        if (res) {
          console.log('dataApi1 >>>',res.data.output);
          setInformeCarteraCliente(res.data.output);
        }
      })
      .catch(error => {
        throw error;
      });
  }, [variable]);

  const handleInicio = () => {
    navigation.navigate('InicioTab');
  };

  const handleDetalle = index => {
    console.log('index >>>', index);
    navigation.navigate('ChequeDetalle', {
      datosChequeInforme: {
        tipoComprobanteChequeInforme: datosCheque.tipoComprobanteCheque,
        indexChequeInforme: index,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Appbar.Header style={{backgroundColor: colors.white}}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Cheques" />
      </Appbar.Header>

      <View style={styles.body}>
        <View style={styles.first}>
          {/* <Searchbar placeholder='Buscar...' style={{marginBottom: 20}}/> */}
          <ScrollView>
            {datosCheque.tipoComprobanteCheque == -1 ? (
              <View>
                {informeCarteraCliente.length != 0 ? (
                  informeCarteraCliente.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Cheque
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.comprobante}
                            </Title>
                          </View>
                        </View>

                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              Importe
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              $ {item.importe}
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
                              {dateFormat(item.fechaVencimiento)}
                            </Title>
                          </View>
                        </View>
                      </Card.Content>

                      <Card.Content style={styles.buttonCard}>
                        <Card.Actions>
                          <Button
                            color={colors.white}
                            onPress={() => handleDetalle(index)}>
                            Ver detalle
                          </Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <View style={styles.bodyTextContainer}>
                    <Paragraph style={{color: colors.black}}>
                      No se encontraron cheques
                    </Paragraph>
                  </View>
                )}
              </View>
            ) : datosCheque.tipoComprobanteCheque == 1 ? (
              <View>
                {' '}
                {/****************************************************/}
                {informeCarteraCliente.length != 0 ? (
                  informeCarteraCliente.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.listContainer}>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.descripcion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Cuenta
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.codigoCuenta}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Operación
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.numeroOperacion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              Producto
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.nombreProducto}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>Saldo</Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              $ {numberFormat(item.saldo)}
                            </Title>
                          </View>
                        </View>
                      </Card.Content>
                      <Card.Content style={styles.buttonCard}>
                        <Card.Actions>
                          <Button
                            color={colors.colorB}
                            onPress={() => handleDetalle()}>
                            Ver detalle
                          </Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <View style={styles.bodyTextContainer}>
                    <Paragraph style={{color: colors.black}}>
                      No se encontraron cheques
                    </Paragraph>
                  </View>
                )}
              </View>
            ) : datosCheque.tipoComprobanteCheque == 2 ? (
              <View>
                {informeCarteraCliente.length != 0 ? (
                  informeCarteraCliente.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.listContainer}>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.descripcion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Cuenta
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.codigoCuenta}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Operación
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.numeroOperacion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              Producto
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.nombreProducto}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>Saldo</Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              U$S {numberFormat(item.saldo)}
                            </Title>
                          </View>
                        </View>
                      </Card.Content>
                      <Card.Content style={styles.buttonCard}>
                        <Card.Actions>
                          <Button
                            color={colors.colorB}
                            onPress={() => handleDetalle()}>
                            Ver detalle
                          </Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <View style={styles.bodyTextContainer}>
                    <Paragraph style={{color: colors.black}}>
                      No se encontraron cheques
                    </Paragraph>
                  </View>
                )}
              </View>
            ) : datosCheque.tipoComprobanteCheque == 3 ? (
              <View>
                {informeCarteraCliente.length != 0 ? (
                  informeCarteraCliente.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.listContainer}>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.descripcion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Cuenta
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.codigoCuenta}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Operación
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.numeroOperacion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              Producto
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.nombreProducto}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>Saldo</Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              $ {numberFormat(item.saldo)}
                            </Title>
                          </View>
                        </View>
                      </Card.Content>
                      <Card.Content style={styles.buttonCard}>
                        <Card.Actions>
                          <Button
                            color={colors.colorB}
                            onPress={() => handleDetalle()}>
                            Ver detalle
                          </Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <View style={styles.bodyTextContainer}>
                    <Paragraph style={{color: colors.black}}>
                      No se encontraron cheques
                    </Paragraph>
                  </View>
                )}
              </View>
            ) : datosCheque.tipoComprobanteCheque == 4 ? (
              <View>
                {informeCarteraCliente.length != 0 ? (
                  informeCarteraCliente.map((item, index) => (
                    <Card key={index} style={styles.card}>
                      <Card.Content>
                        <View style={styles.listContainer}>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.descripcion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Cuenta
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.codigoCuenta}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              N° Operación
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.numeroOperacion}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>
                              Producto
                            </Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              {item.nombreProducto}
                            </Title>
                          </View>
                        </View>
                        <View style={styles.listContainer}>
                          <View style={styles.listParagraph}>
                            <Paragraph style={styles.listText}>Saldo</Paragraph>
                          </View>
                          <View>
                            <Title style={styles.listTitle}>
                              $ {numberFormat(item.saldo)}
                            </Title>
                          </View>
                        </View>
                      </Card.Content>
                      <Card.Content style={styles.buttonCard}>
                        <Card.Actions>
                          <Button
                            color={colors.colorB}
                            onPress={() => handleDetalle()}>
                            Ver detalle
                          </Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <View style={styles.bodyTextContainer}>
                    <Paragraph style={{color: colors.black}}>
                      No se encontraron cheques
                    </Paragraph>
                  </View>
                )}
              </View>
            ) : (
              <Text>Tipo de operación no encontrada</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {/* <ButtonFooter title="Inicio" onPress={handleInicio}/> */}
    </View>
  );
};

export default ChequeInforme;

