import React from 'react';
import { Image, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Inicio from '../../screens/Inicio';
import colors from '../../styles/colors';
import ClienteStackNavigator from '../StackNavigators/ClienteStackNavigator';
import LinkMedium from '../../components/LinkMedium';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

//componente personalizado para el encabezado menu drawer
const CustomDrawerHeader = () => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Image
        source={require('../../assets/images/logoBmros.png')}
        style={{
          resizeMode: 'contain',
          height: 50,
          backgroundColor: colors.lightGray,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

//componente personalizado para el contenido del menu drawer
const CustomDrawerContent = props => {

  const navigation = useNavigation(); //obtiene la instancia de navegación

  const handleSalir = () => {
    console.log('salir..');
    navigation.navigate('IngresoNuevo');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <View style={{ flex: 5.5 }}>
        <DrawerContentScrollView {...props}>
          <View>
            <CustomDrawerHeader />
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinkMedium title={'Salir'} onPress={handleSalir} />
      </View>
    </View>
  );
};

const InicioDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={props => <CustomDrawerContent {...props} />} //drawerContent establece el contenido del menu drawer
    >
      <Drawer.Screen
        name="InicioDrawer"
        component={Inicio}
        options={{
          headerTintColor: colors.colorA, //color de logo que abre el menu lateral y del titulo de la cabecera
          drawerActiveTintColor: colors.white, //color del texto que aparece en el menu lateral cuando esta seleccionado
          drawerActiveBackgroundColor: colors.colorA, //color de fondo del texto que aparece en el menu lateral cuando esta seleccionado
          drawerInactiveTintColor: colors.white, //color del texto que aparece en el menu lateral cuando NO esta seleccionado
          drawerInactiveBackgroundColor: colors.colorA, //color de fondo del texto cuando NO esta seleccionado
          headerTitle: '', //titulo del encabezado
          title: 'Inicio', //titulo del boton
        }}
      />
      <Drawer.Screen
        name="ClienteDrawer"
        component={ClienteStackNavigator}
        options={{
          headerShown: false,
          headerTintColor: colors.colorA,
          drawerActiveTintColor: colors.colorA,
          drawerActiveBackgroundColor: colors.colorA,
          drawerInactiveTintColor: colors.white,
          drawerInactiveBackgroundColor: colors.colorA,
          title: 'Clientes',
        }}
      />
    </Drawer.Navigator>
  );
};

export default InicioDrawerNavigator;
