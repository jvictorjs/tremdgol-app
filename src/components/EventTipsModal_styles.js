import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    /*
    eventHistoryModalBox: {
        marginVertical: 2,
        flex: 1,
        flexBasis: 50,
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 16,
        backgroundColor: '#FFF',
        padding: 1,
        elevation: 8,
        alignItems: 'center',
        marginBottom: 4
    },
    */

    // SETTINGS MENU MODAL
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },

    EventTipsModalView: {
        flex: 1,
        flexGrow: 0,
        marginTop: Constants.statusBarHeight + 108,
        paddingVertical: 8,
        alignSelf: 'center',
        backgroundColor: "#efefef",
        borderRadius: 15,
        alignItems: "center",
        elevation: 30,
        flexBasis: 500,
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

    eventTip: {
        flex:1,
        flexDirection: 'row',
        //display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        fontSize: 16,
        color: '#737380',
        fontWeight: 'bold',
        borderWidth: 0,
        paddingBottom: 0,
        paddingHorizontal: 2,
        textAlignVertical: 'center',
        //width: '15%',
        marginTop: 0,
        marginBottom: 0,
    },
});