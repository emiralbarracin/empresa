import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Llamada a la API para obtener las preguntas
    fetch('API_URL_PREGUNTAS')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error al obtener las preguntas:', error));

    // Llamada a la API para obtener las respuestas
    fetch('API_URL_RESPUESTAS')
      .then((response) => response.json())
      .then((data) => setAnswers(data))
      .catch((error) => console.error('Error al obtener las respuestas:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    // Lógica para evaluar la respuesta y avanzar a la siguiente pregunta
    // Puedes personalizar esta parte según tus necesidades.
    if (selectedAnswer === answers[currentQuestion]) {
      // Respuesta correcta
    } else {
      // Respuesta incorrecta
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <View>
      {currentQuestion < questions.length ? (
        <View>
          <Text>{questions[currentQuestion]}</Text>
          <Button title="Respuesta 1" onPress={() => handleAnswer(1)} />
          <Button title="Respuesta 2" onPress={() => handleAnswer(2)} />
          <Button title="Respuesta 3" onPress={() => handleAnswer(3)} />
        </View>
      ) : (
        <Text>¡Has completado el cuestionario!</Text>
      )}
    </View>
  );
};

export default QuizApp;
