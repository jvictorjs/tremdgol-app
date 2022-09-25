import React, { useState } from 'react';
import { Text, View, Pressable, Switch, Animated, Easing, Alert } from 'react-native';
import { Ionicons, FontAwesome, } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import Modal from 'react-native-modal';

import styles from './SettingsMenuModal_styles';

import AboutModal from './AboutModal';

const SettingsMenuModal = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const spinValue = new Animated.Value(0);

    const toggleModal = () => {
        runAnimation();
        setTimeout(function () { //Start the timer
            setModalVisible(!isModalVisible) //After 1 second, set render to true
        }.bind(this), 233)
        console.log('isModalVisible = ' + !isModalVisible)
        console.log('showProbabilities = ' + !props.showProbabilities)
        console.log('showBRclock = ' + !props.showBRclock)
        console.log('showTips = ' + !props.showTips)
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
        outputRange: ['135deg', '0deg']
    })

    const spinClockWise = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg']
    })

    const createTwoButtonAlert = () =>
        Alert.alert(
            "TremdGol Free",
            `\n⚽ Forever free\n⚽ Live soccer matches stats\n⚽ The main leagues of the world\n\n\nComing up soon...\n⚽ Live soccer betting market opportunities (tips)\n⚽ More events data: recent history and stats\n\n\nKeep your app up to date to see new features\n\n\nJoin the Telegram channel for more:\n`
      +`@tremdgol_tips`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );


    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => { toggleModal() }} style={{ borderWidth: 0, borderColor: 'grey', color: 'black', borderRadius: 30, justifyContent: 'center', alignItems: 'center', width: 33, height: 33, backgroundColor: '#CCC' }}>
                <Animated.View style={{ transform: [{ rotate: (isModalVisible) ? spinClockWise : spinAntiClockWise }] }}>
                    <Ionicons name="settings-sharp" size={24} color="#656565"></Ionicons>
                </Animated.View>
            </Pressable>

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
                hasBackdrop={true}
                backdropColor={"black"}
                backdropOpacity={0.55}
                onBackdropPress={() => { toggleModal() }}
                // hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.settingsMenuModalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width: '100%' }}>
                            <Text style={{ color: '#FCFCFC' }}>aqui</Text>
                            <Text style={[{ fontWeight: 'bold', textAlign: 'center', color: '#737380', fontSize: 18, borderWidth: 0, borderRadius: 6 }]}>
                                Settings
                            </Text>
                            <Pressable onPress={() => { toggleModal() }} style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 13, borderWidth: 0 }}>
                                <FontAwesome name="close" size={28} color="#777"></FontAwesome>
                            </Pressable>
                        </View>
                        {/* 
                        <Divider width={2} style={{ color: '#666', backgroundColorcolor: '#666', borderColor: '#666', borderWidth: 0, width: '100%', marginBottom: 7, height: 2 }} />
                        */}
                        <View style={{backgroundColor:'white', elevation:15, width:'100%', paddingLeft:30,paddingRight:10, paddingBottom:3, borderWidth:0 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, borderWidth: 0 }}>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'left', color: '#737380', fontSize: 14, width: '70%', borderWidth: 0, borderRadius: 6, marginTop: 1 }]}>
                                    Win probabilities
                                </Text>
                                <View style={[{ fontSize: 12, width: '25%', borderWidth: 0, alignItems: 'center' }]}>
                                    <Switch
                                        //                         style={styles.actionSwitch}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={props.showProbabilities ? "#5555DD" : "#f4f3f4"}// aPIEventsSynced
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => { props.toggleSwitchShowProbabilities() }} //toggleSwitchaPIEventsSynced
                                        value={props.showProbabilities} //aPIEventsSynced
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, borderWidth: 0 }}>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'left', color: '#737380', fontSize: 14, width: '70%', borderWidth: 0, borderRadius: 6, marginTop: 1 }]}>
                                    2 halves clock
                                </Text>
                                <View style={[{ fontSize: 12, width: '25%', borderWidth: 0, alignItems: 'center' }]}>
                                    <Switch
                                        //                         style={styles.actionSwitch}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={props.showBRclock ? "#5555DD" : "#f4f3f4"}// aPIEventsSynced
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => { props.toggleSwitchShowBRclock() }} //toggleSwitchaPIEventsSynced
                                        value={props.showBRclock} //aPIEventsSynced
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, borderWidth: 0 }}>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'left', color: '#737380', fontSize: 14, width: '70%', borderWidth: 0, borderRadius: 6, marginTop: 1 }]}>
                                    Predictions
                                </Text>
                                <View style={[{ fontSize: 12, width: '25%', borderWidth: 0, alignItems: 'center' }]}>
                                    <Switch
                                        //                         style={styles.actionSwitch}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={props.showTips ? "#5555DD" : "#f4f3f4"}// aPIEventsSynced
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => { props.toggleSwitchShowTips() }} //toggleSwitchaPIEventsSynced
                                        value={props.showTips} //aPIEventsSynced
                                    />
                                </View>
                            </View>
                        </View>
                        {/* 
                        <Divider width={2} style={{ color: '#666', backgroundColorcolor: '#666', borderColor: '#666', borderWidth: 0, width: '100%', marginBottom: 8, height: 2, marginTop: 8 }} />
                        */}
                        <View style={{marginTop:10}}>
                            <AboutModal></AboutModal>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

export default SettingsMenuModal;
