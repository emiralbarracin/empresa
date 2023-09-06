import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const TableMediumLeft = ({ data1, data2 }) => {

  if (data1.length === 0 || data2.length === 0) { //verifica si alguno de los arreglos de datos están vacío
    return ( //mientras este vacio alguno muestra el indicador de carga
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.colorA} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {data1.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}: </Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator}></View>
      <View style={styles.column}>
        {data2.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}: </Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    marginHorizontal: '4%',
    marginBottom: '4%',
  },
  column: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  separator: {
    width: 1,
    backgroundColor: colors.gray,
  },
  label: {
    color: colors.black,
    fontSize: size.medium,
  },
  value: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: size.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TableMediumLeft;