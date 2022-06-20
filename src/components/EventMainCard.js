import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image } from 'react-native';

import { Tooltip } from 'react-native-elements';

import * as translateToEnglishLib from '../services/auxiliar/translateToEnglish';
import * as emojiFlagsLib from '../services/auxiliar/emojiFlags';

import styles from './EventMainCard_styles';


import HeartPulse from './HeartPulse';

const EventMainCard = (props) => {
    let event = props.event;
    let showProbabilities = props.showProbabilities;
    let loading = props.loading;
    //let loadLiveEvents = props.loadLiveEvents;
    let homeImgUri = props.homeImgUri
    let awayImgUri = props.awayImgUri
    let autoReloadDataBol = props.autoReloadData


    const [clockState, setClockState] = useState({
        dateOpenedEvent: new Date(),
        initialEventClock: event.clock,
        clockToShow: '',
        index: 0,
        lastClockStatusWasTicking: false,
        totalEventsReloads: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // THIS IS DESTRUCTURING:
            let { dateOpenedEvent, initialEventClock, clockToShow, index, totalEventsReloads, lastClockStatusWasTicking } = clockState;
            //console.log('clock ticked | index = ' + index + ' | totalEventsReloads = ' + totalEventsReloads + ' | lastClockStatusWasTicking = ' + lastClockStatusWasTicking)
            console.log(JSON.stringify(clockState) + ' | event.clock = ' + JSON.stringify(event.clock))
            index++
            if (index % 60 === 0 && event.brClock && event.brClock !== 'FT') {
                console.log('time to reload')
                totalEventsReloads++;
                props.loadLiveEvents();
            }
            if (event.brClock && event.brClock !== 'FT') {
                clockToShow = procedimento(initialEventClock, event.clock, dateOpenedEvent);
                if (event.brClock.indexOf(':') > -1) {
                    if (!lastClockStatusWasTicking) { // came from HT or pre-game status
                        console.log(' first oppening OR came from HT or pre-game status --- ')
                        // reset the InitialEventClock and DateopenedEvent, so the clock sync with the period clock
                        initialEventClock = event.clock; //setInitialEventClock(event.clock);
                        dateOpenedEvent = new Date()// setDateOpenedEvent(new Date());
                        lastClockStatusWasTicking = true// setLastClockStatusWasTicking2(true);
                    } else {

                    }
                } else {
                    console.log(' clock stopped ticking, entered halftime or FT')
                    lastClockStatusWasTicking = false;
                }
            } else {
                console.log('NO CLOCK TO UPDATE, FT')
                clockToShow = translateToEnglishLib.translateEventBRClockToEnglish(event.brClock);
            }

            setClockState({
                dateOpenedEvent: dateOpenedEvent,
                initialEventClock: initialEventClock,
                clockToShow: clockToShow,
                index: index,
                lastClockStatusWasTicking: lastClockStatusWasTicking,
                totalEventsReloads: totalEventsReloads,
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [clockState]);

    //const pad = (n) => n < 10 ? '0' + n : n
    const parse = (n) => (n < 10) ? '0' + n : n

    const procedimento = (initialEventClock, currentEventClock, dateOpenedEvent) => {
        //1. AO CLICAR NO EVENTO SETAR UM HORA QUE CLICOU NO EVENTO
        //2. O LOOP INTERVAL SERÁ DE 1000MS, A CADA LOOP CALCULAR QUE HORA É AGORA E SOMAR À HORA QUE CLICOU NO EVENTO SALVA EM PASSO 1
        //3. PEGAR A DIFERENÇA EM MS E ADICIONAR AO INITIAL BRCLOCK

        // 4. para pegar o caso de mudar de 1t para intervalo (comparar o o char[0], se for diferente, setar novo initialEventClock e dateopendEvent)

        // DESSA FORMA FICA INTEPENDENTE DE TEMPO GASTO, ALÉM DE SER A MAIS RÁPIDA, POIS NAO PRECISA SETAR NENHUM USESTATUS

        // this is the main object where the auto reload and ticking clock will run
        // var options =["Home","Savings","Car","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend","GirlFriend"];
        // const [seconds, setSeconds] = useState(0);

        /*
        let initialClocka = translateToEnglishLib.translateEventBRClockToEnglish(initialEventClock.brClock);
        if (initialClocka.indexOf(':') > -1) {
            initialClocka = translateToEnglishLib.translateEventBRClockToEnglish(initialEventClock.brClock).substring(0, 4) + parse(initialEventClock.minute) + ':' + parse(initialEventClock.second)
        }
        */
        //initialEventClock = event.clock;
        //setDateOpenedEvent(new Date());
        // this is the best clock ever!! I do not sum seconds, I do math operations with static date comparations
        // I save the initial clok only once 
        let timeDiffFromDateOpenedEvent = new Date().getTime() - dateOpenedEvent.getTime();
        // console.log('dateOpenedEvent = ' + dateOpenedEvent)
        let new_eventClockDate = new Date();
        new_eventClockDate.setMinutes(initialEventClock.minute)
        new_eventClockDate.setSeconds(initialEventClock.second)
        let eventClockDate = new Date(new_eventClockDate.getTime() + timeDiffFromDateOpenedEvent);

        let retorno = parse(eventClockDate.getMinutes()) + ':' + parse(eventClockDate.getSeconds())
        if (event.brClock.indexOf(':') > -1) {
            retorno = translateToEnglishLib.translateEventBRClockToEnglish(event.brClock).substring(0, 4) + retorno
        } else {
            retorno = translateToEnglishLib.translateEventBRClockToEnglish(event.brClock);
        }
        return retorno;
    }

    return (
        <View>
            <View style={showProbabilities ? [styles.cardLogos, { flexBasis: 172 }] : styles.cardLogos}>
                <Pressable
                    style={{ flex: 1, flexDirection: 'column', flexShrink: 1 }}
                    onPress={() => { }}
                    refreshing={loading}
                    onRefresh={() => props.loadLiveEvents()}
                >
                    <View style={{ flex: 1, flexShrink: 1, marginTop: 0, }}>
                        <View style={{ flex: 0, flexShrink: 1 }}>
                            <Tooltip containerStyle={{ width: '45%', height: 222, alignSelf: 'center' }} backgroundColor={'#FFF'}
                                overlayColor={'rgba(111, 111, 111, 0.55)'}
                                popover={
                                    <Text style={[styles.eventClock, { color: '#555', fontSize: 11, backgroundColor: '#fff', elevation: 0, marginHorizontal: 5, paddingHorizontal: 2, }]}>
                                        {autoReloadDataBol ?
                                            '\nclockState.index = ' + clockState.index
                                            + '\nclockState.clockToShow = ' + clockState.clockToShow
                                            + '\nclockState.totalEventsReloads = ' + clockState.totalEventsReloads
                                            + '\n' + JSON.stringify(event.clock)
                                            + '\n' + JSON.stringify(event.timer)
                                            :
                                            'clocks'
                                        }
                                    </Text>
                                }>
                                <View>
                                    <Text style={[styles.eventLeague,]}>{emojiFlagsLib.getFlags(event.league.cc)}  {event.league.name}</Text>
                                    <View style={[styles.eventClock]}>
                                        <Text style={[styles.eventClockText, { color: '#777', fontSize: 14 }, props.showBRclock ? { display: 'none' } : { fontSize: 15 }]}>{event.enClock === 'FT' ? event.enClock : event.minuteClock}</Text>
                                        <Text style={[styles.eventClockText, { color: '#777', fontSize: 14 }, props.showBRclock ? { fontSize: 15 } : { display: 'none' }]}>
                                            {autoReloadDataBol ?
                                                clockState.clockToShow
                                                //'timerClock2() '
                                                // TimerClock2() + ''
                                                :
                                                event.enClock
                                            }
                                        </Text>
                                        {event.timer && event.timer.tt === "1"
                                            ?
                                            <HeartPulse />
                                            :
                                            <View></View>
                                        }

                                    </View>
                                </View>
                            </Tooltip>
                        </View>
                    </View>
                    <View style={styles.teamsBigLogoBox}>
                        <View style={{ borderWidth: 0, alignItems: 'center', width: '37%' }}>
                            <View style={{ borderWidth: 0, alignItems: 'center' }}>
                                <Image source={homeImgUri} style={{ width: 69, height: 69 }} />
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', borderWidth: 0 }}>
                                <Text style={{
                                    alignItems: 'center', fontSize: 14, color: '#41414d', marginTop: 0, height: 39,
                                    fontWeight: 'bold', textAlign: 'center', borderWidth: 0, paddingHorizontal: 10, textAlignVertical: 'center'
                                }}>
                                    {(event.points && Number(event.points.redcards_home) > 0) ? '🟥'.repeat(Number(event.points.redcards_home)) + ' ' : ''}
                                    {'' + event.home.name + ''}
                                </Text>
                                {showProbabilities ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e5e5e5', paddingHorizontal: 8, marginTop: 3 }}>
                                        <Text style={styles.probabilityText}>
                                            {event.event_odds.odds_summary.end.home_prob > 1 ? '' + Math.floor(event.event_odds.odds_summary.end.home_prob) + '%' : event.event_odds.odds_summary.end.home_prob + '%'}
                                        </Text>
                                    </View>
                                    :
                                    <View></View>
                                }
                            </View>
                        </View>
                        <View style={{ borderWidth: 0, justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text
                                onPress={() => { }}
                                style={{ fontSize: 15, color: '#777', fontWeight: 'bold', marginTop: 8, alignSelf: 'center' }}>
                            </Text>
                            <Text
                                onPress={() => { }}
                                style={{ fontSize: 36, color: '#41414d', fontWeight: 'bold', marginBottom: 1, alignSelf: 'center' }}>
                                {event.totalGoals_home ? event.totalGoals_home : '0'}
                                <Text style={{ fontSize: 33 }}>  -  </Text>
                                {event.totalGoals_away ? event.totalGoals_away : '0'}
                            </Text>
                            <Text
                                onPress={() => { }}
                                style={{ fontSize: 13, color: '#777', fontWeight: 'bold', marginTop: 8, alignSelf: 'center', borderRadius: 4, paddingVertical: 2, paddingHorizontal: 6 }}>
                                {showProbabilities ? 'Win Prob. %' : ''}
                            </Text>
                        </View>
                        <View style={{ borderWidth: 0, alignItems: 'center', width: '37%' }}>
                            <View style={{ borderWidth: 0, alignItems: 'center' }}>
                                <Image source={awayImgUri} style={{ width: 69, height: 69 }} />
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', borderWidth: 0 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{
                                        alignItems: 'center', fontSize: 14, color: '#41414d', marginTop: 0, height: 39,
                                        fontWeight: 'bold', textAlign: 'center', borderWidth: 0, paddingHorizontal: 10, textAlignVertical: 'center'
                                    }}>
                                        {'' + event.away.name + ''}
                                        {(event.points && Number(event.points.redcards_away) > 0) ? ' ' + '🟥'.repeat(Number(event.points.redcards_away)) : ''}
                                    </Text>
                                    {showProbabilities ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e5e5e5', paddingHorizontal: 8, marginTop: 3 }}>
                                            <Text style={styles.probabilityText}>
                                                {event.event_odds.odds_summary.end.away_prob > 1 ? Math.floor(event.event_odds.odds_summary.end.away_prob) + '%' : event.event_odds.odds_summary.end.away_prob + '%'}
                                            </Text>
                                        </View>
                                        :
                                        <View></View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </View >
    );
}

export default EventMainCard;
