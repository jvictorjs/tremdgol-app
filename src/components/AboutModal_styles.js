import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    // SETTINGS MENU MODAL
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },

    AboutModalView: {
        flex: 1,
        flexGrow: 0,
        marginTop: Constants.statusBarHeight + 150,
        paddingVertical: 8,
        alignSelf: 'center',
        backgroundColor: "#efefef",
        borderRadius: 15,
        alignItems: "center",
        elevation: 30,
        flexBasis: 465,
        width: '100%'
    },

    /// SCROLLVIEW 
    container: {
        flex: 1,
        flexBasis: 300,
        borderRadius: 20
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        borderRadius: 0,
        elevation: 1,
        padding: 13,
    },
    text: {
        fontSize: 10,
    },

});