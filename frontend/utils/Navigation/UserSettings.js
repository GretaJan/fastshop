import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../src/styles/Colors';
//components
import Settings from '../components/authComponents/settings';
import Calendar from '../components/authComponents/settings/calendar/Calendar';
import DayLists from '../components/authComponents/settings/calendar/DayLists';
import BuyList from '../components/authComponents/settings/calendar/BuyList';

const SettingsNav = createStackNavigator();

export const SettingsScreen = () => (
    <SettingsNav.Navigator>
        <SettingsNav.Screen 
            name="SettingsScreen" 
            component={ Settings }
            options={{
                headerShown: false
            }}
        />
      <SettingsNav.Screen 
            name="Calendar" 
            component={ Calendar }
            options={{
                headerShown: false
            }}
        />
        <SettingsNav.Screen
            name="DayPage" 
            component={ DayLists }
            options={({ route }) => ({
                title: `${ route.params.years }-${ route.params.day }`,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainGrey,
                },
                headerTitleAlign: 'center',
                headerShown: false
            })}
        />
        <SettingsNav.Screen
            name="BuyList" 
            component={ BuyList }
            options={({ route }) => ({
                title: route.params.name,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainGrey,
                },
                headerTitleAlign: 'center',
                headerShown: false
            })}
        />
    </SettingsNav.Navigator>
)

function Header(){

    return (
        <View   style={{ width: 50, height: 50, backgroundColor: 'green' }}>
            <Text>Title</Text>
        </View>
    )
}