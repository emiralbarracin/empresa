
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import api from '../../../services/api';
import QuestionItem from './QuestionItem';
const { width } = Dimensions.get('window');


const TestInversor = ({ navigation }) => {
  /* const [questions, setQuestions] = useState();
  const [options, setOptions] = useState(); */
  const [questionsWithOptions, setQuestionsWithOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const listRef = useRef();

  ////////FUNCION QUE TRAE PREGUNTAS Y OPCIONES DE RESPUESTA, FINALMENTE LAS UNE EN UN SOLO ARRAY PARA MANEJAR MAS FACILMENTE

  const OnSelectOption = (index, x) => {
    const tempData = questionsWithOptions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestionsWithOptions(temp);
  };

  /* const getTextScore = () => {
    let marks = 0;
    questions.map(item => {
        if (item.marked !== -1) {
            marks = marks + 5;
        }
    });
    return marks;
  };
  
  const reset = () => {
    const tempData = questions;
    tempData.map((item, ind) => {
        item.marked = -1;
    });
    let temp = [];
    tempData.map(item => {
        temp.push(item);
    });
    setQuestions(temp);
  }; */


  useEffect(() => {
    api
      .get(
        'api/BEListaPreguntasInversion/RecuperarBEListaPreguntasInversion?CodigoSucursal=20&IdMensaje=Sucursal+Virtual+Webapp',
      )
      .then(response => {
        if (response) {
          //console.log('preguntas >>>', response.data.output);
          const preguntas = response.data.output;
          //setQuestions(preguntas);
          //console.log('preguntas >>>',questions);
          api
            .get(
              'api/BEListaRespuestasInversion/RecuperarBEListaRespuestasInversion?IdPregunta=&CodigoSucursal=20&IdMensaje=Web',
            )
            .then(response1 => {
              if (response1) {
                //console.log('opciones >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(response1.data.output, null, 4));
                const opciones = response1.data.output;
                //setOptions(opciones);
                const opcionesCPreg =
                  preguntas.map((pregunta) => {
                    const opcionesFil = opciones.filter(opcion => opcion.idPregunta === pregunta.idPregunta);
                    return {
                      ...pregunta,
                      opciones: opcionesFil,
                    };
                  });
                console.log('Array Filtrado y Unido ', JSON.stringify(opcionesCPreg, null, 4));
                setQuestionsWithOptions(opcionesCPreg);
              }
            })
            .catch(err => console.error('ErrorEnOpciones>>>>>> ', err));
        }
      })
      .catch(err => console.error('ErrorEnPreguntas>>>>>> ', err));
  }, []);
  //console.log('Array Filtrado y Unido ', JSON.stringify(questionsWithOptions, null, 4));



  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.headerText}>Pregunta: {' ' + currentQuestion + '/' + questionsWithOptions.length}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        {/* <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentQuestion(x.toFixed(0));
          }}
          keyExtractor={ item => item.idPregunta} 
          data={questionsWithOptions}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        /> */}
      </View>
    </View>
  );
};

export default TestInversor;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 20,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    color: '#000',
  },
});

