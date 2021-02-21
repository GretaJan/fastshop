import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../styles/Colors';
//components
import Settings from '../../componentsAuth/settings';
import Calendar from '../../componentsAuth/settings/calendar/Calendar';

const SettingsNav = createStackNavigator();

export const SettingsScreen = () => (
    <SettingsNav.Navigator>
        <SettingsNav.Screen 
            name="SettingsScreen" 
            component={ Settings }
            options={{
                title: "Settings",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainGrey,
                },
                headerTitleAlign: 'center',
            }}
        />
        <SettingsNav.Screen 
            name="Calendar" 
            component={ Calendar }
            options={{
                title: "Calendar",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainGrey,
                },
                headerTitleAlign: 'center',
            }}
        />
    </SettingsNav.Navigator>
)