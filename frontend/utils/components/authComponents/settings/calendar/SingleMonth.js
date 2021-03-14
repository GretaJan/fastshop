import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { calendarStyles } from '../../../../src/styles/CalendarStyles';
import { textStyle } from '../../../../src/styles/GeneralStyles';
import { stylesGuest } from '../../../../src/styles/SubcategoryStyles';

const { calendarAnimations } = require('../../../../src/styles/Animations');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function Month({ month, currentDay, currentYear, isCurrentCondition, listsArray, goToInnerPage }){
 console.log(currentDay, currentYear, isCurrentCondition)
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
        </TouchableOpacity>
    )

    function checkIfDayHasList(day){
        console.log("DAY: ", month.name)
        const existsDate = listsArray.find(item => item.years == screenDate && item.day == day)
        if(existsDate) setHasList(true)
    }
}

export default Month