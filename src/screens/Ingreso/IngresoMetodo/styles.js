import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray
    },
    body: {
        flex: 6,
        marginTop: '4%',
    },
    buttonTitle: {
        alignSelf: 'flex-start',
        marginTop: '3%',
        marginBottom: '1%',
        marginLeft: '1%'
    }
})