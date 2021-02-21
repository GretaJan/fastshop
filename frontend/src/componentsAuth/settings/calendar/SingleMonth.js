import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { textStyle } from '../../../components_additional/styles/GeneralStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function Month({ month, currentDay }){
    const dayNames = ['Pr', 'A', 'T', 'K', 'Pn', 'Š', 'S'];
    // console.log("moooonthg", month.days)
    return (
        <View>
            <FlatList 
                contentContainerStyle={ stylesGuest().horizontalWrap } 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ dayNames }
                renderItem={( dayName, index ) => (
                    <View style={ calendarStyles().dayWrap }>
                        <Text style={ textStyle().h2 }>{ dayName.item }</Text>
                    </View>
                ) }
            />
             <FlatList 
                contentContainerStyle={stylesGuest().horizontalWrap} 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ month.days }
                renderItem={( day ) => (
                    <View style={ (day.item.current) ?
                        calendarStyles().currentDayMarker : calendarStyles().dayWrap }>
                        <Text style={ textStyle().h4 }>{ day.item.day }</Text>
                    </View>
                )}
            /> 
            {/* <FlatList 
                contentContainerStyle={ stylesGuest().horizontalWrap } numColumns={7} 
                data={ dayNames }
                renderItem={( dayName, index ) => (
                    <View style={ calendarStyles().dayWrap }>
                        <Text style={ textStyle().h2 }>{ dayName.item }</Text>
                    </View>
                ) }
            />
            <FlatList 
                contentContainerStyle={stylesGuest().horizontalWrap} numColumns={7} 
                data={ days }
                renderItem={(day) => (
                    <View style={ (day.item == currentDay && currentDayCondition) ?
                        calendarStyles().currentDayMarker : calendarStyles().dayWrap }>
                        <Text style={ textStyle().h4 }>{ day.item }</Text>
                    </View>
                )}
            />  */}
            <Text><IonIcon name="ios-restaurant" /></Text>
            <Text><MaterialIcon name="silverware-fork-knife" /></Text>
        </View>
    )
}

export default(Month)