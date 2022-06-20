
import React, { useState } from 'react';
import { Text, View, Pressable, Switch, Animated, Easing, SafeAreaView, ScrollView, Image, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import Modal from 'react-native-modal';

import styles from './EventHistoryModal_styles';
import { ShadowPropTypesIOS } from 'react-native';


import * as conversorsAndParsersLib from '../services/auxiliar/conversorsAndParsers';

const EventHistoryModal = (props) => {
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

    function EventsListH2H(props) {
        const [extendedMode, setExtendedMode] = useState(false); // extendedMode shows more details about a past event (league, halftime score)

        const toggleExtendedMode = () => {
            setExtendedMode(!extendedMode);
            console.log('extendedMode mudou de valor, setado para = ', !extendedMode)
        };

        var key = 0;
        let homeTotalWins = 0
        let awayTotalWins = 0
        let drawTotal = 0
        if (props.eventsArray) {
            for (h2hEvent of props.eventsArray) {
                if (h2hEvent.resultCol === 'H') { if (h2hEvent.home_name === event.home.name) homeTotalWins++; else awayTotalWins++ }
                if (h2hEvent.resultCol === 'D') { drawTotal++ }
                if (h2hEvent.resultCol === 'A') { if (h2hEvent.away_name === event.away.name) awayTotalWins++; else homeTotalWins++ }
            }
        }
        let totalH2Hevents = homeTotalWins + awayTotalWins + drawTotal;
        console.log('totalH2Hevents = ' + totalH2Hevents)
        let homeWins_pct = Math.floor(homeTotalWins / totalH2Hevents * 100);
        let draw_pct = Math.floor(drawTotal / totalH2Hevents * 100);
        let awayWins_pct = Math.floor(awayTotalWins / totalH2Hevents * 100);
        const homeColor = '#0088cc';
        const drawColor = 'rgba(212, 212, 66,1)';
        const awayColor = 'rgb(160, 158, 158)';
        return (
            <View style={{ justifyContent: 'space-evenly', flexDirection: 'column', width: '100%', borderWidth: 0 }}>
                <Pressable onPress={() => toggleExtendedMode()} style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '93%', marginBottom: 5 }}>
                        <View style={{ borderWidth: 0, alignItems: 'center' }}>
                            <Image source={homeImgUri} style={{ width: 69, height: 69 }} />
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 18, borderWidth: 0, borderRadius: 6, marginTop: 5, marginBottom: 0 }]}>
                                H2H
                            </Text>
                            <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center', paddingRight: 2 }}>
                                <Text style={[{ fontWeight: '600', textAlign: 'center', color: '#737380', fontSize: 15, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 5, textAlignVertical: 'center' }]}>
                                    Last events
                                </Text>
                                <MaterialCommunityIcons name={extendedMode ? 'unfold-less-horizontal' : 'unfold-more-horizontal'} size={21}
                                    style={{ marginLeft: 4, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderWidth: 0, elevation: 2, borderRadius: 50, backgroundColor: '#ddd', width: 21 }} color="#737380" />
                            </View>
                        </View>
                        <View style={{ borderWidth: 0, alignItems: 'center' }}>
                            <Image source={awayImgUri} style={{ width: 69, height: 69 }} />
                        </View>
                    </View>
                </Pressable>
                {totalH2Hevents > 0 ?
                    <View>
                        <View style={{ borderWidth: 0, marginTop: 8, marginBottom: 0 }}>
                            <View title={''} style={{ flexDirection: 'row', maxWidth: '93%', justifyContent: 'center', alignSelf: 'center', borderWidth: 0, borderColor: 'rgba(182,182,182,1)', borderRadius: 6, marginBottom: 15, marginTop: 5, elevation: 2 }}>
                                <View style={[{ backgroundColor: homeColor, width: homeWins_pct + '%', height: 11, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }, (homeTotalWins === totalH2Hevents) ? { borderTopRightRadius: 6, borderBottomRightRadius: 6 } : {}]}></View>
                                <View style={[{ backgroundColor: drawColor, width: draw_pct + '%', height: 11 }, (awayTotalWins === 0) ? { borderTopRightRadius: 6, borderBottomRightRadius: 6 } : {}, (homeTotalWins === 0) ? { borderTopLeftRadius: 6, borderBottomLeftRadius: 6 } : {}]}></View>
                                <View style={[{ backgroundColor: awayColor, width: awayWins_pct + '%', height: 11, borderTopRightRadius: 6, borderBottomRightRadius: 6 }, (awayTotalWins === totalH2Hevents) ? { borderTopLeftRadius: 6, borderBottomLeftRadius: 6 } : {}]}></View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column', justifyContent: 'center', alignContent: 'center', borderWidth: 0, backgroundColor: '#fff', borderRadius: 4,
                            alignItems: 'center', padding: 3, marginBottom: 20, alignSelf: 'center', width: '97%', elevation: 0,
                        }}>
                            <View style={{ borderWidth: 0, width: '100%', flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, borderWidth: 0, height: 30 }}>
                                    <View style={{ width: '48%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderWidth: 0 }}>
                                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 13, textAlignVertical: 'center', color: '#555', width: '80%', paddingLeft: 5 }}>{event.home.name + ' win'}</Text>
                                        <View style={{ borderWidth: 0, alignItems: 'center', marginHorizontal: 3 }}>

                                            <Image source={homeImgUri} style={{ width: 21, height: 21 }} />

                                        </View>
                                    </View>
                                    <Text style={{ width: '12%', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', borderWidth: 0, fontSize: 13, color: '#444' }}>{homeWins_pct}%</Text>
                                    <View style={{ width: '31%', borderWidth: 0, borderColor: '#bbb', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', elevation: 1, height: '60%' }}>
                                        <View style={{ borderWidth: 0, borderColor: homeColor, width: homeWins_pct + '%', height: '100%', backgroundColor: homeColor }}></View>
                                    </View>
                                    <Text style={{ width: '7%', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 13, color: '#333', paddingLeft: 2 }}>{homeTotalWins}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, borderWidth: 0, height: 30 }}>
                                    <Text style={{ width: '48%', textAlign: 'left', fontWeight: 'bold', fontSize: 13, textAlignVertical: 'center', color: '#555', paddingLeft: 5 }}>draw</Text>
                                    <Text style={{ width: '12%', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', borderWidth: 0, fontSize: 13, color: '#444' }}>{draw_pct}%</Text>
                                    <View style={{ width: '31%', borderWidth: 0, borderColor: '#bbb', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', elevation: 1, height: '60%' }}>
                                        <View style={{ borderWidth: 0, borderColor: drawColor, width: draw_pct + '%', height: '100%', backgroundColor: drawColor }}></View>
                                    </View>
                                    <Text style={{ width: '7%', textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', fontSize: 13, color: '#333', paddingLeft: 2 }}>{drawTotal}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, height: 30 }}>
                                    <View style={{ width: '48%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderWidth: 0 }}>
                                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 13, textAlignVertical: 'center', color: '#555', width: '80%', paddingLeft: 5 }}>{event.away.name + ' win'}</Text>
                                        <View style={{ borderWidth: 0, alignItems: 'center', marginHorizontal: 3 }}>

                                            <Image source={awayImgUri} style={{ width: 21, height: 21 }} />

                                        </View>
                                    </View>
                                    <Text style={{ width: '12%', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', borderWidth: 0, fontSize: 13, color: '#444' }}>{awayWins_pct}%</Text>
                                    <View style={{ width: '31%', borderWidth: 0, borderColor: '#bbb', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', elevation: 1, height: '60%' }}>
                                        <View style={{ borderWidth: 0, borderColor: awayColor, width: awayWins_pct + '%', height: '100%', backgroundColor: awayColor }}></View>
                                    </View>
                                    <Text style={{ width: '7%', textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 13, color: '#333', borderWidth: 0, paddingLeft: 2 }}>{awayTotalWins}</Text>
                                </View>
                            </View>
                        </View>
                        {extendedMode ?
                            props.eventsArray.map((pastEvent) => (
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
                            ))
                            :
                            props.eventsArray.map((pastEvent) => (
                                <View key={pastEvent.id + key++} style={{ justifyContent: 'space-between', flexDirection: 'row', borderWidth: 0, width: '100%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 7, elevation: 1 }}>
                                    <View style={{ borderWidth: 0, width: '27%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 12, color: "#888888", textAlign: 'left', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{conversorsAndParsersLib.getDateYYYYMMMDDhhmmZone(new Date(Number(pastEvent.time) * 1000)).substring(0, 11)}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '30%', alignSelf: 'center' }}>
                                        <Text style={[{ fontSize: 13, textAlign: 'right', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }, (pastEvent.resultCol === 'H') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.home_name}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '12%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 13, color: "#777", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{pastEvent.fullScore.substring(0, pastEvent.fullScore.search(/\s/g))}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '30%', alignSelf: 'center' }}>
                                        <Text style={[{ fontSize: 13, textAlign: 'left', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }, (pastEvent.resultCol === 'A') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.away_name}</Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                    :
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '90%', marginTop: 19 }}>
                        <Text style={[{ fontWeight: '700', textAlign: 'center', color: '#888', fontSize: 13, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 11, padding: 5, elevation: 1, borderColor: '#bbb', backgroundColor: '#efefef' }]}>
                            No recent H2H matches found.
                        </Text>
                    </View>
                }
            </View>
        );
    }

    function EventsList(props) {
        const [extendedMode, setExtendedMode] = useState(false); // extendedMode shows more details about a past event (league, halftime score)
        const toggleExtendedMode = () => {
            setExtendedMode(!extendedMode);
            console.log('extendedMode mudou de valor, setado para = ', !extendedMode)
        };
        var key = 0;
        let totalWins = 0
        let totalLosts = 0
        let totalDraws = 0
        if (props.eventsArray) {
            for (let h2hEvent of props.eventsArray) {
                if (h2hEvent.result === 'W') { totalWins++ }
                if (h2hEvent.result === 'D') { totalDraws++ }
                if (h2hEvent.result === 'L') { totalLosts++ }
            }
        }
        let totalLastEvents = totalWins + totalLosts + totalDraws
        console.log('totalLastEvents = ' + totalLastEvents)
        let totalWins_pct = Math.floor(totalWins / totalLastEvents * 100);
        let totalDraws_pct = Math.floor(totalDraws / totalLastEvents * 100);
        let totalLosts_pct = Math.floor(totalLosts / totalLastEvents * 100);
        const eventsToShow = (props.eventsArray) ? props.eventsArray.slice(0, 10) : {};
        const winColor = 'rgba(88, 255, 155, 0.56)'; // aquamarine rgba(122, 255, 222, 1)  verdinho= rgba(0, 233, 13, 0.33)
        const drawColor = '#008fcc';
        const loseColor = 'rgba(255,11,33,0.33)';
        return (
            <View style={{ justifyContent: 'space-evenly', flexDirection: 'column', width: '100%', borderWidth: 0 }}>
                <Pressable onPress={() => toggleExtendedMode()} style={{ ustifyContent: 'space-between', flexDirection: 'row', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '100%', marginTop: 19 }}>
                        <View style={{ borderWidth: 0, alignItems: 'center' }}>
                            <Image source={props.teamLogoUri} style={{ width: 69, height: 69 }} />
                        </View>
                        <View style={{ width: '95%' }}>
                            <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 18, borderWidth: 0, borderRadius: 6, marginTop: 5, marginBottom: 0 }]}>
                                {props.teamName}
                            </Text>
                            <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center', paddingRight: 2 }}>
                                <Text style={[{ fontWeight: '600', textAlign: 'center', color: '#737380', fontSize: 16, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 5, textAlignVertical: 'center' }]}>
                                    Last {eventsLimitQtyToShow} events
                                </Text>
                                <MaterialCommunityIcons name={extendedMode ? 'unfold-less-horizontal' : 'unfold-more-horizontal'} size={23}
                                    style={{ marginLeft: 4, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderWidth: 0, elevation: 2, borderRadius: 50, backgroundColor: '#ddd', width: 23 }} color="#737380" />
                            </View>
                        </View>
                    </View>
                </Pressable>
                {totalLastEvents > 0 ?
                    <View>
                        <View style={{ borderWidth: 0 }}>
                            <View title={''} style={{ flexDirection: 'row', maxWidth: '95%', justifyContent: 'center', alignSelf: 'center', borderWidth: 0, borderColor: 'rgba(182,182,182,1)', borderRadius: 6, marginBottom: 15, marginTop: 5, elevation: 1 }}>
                                <View style={[{ backgroundColor: winColor, width: totalWins_pct + '%', height: 11, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }, (totalWins === totalLastEvents) ? { borderTopRightRadius: 6, borderBottomRightRadius: 6 } : {}]}></View>
                                <View style={[{ backgroundColor: drawColor, width: totalDraws_pct + '%', height: 11 }, (totalLosts === 0) ? { borderTopRightRadius: 6, borderBottomRightRadius: 6 } : {}, (totalWins === 0) ? { borderTopLeftRadius: 6, borderBottomLeftRadius: 6 } : {}]}></View>
                                <View style={[{ backgroundColor: loseColor, width: totalLosts_pct + '%', height: 11, borderTopRightRadius: 6, borderBottomRightRadius: 6 }, (totalLosts === totalLastEvents) ? { borderTopLeftRadius: 6, borderBottomLeftRadius: 6 } : {}]}></View>
                            </View>
                        </View>
                        {extendedMode ?
                            eventsToShow.map((pastEvent) => (
                                <View key={pastEvent.id + key++} style={{ justifyContent: 'space-between', flexDirection: 'column', borderWidth: 0, width: '100%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 7, elevation: 1 }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, alignSelf: 'center' }}>
                                        <View style={{ borderWidth: 0, width: '24%', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 12, color: "#999", textAlign: 'left', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{conversorsAndParsersLib.getDateYYYYMMMDDhhmmZone(new Date(Number(pastEvent.time) * 1000)).substring(0, 11)}</Text>
                                        </View>
                                        <Text style={{ fontSize: 13, color: "#444", textAlign: 'left', marginLeft: 15, fontWeight: '600', borderWidth: 0 }} >
                                            {pastEvent.league_name}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderWidth: 0, width: '90%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 0, elevation: 0 }}>
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
                                        <View style={{ borderWidth: 0, width: '10%', paddingLeft: 5 }}>
                                            <Text style={{ fontSize: 13, color: "#888888", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{pastEvent.result && pastEvent.result.replace('W', '💚').replace('D', '💙').replace('L', '💔')}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                            :
                            eventsToShow.map((pastEvent) => (
                                <View key={pastEvent.id + key++} style={{ justifyContent: 'space-between', flexDirection: 'row', borderWidth: 0, width: '100%', alignSelf: 'center', padding: 3, backgroundColor: '#efefef', borderRadius: 6, marginBottom: 7, elevation: 1 }}>
                                    <View style={{ borderWidth: 0, width: '24%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 11, color: "#999", textAlign: 'left', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{conversorsAndParsersLib.getDateYYYYMMMDDhhmmZone(new Date(Number(pastEvent.time) * 1000)).substring(0, 11)}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '29%', alignSelf: 'center' }}>
                                        <Text style={[{ fontSize: 13, textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }, (pastEvent.resultCol === 'H') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.home_name}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '12%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 13, color: "#777", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{pastEvent.fullScore.substring(0, pastEvent.fullScore.search(/\s/g))}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '29%', alignSelf: 'center' }}>
                                        <Text style={[{ fontSize: 13, textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }, (pastEvent.resultCol === 'A') ? { color: '#454545' } : { color: '#888888' }]} >{pastEvent.away_name}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, width: '6%', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 13, color: "#888888", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{pastEvent.result && pastEvent.result.replace('W', '💚').replace('D', '💙').replace('L', '💔')}</Text>
                                    </View>
                                </View>

                            ))
                        }
                    </View>
                    :
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignContent: 'space-around', borderWidth: 0, alignItems: 'center', alignSelf: 'center', width: '90%', marginTop: 19 }}>
                        <Text style={[{ fontWeight: '700', textAlign: 'center', color: '#888', fontSize: 13, borderWidth: 0, borderRadius: 6, marginTop: 0, marginBottom: 11, padding: 5, elevation: 1, borderColor: '#bbb', backgroundColor: '#efefef' }]}>
                            No recent matches found.
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

    const eventsH2HStringed = () => {
        let retorno = ''
        if (props.event.bsfEventsHistory) {
            for (const [i, pastEvent] of props.event.bsfEventsHistory.h2h.entries()) {
                retorno += '\n' + pastEvent.stringedGameWithRedcards
                retorno += '\n' + conversorsAndParsersLib.getDateYYYYMMMDDhhmmZone(new Date(Number(pastEvent.time) * 1000)).substring(0, 11)
                if (i === 9) break
            }
        }
        return retorno;
    }

    return (
        <View>
            <Pressable onPress={() => { toggleModal() }} style={{
                flexDirection: 'row', elevation: 5, borderWidth: 0, marginTop: 4,
                borderColor: 'grey', color: 'black', borderRadius: 30, justifyContent: 'center', alignItems: 'center', width: 111, height: 32, backgroundColor: '#dadada'
            }}>
                <Text style={{ fontWeight: 'bold', color: '#444' }}>History  </Text>
                <Animated.View style={{ transform: [{ rotate: (isModalVisible) ? spinClockWise : spinAntiClockWise }] }}>
                    <FontAwesome name="history" size={24} color="#656565"></FontAwesome>
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
                        <View style={styles.EventHistoryModalView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width: '100%' }}>
                                <Text style={{ color: '#FCFCFC' }}></Text>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 16, borderWidth: 0, borderRadius: 6 }]}>
                                    Event History
                                </Text>
                                <Pressable onPress={() => { toggleModal() }} style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 13, borderWidth: 0 }}>
                                    <FontAwesome name="close" size={25} color="#777"></FontAwesome>
                                </Pressable>
                            </View>
                            <Divider width={2} style={{ color: '#666', backgroundColorcolor: '#666', borderColor: '#666', borderWidth: 0, width: '96%', marginBottom: 13, height: 5, marginTop: -5 }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 0, borderWidth: 0, height: '86%', borderRadius: 0, width: '100%' }}>
                                <SafeAreaView style={styles.container}>
                                    <ScrollView style={styles.scrollView}>
                                        {/*
                                            <Text style={styles.text}>
                                        {JSON.stringify(props.event.bsfEventsHistory.h2h)} 
                                        </Text>
                                        
                                        */}
                                        <View style={[{ fontSize: 12, width: '100%', borderWidth: 0, alignItems: 'center', alignSelf: 'center', marginBottom: 42 }]}>
                                            <View>
                                                <EventsListH2H eventsArray={props.event.bsfEventsHistory.h2h} />
                                                <EventsList eventsArray={props.event.bsfEventsHistory.home} eventsLimitQtyToShow={eventsLimitQtyToShow} teamName={props.event.home.name} teamLogoUri={homeImgUri} />
                                                <EventsList eventsArray={props.event.bsfEventsHistory.away} eventsLimitQtyToShow={eventsLimitQtyToShow} teamName={props.event.away.name} teamLogoUri={awayImgUri} />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                            <Pressable onPress={() => toggleModal()} style={{ marginLeft: 13, borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end', borderRadius: 6, elevation: 5, marginHorizontal: 16, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <MaterialCommunityIcons name="close-thick" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
                                    <Text style={{ fontSize: 16, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}>Close</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default EventHistoryModal;


