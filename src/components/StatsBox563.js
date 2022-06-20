import React from 'react';
import { Text, View } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts' // https://github.com/JesperLekland/react-native-svg-charts#common-props

import styles from './StatsBox563_styles';

const StatsBox563 = (props) => {
    let offTargetHome_pct = (props.event.points.off_target_home ? props.event.points.off_target_home / (props.event.points.off_target_away + props.event.points.off_target_home) * 100 : 0)
    let offTargetAway_pct = (props.event.points.off_target_away ? props.event.points.off_target_away / (props.event.points.off_target_away + props.event.points.off_target_home) * 100 : 0)
    return (
        <View style={styles.statsBox563}>
            <View style={{ flexDirection: 'column', borderWidth: 0, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', borderWidth: 0, height: '40%', justifyContent: 'space-between', paddingBottom: 0 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', borderWidth: 0, width: '30%', marginTop: 9 }}>
                        <View style={{ borderWidth: 0, width: '100%', height: '30%', justifyContent: 'flex-end', alignContent: 'center', marginBottom: 2 }}>
                            <Text style={{ fontSize: 10, alignSelf: 'center', fontWeight: 'bold', color: '#41414d' }}>Attacks</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', height: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 13, width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{props.event.points.att_home}</Text>
                            <View style={{ width: 30, height: '100%', borderWidth: 0 }}>
                                {props.event.points.att_home + props.event.points.att_away > 0 ?
                                    <ProgressCircle style={{ height: 22 }}
                                        progress={props.event.points.att_away / (props.event.points.att_home + props.event.points.att_away)} cornerRadius={0}
                                        startAngle={0} backgroundColor={'#0088cc'} strokeWidth={5} progressColor={'rgb(160, 158, 158)'} />
                                    :
                                    <ProgressCircle style={{ height: 22, borderWidth: 0 }} progress={0} strokeWidth={5} />
                                }
                            </View>
                            <Text style={{ fontSize: 13, width: '25%', textAlign: 'left', fontWeight: 'bold' }}>{props.event.points.att_away}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 0, width: '36%' }}>
                        <View style={{ borderWidth: 0, width: '100%', height: '24%', justifyContent: 'flex-end', alignContent: 'center', marginBottom: 1 }}>
                            <Text style={{ fontSize: 10, alignSelf: 'center', fontWeight: 'bold', color: '#41414d' }}>Dangerous Attacks</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, height: '76%', width: '80%', justifyContent: 'center', marginBottom: 3 }}>
                            <Text style={{ width: '35%', textAlign: 'right', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 15, marginBottom: 5, borderWidth: 0 }}>
                                {props.event.points.datt_home + ' '}</Text>
                            {props.event.points.datt_home + props.event.points.datt_away > 0 ?
                                <ProgressCircle style={{ width: '30%', height: 36, borderWidth: 0, marginBottom: 10 }}
                                    progress={props.event.points.datt_away / (props.event.points.datt_home + props.event.points.datt_away)}
                                    startAngle={0} backgroundColor={'#0088cc'} strokeWidth={8} progressColor={'rgb(160, 158, 158)'}
                                    cornerRadius={0} />
                                :
                                <ProgressCircle style={{ width: '30%', height: 36, borderWidth: 0, marginBottom: 10 }} progress={0} strokeWidth={8} />
                            }
                            <Text style={{ width: '35%', textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 15, marginBottom: 5, borderWidth: 0 }}>
                                {' ' + props.event.points.datt_away}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', borderWidth: 0, width: '30%', marginTop: 9 }}>
                        <View style={{ borderWidth: 0, width: '100%', height: '30%', justifyContent: 'flex-end', alignContent: 'center', marginBottom: 2 }}>
                            <Text style={{ fontSize: 10, alignSelf: 'center', fontWeight: 'bold', color: '#41414d' }}>Possession %</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', height: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 13, width: '25%', textAlign: 'right', fontWeight: 'bold' }}>{props.event.points.possession_home}</Text>
                            <View style={{ width: 30, height: '100%', borderWidth: 0 }}>
                                {props.event.points.att_home + props.event.points.att_away > 0 ?
                                    <ProgressCircle style={{ height: 22 }}
                                        progress={props.event.points.possession_away / 100} cornerRadius={0}
                                        startAngle={0} backgroundColor={'#0088cc'} strokeWidth={5} progressColor={'rgb(160, 158, 158)'} />
                                    :
                                    <ProgressCircle style={{ height: 22, borderWidth: 0 }} progress={0} strokeWidth={5} />
                                }
                            </View>
                            <Text style={{ fontSize: 13, width: '25%', textAlign: 'left', fontWeight: 'bold' }}>{props.event.points.possession_away}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', borderWidth: 0, height: '60%', marginBottom: 0 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', borderWidth: 0, width: '28%', marginTop: 18 }}>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center', marginBottom: 3 }}>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>🟨</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>🟥</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>⛳️</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 15 }}>🌟</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.yellowcards_home}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.redcards_home}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.corners_home}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 13 }}>{'0'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderWidth: 0, width: '44%', borderColor: 'blue' }}>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', height: 15, justifyContent: 'center', marginBottom: 1, marginTop: 5 }}>
                            <Text style={{ width: '40%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#41414d', textAlignVertical: 'center' }}>On Target 🎯</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', width: '100%' }}>
                            <Text style={{ width: '16%', textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>{props.event.points.on_target_home}</Text>
                            <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'center', paddingTop: 4 }}>
                                {props.event.points.on_target_home + props.event.points.on_target_away > 0 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#0088cc', height: 8, backgroundColor: '#0088cc', // #0088cc azul padrao dos botoes
                                            width: (props.event.points.on_target_home ? props.event.points.on_target_home / (props.event.points.on_target_home + props.event.points.on_target_away) * 100 : 0) + '%'
                                        }}></View>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#ff9900', height: 8, backgroundColor: 'rgb(160, 158, 158)', // #ff9900 = laranja do fogo #b30000 = vermelho do pace slider thumb
                                            width: (props.event.points.on_target_away ? props.event.points.on_target_away / (props.event.points.on_target_home + props.event.points.on_target_away) * 100 : 0) + '%'
                                        }}></View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#EEE', height: 8, backgroundColor: '#EEE', // #0088cc azul padrao dos botoes
                                            width: 100 + '%'
                                        }}></View>
                                    </View>
                                }
                            </View>
                            <Text style={{ width: '16%', textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>{props.event.points.on_target_away}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', height: 15, justifyContent: 'center', marginBottom: 1, marginTop: 1 }}>
                            <Text style={{ width: '40%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: '#41414d' }}>Off Target 👟</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ width: '16%', textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>{props.event.points.off_target_home}</Text>
                            <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'center', paddingTop: 3 }}>
                                {props.event.points.off_target_home + props.event.points.off_target_away > 0 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#0088cc', height: 8, backgroundColor: '#0088cc', // #0088cc azul padrao dos botoes
                                            width: offTargetHome_pct + '%'
                                        }}></View>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#ff9900', height: 8, backgroundColor: 'rgb(160, 158, 158)', // #ff9900 = laranja do fogo #b30000 = vermelho do pace slider thumb
                                            width: offTargetAway_pct + '%'
                                        }}></View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            borderWidth: 0, borderColor: '#EEE', height: 8, backgroundColor: '#EEE', // #0088cc azul padrao dos botoes
                                            width: 100 + '%'
                                        }}></View>
                                    </View>
                                }
                            </View>
                            <Text style={{ width: '16%', textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>{props.event.points.off_target_away}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', borderWidth: 0, width: '28%', marginTop: 18 }}>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center', marginBottom: 3 }}>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 15 }}>🌟</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>⛳️</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>🟥</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>🟨</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 13 }}>{'0'}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.corners_away}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.redcards_away}</Text>
                            <Text style={{ width: '20%', textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{props.event.points.yellowcards_away}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
}

export default StatsBox563;
