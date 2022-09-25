import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Text, View, Image, Pressable, FlatList, RefreshControl, Modal, Alert, ActivityIndicator, Animated, Easing } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import logoImg from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';

import * as translateToEnglishLib from '../../services/auxiliar/translateToEnglish';
import * as emojiFlagsLib from '../../services/auxiliar/emojiFlags';
import * as conversorsAndParsersLib from '../../services/auxiliar/conversorsAndParsers';

import SettingsMenuModal from '../../components/SettingsMenuModal';

export default function App() {
  const navigation = useNavigation();
  const route = useRoute();
  const [liveEvents, setLiveEvents] = useState(route.params?.liveEvents);
  const [upComingEvents, setUpComingEvents] = useState(route.params?.upComingEvents);
  const [upComingEventsTypeEndedOrNotStarted, setUpComingEventsTypeEndedOrNotStarted] = useState('notStarted');
  const [upComingEventsModalVisible, setUpComingEventsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpcomingEvents, setLoadingUpcomingEvents] = useState(false);


  const [showProbabilities, setShowProbabilities] = useState((route.params) ? route.params.showProbabilities : false);
  const toggleSwitchShowProbabilities = () => {
    setShowProbabilities(!showProbabilities);
    console.log('showProbabilities mudou de valor, setado para = ', !showProbabilities)
  };

  const [showBRclock, setShowBRclock] = useState((route.params) ? route.params.showBRclock : false);
  const toggleSwitchShowBRclock = () => {
    setShowBRclock(!showBRclock);
    console.log('showBRclock mudou de valor, setado para = ', !showBRclock)
  };

  const [showTips, setShowTips] = useState((route.params) ? route.params.showTips : true);
  const toggleSwitchShowTips = () => {
    setShowTips(!showTips);
    console.log('showTips mudou de valor, setado para = ', !showTips)
  };

  function navigateToEvent(liveEvent) {
    console.log(`navigating to Event ${liveEvent.fullNameStringedWithClock}`)
    navigation.navigate('LiveEvent', {
      liveEvent, liveEvents, upComingEvents, showProbabilities, showBRclock, showTips
    });
  }

  function navigateToUpcomingEvent(upcomingEvent) {
    console.log(`navigating to Event ${upcomingEvent.fullNameStringedWithClock}`)
    setUpComingEventsModalVisible(false);
    navigation.navigate('UpcomingEvent', {
      upcomingEvent, liveEvents, upComingEvents, showProbabilities, showBRclock, showTips
    });
  }

  async function loadLiveEvents(setLoadingTrueOrFalse) {
    console.log(`loading events...`);
    if (setLoadingTrueOrFalse) setLoading(true);
    const response = await api.get('events/1');
    console.log(`Total live events = ${response.data.response.result.liveEvents.length}`);
    setLiveEvents(response.data.response.result.liveEvents);
    response.data.response.result.liveEvents.map(liveEvent => {
      liveEvent.tips = liveEvent.tips.filter(t => (t.tremdgol_id))
    })
    if (setLoadingTrueOrFalse) setLoading(false);
  }

  async function loadUpcomingEvents(setLoadingTrueOrFalse) {
    console.log(`loading upcoming events...`);
    if (setLoadingTrueOrFalse) setLoadingUpcomingEvents(true);
    const response = await api.get('events/2');
    console.log(`Total upcoming events = ${response.data.response.result.upcomingEvents.length}`);
    for (let upEvent of response.data.response.result.upcomingEvents) {
      upEvent.timeStamps = conversorsAndParsersLib.getTimeStamps_parseEpochTimeToTimeToKO(upEvent.time);
    }
    setUpComingEvents(response.data.response.result.upcomingEvents)
    if (setLoadingTrueOrFalse) setLoadingUpcomingEvents(false);
  }

  useEffect(() => {
    if (!liveEvents) {
      loadLiveEvents(true);
      loadUpcomingEvents(true);
    }
  }, []);

  async function autoReloadEvents() {
    console.log(`autoReloadEvents() --- START`);
    await loadLiveEvents(false)
    console.log(`autoReloadEvents() --- END`);
  }
  const [totalReloads, setTotalReloads] = useState(0);
  const AutoReloadEvents = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        const startDate = new Date().getTime()
        autoReloadEvents();
        setTotalReloads(totalReloads + 1);
        const endDate = new Date().getTime()
        console.log('END  AUTORELOAD --- ' + new Date() + '[' + endDate + '] total = ' + (endDate - startDate) + 'ms')
      }, 60000);
      return () => clearInterval(interval);
    }, []);
    return '' //+ totalReloads
  }


  const EventsList = () => {

    const EmptyContainer = () => {
      return (
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderWidth: 0, marginBottom: 100 }]}>
          <Text style={[styles.description, { alignSelf: 'center', textAlignVertical: 'center', fontSize: 20, margin: 20, color: '#777', opacity: 0.55, borderWidth: 0 }]}>No live events.</Text>
        </View>
      )
    }

    return (<FlatList
      style={styles.liveEventsList}
      data={liveEvents}
      keyExtractor={liveEvent => String(liveEvent.id)}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyContainer />
      }
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl
        size='large'
        // progressBackgroundColor='#2196F3'
        colors={['#777']} // ['#2196F3', '#E82041']
        progressViewOffset={155}
        refreshing={loading}
        onRefresh={() => loadLiveEvents(true)}
      />}
      renderItem={({ item: liveEvent }) => (
        <Pressable style={showProbabilities ? [styles.liveEvent, { height: 113 }] : styles.liveEvent} onPress={() => navigateToEvent(liveEvent, liveEvents)}>
          <View style={{ width: '10%', borderWidth: 0, justifyContent: 'center' }}>
            <Image
              style={styles.eventTeamLogo}
              source={{ uri: `https://assets.b365api.com/images/team/b/${liveEvent.home.image_id}.png` }}
            />
          </View>
          <View style={{ width: '80%', borderWidth: 0, justifyContent: 'space-between' }}>
            <View style={{ borderWidth: 0 }}>
              <View style={{ borderWidth: 0, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 0 }}>

                <View style={{
                  borderWidth: 0, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                  marginTop: -16, marginBottom: 0, marginLeft: '0%', width: '110%'

                }}>
                  {showTips && liveEvent.tips && liveEvent.tips.filter(t => (t.tremdgol_id && t.tremdgol_id.includes('HT'))).length > 0 ?
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 111, borderWidth: 0 }}>
                      <Text style={[styles.eventTip, (liveEvent.tips ? { backgroundColor: 'papayawhip', borderRadius: 4, elevation: 2, } : {})]}>
                        {liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5HT')[0]
                          ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5HT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+0.5HT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5HT')[0].result === '✅' ? '✅' : '')
                          : liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5HT')[0]
                            ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5HT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+1.5HT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5HT')[0].result === '✅' ? '✅' : '')
                            : liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5HT')[0]
                              ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5HT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+2.5HT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5HT')[0].result === '✅' ? '✅' : '')
                              : ''}
                      </Text>
                    </View>
                    :
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 111, borderWidth: 0 }}></View>
                  }
                  <Text style={styles.liveEventClock}>{showBRclock ?
                    '' + translateToEnglishLib.translateEventBRClockToEnglish(liveEvent.brClock) + ''
                    : liveEvent.minuteClock
                  }</Text>
                  {showTips && liveEvent.tips && liveEvent.tips.filter(t => (t.tremdgol_id && t.tremdgol_id.includes('FT'))).length > 0 ?
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 111, borderWidth: 0 }}>
                      <Text style={[styles.eventTip, (liveEvent.tips ? { backgroundColor: 'transparent', borderRadius: 0, elevation: 0, } : {})]}>
                        {liveEvent.tips ? '' : ''}
                      </Text>
                      <Text style={[styles.eventTip, (liveEvent.tips ? { backgroundColor: 'papayawhip', borderRadius: 4, elevation: 2, } : {})]}>
                        {/* an event can have 1.5FT tip and not 0.5FT tip */}
                        {liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5FT')[0]
                          ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5FT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+0.5FT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+0.5FT')[0].result === '✅' ? '✅' : '')
                          : liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5FT')[0]
                            ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5FT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+1.5FT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+1.5FT')[0].result === '✅' ? '✅' : '')
                            : liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5FT')[0]
                              ? (liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5FT' && t.tipCatNumber > 30).length > 0 ? '⭐' : '') + '+2.5FT' + (liveEvent.tips.filter(t => t.tipCatTextMini === '+2.5FT')[0].result === '✅' ? '✅' : '')
                              : ''}
                      </Text>
                    </View>
                    :
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 111, borderWidth: 0 }}></View>
                  }
                </View>
                <View style={{ borderWidth: 0, marginTop: 1, padding: 1 }}>
                  <Text style={styles.liveEventLeague}>{emojiFlagsLib.getFlags(liveEvent.league.cc)} {liveEvent.league.name}</Text>
                </View>
              </View>
            </View>
            <View style={{ borderWidth: 0, height: 48, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.eventNameRow}>
                <Text style={[styles.liveEventName, { width: '44%', textAlign: 'right' }]}>
                  {'' + ((liveEvent.points && liveEvent.points.redcards_home) ? "🟥".repeat(Number(liveEvent.points.redcards_home)) : '') + ' '}
                  {'' + liveEvent.home.name + ''}
                </Text>
                <Text style={styles.liveEventScore}>
                  {liveEvent.ss ? liveEvent.ss : '0-0'}
                </Text>
                <Text style={[styles.liveEventName, { width: '44%' }]}>
                  {'' + liveEvent.away.name + ''}
                  {' ' + ((liveEvent.points && liveEvent.points.redcards_away) ? "🟥".repeat(Number(liveEvent.points.redcards_away)) : '') + ''}
                </Text>
              </View>
            </View>
            {showProbabilities ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '89%', alignSelf: 'center', marginBottom: 5, borderWidth: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e9e9e9', marginBottom: 1, paddingHorizontal: 5 }}>
                  <Text style={styles.liveEventProbabilityText}>
                    {liveEvent.event_odds.odds_summary.end.home_prob > 1 ? '' + Math.floor(liveEvent.event_odds.odds_summary.end.home_prob) + '%' : liveEvent.event_odds.odds_summary.end.home_prob + '%'}
                  </Text>
                </View>
                <Text style={[styles.liveEventProbabilityText, { fontSize: 10, color: '#666' }]}>
                  Win Prob. %
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e9e9e9', marginBottom: 1, paddingHorizontal: 5 }}>
                  <Text style={styles.liveEventProbabilityText}>
                    {liveEvent.event_odds.odds_summary.end.away_prob > 1 ? '' + Math.floor(liveEvent.event_odds.odds_summary.end.away_prob) + '%' : liveEvent.event_odds.odds_summary.end.away_prob + '%'}
                  </Text>
                </View>
              </View>
              :
              <View></View>
            }
          </View>
          <View style={{ width: '10%', borderWidth: 0, justifyContent: 'center' }}>
            <Image
              style={styles.eventTeamLogo}
              source={{ uri: `https://assets.b365api.com/images/team/b/${liveEvent.away.image_id}.png` }}
            />
          </View>
        </Pressable>
      )}
    />
    );
  };

  const UpcomingEventsModal = (props) => {
    const ended_upcomingEvents = (upComingEvents) ? upComingEvents.filter(upEvent => upEvent.enClock === 'FT').reverse() : []
    const notStarted_upcomingEvetns = (upComingEvents) ? upComingEvents.filter(upEvent => upEvent.timeStamps.timeUntilKickOff_stringed.indexOf('-') === -1): []
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={upComingEventsModalVisible}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setUpComingEventsModalVisible(!upComingEventsModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'space-between', paddingHorizontal: 5, }}>
                <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', width: '16%' }}></View>
                <Text style={[styles.title, { marginBottom: 13 }]}>{ upComingEventsTypeEndedOrNotStarted === 'ended'?'Ended' : 'Upcoming'} Events</Text>
                <Pressable onPress={() => loadUpcomingEvents(true)} style={{ marginLeft: 13, borderWidth: 0, backgroundColor: 'transparent', alignSelf: 'flex-end', borderRadius: 6, elevation: 0, marginTop: 5, marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end' }}>
                    <MaterialCommunityIcons name="refresh" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
                    <Text style={{ fontSize: 14, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}></Text>
                  </View>
                </Pressable>
              </View>
              <View style={{ borderWidth: 0, height: '84%' }}>
                {upComingEventsTypeEndedOrNotStarted === 'ended' ?
                  <UpcomingEventsFlatList showScore={true} showTimeToKO={false} upComingEventsToUse={ended_upcomingEvents} hideProbabilities={true}/>
                  :
                  <UpcomingEventsFlatList showScore={false} showTimeToKO={true} upComingEventsToUse={notStarted_upcomingEvetns}/>
                }
              </View>
              <Pressable onPress={() => setUpComingEventsModalVisible(!upComingEventsModalVisible)} style={{ marginLeft: 13, borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end', borderRadius: 6, elevation: 5, margin: 13 }}>
                <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                  <MaterialCommunityIcons name="close-thick" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
                  <Text style={{ fontSize: 16, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}>Close</Text>
                </View>
              </Pressable>

            </View>
          </View>
        </Modal>
        {/*
        {upComingEvents && upComingEvents.length
          ?
        */}
        <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'space-around', paddingHorizontal: 0, width:'100%' }}>
          <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-start', width:150 }}>
            <Pressable onPress={() => {setUpComingEventsTypeEndedOrNotStarted('ended');setUpComingEventsModalVisible(!upComingEventsModalVisible)}} 
            style={{ borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end', borderRadius: 6, elevation: 5, marginTop: 5, marginBottom: 5, padding: 3, marginHorizontal: 7 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,borderWidth: 0, width:115}}>
                <MaterialCommunityIcons name="calendar-check" size={18} style={{ marginTop: 4, marginLeft: 8 }} color="#737380" />
                <View style={{width:90, borderWidth:0, flexDirection: 'row', justifyContent:'center'}}>
                  <Text style={{ fontSize: 14, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingHorizontal: 8, alignSelf: 'flex-end' }}> 
                  Ended
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', width:150 }}>
            <Pressable onPress={() => {setUpComingEventsTypeEndedOrNotStarted('notStarted');setUpComingEventsModalVisible(!upComingEventsModalVisible)}} 
            style={{ borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end', borderRadius: 6, elevation: 5, marginTop: 5, marginBottom: 5, padding: 3, marginHorizontal: 7 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width:115}}>
                <View style={{width:90, borderWidth:0, flexDirection: 'row', justifyContent:'center'}}>
                  <Text style={{ fontSize: 14, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingHorizontal: 8, alignSelf: 'flex-end' }}> 
                  Upcoming
                  </Text>
                </View>
                <MaterialCommunityIcons name="calendar-clock" size={18} style={{ marginTop: 4, marginRight: 8 }} color="#737380" />
              </View>
            </Pressable>
          </View>
        </View>
        {/*
          :
               <View></View>
                }
      */}
      </View>
    );
  };

  const UpcomingEventsFlatList = (props) => {
    return (
      <View>
        {
          props.upComingEventsToUse && props.upComingEventsToUse.length === 0 ?
            <View style={[styles.liveEvent, { marginTop: 100 }]}>
              <Text style={[styles.description, { alignSelf: 'center', fontSize: 19, margin: 10 }]}>No events.</Text>
            </View>
            :
            <FlatList
              style={styles.upcomingEventsList}
              data={props.upComingEventsToUse}
              keyExtractor={upComingEvents => String(upComingEvents.id)}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl
                size='large'
                // progressBackgroundColor='#2196F3'
                colors={['#E82041']} // ['#2196F3', '#E82041']
                progressViewOffset={55}
                refreshing={loadingUpcomingEvents}
                onRefresh={() => loadUpcomingEvents(true)}
              />}
              renderItem={({ item: upcomingEvent }) => (
                <Pressable style={showProbabilities  && !props.hideProbabilities? [styles.upcomingEvent, { height: 96 }] : styles.upcomingEvent} onPress={() => navigateToUpcomingEvent(upcomingEvent)}>
                  <View style={{ width: '10%', borderWidth: 0, justifyContent: 'center' }}>
                    <Image
                      style={[styles.eventTeamLogo, { width: 31, height: 31 }]}
                      source={{ uri: `https://assets.b365api.com/images/team/m/${upcomingEvent.home.image_id}.png` }}
                    />
                  </View>
                  <View style={{ width: '80%', borderWidth: 0, justifyContent: 'space-between' }}>
                    <View style={{ borderWidth: 0 }}>
                      <View style={{ borderWidth: 0, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 0 }}>
                        <View style={{
                          borderWidth: 0, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e5e5e5',
                          marginTop: -14, marginBottom: 0, marginLeft: '0%', borderRadius: 4, elevation: 2, padding: 0
                        }}>
                          <Text style={styles.liveEventClock}>{'' + upcomingEvent.timeStamps.time_stringed_withZoneBR.substring(0, 12) + ''}</Text>
                          {props.showTimeToKO ? <Text style={[styles.liveEventClock, { fontSize: 10, paddingHorizontal: 2 }]}>{'   ' + 'Time to KO:'}</Text> : <View></View>}
                          {props.showTimeToKO ? <Text style={[styles.liveEventClock, { color: '#444' }]}>{'' + '' + upcomingEvent.timeStamps.timeUntilKickOff_stringed + ''}</Text> : <View></View>}
                        </View>
                        <View style={{ borderWidth: 0, marginTop: 1, padding: 1 }}>
                          <Text style={styles.liveEventLeague}>{emojiFlagsLib.getFlags(upcomingEvent.league.cc)} {upcomingEvent.league.name}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ borderWidth: 0, height: 62, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={styles.upcomingEventNameRow}>
                        <Text style={[styles.liveEventName, { width: '45%', textAlign: 'center', fontSize: (upcomingEvent.home.name.length > 15) ? 12 : 13 }]}>
                          {'' + ((upcomingEvent.points && upcomingEvent.points.redcards_home) ? "🟥".repeat(Number(upcomingEvent.points.redcards_home)) : '') + ' '}
                          {'' + upcomingEvent.home.name + ''}
                        </Text>
                        <Text style={[styles.liveEventScore, { fontSize: 15, paddingHorizontal: 6,  color: props.showScore ? '#000' : '#999'}]}>
                          {props.showScore && upcomingEvent.ss ? upcomingEvent.ss : 'x'}
                        </Text>
                        <Text style={[styles.liveEventName, { width: '45%', textAlign: 'center', fontSize: (upcomingEvent.away.name.length > 13) ? 12 : 13 }]}>
                          {'' + upcomingEvent.away.name + ''}
                          {' ' + ((upcomingEvent.points && upcomingEvent.points.redcards_away) ? "🟥".repeat(Number(upcomingEvent.points.redcards_away)) : '') + ''}
                        </Text>
                      </View>
                      {showProbabilities && !props.hideProbabilities ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '79%', alignSelf: 'center', marginBottom: 5, borderWidth: 0 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 0, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e9e9e9', marginBottom: 0, paddingHorizontal: 3 }}>
                            <Text style={styles.upcomingEventProbabilityText}>
                              {upcomingEvent.event_odds.odds_summary.end.home_prob > 1 ? '' + Math.floor(upcomingEvent.event_odds.odds_summary.end.home_prob) + '%' : upcomingEvent.event_odds.odds_summary.end.home_prob + '%'}
                            </Text>
                          </View>
                          <Text style={[styles.upcomingEventProbabilityText, { fontSize: 9, color: '#666' }]}>
                            Win Prob. %
                          </Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, borderRadius: 6, backgroundColor: '#e9e9e9', marginBottom: 0, paddingHorizontal: 3 }}>
                            <Text style={styles.upcomingEventProbabilityText}>
                              {upcomingEvent.event_odds.odds_summary.end.away_prob > 1 ? '' + Math.floor(upcomingEvent.event_odds.odds_summary.end.away_prob) + '%' : upcomingEvent.event_odds.odds_summary.end.away_prob + '%'}
                            </Text>
                          </View>
                        </View>
                        :
                        <View></View>
                      }
                    </View>
                  </View>
                  <View style={{ width: '10%', borderWidth: 0, justifyContent: 'center' }}>
                    <Image
                      style={[styles.eventTeamLogo, { width: 31, height: 31 }]}
                      source={{ uri: `https://assets.b365api.com/images/team/m/${upcomingEvent.away.image_id}.png` }}
                    />
                  </View>
                </Pressable>
              )}
            />
        }
      </View>
    )
  }


  const SpinningSoccerBall = () => {
    const spinValue = new Animated.Value(0);
    // First set up animation 
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome name="soccer-ball-o" size={133} color="#444"></FontAwesome>
      </Animated.View>
    )
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
        <View style={{ flexDirection: 'row', width: '23%', justifyContent: 'center', borderWidth: 0, alignItems: 'center', alignContent: 'center' }}>
          <SettingsMenuModal showProbabilities={showProbabilities} toggleSwitchShowProbabilities={toggleSwitchShowProbabilities} showBRclock={showBRclock} toggleSwitchShowBRclock={toggleSwitchShowBRclock} showTips={showTips} toggleSwitchShowTips={toggleSwitchShowTips} />
          <Pressable onPress={() => { }}>

          </Pressable>
        </View>
      </View>
      <View style={{ paddingHorizontal: 5, }}>
        <Text style={styles.title}>Welcome!<AutoReloadEvents /></Text>
        <Text style={styles.description}>Choose one event from the list below to see more details and live stats.</Text>
      </View>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderWidth: 0, marginVertical: 5 }}>
        {/* this is the refresh home screen button, removed. It is placed besides 'Welcome!' text
        <Pressable onPress={() => loadLiveEvents(true)} style={{ marginLeft: 0, borderWidth: 1, backgroundColor: 'transparent', alignSelf: 'flex-end', borderRadius: 6, elevation: 0, marginTop: 5, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end' }}>       
            <MaterialCommunityIcons name="refresh" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
            <Text style={{ fontSize: 14, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}>
            <AutoReloadEvents />
            </Text>
          </View>
        </Pressable>
      */}
        <UpcomingEventsModal />
      </View>

      {

        loading ?
          <View style={{ flex: 1, justifyContent: 'center', borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: 0.55, marginBottom: 100 }}>
            <SpinningSoccerBall />
            {/*
            <ActivityIndicator size="large" color="#777" />
            */}
          </View>
          :
          <View style={{ flex: 1, justifyContent: 'center', borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <EventsList />
          </View>
      }
    </View >
  );
}