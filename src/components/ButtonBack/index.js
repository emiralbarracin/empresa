import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const ButtonBack = ({screenName}) => {
  const navigation = useNavigation(); //obtengo el objeto de navegación a través del hook useNavigation.

  const handleOnPress = () =>
    screenName ? navigation.navigate(screenName) : navigation.goBack(); //en caso de no obtener la pantalla con el prop screenName, por defecto vuelve a la pantalla anterior

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <MaterialCommunityIcons name="chevron-left" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBack;

//cuando se presiona el icono se ejecuta la funcion handleOnPress
//cuando se ejecuta la funcion handleOnPress, se verifica si esta definido el parametro screenName..
//si esta definido se navega a la pantalla especificada en navigation.navigate
//si NO esta definido se llama a la funcion navigation.goBack (que vuelve a la pantalla anterior)