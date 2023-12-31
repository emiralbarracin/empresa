import { View, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('window');

const QuestionItem = ({ data, selectedOption }) => {
    return (
        <View style={{ width: width }}>
            <Text style={styles.title}>
                {'Pregunta: ' + data.preguntaDescripcion}
            </Text>
            <View style={{ marginTop: 20 }}>
                {data.opciones.map((opcion) => {
                    return (
                        <View> <Text> {opcion.respuestaDescripcion}</Text></View>
                    )
                })}
                {<FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => {
                                    selectedOption(index + 1);
                                }}>
                                <View
                                    style={styles.viewTouch}>
                                    <Text style={{ fontWeight: '600', color: '#000' }}>
                                        {index === 0
                                            ? 'A'
                                            : index === 1
                                                ? 'B'
                                                : index === 2
                                                    ? 'C'
                                                    : 'D'}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20, color: data.marked == index + 1 ? '#fff' : '#000' }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />}
            </View>
        </View>
    );
};

export default QuestionItem;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '600',
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
    },
    touchable: {
        width: '90%',
        height: 60,
        elevation: 3,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        flexDirection: 'row',
    },
    viewTouch: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
    },
})