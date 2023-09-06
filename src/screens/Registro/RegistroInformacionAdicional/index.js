import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import Dropdown from '../../../components/DropDown';
import Checkbox from '../../../components/Checkbox';
import LinkMedium from '../../../components/LinkMedium';

const RegistroInformacionAdicional = ({ navigation }) => {


  /* useEffect(() => {

      const obtenerDatos = async () => {

          try {

              const { data: res1 } = await api.get(``);
              if (res1) {

                  console.log(' >>> ', JSON.stringify(res1.output, null, 4))

              } else {
                  console.log('ERROR ');
              }

          } catch (error) {
              console.log('catch >>> ', error);
          }
      };

      obtenerDatos();
  }, []); */

  const handleGeneroSeleccionado = () => {

  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.body} nestedScrollEnabled={true}>

        <IconInput iconName={'account-edit-outline'} placeholder={'Nombre'} />
        <IconInput iconName={'account-edit-outline'} placeholder={'Apellido'} />
        <Dropdown
          items={[
            { label: 'Masculino', value: 1 },
            { label: 'Femenino', value: 2 },
            { label: 'Otro', value: 3 },
          ]}
          placeholder={'Seleccione el género'}
          onSelectItem={item => handleGeneroSeleccionado(item.value)}
          zIndex={500}
        />
        <IconInput iconName={'calendar-month-outline'} placeholder={'Fecha de nacimiento'} />
        <Dropdown
          items={[
            { label: 'Masculino', value: 1 },
            { label: 'Femenino', value: 2 },
            { label: 'Otro', value: 3 },
          ]}
          placeholder={'Seleccione el estado civil'}
          onSelectItem={item => handleGeneroSeleccionado(item.value)}
          zIndex={400}
        />
        <Dropdown
          items={[
            { label: 'Masculino', value: 1 },
            { label: 'Femenino', value: 2 },
            { label: 'Otro', value: 3 },
          ]}
          placeholder={'Seleccione el país'}
          onSelectItem={item => handleGeneroSeleccionado(item.value)}
          zIndex={300}
        />
        <Dropdown
          items={[
            { label: 'Masculino', value: 1 },
            { label: 'Femenino', value: 2 },
            { label: 'Otro', value: 3 },
          ]}
          placeholder={'Seleccione la provincia'}
          onSelectItem={item => handleGeneroSeleccionado(item.value)}
          zIndex={200}
        />
        <Dropdown
          items={[
            { label: 'Masculino', value: 1 },
            { label: 'Femenino', value: 2 },
            { label: 'Otro', value: 3 },
          ]}
          placeholder={'Seleccione la ciudad'}
          onSelectItem={item => handleGeneroSeleccionado(item.value)}
          zIndex={100}
        />
        <IconInput iconName={'home-edit-outline'} placeholder={'Código postal'} />
        <IconInput iconName={'home-edit-outline'} placeholder={'Dirección'} />
        <IconInput iconName={'home-edit-outline'} placeholder={'Número'} />
        <IconInput iconName={'home-edit-outline'} placeholder={'Piso'} />
        <IconInput iconName={'home-edit-outline'} placeholder={'Departamento'} />

        <Checkbox title="Declaro NO ser contribuyente en el exterior" link={'FATCA'} />
        <Checkbox title="Declaro NO ser sujeto obligado" />
        <Checkbox title="Declaro NO ser una persona políticamente expuesta" />


      </ScrollView>

      <ButtonFooter title={'Siguiente'} onPress={() => navigation.navigate('RegistroDatoCuenta')} />

    </View>
  );
};

export default RegistroInformacionAdicional;



/* const RegistroInformacionAdicional = ({ navigation }) => {
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  
    const handleGeneroSeleccionado = (value) => {
      setGeneroSeleccionado(value);
    };
  
    const renderItem = ({ item }) => {
      if (item.type === 'iconInput') {
        return <IconInput iconName={item.iconName} placeholder={item.placeholder} />;
      } else if (item.type === 'dropdown') {
        return (
          <Dropdown
            items={item.items}
            placeholder={item.placeholder}
            onSelectItem={(item) => handleGeneroSeleccionado(item.value)}
            zIndex={item.zIndex}
          />
        );
      }
    };
  
    const data = [
      { type: 'iconInput', iconName: 'account-edit-outline', placeholder: 'Nombre' },
      { type: 'iconInput', iconName: 'account-edit-outline', placeholder: 'Apellido' },
      {
        type: 'dropdown',
        items: [
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ],
        placeholder: 'Seleccione el género',
        zIndex: 500,
      },
      { type: 'iconInput', iconName: 'calendar-month-outline', placeholder: 'Fecha de nacimiento' },
      {
        type: 'dropdown',
        items: [
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ],
        placeholder: 'Seleccione el estado civil',
        zIndex: 400,
      },
      {
        type: 'dropdown',
        items: [
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ],
        placeholder: 'Seleccione el país',
        zIndex: 300,
      },
      {
        type: 'dropdown',
        items: [
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ],
        placeholder: 'Seleccione la provincia',
        zIndex: 200,
      },
      {
        type: 'dropdown',
        items: [
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ],
        placeholder: 'Seleccione la ciudad',
        zIndex: 100,
      },
      { type: 'iconInput', iconName: 'home-edit-outline', placeholder: 'Código postal' },
      { type: 'iconInput', iconName: 'home-edit-outline', placeholder: 'Dirección' },
      { type: 'iconInput', iconName: 'home-edit-outline', placeholder: 'Número' },
      { type: 'iconInput', iconName: 'home-edit-outline', placeholder: 'Piso' },
      { type: 'iconInput', iconName: 'home-edit-outline', placeholder: 'Departamento' },
    ];
  
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.body}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
  
        <ButtonFooter title={'Siguiente'} onPress={() => navigation.navigate('RegistroDatoCuenta')} />
      </View>
    );
  };
  
  export default RegistroInformacionAdicional; */
