
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import api from '../../../services/api';

const { width, height} = Dimensions.get('window');


const TestInversor = ({ navigation }) => {

  //>>>ARRAY COMPUESTO POR PREGUNTAS UNIFICADO CON SUS RESPUESTAS
  const [questionsWithOptions, setQuestionsWithOptions] = useState([]);
  //>>>PREGUNTA ACTUAL PARA RENDERIZAR PANTALLA
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [answers, setAnswers] = useState(new Array(questionsWithOptions.length).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

/////////////////////funcion para captar respuesta de la api y desplegar modal para mortrarla

  useEffect(() => {
    if (answers.every((answer) => answer !== null)) {
      // Envía las respuestas a la API y obtén el resultado
      // Aquí debes implementar la lógica para enviar las respuestas y obtener el resultado
      const result = "Resultado del cuestionario"; // Reemplaza con la respuesta real de la API
      setQuizResult(result);
      setShowModal(true);
    }
  }, [answers]);
//////////////funcion para cargar respuestas
  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
    if (currentQuestion < questionsWithOptions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };





  /* const OnSelectOption = (index, x) => {
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
  }; */

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
  //>>>>>>>>>FUNCION PARA SELECCIONAR PAGINA Y PASAR A LA SIGUIENTE

  ////////FUNCION QUE TRAE PREGUNTAS Y OPCIONES DE RESPUESTA, FINALMENTE LAS UNE EN UN SOLO ARRAY PARA MANEJAR MAS FACILMENTE
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

  //>>>>>>>>>>>>>>>>>>>ESTADO DE RESPUESTA SELECCIONADA
  let preguntaActual;
  let opcionActual;

  //>>>>>>>>>>>>>>>>>>>SETEO DE PREGUNTA Y OPCION ELEGIDA, Y EJECUCION DE POST EN API
  const handleEnviarRespuesta = (idPregunta, idRespuesta, index) => {
    //console.log(idPregunta, 'y ', idRespuesta);
    preguntaActual = idPregunta;
    opcionActual = idRespuesta;
    handleEnviarRespuestaApi();
  };
  //>>>>>>>>>>>>>>>>>>>ENVIA RESPUESTA DE CADA PREGUNTA AL BACK
  const handleEnviarRespuestaApi = async () => {
    try {
      const parametros = {
        codigoSucursal: 20,
        idPregunta: preguntaActual,
        idRespuesta: opcionActual,
      };
      const { data: res } = await api.post('api/BERegistraUsuRespInv/RegistrarBERegistraUsuRespInv', parametros,);
      if (res) {
        console.log('Respuesta Api >>>', res);
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

  const handleEnviarPerfil = async () => {
    try {
      const { data: resp } = await api.get('api/BEUsuarioFinalizaTestInv/RecuperarBEUsuarioFinalizaTestInv?CodigoSucursal=20&IdMensaje=Sucursal+Virtual+Webapp');
        console.log('Respuesta Api >>>', resp);
        if (resp.status === 0) {
          console.log('Todo ok con la respuesta');
        } else {
          console.log('Todo mal con la respuesta');
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
          {/* >>>>>>>>>>>>>>>>>NUMERO DE PREGUNTA<<<<<<<<<<<<<<<<<< */}
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
                    
                    {/* >>>>>>>>>>>>>>>>TEXTO DE PREGUNTA<<<<<<<<< */}
                    <View style={styles.questionTextContianer}>
                      <Text style={styles.quetionText}>
                        {item.preguntaDescripcion}
                      </Text>
                    </View>
                    {/* >>>>>>>>>>>>>>>>>OPCIONES PARA CADA PREGUNTA<<<<<<<<<< */}
                    {item.opciones.map(opcion => (
                      <View style={styles.optionContainer}>
                        <TouchableOpacity
                          style={styles.optionButton}
                          key={opcion.idRespuesta}
                          onPress={() => handleEnviarRespuesta(item.idPregunta, opcion.idRespuesta, index)}
                        >
                          <Text style={styles.questionText}>
                            {opcion.respuestaDescripcion}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <View style={styles.buttonContianer}>
                      <Button title="Anterior" onPress={() => setCurrentQuestion(currentQuestion - 1)} />
                      <Button title="Siguiente" onPress={() => setCurrentQuestion(currentQuestion + 1)} />
                      <Button title="Enviar" onPress={() => handleEnviarPerfil()} />

                    </View>
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
    height: 120,
  },
  quetionText: {
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  optionButton: {
    width: width * 0.95,
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
  buttonContianer:{
    marginTop:20,
    height:40,
 flex: 1,
 flexDirection: 'row',
 justifyContent: 'space-around',
  },
});

