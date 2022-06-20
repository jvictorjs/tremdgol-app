import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    marketValueBox: {
        marginVertical: 2,
        flex: 1,
        flexBasis: 100,
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#FFF',
        padding: 1,
        elevation: 8,
        alignItems: 'center',
        marginBottom: 6
    },

    marketValueBoxMini: {
        margin: 2,
        flex: 1,
        flexBasis: 30,
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#FFF',
        padding: 1,
        elevation: 8,
        alignItems: 'center',
        marginBottom: 6

    },
});