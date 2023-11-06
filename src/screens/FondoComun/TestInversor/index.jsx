
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Button, ScrollView } from 'react-native';
import api from '../../../services/api';
import QuestionItem from './QuestionItem';
import { green } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                //console.log('Array Filtrado y Unido ', JSON.stringify(opcionesCPreg, null, 4));
                setQuestionsWithOptions(opcionesCPreg);
              }
            })
            .catch(err => console.error('ErrorEnOpciones>>>>>> ', err));
        }
      })
      .catch(err => console.error('ErrorEnPreguntas>>>>>> ', err));
  }, []);
  //console.log('Array Filtrado y Unido ', JSON.stringify(questionsWithOptions.pregunta, null, 4));


  const handleSubmitAnswers = () => {
    console.log('post a la api');
  };

  const handleSubmitAnswer = () => {
    console.log('post a la api');
  };

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState();
  const [currentSelectedQuestion, setCurrentSelectedQuestion] = useState();


  const handleAnswerSelect = (idPregunta, idRespuesta) => {
    console.log(idPregunta, 'y ', idRespuesta);
    // Guardar la respuesta seleccionada en el estado
    setCurrentSelectedQuestion(idPregunta);
    setCurrentSelectedAnswer(idRespuesta);
    handleAceptar();
  };


  /////////////ENVIA RESPUESTA DE CADA PREGUNTA AL BACK
  const handleAceptar = async () => {

    /* setModalVisible(false) */

    try {

      const parametros = {
        codigoSucursal: 20,
        idPregunta: currentSelectedQuestion,
        idRespuesta: currentSelectedAnswer,
      };

      const { data: res } = await api.post('api/BERegistraUsuRespInv/RegistrarBERegistraUsuRespInv', parametros,);

      if (res) {

        //console.log('Respuesta Api >>>', res)

        if (res.status === 0) {
          console.log('Todo ok con la respuesta');
        } else {
          console.log('Todo mal con la respuesta');
        }

      } else {
        console.log('Error HbCompraVentaMoneda');
      }

    } catch (error) {
      console.log('catch >>> ', error);
      return;
    }
  };



  return (
    <>
      <ScrollView>

        <View>
          <View style={styles.header} >
            <Text style={styles.headerText}>Pregunta: {' ' + currentQuestion + '/' + questionsWithOptions.length}</Text>
          </View>
          <View>
            <FlatList
              /* showsHorizontalScrollIndicator={false} */
              pagingEnabled
              horizontal
              data={questionsWithOptions}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.questionContainer}>
                    <View style={styles.questionTextContianer}>

                      <Text style={styles.quetionText}>
                        {item.preguntaDescripcion}
                      </Text>
                    </View>
                    {item.opciones.map(opcion => (
                      <View style={styles.optionContainer}>
                        <TouchableOpacity
                          style={styles.optionButton}
                          key={opcion.idRespuesta}
                          onPress={() => handleAnswerSelect(item.idPregunta, opcion.idRespuesta)}
                        >
                          <Text style={styles.questionText}>
                            {opcion.respuestaDescripcion}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}

                  </View>
                );
              }} />

          </View>

          {/* <View>
            {questionsWithOptions.map(question => (
              <View key={question.idPregunta}>
                <Text>{question.preguntaDescripcion}</Text>
                {question.opciones.map(opcion => (
                  <Button
                    key={opcion.idRespuesta}
                    title={opcion.respuestaDescripcion}
                    onPress={() => handleAnswerSelect(question.idPregunta, opcion.idRespuesta)}
                  />
                ))}
              </View>
            ))}
            <Button title="Enviar respuestas" onPress={handleSubmitAnswers} />
          </View> */}
        </View>
      </ScrollView>
    </>
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
  questionContainer: {
    width: width,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  questionTextContianer: {
    backgroundColor: 'green',
    marginVertical: 10,
    height: 100,
  },
  quetionText: {
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  optionButton: {
    width: width,
    marginHorizontal: 25,
    backgroundColor: 'green',
    height: 70,
    elevation: 6,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  questionText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 17,
  },
});

