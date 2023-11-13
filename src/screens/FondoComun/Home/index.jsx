import { View, Text, Button } from 'react-native';
import React from 'react';
import api from '../../../services/api';



const index = () => {

    const handleResetearPerfil = async () => {
        try {
          const { data: resp } = await api.get('api/BEUsuarioResetPerfilInv/RecuperarBEUsuarioResetPerfilInv?CodigoSucursal=20&IdMensaje=Sucursal+Virtual+Webapp');
            console.log('Respuesta Api >>>', resp);
            if (resp.status === 0) {
              console.log('Se reseteo con exito');
            } else {
              console.log('Hubo un problema en el reseteo');
            }
        } catch (error) {
          console.log('catch >>> ', error);
          return;
        }
        // funcion para ejecutar nuevamente el inicio de fondos comunes DESARROLLAR
      };

    return (
        <>
            <View>
                <Text>Habilitado</Text>
                <Button title="Reset" onPress={() => handleResetearPerfil()} />
            </View>
        </>);
};

export default index;
