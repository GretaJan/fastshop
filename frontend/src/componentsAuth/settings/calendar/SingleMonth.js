import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { textStyle } from '../../../components_additional/styles/GeneralStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { calendarAnimations } = require('../../../components_additional/styles/Animations');

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function Month({ month, currentDay, isCurrentCondition }){
    const translateIcon = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        calendarAnimations.translateDayIcon(translateIcon);
    }, [])

    return (
        <View> 
             <FlatList 
                contentContainerStyle={stylesGuest().horizontalWrap} 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ month.days }
                renderItem={({ item }) => (
                    <View style={ (isCurrentCondition && currentDay == item) ?
                        calendarStyles().currentDayMarker : calendarStyles().dayWrap }
                        key={ item } >
                        <Text style={ textStyle().h4 }>{ item }</Text>
                        <AnimatedIonIcon 
                            name="ios-restaurant" 
                            style={ calendarStyles(translateIcon).listMarkerIcon } 
                        />
                        {/* <MaterialIcon 
                            name="silverware-fork-knife" 
                            style={ calendarStyles().listMarkerIcon } 
                        /> */}
                    </View>
                )}
            /> 
            <TouchableOpacity onPress={ () => func(reff) }><Text>kliiiiickk: {currentDay}</Text></TouchableOpacity>
        </View>
    )
}

export default(Month)