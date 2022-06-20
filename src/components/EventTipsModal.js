
import React, { useState } from 'react';
import { Text, View, Pressable, Switch, Animated, Easing, SafeAreaView, ScrollView, Image, Button, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import Modal from 'react-native-modal';

import styles from './EventTipsModal_styles';
import { ShadowPropTypesIOS } from 'react-native';


import * as conversorsAndParsersLib from '../services/auxiliar/conversorsAndParsers';

const EventTipsModal = (props) => {
    const event = props.event
    const homeImgUri = { uri: `https://assets.b365api.com/images/team/b/${event.home.image_id}.png` };
    const awayImgUri = { uri: `https://assets.b365api.com/images/team/b/${event.away.image_id}.png` };

    const [isModalVisible, setModalVisible] = useState(false);

    const [eventsLimitQtyToShow, setEventsLimitQtyToShow] = useState(10);

    const spinValue = new Animated.Value(0);

    const toggleModal = () => {
        runAnimation();
        setTimeout(function () { //Start the timer
            setModalVisible(!isModalVisible) //After 1 second, set render to true
        }.bind(this), 233)
        console.log('isModalVisible = ' + !isModalVisible)
    };

    // First set up animation 

    //Animated.loop(
    const runAnimation = () => {
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 233,
                easing: Easing.linear,
                useNativeDriver: true
            }
            //  )
        ).start();
    }

    function TipsList(props) {

        const TIP_DATA_EXAMPLE =
        {
            "bsfEventId": "3565636",
            "tipCatNumber": 99,
            "tipCatText":
                "TIP Categoria 99 TESTE - Gol FT",
            "tipCatTextMini": "+0.5FT",
            "eventFullName": "AD Confianca v Goias",
            "ss": "1-2",
            "tipBufferText":
                "TIP-99_3565636_AD Confianca v Goias_1-2",
            "tipMarketName": 0,
            "isHTmarket": 0,
            "success": 1,
            "result": "⏳",
            "bf_customerOrderRef":
                "🔍0199xx02_3565636_90",
            "bf_result": 0,
            "bf_eventId": "30824724",
            "bf_eventName": "Confianca v Goias",
            "bf_eventSimilarityValue": 0.85,
            "bf_selectionId": 1222345,
            "bf_marketId": "1.186753458",
            "bf_marketName": "1.186753458",
            "bf_executionStatus": "EXECUTABLE",
            "bf_placedDate": "2021-08-26T21:50:29.000Z",
            "bf_price": 5.4,
            "tremdgol_id": "+0.5FT_30824724"
        }
        let tipsArrayToShow = []
        if (props.tips)
            props.tips.map(tip => {
                if (tip.tremdgol_id) tipsArrayToShow.push(tip)
            })
        let key = 0
        const homeColor = '#0088cc';
        const drawColor = 'rgba(212, 212, 66,1)';
        const awayColor = 'rgb(160, 158, 158)';
        return (
            <View style={{ justifyContent: 'space-evenly', flexDirection: 'column', width: '100%', borderWidth: 0 }}>
                <Pressable onPress={() => console.log('clicou')} style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '93%', marginBottom: 5 }}>
                        <View style={{ borderWidth: 0, alignItems: 'center' }}>
                            <Image source={homeImgUri} style={{ width: 55, height: 55 }} />
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 18, borderWidth: 0, borderRadius: 6, marginTop: 5, marginBottom: 0 }]}>
                                TremdGol predictions
                            </Text>
                            <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center', paddingRight: 2 }}>
                                <Text style={[{ fontWeight: '600', textAlign: 'center', color: '#737380', fontSize: 15, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 5, textAlignVertical: 'center' }]}>

                                </Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 0, alignItems: 'center' }}>
                            <Image source={awayImgUri} style={{ width: 55, height: 55 }} />
                        </View>
                    </View>
                </Pressable>
                {tipsArrayToShow.length > 0 ?
                    <View>
                        <View style={{ borderWidth: 0, marginTop: 8, marginBottom: 0 }}>



                        </View>

                        {/*}
                        {tipsArrayToShow.map((pastEvent) => (
                            <View key={pastEvent.id + key++} style={{ justifyContent: 'space-between', flexDirection: 'column', borderWidth: 0, width: '100%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 7, elevation: 1 }}>
                                <View style={{ flexDirection: 'row', borderWidth: 0, alignSelf: 'center' }}>
                                    <View style={{ borderWidth: 0, width: '24%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 12, color: "#999", textAlign: 'left', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{conversorsAndParsersLib.getDateYYYYMMMDDhhmmZone(new Date(Number(pastEvent.time) * 1000)).substring(0, 11)}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, color: "#444", textAlign: 'left', marginLeft: 15, fontWeight: '600', borderWidth: 0 }} >
                                        {pastEvent.league_name}</Text>
                                </View>
                                <View style={{ borderWidth: 0, flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderWidth: 0, width: '99%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 0, elevation: 0 }}>
                                        <View style={{ borderWidth: 0, width: '36%', alignSelf: 'center' }}>
                                            <Text style={[{ fontSize: 13, textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, textAlignVertical: 'center' }, (pastEvent.resultCol === 'H') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.home_name}</Text>
                                        </View>
                                        <View style={{ borderWidth: 0, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ borderWidth: 0, width: '50%', alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 14, color: "#565656", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, textAlignVertical: 'center' }} >{pastEvent.fullScore.substring(0, pastEvent.fullScore.search(/\s/g))}</Text>
                                            </View>
                                            <View style={{ borderWidth: 0, width: '50%', alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 12, color: "#777", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, textAlignVertical: 'center' }} >{pastEvent.fullScore.substring(pastEvent.fullScore.search(/\s/g) + 1, pastEvent.fullScore.length)}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderWidth: 0, width: '36%', alignSelf: 'center' }}>
                                            <Text style={[{ fontSize: 13, textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, textAlignVertical: 'center' }, (pastEvent.resultCol === 'A') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.away_name}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                        */}

                        {tipsArrayToShow.map((tip) => (

                            <View key={tip.tremdgol_id + key++} style={{
                                justifyContent: 'space-around', flexDirection: 'row', borderWidth: 0, width: '99%',
                                alignSelf: 'center', padding: 7, backgroundColor: '#efefef', borderRadius: 8, marginBottom: 11, elevation: 3
                            }}>
                                <View style={{ borderWidth: 0, width: '27%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 0 }}>
                                        <Text style={[styles.eventTip, { backgroundColor: 'papayawhip', borderRadius: 4, elevation: 2, }]}>
                                            {(tip.tipCatNumber < 30) ? '🤖' : '⭐'}{tip.tipCatTextMini}
                                        </Text>
                                    </View>

                                </View>
                                <View style={{ borderWidth: 0, width: '55%', alignSelf: 'center' }}>
                                    <Text style={[{ fontSize: 13, textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 },
                                    (tip.resultCol === 'H') ? { color: '#454545' } : { color: '#888888' }]} >
                                        {tip.tipMarketName}</Text>
                                </View>
                                <View style={{ borderWidth: 0, width: '13%', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 20, color: "#777", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >
                                        {tip.result}</Text>
                                </View>

                            </View>
                        ))}
                    </View>
                    :
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '90%', marginTop: 19 }}>
                        <Text style={[{ fontWeight: '700', textAlign: 'center', color: '#888', fontSize: 13, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 11, padding: 5, elevation: 1, borderColor: '#bbb', backgroundColor: '#efefef' }]}>
                            No predictions for this event.
                        </Text>
                    </View>
                }
            </View>
        );
    }



    // Next, interpolate beginning and end values (in this  case 0 and 1)
    const spinAntiClockWise = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    })

    const spinClockWise = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    //const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Pressable onPress={() => { toggleModal() }} style={{
                flexDirection: 'row', elevation: 5, borderWidth: 0, marginTop: 4,
                borderColor: 'grey', color: 'black', borderRadius: 30, justifyContent: 'center', alignItems: 'center', width: 133, height: 32, backgroundColor: (props.event.tips && props.event.tips.filter(t => (t.tremdgol_id)).length > 0) ? '#fbf1c1' : '#dadada'
            }}>
                <Text style={{ fontWeight: 'bold', color: '#444' }}> Predictions  </Text>
                <Animated.View style={{ transform: [{ rotate: (isModalVisible) ? spinClockWise : spinAntiClockWise }] }}>
                    <FontAwesome name="soccer-ball-o" size={21} color="#656565"></FontAwesome>
                </Animated.View>
            </Pressable>
            <View style={{ flex: 1 }}>
                <Modal
                    //animationType={"slide"}
                    animationIn={"slideInDown"}
                    animationOut={"slideOutUp"}
                    animationOutTiming={444}
                    animationInTiming={555}
                    //transparent={true}
                    isVisible={isModalVisible}
                    //onRequestClose={() => {
                    //  toggleShowSettingMenuModal();
                    //}}
                    scrollable={true}
                    hasBackdrop={true}
                    backdropColor={"black"}
                    backdropOpacity={0.55}
                    onBackdropPress={() => { toggleModal() }}
                    // hideModalContentWhileAnimating={true}
                    useNativeDriver={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.EventTipsModalView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width: '100%' }}>
                                <Text style={{ color: '#FCFCFC' }}></Text>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 16, borderWidth: 0, borderRadius: 6 }]}>
                                    Match Predictions
                                </Text>
                                <Pressable onPress={() => { toggleModal() }} style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 13, borderWidth: 0 }}>
                                    <FontAwesome name="close" size={25} color="#777"></FontAwesome>
                                </Pressable>
                            </View>
                            <Divider width={2} style={{ color: '#666', backgroundColorcolor: '#666', borderColor: '#666', borderWidth: 0, width: '96%', marginBottom: 13, height: 2, marginTop: -5 }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 0, borderWidth: 0, height: 386, borderRadius: 0, width: '100%' }}>
                                <SafeAreaView style={styles.container}>
                                    <ScrollView style={styles.scrollView}>
                                        {/*
                                            <Text style={styles.text}>
                                        {JSON.stringify(props.event.bsfEventsHistory.h2h)} 
                                        </Text>
                                        
                                        */}
                                        <View style={[{ fontSize: 12, width: '100%', borderWidth: 0, alignItems: 'center', alignSelf: 'center', marginBottom: 42 }]}>
                                            <View>
                                                <TipsList tips={props.event.tips} />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                <Pressable onPress={() => Linking.openURL('https://t.me/tremdgol_tips')} style={{
                                    marginLeft: 13, borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end',
                                    borderRadius: 6, elevation: 5, marginHorizontal: 16, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingLeft: 10, alignSelf: 'flex-end' }}>@tremdgol_tips</Text>
                                        <FontAwesome name="telegram" size={23} style={{ marginTop: 4, marginHorizontal: 8 }} color="#737380" />
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => toggleModal()} style={{
                                    marginLeft: 13, borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end',
                                    borderRadius: 6, elevation: 5, marginHorizontal: 16, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                        <MaterialCommunityIcons name="close-thick" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
                                        <Text style={{ fontSize: 16, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}>Close</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default EventTipsModal;


