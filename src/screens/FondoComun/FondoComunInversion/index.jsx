import { View, Text } from 'react-native'
import TitleLargeBold from '../../../components/TitleLargeBold';
import TitleMediumBold from '../../../components/TitleMediumBold';
import TitleMedium from '../../../components/TitleMedium';

const FondoComunInversion = ({navigation}) =>{
  return (
    <View>
      <TitleLargeBold title={'Fondos Comunes De Inversion'} />
      <TitleMediumBold title={'hola1'} />
      <TitleMedium title={'hola'}/>
    </View>
  )
}

export default FondoComunInversion;