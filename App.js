import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import StackNavigator from './src/navigations/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'; //todos los componentes hijos del componente Provider pueden escuchar o conocer el estado global de la app que se almacena en el store que recibe la propiedad store
import { store } from './src/store/store';

//función para manejar el cierre del teclado (TouchableWithoutFeedback le da la acción al teclado al tocar fuera de los campos de entrada)
const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const App = () => {
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </Provider>

  );
};

export default App;