import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../styles/Colors';
//components
import Settings from '../../componentsAuth/settings';
import Calendar from '../../componentsAuth/settings/calendar/Calendar';
import DayLists from '../../componentsAuth/settings/calendar/DayLists';
import BuyList from '../../componentsAuth/settings/calendar/BuyList';

const SettingsNav = createStackNavigator();

export const SettingsScreen = () => (
    <SettingsNav.Navigator>
        <SettingsNav.Screen 
            name="SettingsScreen" 
            component={ Settings }
            options={{
                title: "Settings",
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                //     color: colors.titleBlack,
                // },
                // headerStyle: {
                //     backgroundColor: colors.mainGrey,
                // },
                // headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colors.mainBtnGreen,
                    height: 100,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        />
      <SettingsNav.Screen 
            name="Calendar" 
            component={ Calendar }
            options={{
                // title: "Calendar",
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                //     color: colors.titleBlack,
                // },
                // headerStyle: {
                //     backgroundColor: colors.mainGrey,
                // },
                // headerTitleAlign: 'center',
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // }
                // navigationOptions: {
                //     tabBarLabel: 'Reclaim',
                //     header: <Header/>,
                //   },
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