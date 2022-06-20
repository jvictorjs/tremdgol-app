import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    cardLogos: {
        flex: 1,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 144,
        padding: 3,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginBottom: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        // height:'15%',
        elevation: 8,
        width: '100%',
        // borderWidth:2,borderColor:'green',
    },

    eventLeague: {
        // flex: 1,
        fontSize: 13,
        color: '#666',
        fontWeight: 'bold',
        marginTop: -21,
        marginBottom: 0,
        marginHorizontal: 3,
        alignSelf: 'center',
        //borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 3,
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
        elevation: 5
    },

    eventClock: {
        // flex: 1,
        fontSize: 20,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 0,
        // marginLeft: 20,
        marginHorizontal: 10,
        paddingHorizontal: 5,
        //width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        //borderWidth: 1,
        // flexWrap:'wrap',
        backgroundColor: '#e1e1e1',
        borderRadius: 4,
        elevation: 5
    },

    eventClockText: {
        // flex: 1,
        fontSize: 20,
        color: '#41414d',
        fontWeight: 'bold',
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        //borderWidth: 1,
        // flexWrap:'wrap',
        backgroundColor: '#e1e1e1',
        borderRadius: 4
    },

    teamsBigLogoBox: {
        // flex:1,
        justifyContent: 'space-evenly',
        textAlignVertical: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        //borderWidth: 1,
        paddingVertical: 3,
        height: '89%'
    },

    probabilityText:{
        alignItems: 'center', 
        fontSize: 18, 
        color: '#555', 
        marginTop: 0,
        fontWeight: 'bold', 
        textAlign: 'center', 
        borderWidth: 0, 
        textAlignVertical: 'center'
    }

});



