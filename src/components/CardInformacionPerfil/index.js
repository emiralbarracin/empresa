import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import size from '../../styles/size';

const CardInformacionPerfil = ({ title, iconName }) => {
    return (
        <View style={styles.container}>
            
                <View style={styles.datosContainer}>
                {/* <TouchableOpacity onPress={onPress}> */}
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name={iconName} style={styles.icon} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
          
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: '4%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        elevation: 4,
    },
    datosContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: '2%',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: size.medium,
    },
    icon: {
        color: colors.colorA,
        fontSize: 22,
    },
};

export default CardInformacionPerfil;