// STACKOVERFLOW https://stackoverflow.com/questions/55339044/how-to-have-a-heart-beat-animation-with-react-native
import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


export default function App() {
    const anim = useRef(new Animated.Value(1));

    useEffect(() => {
        // makes the sequence loop
        Animated.loop(
            // runs given animations in a sequence
            Animated.sequence([
                // increase size
                Animated.timing(anim.current, {
                    toValue: 1.36,
                    duration: 1000,
                    useNativeDriver: true // Add This line
                }),
                // decrease size
                Animated.timing(anim.current, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true // Add This line
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                transform: [{ scale: anim.current }], margin: 5,
                borderWidth: 1, borderColor: '#ccc', padding: 1, elevation: 10,
                backgroundColor: '#dd1111', borderRadius: 10, height: 10, width: 10
            }}>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        //flexBasis: 30,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#fff',
        padding: 0,
        borderWidth: 0,
        marginLeft: 5
    },
});