import axios from 'axios';
import { Alert } from 'react-native';
import { environment } from './environment';
import { onGetStorageToken } from '../store/storage/storageToken';

//api es un objeto (que se instancia de axios) que se utiliza para realizar solicitudes HTTP a APIs

//creo una instancia de axios con una configuración base para todas las solicitudes HTTP
const api = axios.create({
  //URL base a la que se agregarán todas las rutas relativas de las solicitudes HTTP
  baseURL: `${environment.dominio}/${environment.baseRuta}`,
  //tiempo máximo que esperará axios para una respuesta antes de lanzar un error de timeout
  timeout: 10000,
  //encabezados HTTP que se agregarán a todas las solicitudes HTTP
  /* headers: {
    //tipo de contenido que se enviará en el cuerpo de la solicitud HTTP
    'Content-Type': 'application/json',
    //token de autorización que se enviará con todas las solicitudes HTTP
    Authorization: 'Bearer your-token',
  }, */
});

// interceptores de respuesta de la API (permiten interceptar y manejar la respuesta que la API devuelve a la app antes de que llegue a nuestro códigom con esto se puede verificar si la respuesta es correcta o mostrar mensajes de error)
api.interceptors.response.use(
  response => {
    // si la respuesta es correcta, se resuelve la promesa y se retorna la respuesta
    console.log('OK API');
    return Promise.resolve(response);
  },
  // si la respuesta es un error, se maneja el error
  error => {
    console.log('Error en API', error);
    //si la solicitud tuvo un error de conexión..
    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Alerta!',
        'No se pudo conectar al servidor',
        [{ text: 'Ok' }],
        {
          cancelable: false,
        },
      );
    }
    //si el servidor devuelve un código de error 400 o 401 (solicitud incorrecta o acceso no autorizado)..
    if (error.response.status === 401 || error.response.status === 400) {
      console.log('La sesión expiró');
      console.log('APi.js linea 41');
      Alert.alert('Alerta!', 'La sesión expiró', [{ text: 'Ok' }]);
    }
    // se imprimen los detalles del error en la consola
    console.log(
      'Ver error.response >>>>>>>>>>',
      JSON.stringify(error.response, null, 3),
    );
    console.log(
      'Error responde data : >>> ',
      JSON.stringify(error.response.data, null, 3),
    );
    //alerta con los detalles del error
    Alert.alert(
      'Error',
      'Expiro la sesión',
      error.response.data.exceptionMessage,
      [{ text: 'Ok' }],
    );
    //se rechaza la promesa con el error
    return Promise.reject(error);
  },
);

// Intercepta todas las solicitudes HTTP antes de ser enviadas
api.interceptors.request.use(
  //función que se ejecuta antes de enviar una solicitud
  async config => {
    try {
      //obtener el token de autenticación del almacenamiento local del navegador
      const token = await onGetStorageToken();
      //si el token existe, agregarlo como encabezado de autorización en la solicitud
      if (token) config.headers.Authorization = `Bearer ${token}`;
      // Devolver la solicitud con la configuración actualizada
      return await Promise.resolve(config);
    } catch (error) {
      //si hay un error, devolver una promesa rechazada con el error
      return await Promise.resolve(error);
    }
  },
  //función que se ejecuta en caso de error
  error => {
    console.log('Error Request: ', error.message); //agrega el mensaje de error al mensaje de la consola
    console.log('Request: ', error.config); //muestra la configuración de la solicitud que falló
    //rechazar la promesa con el error recibido
    return Promise.reject(error);
  },
);

export default api;
