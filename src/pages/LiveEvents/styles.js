import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 11,
        paddingTop: Constants.statusBarHeight + 8,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3
    },

    headerText: {
        //width: '30%',
        //borderWidth: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 15,
        color: '#424242'
    },

    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 23,
        marginBottom: 8,
        marginTop: 11,
        color: '#13131a',
        fontWeight: 'bold',
    },

    description: {
        fontSize: 16,
        lineHeight: 19,
        color: '#737380'
    },

    liveEventsList: {
        marginTop: 3,
        //marginBottom: 8,
        marginHorizontal: -10,
        paddingHorizontal: 0,
    },

    liveEvent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        elevation: 6,
        height: 78,
        //borderWidth: 1,
    },

    eventNameRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        //height: '60%',
        // borderWidth: 1,
    },

    eventTeamLogo: {
        width: 39,
        height: 39,
        marginVertical: 3,
        alignSelf: 'center',
    },

    liveEventClock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        color: '#777',
        backgroundColor: '#e5e5e5',
        fontWeight: 'bold',
        borderWidth: 0,
        paddingBottom: 0,
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        //borderWidth: 1,
        //width: '15%',
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 4,
        elevation: 2,
    },

    eventTip: {
        flexDirection: 'row',
        //display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        color: '#737380',
        fontWeight: 'bold',
        borderWidth: 0,
        paddingBottom: 0,
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        //width: '15%',
        marginTop: 0,
        marginBottom: 0,
    },

    liveEventLeague: {
        marginTop: 0,
        marginRight: 0,
        fontSize: 11,
        //width: '65%',
        color: '#737380',
        textAlign: 'center',
        //borderWidth: 1,
    },

    liveEventName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        color: '#41414b',
        fontWeight: 'bold',
        //        lineHeight: 0,
        borderWidth: 0,
        paddingBottom: 1,
        paddingHorizontal: 5,
        textAlignVertical: 'center'
    },

    liveEventScore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: '#41414b',
        fontWeight: 'bold',
        //        lineHeight: 0,
        borderWidth: 0,
        paddingBottom: 1,
        paddingHorizontal: 5,
        textAlignVertical: 'center'
    },

    liveEventProbabilityText: {
        alignItems: 'center',
        fontSize: 15,
        color: '#555',
        marginTop: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        //borderWidth: 1,
        textAlignVertical: 'center'
    },

    upcomingEventProbabilityText: {
        alignItems: 'center',
        fontSize: 13,
        color: '#555',
        marginTop: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        //borderWidth: 1,
        textAlignVertical: 'center'
    },

    // MODAL STYLES
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        // STACKOVERFLOW https://stackoverflow.com/questions/48058532/how-to-dim-a-background-in-react-native-modal
        backgroundColor: 'rgba(0,0,0,0.42)'
    },
    modalView: {
        marginTop: 65,
        marginBottom: 35,
        marginHorizontal: 23,
        backgroundColor: "#ECECEC",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 25,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },


    // UPCOMING EVENTS LIST


    upcomingEventsList: {
        marginTop: 3,
        //marginBottom: 8,
        marginHorizontal: 0,
        marginBottom: 6,
        paddingHorizontal: 0,
        //borderWidth: 1
    },

    upcomingEvent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginTop: 8,
        marginBottom: 6,
        marginHorizontal: 4,
        elevation: 4,
        height: 73,
        //borderWidth: 1,
    },

    upcomingEventNameRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        height: 36,
        //borderWidth: 1,
    },

});