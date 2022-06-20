import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    pointsGraphContainer: {
        flex: 1,
        flexBasis: 148,
        flexGrow: 0,
        marginVertical: 4,
        paddingTop: 2,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        // borderWidth:1,
        elevation: 8
    },

    pointsGraphContainer_mini: {
        flex: 1,
        flexBasis: 77,
        flexGrow: 0,
        marginVertical: 4,
        paddingTop: 2,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        // borderWidth:1,
        elevation: 8
    },

    teamLogoSize: {
        // flex: 1,
        alignSelf: 'center',
        width: 25,
        height: 25
    },

    
    teamNameAndLogoBox: {
        // flex:1,
        justifyContent: 'space-around',
        textAlignVertical: 'center',
        alignContent: 'center',
        // alignSelf:'center',
        flexDirection: 'row',
        // borderWidth:1, borderColor:'green',
        height: 31,
    },

});