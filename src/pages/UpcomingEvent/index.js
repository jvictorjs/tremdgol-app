import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles'

import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import api from '../../services/api';

import * as pointsSlicesBlankLib from '../../services/auxiliar/pointsSlicesBlank';
import * as conversorsAndParsersLib from '../../services/auxiliar/conversorsAndParsers';

import SettingsMenuModal from '../../components/SettingsMenuModal';
import MarketValueBox from '../../components/MarketValueBox';
import StatsBox563 from '../../components/StatsBox563';
import OccurrencesList from '../../components/OccurrencesList';
import PointsGraphBox from '../../components/PointsGraphBox';
import EventMainCard from '../../components/EventMainCard';
import EventHistoryModal from '../../components/EventHistoryModal';
import EventTipsModal from '../../components/EventTipsModal';

export default function App() {
    const navigation = useNavigation();
    const route = useRoute();

    const [liveEvents, setLiveEvents] = useState(route.params?.liveEvents);
    const [upComingEvents, setUpComingEvents] = useState(route.params?.upComingEvents);
    const [event, setEvent] = useState(route.params.upcomingEvent);

    // const event = route.params.liveEvent;
    const homeImgUri = { uri: `https://assets.b365api.com/images/team/b/${event.home.image_id}.png` };
    const awayImgUri = { uri: `https://assets.b365api.com/images/team/b/${event.away.image_id}.png` };

    const [loading, setLoading] = useState(false);

    const [showProbabilities, setShowProbabilities] = useState(route.params?.showProbabilities);
    const toggleSwitchShowProbabilities = () => {
        setShowProbabilities(!showProbabilities);
        console.log('showProbabilities mudou de valor, setado para = ', !showProbabilities)
    };

    const [showBRclock, setShowBRclock] = useState(route.params?.showBRclock);
    const toggleSwitchShowBRclock = () => {
        setShowBRclock(!showBRclock);
        console.log('showBRclock mudou de valor, setado para = ', !showBRclock)
    };

    const [showTips, setShowTips] = useState((route.params) ? route.params.showTips : false);
    const toggleSwitchShowTips = () => {
        setShowTips(!showTips);
        console.log('showTips mudou de valor, setado para = ', !showTips)
    };

    useEffect(() => {
    }, []);


    function navigateBack() {
        console.log(`navigating to home...`)
        /*
        route.params.showProbabilities = showProbabilities;
        console.log(route.params.showProbabilities)
         navigation.navigate('LiveEvents', {
             liveEvents, upComingEvents, showProbabilities
         });
 */
        navigation.dispatch(StackActions.replace('LiveEvents', {
            liveEvents, upComingEvents, showProbabilities, showBRclock, showTips
        }));
    }

    async function loadLiveEvents(setLoadingTrueOrFalse) { // not working here in upcoming events
        console.log(`loading events...`);
        if (setLoadingTrueOrFalse) setLoading(true);
        const response = await api.get('events/1');
        const response2 = await api.get('events/2');
        console.log(`Total live events = ${response.data.response.result.liveEvents.length}`);
        response.data.response.result.liveEvents.map(liveEvent => {
            liveEvent.tips = liveEvent.tips.filter(t => (t.tremdgol_id))
        })
        setLiveEvents(response.data.response.result.liveEvents);
        console.log(`Total upcoming events = ${response2.data.response.result.upcomingEvents.length}`);
        for (let upEvent of response2.data.response.result.upcomingEvents) {
            upEvent.timeStamps = conversorsAndParsersLib.getTimeStamps_parseEpochTimeToTimeToKO(upEvent.time);
        }
        setUpComingEvents(response2.data.response.result.upcomingEvents.filter(upEvent => upEvent.timeStamps.timeUntilKickOff_stringed.indexOf('-') === -1))
        let eventCollected = liveEvents.filter(x => x.id === event.id)[0]
        if (!eventCollected) {
            eventCollected = upComingEvents.filter(x => x.id === event.id)[0]
        }
        if (eventCollected) {
            console.log(`event = ${eventCollected.fullNameStringedWithClock}`)
            setEvent(eventCollected);
            applyDataAdjustmentToShow();
        } else {
            console.log(`event still = ${event.fullNameStringedWithClock}`)
            event.brClock = 'FT';
            console.log('Event not found, supossed to be FT')
        }
        if (setLoadingTrueOrFalse) setLoading(false);
    }

    function applyDataAdjustmentToShow() {
        event.pointsSlices = pointsSlicesBlankLib.getBlankPointsSlices()
        if (event.pointsSlices.minutes_array.length < 18) {
            for (let i = event.pointsSlices.minutes_array.length; i < 18; i++) {
                event.pointsSlices.powerIndex_array.push(0);
                event.pointsSlices.minutes_array.push((i + 1) * 5 + "'");
                event.pointsSlices.minutesToShow_array.push('⚪');
                event.pointsSlices.minutesOfHomeGoalsToShow_array.push('');
                event.pointsSlices.minutesOfAwayGoalsToShow_array.push('');
                if (event.pointsSlices.minutesOfHomeRedCardsAndGoalsToShow_array) event.pointsSlices.minutesOfHomeRedCardsAndGoalsToShow_array.push('');
                if (event.pointsSlices.minutesOfAwayRedCardsAndGoalsToShow_array) event.pointsSlices.minutesOfAwayRedCardsAndGoalsToShow_array.push('');
                event.pointsSlices.minutesOfHomeRedCardsToShow_array.push('');
                event.pointsSlices.minutesOfAwayRedCardsToShow_array.push('');
                console.log(`i = ${i}`)
            }
        }
        for (let i = 0; i < event.pointsSlices.powerIndex_array.length; i++) {
            let multiplyFactor = (event.pointsSlices.powerIndex_array[i] > 0) ? 1 : -1;
            if (event.pointsSlices.powerIndex_array[i] * multiplyFactor > 8.5) {
                event.pointsSlices.powerIndex_array[i] = 8.5 * multiplyFactor;
                console.log(`cutted i = ${i}`)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-between', borderWidth: 0 }}>
                    <Image source={logoImg} />
                </View>
                <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'center', borderWidth: 0 }}>
                    <Text style={styles.headerText}>
                        <Text style={styles.headerTextBold}>
                            {
                                liveEvents
                                    ?
                                    liveEvents.length > 1
                                        ? '' + liveEvents.length + ' live events'
                                        : '' + liveEvents.length + ' live event'
                                    :
                                    ''
                            }
                        </Text>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '23%', justifyContent: 'space-between', borderWidth: 0 }}>
                    <SettingsMenuModal showProbabilities={showProbabilities} toggleSwitchShowProbabilities={toggleSwitchShowProbabilities} showBRclock={showBRclock} toggleSwitchShowBRclock={toggleSwitchShowBRclock} showTips={showTips} toggleSwitchShowTips={toggleSwitchShowTips} />
                    <Pressable onPress={() => { navigateBack(showProbabilities) }}>
                        <Feather name="arrow-left" size={28} color="#555"></Feather>
                    </Pressable>
                </View>
            </View>
            <EventMainCard event={event} showProbabilities={showProbabilities} showBRclock={showBRclock} loading={loading} homeImgUri={homeImgUri} awayImgUri={awayImgUri} loadLiveEvents={loadLiveEvents} autoReloadData={false} />
            {/*<EventMainCard event={event} showProbabilities={showProbabilities} showBRclock={showBRclock} loading={loading} homeImgUri={homeImgUri} awayImgUri={awayImgUri} autoReloadData={false} />*/}
            <StatsBox563 event={event} />
            <PointsGraphBox event={event} loading={loading} homeImgUri={homeImgUri} awayImgUri={awayImgUri} loadLiveEvents={loadLiveEvents} applyDataAdjustmentToShow={applyDataAdjustmentToShow} />
            <View style={[styles.eventHistoryAndTipsModalBox, { flexBasis: 44 }]}>
                <EventHistoryModal event={event} />
                <EventTipsModal event={event} />
            </View>
            <MarketValueBox event={event} />
            <OccurrencesList event={event} loading={loading} homeImgUri={homeImgUri} awayImgUri={awayImgUri} loadLiveEvents={loadLiveEvents} />

        </View>
    );
}