import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import Mas from '../screens/Mas';
import Cuenta from '../screens/Cuenta';
import Inicio from '../screens/Inicio';
import Perfil from '../screens/Perfil';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator(); //funcion que permite la navegacion

const TabNavigator = () => {

    let headerTintColor = colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null)

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let nombreIcono = '';
                    let colorIcono = '';
                    let tamanioIcono = 24;
                    switch (route.name) {
                        case 'inicioTab':
                            nombreIcono = 'home';
                            colorIcono = focused ? colors.colorA : colors.gray;
                            break;
                        case 'cuentaTab':
                            nombreIcono = 'card-text';
                            colorIcono = focused ? colors.colorA : colors.gray;
                            break;
                        case 'perfilTab':
                            nombreIcono = 'account';
                            colorIcono = focused ? colors.colorA : colors.gray;
                            break;
                        case 'masTab':
                            nombreIcono = 'menu';
                            colorIcono = focused ? colors.colorA : colors.gray;
                            break;
                    }
                    return (
                        <MaterialCommunityIcons
                            name={nombreIcono}
                            color={colorIcono}
                            size={tamanioIcono}
                        />
                    ); //https://www.youtube.com/watch?v=7sXYNMyXYXE&ab_channel=C%C3%B3digoAV
                },
                headerShown: true, //oculta la cabecera de navegacion tab
            })}>
            <Tab.Screen
                name="inicioTab" //nombre para reconocer la pantalla
                component={Inicio} //componente (pantalla) que va a renderizar
                options={{
                    //headerTitle: 'Emir Albarracin',
                    //headerTitle: () => <Image source={require('../assets/images/logoBMV.png')} style={{ resizeMode: 'contain', height: 80, alignSelf: 'center' }} />,
                    headerTitle: () => <Image source={require('../assets/images/logoSucredito.png')} style={{ resizeMode: 'contain', height: 20, alignSelf: 'center' }} />,
                    title: 'Inicio', //titulo del boton tab
                    tabBarActiveTintColor: colors.colorA,
                    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: '4%' },
                }} //la propiedad title del objeto options indica el titulo del boton tab y de la cabecera tab
            />
            <Tab.Screen
                name="cuentaTab"
                component={Cuenta}
                options={{
                    headerTitle: 'Cuentas',
                    headerTintColor: headerTintColor,
                    headerTitleAlign: 'flex-start',
                    headerTitleStyle: { fontSize: size.large },
                    title: 'Cuentas',
                    tabBarActiveTintColor: colors.colorA,
                    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: '4%' },
                }}
            />
            <Tab.Screen
                name="perfilTab"
                component={Perfil}
                options={{
                    headerTitle: 'Perfil',
                    headerTintColor: headerTintColor,
                    headerTitleAlign: 'flex-start',
                    headerTitleStyle: { fontSize: size.large },
                    title: 'Perfil',
                    tabBarActiveTintColor: colors.colorA,
                    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: '4%' },
                }}
            />
            <Tab.Screen
                name="masTab"
                component={Mas}
                options={{
                    headerTitle: 'Más',
                    headerTintColor: headerTintColor,
                    headerTitleAlign: 'flex-start',
                    headerTitleStyle: { fontSize: size.large },
                    title: 'Más',
                    tabBarActiveTintColor: colors.colorA,
                    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: '4%' },
                }}
            />
        </Tab.Navigator>

    );
};

export default TabNavigator;