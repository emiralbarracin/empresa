import axios from 'axios';
import { Alert } from 'react-native';
import { environment } from './environment';
import { onGetStorageUser } from '../store/storage/storageToken';

//token es un objeto que se encarga de realizar la solicitud HTTP para obtener un token de acceso válido
//el token obtenido se utiliza luego en las solicitudes a otros endpoints de la API para autenticar al cliente y permitirle el acceso a los recursos protegidos por la API

const token = axios.create({
  baseURL: `${environment.dominio}/${environment.baseRuta}`,
  timeout: 10000,
});

token.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    console.log('Error Oauth L24', JSON.stringify(error.response, null, 3)); // primer error
    console.log(error.response);

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert('Error', 'No se pudo conectar al servidor', [{ text: 'OK' }], {
        cancelable: false,
      });
    } else {
      console.log('Error token - linea 40 OauthToken');
      console.log('Linea 40 Oauth 41', JSON.stringify(error, null, 3));

      Alert.alert('Alerta!', 'No se pudo conectar al servidor', [
        { text: 'Aceptar' },
      ]);
    }

    return Promise.resolve(error);
  },
);

token.interceptors.request.use(
  async config => {
    try {
      const user = await onGetStorageUser();
      if (user) config.headers.Authorization = `Basic ${user}`;
      return await Promise.resolve(config);
    } catch (error) {
      return await Promise.resolve(error);
    }
  },
  error => {
    console.log('Error Request');
    return Promise.reject(error);
  },
);

export default token;
