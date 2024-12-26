// import axios from 'axios';
// import { environment } from './environment';
// import { Alert } from 'react-native';
// import Config from '../env';

// const apiMessageBird = axios.create({
//     baseURL: `${environment.baseUrlMessageBird}`,
//     timeout: 10000
// });

// apiMessageBird.interceptors.response.use(
//     response => {
//         return Promise.resolve(response)
//     },
//     error => {

//         console.log("Error Api MessageBird")
//         console.log(error)
//         if (
//             error.request._hasError === true &&
//             error.request._response.includes('connect')
//         ) {
//             Alert.alert(
//                 'Alerta',
//                 'No se pudo conectar al servidor',
//                 [{ text: 'OK' }],
//                 { cancelable: false },
//             )
//         }

//         if (error.response.status === 401 || error.response.status === 400) {
//             // token expira
//             Alert.alert(
//                 'Alerta',
//                 'La sesión expiró',
//                 [{ text: 'OK' }]
//             )

//         }

//         Alert.alert('Error', error.response.data.exceptionMessage, [
//             { text: 'Ok' }
//         ])

//         return Promise.reject(error)
//     }
// )

// apiMessageBird.interceptors.request.use(
//     config => {
//         config.headers.Authorization = `AccessKey ${Config.MESSAGEBIRD_ACCESS_KEY}`
//         return Promise.resolve(config)

//     },
//     error => {
//         console.log("Error Request")
//         return Promise.reject(error)
//     },
// )

// export default apiMessageBird;
