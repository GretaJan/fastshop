import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { textStyle } from '../../../components_additional/styles/GeneralStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Month({ month, currentDay, isCurrentCondition }){
    console.log("HHHH::", month)
    return (
        <View> 
             <FlatList 
                contentContainerStyle={stylesGuest().horizontalWrap} 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ month.days }
                renderItem={({ item }) => (
                    <View style={ (isCurrentCondition && currentDay == item) ?
                        calendarStyles().currentDayMarker : calendarStyles().dayWrap }>
                        <Text style={ textStyle().h4 }>{ item }</Text>
                    </View>
                )}
            /> 
            {/* <TouchableOpacity onPress={ () => func(reff) }><Text>kliiiiickk: {currentDay}</Text></TouchableOpacity>
            <Text><IonIcon name="ios-restaurant" /></Text>
            <Text><MaterialIcon name="silverware-fork-knife" /></Text> */}
        </View>
    )
}

export default(Month)