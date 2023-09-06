import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import colors from '../../styles/colors';

const DropdownNative = ({ options, title, onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false); //estado para controlar si la lista desplegable está abierta o cerrada
    const [selectedOption, setSelectedOption] = useState(title); //estado para almacenar la opción seleccionada de la lista desplegable

    const toggleDropdown = () => {
        setIsOpen(!isOpen); //función para alternar entre abrir y cerrar la lista desplegable
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); //función para manejar el clic en una opción de la lista desplegable y actualizar la opción seleccionada
        setIsOpen(false); //cerrar la lista desplegable después de seleccionar una opción
        onSelectOption(option) //llama a la función onSelectOption pasada como prop
    };

    return (
        <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
                <Text>{selectedOption}</Text>
            </TouchableOpacity>
            <View style={[styles.dropdownOptionContainer, { display: isOpen ? 'flex' : 'none' }]}>
                <FlatList
                    data={options}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.dropdownOption} onPress={() => handleOptionClick(item)}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()} //función para generar keys únicas para cada opción
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        position: 'relative',
    },
    dropdownHeader: {
        padding: 10,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 1,
    },
    dropdownOptionContainer: {
        position: 'absolute',
        top: '100%',
        zIndex: 1, //establece el índice de apilamiento para que la lista desplegable se superponga sobre otros elementos
        width: '100%',
        maxHeight: 208, //altura máxima en del listado
        overflow: 'scroll', //para que sea desplazable
    },
    dropdownOption: {
        padding: 10,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 1,
    },
});

export default DropdownNative; 
