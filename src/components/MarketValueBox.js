import React , {useState} from 'react';
import { Text, View, Pressable } from 'react-native';

import styles from './MarketValueBox_styles';

const MarketValueBox = (props) => {
    const [collapsedView, setCollapsedView] = useState(true);
    const toggleCollapsedView = () => {
        setCollapsedView(previousState => !previousState);
        console.log('collapsedView changed to = ', !collapsedView)
    };

    let heightFactor = 1;
    if (props.event.tm_stats.club_members) heightFactor++;
    if (props.event.tm_stats.avg_market_value) heightFactor++;
    let height = (heightFactor === 1) ? 35 : (heightFactor === 2) ? 66 : 87;
    height = (collapsedView) ? 47 : height;
    let totalMarketValueSum = (props.event.tm_stats && props.event.tm_stats.total_market_value) ? props.event.tm_stats.total_market_value[0] + props.event.tm_stats.total_market_value[1] : 0;
    return (
        <View>
            {props.event.tm_stats
                && (props.event.tm_stats.total_market_value || props.event.tm_stats.club_members || props.event.tm_stats.avg_market_value)
                && totalMarketValueSum > 0
                ?
                <Pressable onPress={() => { toggleCollapsedView()}}>
                    <View style={[styles.marketValueBox, { flexBasis: height }]}>
                        <View style={{ flexDirection: 'column', borderWidth: 0, height: '100%', justifyContent: 'space-around', alignItems: 'center', paddingTop: 0 }}>
                            <View style={{ flexDirection: 'column', borderWidth: 0, marginBottom: 2, alignItems: 'center' }}>
                                {/* TOTAL CLUB VALUES */}
                                {props.event.tm_stats && props.event.tm_stats.total_market_value ?
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', borderWidth: 0, width: '90%', borderColor: 'blue' }}>
                                        <View style={{ flexDirection: 'row', borderWidth: 0, height: 16, justifyContent: 'center', marginBottom: 0, marginTop: 0, paddingTop:2 }}>
                                            <Text style={{ paddingHorizontal: 10, textAlign: 'center', fontSize: 11, fontWeight: 'bold', color: '#555', textAlignVertical: 'center', marginBottom: -2, }}>Team market value</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center' }}>
                                            <Text style={{ paddingHorizontal: 10, textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>
                                                {props.event.tm_stats && props.event.tm_stats.total_market_value && props.event.tm_stats.total_market_value[0] / 1000000 + 'M €'}
                                            </Text>
                                            <View style={{ flexDirection: 'row', width: '55%', justifyContent: 'center', paddingTop: 7 }}>
                                                <View style={{
                                                    borderWidth: 0, borderColor: '#0088cc', height: 9, backgroundColor: '#0088cc', // #0088cc azul padrao dos botoes
                                                    width: props.event.tm_stats.total_market_value[0] / (props.event.tm_stats.total_market_value[1] + props.event.tm_stats.total_market_value[0]) * 100 + '%'
                                                }}></View>
                                                <View style={{
                                                    borderWidth: 0, borderColor: '#ff9900', height: 9, backgroundColor: 'rgb(160, 158, 158)', // #ff9900 = laranja do fogo #b30000 = vermelho do pace slider thumb
                                                    width: props.event.tm_stats.total_market_value[1] / (props.event.tm_stats.total_market_value[1] + props.event.tm_stats.total_market_value[0]) * 100 + '%'
                                                }}></View>
                                            </View>
                                            <Text style={{ paddingHorizontal: 10, textAlign: 'center', textAlignVertical: 'top', fontSize: 13, fontWeight: 'bold' }}>
                                                {props.event.tm_stats && props.event.tm_stats.total_market_value && props.event.tm_stats.total_market_value[1] / 1000000 + 'M €'}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View></View>
                                }
                                {/* AVG PLAYER VALUES */}
                                {props.event.tm_stats && props.event.tm_stats.avg_market_value && !collapsedView ?
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                                        <Text style={{ width: '25%', paddingHorizontal: 5, textAlign: 'right', fontSize: 12, fontWeight: 'bold', borderWidth: 0 }}>
                                            {props.event.tm_stats && props.event.tm_stats.avg_market_value && props.event.tm_stats.avg_market_value[0] / 1000000 + 'M €'}
                                        </Text>
                                        <Text style={{ width: 133, paddingHorizontal: 10, textAlign: 'center', fontSize: 11, fontWeight: 'bold', color: '#555', marginBottom: 0, borderWidth: 0 }}>
                                            AVG player value
                                        </Text>
                                        <Text style={{ width: '25%', paddingHorizontal: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', borderWidth: 0 }}>
                                            {props.event.tm_stats && props.event.tm_stats.avg_market_value && props.event.tm_stats.avg_market_value[1] / 1000000 + 'M €'}
                                        </Text>
                                    </View>
                                    :
                                    <View></View>
                                }
                                {/* TOTAL CLUB MEMBERS */}
                                {props.event.tm_stats && props.event.tm_stats.club_members && !collapsedView ?
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ width: '25%', paddingHorizontal: 5, textAlign: 'right', fontSize: 12, fontWeight: 'bold', borderWidth: 0 }}>
                                            {props.event.tm_stats.club_members[0] + ''}
                                        </Text>
                                        <Text style={{ width: 133, paddingHorizontal: 10, textAlign: 'center', fontSize: 11, fontWeight: 'bold', color: '#555', marginBottom: 0, borderWidth: 0 }}>
                                            Club members
                                        </Text>
                                        <Text style={{ width: '25%', paddingHorizontal: 5, textAlign: 'left', fontSize: 12, fontWeight: 'bold', borderWidth: 0 }}>
                                            {props.event.tm_stats.club_members[1] + ''}
                                        </Text>
                                    </View>
                                    :
                                    <View></View>
                                }
                            </View>
                        </View>
                    </View >
                </Pressable>
                :
                <View style={styles.marketValueBoxMini}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: "#888" }}>No team values for this event</Text>
                </View>
            }
        </View>
    );
}

export default MarketValueBox;
