import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    // SETTINGS MENU MODAL
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },

    settingsMenuModalView: {
        flex: 1,
        flexGrow: 0,
        marginTop: Constants.statusBarHeight - 8,
        padding: 15,
        alignSelf: 'flex-end',
        backgroundColor: "#FCFCFC",
        borderRadius: 20,
        alignItems: "center",
        elevation: 30,
        flexBasis: 290,
        width: '70%'
    },
});