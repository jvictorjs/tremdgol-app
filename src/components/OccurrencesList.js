import React from 'react';
import { Text, View, FlatList, Image, Pressable } from 'react-native';

import styles from './OccurrencesList_styles';

function EmptyOccurrencesList() {
    return (
        <View>
            <Pressable style={styles.flatList} onPress={() => console.log('toggleShowGoalMinutesFlatList()')}>
                <Text style={{ color: "#AAA", textAlign: 'center', marginHorizontal: 1, fontWeight: 'bold', marginTop: 33 }} >
                    Match occurrences will be shown here.</Text>
            </Pressable>
        </View>
    )
}


const OccurrencesList = (props) => {
    return (
        <FlatList
            data={props.event.eventsToShow}
            style={styles.flatList}
            keyExtractor={occurrence => String(occurrence.id)}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ borderRadius: 12, overflow: 'hidden' }}
            refreshing={props.loading}
            onRefresh={() => props.loadLiveEvents()}
            ListEmptyComponent={<EmptyOccurrencesList />}
            renderItem={({ item: occurrencee }) => (
                <View style={styles.flatListItem}>
                    <Text style={styles.flatListStatsMinsItemMinute} >
                        {occurrencee.minuteToShow}
                    </Text>

                    <View style={styles.flatListStatsMinsMainItem}>

                        {occurrencee.homeOrAway === 'H' ?
                            <View style={styles.flatListItemDetailsHome}>
                                <View style={{ width: '43%', borderWidth: 0, justifyContent: 'space-between' }}>
                                    <View style={styles.flatListItemStatsMinsDetailsTextHome}>
                                        <Text style={{ fontSize: 13, textAlignVertical: 'center', paddingHorizontal: 4 }}>
                                            {occurrencee.symbolToShow}
                                        </Text>
                                        <Text style={styles.flatListStatsMinsItemText} >
                                            {occurrencee.text}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.flatListTeamLogoSize}>
                                    <Image source={props.homeImgUri} style={{ height: 23, width: 23 }} />
                                </View>
                                <View style={{ color: '#FFF', borderWidth: 0, width: '43%' }}></View>
                            </View>
                            :
                            occurrencee.homeOrAway === 'A' ?
                                <View style={styles.flatListItemDetailsAway}>
                                    <View style={{ color: '#FFF', borderWidth: 0, width: '43%' }}></View>
                                    <View style={styles.flatListTeamLogoSize}>
                                        <Image source={props.awayImgUri} style={{ height: 23, width: 23 }} />
                                    </View>
                                    <View style={{ width: '43%', borderWidth: 0, justifyContent: 'space-between' }}>
                                        <View style={styles.flatListItemStatsMinsDetailsTextAway}>
                                            <Text style={styles.flatListStatsMinsItemText} >
                                                {occurrencee.text}
                                            </Text>
                                            <Text style={{ fontSize: 13, textAlignVertical: 'center', paddingHorizontal: 4 }}>
                                                {occurrencee.symbolToShow}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ backgroundColor: '#FFF', borderRadius: 7, borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777', alignSelf: 'center', textAlign: 'center' }}>
                                        {occurrencee.symbolToShow + ' '}
                                    </Text>
                                </View> // nao é HOME nem AWAY, informação do jogo (HT, FT etc...)
                        }

                    </View>
                </View >
            )
            }
        />
    );
}


export default OccurrencesList;