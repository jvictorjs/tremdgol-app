import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 13,
        paddingTop: Constants.statusBarHeight + 8,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 9
    },

    headerText: {
        //borderWidth: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 15,
        color: '#424242'
    },

    headerTextBold: {
        borderWidth: 1,
        fontWeight: 'bold',
    },

    eventHistoryAndTipsModalBox: {
        marginVertical: 2,
        flex: 1,
        flexBasis: 50,
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems:'center',
        borderRadius: 16,
        backgroundColor: '#FFF',
        padding: 1,
        elevation: 8,
        alignItems: 'center',
        marginBottom: 4
    },
});