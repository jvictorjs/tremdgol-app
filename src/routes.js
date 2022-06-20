import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import LiveEvents from './pages/LiveEvents';
import LiveEvent from './pages/LiveEvent';
import UpcomingEvent from './pages/UpcomingEvent';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="LiveEvents" component={LiveEvents} />
                <AppStack.Screen name="LiveEvent" component={LiveEvent} />
                <AppStack.Screen name="UpcomingEvent" component={UpcomingEvent} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}