import axios from 'axios';
import { Alert } from 'react-native';
import { environment } from './environment';
import { onGetStorageUser } from '../store/storage/storageToken';
import { onGetStorageIdEmpresa } from '../store/storage/storageIdEmpresa';


const tokenWithCompany = axios.create({
    baseURL: `${environment.dominio}/${environment.baseRuta}`,
    timeout: 10000,
});

tokenWithCompany.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },
    error => {
        console.log('Error Oauth L24', JSON.stringify(error.response, null, 3)) // primer error
        console.log(error.response)


        if (
            error.request._hasError === true &&
            error.request._response.includes('connect')
        ) {
            Alert.alert(
                'Error',
                'No se pudo conectar al servidor',
                [{ text: 'OK' }],
                { cancelable: false },
            )
        } else {
            console.log("Error token - linea 40 OauthToken")
            console.log('Linea 40 Oauth 41', JSON.stringify(error, null, 3));

            Alert.alert('ATENCION', "No se pudo conectar al servidor", [
                { text: 'Aceptar' },
            ])
        }

        return Promise.resolve(error)

    }
)

tokenWithCompany.interceptors.request.use(
    async (config) => {
        try {
            const user = await onGetStorageUser();
            const idEmpresaUsu = await onGetStorageIdEmpresa();
            if (user)
                config.headers.Authorization = `Basic ${user}`;
            config.headers.Company = `${idEmpresaUsu}`;
            return await Promise.resolve(config);
        } catch (error) {
            return await Promise.resolve(error);
        }
    },
    error => {
        console.log("Error Request")
        return Promise.reject(error)
    },
)



export default tokenWithCompany;