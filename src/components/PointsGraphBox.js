import React, { useState } from 'react';
import { Text, View, Image, Pressable, RefreshControl, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons, Entypo, } from '@expo/vector-icons';

import { BarChart, Grid, AreaChart } from 'react-native-svg-charts' // https://github.com/JesperLekland/react-native-svg-charts#common-props
import { curveNatural } from 'd3-shape'

import styles from './PointsGraphBox_styles';

function MinutesList(props) {
    var key = 0;
    return (
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', borderWidth: 0, width: '101%', alignSelf: 'center' }}>
            {props.event.pointsSlices.minutes_array.map((minute) => (
                <Text key={minute + key++} style={{ fontSize: 8, color: "#888888", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{minute}</Text>
            ))}
        </View>
    );
}

function MinutesToShowList(props) {
    var key = 0;
    return (
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', borderWidth: 0, width: '101%', alignSelf: 'center' }}>
            {props.event.pointsSlices.minutesToShow_array.map((minuteToShow) => (
                <Text key={minuteToShow + key++} style={{ fontSize: 8, color: "#888888", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0 }} >{minuteToShow}</Text>
            ))}
        </View>
    );
}

function MinutesOfHomeGoalsToShowList(props) {
    var key = 0;
    let minutesOfHomeRedCardsAndGoalsToShow_array_toUse =
        (props.event.pointsSlices.minutesOfHomeRedCardsAndGoalsToShow_array)
            ? props.event.pointsSlices.minutesOfHomeRedCardsAndGoalsToShow_array
            : props.event.pointsSlices.minutesOfHomeGoalsToShow_array;
    return (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderWidth: 0, width: '99%', alignSelf: 'center' }}>
            {minutesOfHomeRedCardsAndGoalsToShow_array_toUse.map((minuteOfGoalsToShow) => (
                <Text key={'minuteOfGoalsToShow_Key_' + key++} style={{ fontSize: 8, color: "#888888", textAlign: 'center', flexWrap: 'wrap', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, width: '5%', width: '8%' }} >{minuteOfGoalsToShow}</Text>
            ))}
        </View>
    );
}

function MinutesOfAwayGoalsToShowList(props) {
    var key = 0;
    let minutesOfAwayRedCardsAndGoalsToShow_array_toUse =
        (props.event.pointsSlices.minutesOfAwayRedCardsAndGoalsToShow_array)
            ? props.event.pointsSlices.minutesOfAwayRedCardsAndGoalsToShow_array
            : props.event.pointsSlices.minutesOfAwayGoalsToShow_array;
    return (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderWidth: 0, width: '99%', alignSelf: 'center' }}>
            {minutesOfAwayRedCardsAndGoalsToShow_array_toUse.map((minuteOfGoalsToShow) => (
                <Text key={'minuteOfGoalsToShow_Key_' + key++} style={{ fontSize: 8, flexWrap: 'wrap', color: "#888888", textAlign: 'center', marginHorizontal: 0, fontWeight: 'bold', borderWidth: 0, width: '8%' }} >{minuteOfGoalsToShow}</Text>
            ))}
        </View>
    );
}

const PointsGraphBox = (props) => {
    const [attackGraphAreaChartActive, setAttackGraphAreaChartActive] = useState(false);
    const toggleAttackGraphAreaChartActive = () => {
        setAttackGraphAreaChartActive(previousState => !previousState);
        console.log('attackGraphAreaChartActive changed to = ', !attackGraphAreaChartActive)
    };

    const [collapsedView, setCollapsedView] = useState(false);
    const toggleCollapsedView = () => {
        setCollapsedView(previousState => !previousState);
        console.log('collapsedView changed to = ', !collapsedView)
    };

    props.applyDataAdjustmentToShow();

    let minuteToUse = (!props.event.timer) ? 0 :(Number(props.event.timer.tm) > 90) ? 90 : Number(props.event.timer.tm);
    let minuteMod = minuteToUse % 5;
    minuteToUse = (Math.floor((minuteToUse) / 5) * 5.87)
    console.log('minuteToUse = ' + minuteToUse)
    minuteToUse = (minuteToUse <= 0) ? 3 : minuteToUse + 0;
    // zero é 3%, 17 percentis, cada percentil = 5.7%
    // 
    let barWidth = (minuteToUse / 100) * 95;
    if (!props.event.timer || (props.event.timer.tm === 0 && props.event.timer.ts === 0)) {
        barWidth = 0
    } else if (minuteToUse < 25){
        barWidth += 2
    } else if (minuteToUse < 50){
        barWidth += 1
    }
    let barWidthGrey = 95 - barWidth;
    return (
        <View>
            {collapsedView ?
                <View style={styles.pointsGraphContainer_mini}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                        <View style={{ flexDirection: 'column', borderWidth: 0, width: '10%', justifyContent: 'flex-start', alignContent: 'center', height: '100%' }}>
                            <Text style={{
                                color: "#888888", textAlign: 'center', marginHorizontal: 1, marginVertical: 0, fontWeight: 'bold',
                                borderWidth: 0, marginTop: 22, height: 20, fontSize: 13
                            }} >
                                {props.event.pointsSlices.points_per_min !== 'NaN' && props.event.pointsSlices.points_per_min !== 'Infinity' && props.event.pointsSlices.points_per_min}
                            </Text>
                            <View style={{
                                color: "#888888", textAlign: 'center', marginHorizontal: 1, marginTop: 0, fontWeight: 'bold', borderWidth: 1.5,
                                borderColor: props.event.pointsSlices.points_per_min_color, fontSize: 0, width: '57%', alignSelf: 'center', marginTop: -2
                            }} >
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'column', borderWidth: 0, marginBottom: 5, width: '80%' }}>
                            <MinutesOfHomeGoalsToShowList event={props.event} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom:0 }}>
                                <View style={{
                                    color: "#888888", textAlign: 'center', marginHorizontal: 0, marginTop: 1, marginBottom: 0, fontWeight: 'bold', borderWidth: 0,
                                    backgroundColor: "green", fontSize: 0, alignSelf: 'center', height: 5,
                                    width: (barWidth + '%')
                                }} >
                                </View>
                                <View style={{
                                    color: "#888888", textAlign: 'center', marginHorizontal: 0, marginTop: 1, marginBottom: 0, fontWeight: 'bold', borderWidth: 0,
                                    backgroundColor: "lightgrey", fontSize: 0, alignSelf: 'center', height: 5,
                                    width: barWidthGrey + '%'
                                }} >
                                </View>
                            </View>
                            <MinutesOfAwayGoalsToShowList event={props.event} />
                            <MinutesList event={props.event} />
                            <MinutesToShowList event={props.event} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', borderWidth: 0, height: '80%', width: '10%' }}>
                            <Pressable style={[styles.actionZAP, { width: '73%', height: '40%', borderWidth: 0, alignItems: 'center', marginBottom: 11 }]} onPress={() => {
                                toggleCollapsedView()
                            }}>
                                <MaterialCommunityIcons name="arrow-expand-vertical" size={27} color="#999" />
                            </Pressable>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.pointsGraphContainer}>
                    <ScrollView
                        style={[styles.pointsGraphScrollView, { borderWidth: 0 }]}
                        refreshControl={<RefreshControl
                            size='large'
                            // progressBackgroundColor='#2196F3'
                            colors={['#2196F3', '#E82041']}
                            progressViewOffset={24}
                            refreshing={props.loading}
                            onRefresh={() => {
                                props.loadLiveEvents()
                                // getBSF_event_odds_summary()
                            }}
                        />}
                    // contentContainerStyle={styles.actionOpportunities}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', height: 142 }}>
                            <View style={{ flexDirection: 'column', borderWidth: 0, width: '10%', justifyContent: 'flex-start', alignContent: 'center', height: '100%' }}>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'column', borderWidth: 0, width: '100%', marginTop: 15 }}>
                                    <Pressable style={{ height: 85, justifyContent: 'space-around', borderWidth: 0 }} onPress={() => {

                                    }}>
                                        <View style={[styles.teamNameAndLogoBox, { borderWidth: 0 }]}>
                                            <Image
                                                source={props.homeImgUri}
                                                style={styles.teamLogoSize}
                                            />
                                        </View>
                                        <View style={[styles.teamNameAndLogoBox, { borderWidth: 0 }]}>
                                            <Image
                                                source={props.awayImgUri}
                                                style={styles.teamLogoSize}
                                            />
                                        </View>
                                    </Pressable>
                                </View>
                                <Text style={{ color: "#888888", textAlign: 'center', marginHorizontal: 1, marginVertical: 0, fontWeight: 'bold', borderWidth: 0, marginTop: 10, height: 20, fontSize: 12 }} >
                                    {props.event.pointsSlices.points_per_min !== 'NaN' && props.event.pointsSlices.points_per_min !== 'Infinity' && props.event.pointsSlices.points_per_min}
                                </Text>
                                <View style={{
                                    color: "#888888", textAlign: 'center', marginHorizontal: 1, marginTop: 0, fontWeight: 'bold', borderWidth: 1.5,
                                    borderColor: props.event.pointsSlices.points_per_min_color, fontSize: 0, width: '57%', alignSelf: 'center', marginTop: -2
                                }} >
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', flexDirection: 'column', borderWidth: 0, width: '80%' }}>
                                <MinutesOfHomeGoalsToShowList event={props.event} />
                                {attackGraphAreaChartActive ?
                                    <View>
                                        <AreaChart // BarChart, LineChart... o melhor é o AreaChart até agora....
                                            // https://github.com/JesperLekland/react-native-svg-charts#common-props
                                            // style={{ height: 200, width: 200,marginHorizontal: -10 }} //  XAxis
                                            style={{ height: 82, width: '100%', bordercolor: "black", borderRadius: 7, borderWidth: 0, backgroundColor: "#FFF" }}
                                            data={props.event.pointsSlices.powerIndex_array}
                                            contentInset={{ top: 5, bottom: 5, left: 2, right: 2 }}
                                            //  formatLabel={(value,index) => index} // XAxis
                                            // svg={{ fill: 'black', fontSize: 10 }} // XAxis
                                            svg={{ fill: '#2196F3', fillOpacity: 0.89 }}
                                            max={30}
                                            yMin={-8.5}
                                            yMax={8.5}
                                            animate={true}
                                            curve={curveNatural} //curveNatural
                                            animationDuration={2000}
                                            // showGrid={true}
                                            // gridProps={}
                                            numberOfTicks={15}
                                        // gridMax={5}
                                        // gridMin={5}
                                        >
                                        </AreaChart>
                                    </View>
                                    :
                                    <View>

                                        <BarChart
                                            // https://github.com/JesperLekland/react-native-svg-charts#common-props
                                            style={{ height: 40, width: '100%', bordercolor: "black", borderRadius: 4, borderWidth: 0, backgroundColor: "#fff", marginTop: 2 }}
                                            data={props.event.pointsSlices.home_slice_points_array_zeroFilled}
                                            contentInset={{ top: 5, bottom: 1, left: 2, right: 2 }}
                                            svg={{ fill: '#2196F3', fillOpacity: 0.97 }}
                                            // max={30}
                                            yMin={0}
                                            yMax={3}
                                            animate={true}
                                            animationDuration={2000}
                                        >
                                        </BarChart>
                                        <BarChart
                                            // https://github.com/JesperLekland/react-native-svg-charts#common-props
                                            style={{ height: 40, width: '100%', bordercolor: "black", borderRadius: 4, borderWidth: 0, backgroundColor: "#fff" }}
                                            data={props.event.pointsSlices.away_slice_points_array_reverse_zeroFilled}
                                            contentInset={{ top: 0, bottom: 5, left: 2, right: 2 }}
                                            svg={{ fill: 'rgb(160, 158, 158)', fillOpacity: 0.97 }}
                                            // max={30}
                                            yMin={-3}
                                            yMax={0}
                                            animate={true}
                                            animationDuration={2000}
                                        >
                                        </BarChart>
                                    </View>
                                }
                                <MinutesOfAwayGoalsToShowList event={props.event} />
                                <MinutesList event={props.event} />
                                <MinutesToShowList event={props.event} />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', borderWidth: 0, height: '80%', width: '10%' }}>
                                <Pressable style={[styles.actionZAP, { width: '73%', height: '40%', borderWidth: 0, alignItems: 'center' }]} onPress={() => {
                                    toggleCollapsedView()
                                }}>
                                    <MaterialCommunityIcons name="arrow-collapse-vertical" size={27} color="#999" />
                                </Pressable>
                                <Pressable style={[styles.actionZAP, { width: '73%', height: '20%', borderWidth: 0, alignItems: 'center' }]} onPress={() => {
                                    // toggleShowAttackGraphBox()
                                    toggleAttackGraphAreaChartActive()
                                }}>
                                    <Entypo name={attackGraphAreaChartActive ? 'bar-graph' : 'area-graph'} size={23} color="#999" />
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </View >
    );
}

export default PointsGraphBox;