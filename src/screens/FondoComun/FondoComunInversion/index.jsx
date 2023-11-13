import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import TestInversor from '../TestInversor';
import Home from '../Home';
import api from '../../../services/api';
import Gpt from '../TestInversor/GPT';
import ModalTestInversor from '../TestInversor/ModalTestInversor';


const FondoComunInversion = ({ navigation }) => {
  const [esInversor, setEsInversor] = useState();

  //>>>>>>>>>>>>>>>>FUNCION QUE CHEQUEA SI HAY O NO PERFIL DE INVERSOR
  useEffect(() => {
    api
      .get(
        'api/BEUsuarioPerfilInv/RecuperarBEUsuarioPerfilInv?CodigoSucursal=20&IdMensaje=Sucursal+Virtual+Webapp',
      )
      .then(response => {
        if (response) {
          //console.log('esInversor? >>>',  JSON.stringify(response.data.output[0].idPerfil, null, 4));
          //console.log('esInversor? >>>',  JSON.stringify(response.data.output, null, 4));
          const inversor = response.data.output[0].idPerfil;
          /* const habil = response.data.output; */
          setEsInversor(inversor);
          /* setHabilitado(habil); */
        }
      })
      .catch(err => console.error('no hay respuesta>>>>>> ', err));
  }, []);

console.log(esInversor);

  return (
    <>
      {esInversor === undefined
        ? <ModalTestInversor/>
        : <Home />
      }

    </>
  );
};

export default FondoComunInversion;
