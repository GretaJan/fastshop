import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity } from 'react-native';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { textStyle } from '../../../components_additional/styles/GeneralStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const { calendarAnimations } = require('../../../components_additional/styles/Animations');

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function Month({ month, currentDay, currentYear, isCurrentCondition, listsArray, goToInnerPage }){
 
    return (
        <View> 
             <FlatList 
                contentContainerStyle={stylesGuest().horizontalWrap} 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ month.days }
                renderItem={({ item }) => (
                    <Day 
                        key={ item }
                        item={ item }
                        month={ month }
                        currentYear={ currentYear }
                        currentDay={ currentDay }
                        isCurrentCondition={ isCurrentCondition }
                        listsArray={ listsArray }
                        goToInnerPage={ goToInnerPage }
                    />
                )
            }
            /> 
        </View>
    )
}

function Day({ item, month, isCurrentCondition, currentYear, currentDay, listsArray, goToInnerPage }){
    const translateIcon = useRef(new Animated.Value(-30)).current;
    const [hasList, setHasList] = useState(null);
    const screenDate = `${currentYear}-${month.name}`;

    useEffect(() => {
        calendarAnimations.translateDayIcon(translateIcon);
        checkIfDayHasList(item)
    }, [])

    return (
        <TouchableOpacity style={ (isCurrentCondition && currentDay == item) ?
            calendarStyles().currentDayMarker : calendarStyles().dayWrap }
            onPress={ () => goToInnerPage(screenDate, item) }
        >
            <Text style={ textStyle().h4 }>{ item }</Text>
            { hasList && (
                <AnimatedIonIcon 
                    name="ios-restaurant" 
                    style={ calendarStyles(translateIcon).listMarkerIcon } 
                />
            ) }
            {/* <MaterialIcon 
                name="silverware-fork-knife" 
                style={ calendarStyles().listMarkerIcon } 
            /> */}
        </TouchableOpacity>
    )

    function checkIfDayHasList(day){
        const existsDate = listsArray.find(item => item.years == screenDate && item.day == day)
        if(existsDate) setHasList(true)
    }
}

export default Month