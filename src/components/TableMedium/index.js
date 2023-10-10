import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TableMedium = ({ headers, data }) => {
  if (data.length === 0) { //verifica si el arreglo de datos está vacío
    return ( //mientras este vacio muestra el indicador de carga
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={colors.black} />
      </View>
    );
  }

  return ( //si deja de estar vacio la parte de los datos, se renderiza la tabla
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={headers} style={styles.head} textStyle={styles.headTextStyle} />
        <Rows data={data} textStyle={styles.rowTextStyle} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '4%',
    marginBottom: '4%',
    backgroundColor: colors.white,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  head: {
    backgroundColor: colors.white,
  },
  headTextStyle: {
    color: colors.black,
    alignSelf: 'center',
    fontSize: size.medium,
    paddingVertical: '4%',
  },
  rowTextStyle: {
    color: colors.black,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: size.medium,
    paddingVertical: '4%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TableMedium;