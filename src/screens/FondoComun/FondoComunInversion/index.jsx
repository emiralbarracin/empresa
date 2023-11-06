import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TitleLargeBold from '../../../components/TitleLargeBold';
import TitleMediumBold from '../../../components/TitleMediumBold';
import TitleMedium from '../../../components/TitleMedium';
import ButtonFooter from '../../../components/ButtonFooter';
import TestInversor from '../TestInversor';
import Home from '../Home';
import api from '../../../services/api';


const FondoComunInversion = ({ navigation }) => {
  const [esInversor, setEsInversor] = useState();

  useEffect(() => {
    api
      .get(
        'api/BEUsuarioPerfilInv/RecuperarBEUsuarioPerfilInv?CodigoSucursal=20&IdMensaje=Sucursal+Virtual+Webapp',
      )
      .then(response => {
        if (response) {
          //console.log('esInversor? >>>',  JSON.stringify(response.data.output[0].idPerfil, null, 4));
          const inversor = response.data.output[0].idPerfil;
          setEsInversor(inversor);
        }
      })
      .catch(err => console.error('ErrorEnPerfilDeInversor>>>>>> ', err));
  }, []);



  return (
    <>
      {esInversor === 1
        ? <Home />
        : <TestInversor />
      }
      {/* <View>
        <TitleLargeBold title={'Conozca su perfil como inversor'} />
        <TitleMediumBold title={'¿Por qué hacer el test?'} />
        <TitleMedium title={'El test permitirá conocer su Perfil del Inversor en base a un conjunto de características derivadas de la personalidad, conocimiento, expectativas, experiencias anteriores y necesidades que condicionan su comportamiento y actitud, ayudándolo a determinar cuáles productos se ajustan sus objetivos de inversión'} />
        <TitleMediumBold title={'¿Cómo realizo el test?'} />
        <TitleMedium title={'El Test del Inversor consiste en responder 9 preguntas que evaluaremos para poder determinar su perfil de Inversor.'} />
        <ButtonFooter title={'Ir al Test'} onPress={()=>navigation.navigate('TestInversor')}/>
      </View> */}
    </>
  );
};

export default FondoComunInversion;
