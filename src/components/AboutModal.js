
import React, { useState } from 'react';
import { Text, View, Pressable, Switch, Animated, Easing, SafeAreaView, ScrollView, Image, Button, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import Modal from 'react-native-modal';

import styles from './AboutModal_styles';
import { ShadowPropTypesIOS } from 'react-native';


import * as conversorsAndParsersLib from '../services/auxiliar/conversorsAndParsers';

const AboutModal = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

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
                borderColor: 'grey', color: 'black', borderRadius: 30, justifyContent: 'center', alignItems: 'center', width: 113, height: 32, backgroundColor: (true) ? '#dadada' : '#fbf1c1'
            }}>
                <Text style={{ fontWeight: 'bold', color: '#444' }}> About    </Text>
                <Animated.View style={{ transform: [{ rotate: (isModalVisible) ? spinClockWise : spinAntiClockWise }] }}>
                    <FontAwesome name="info" size={24} color="#656565"></FontAwesome>
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
                        <View style={styles.AboutModalView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width: '100%', marginTop:8}}>
                                <Text style={{ color: '#FCFCFC' }}></Text>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 16, borderWidth: 0, borderRadius: 6 }]}>
                                    TremdGol App
                                </Text>
                                <Pressable onPress={() => { toggleModal() }} style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 13, borderWidth: 0 }}>
                                    <FontAwesome name="close" size={25} color="#777"></FontAwesome>
                                </Pressable>
                            </View>
                            
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 0, borderWidth: 0, height: 350, borderRadius: 0, width: '100%' }}>
                                <SafeAreaView style={styles.container}>
                                    <ScrollView style={styles.scrollView}>
                                        {/*
                                            <Text style={styles.text}>
                                        {JSON.stringify(props.event.bsfEventsHistory.h2h)} 
                                        </Text>
                                        
                                        */}
                                        <View style={[{ fontSize: 12, width: '100%', borderWidth: 0, alignItems: 'center', alignSelf: 'center', marginBottom: 13 }]}>
                                            <View>
                                                <Text style={[{ fontWeight: 'bold', textAlign: 'left', color: '#737380', fontSize: 16, borderWidth: 0, borderRadius: 6 }]}>
                                                    ⚽ Forever free{'\n'}
                                                    ⚽ Live soccer matches stats{'\n'}
                                                    ⚽ The main leagues of the world{'\n'}
                                                    ⚽ Recent last matches history{'\n'}
                                                    {'\n'}Coming up soon...{'\n'}
                                                    ⚽ More soccer predictions{'\n\n'}
                                                    Keep your app up to date to see new features.{'\n\n'}
                                                    Join the Telegram channel for more:{'\n'}@tremdgol_tips{'\n\n'}
                                                    Try the web version: tremdgol.com
                                                </Text>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', borderWidth:0, paddingTop:13}}>
                                <Pressable onPress={() => Linking.openURL('https://t.me/tremdgol_tips')} style={{
                                    borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end',
                                    borderRadius: 6, elevation: 5, flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                        <FontAwesome name="telegram" size={23} style={{ marginTop: 4, marginHorizontal: 6 }} color="#737380" />
                                        <Text style={{ fontSize: 15, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingLeft: 0, paddingRight: 5, alignSelf: 'flex-end' }}>@tremdgol_tips</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => Linking.openURL('https://tremdgol.com')} style={{
                                    borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end',
                                    borderRadius: 6, elevation: 5, flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                        <Text style={{ fontSize: 15, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingHorizontal:5, alignSelf: 'flex-end' }}>tremdgol.com</Text>
                                    </View>
                                </Pressable>
                                {/*
                                <Pressable onPress={() => toggleModal()} style={{
                                    marginLeft: 13, borderWidth: 0, backgroundColor: '#fff', alignSelf: 'flex-end',
                                    borderRadius: 6, elevation: 5, marginHorizontal: 16, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', marginBottom: 5 }}>
                                        <MaterialCommunityIcons name="close-thick" size={23} style={{ marginTop: 4, marginHorizontal: 4 }} color="#737380" />
                                        <Text style={{ fontSize: 16, lineHeight: 24, color: '#737380', fontWeight: 'bold', paddingRight: 10, alignSelf: 'flex-end' }}>Close</Text>
                                    </View>
                                </Pressable>
                                */}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default AboutModal;


