/* import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Modal } from 'react-native';

// Simula la respuesta de la API con preguntas aleatorias
const getQuestionsFromAPI = () => {
    return [
        {
            id: 1,
            question: 'Pregunta 1',
            options: [
                { id: 1, text: 'Opción A', score: 1 },
                { id: 2, text: 'Opción B', score: 2 },
                { id: 3, text: 'Opción C', score: 3 },
            ],
        },
        // Agrega más preguntas aquí
    ];
};

export default function Gpt() {
    // PREGUNTAS DE LA API
    const [questions, setQuestions] = useState([]);
    //>> indice de la pregunta
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState(new Array(9).fill(null));
    const [showModal, setShowModal] = useState(false);
    const [quizResult, setQuizResult] = useState('');

    useEffect(() => {
        // Simula la obtención de preguntas aleatorias de la API
        const randomQuestions = getQuestionsFromAPI();
        setQuestions(randomQuestions);
    }, []);

    const handleAnswer = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = {
            questionId: questions[currentQuestionIndex].id,
            answerId: option.id,
        };
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Todas las respuestas han sido contestadas, enviar a la API
            // Implementa la lógica para enviar las respuestas a la API aquí

            // Simula el resultado de la API
            const quizScore = 0; // Reemplaza con el puntaje real
            setQuizResult(`Puntaje: ${quizScore}`);
            setShowModal(true);
        }
    };

    return (
        <View>
            <Text>{questions[currentQuestionIndex].question}</Text>
            <FlatList
                horizontal
                data={questions[currentQuestionIndex].options}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleAnswer(item)}>
                        <Text>{item.text}</Text>
                    </TouchableOpacity>
                )}
            />

            <Button
                title="Pregunta Anterior"
                onPress={() =>
                    setCurrentQuestionIndex(
                        Math.max(currentQuestionIndex - 1, 0)
                    )
                }
                disabled={currentQuestionIndex === 0}
            />
            <Button
                title="Pregunta Siguiente"
                onPress={() =>
                    setCurrentQuestionIndex(
                        Math.min(currentQuestionIndex + 1, questions.length - 1)
                    )
                }
                disabled={
                    currentQuestionIndex === questions.length - 1 ||
                    answers[currentQuestionIndex] === null
                }
            />

            <Modal visible={showModal}>
                <View>
                    <Text>{quizResult}</Text>
                    <Button title="Cerrar" onPress={() => setShowModal(false)} />
                </View>
            </Modal>
        </View>
    );
}
 */