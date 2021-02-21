import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SwipeableProperties } from 'react-native-gesture-handler/Swipeable';
import { containerStyles, textStyle } from '../../../components_additional/styles/GeneralStyles';
import { animations } from '../../../components_additional/styles/AnimationStyles';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Component 
import Month from './SingleMonth';

const { calendarAnimations } = require('../../../components_additional/styles/Animations.js')

function Calendar(){
    const [isLoading, setIsLoading] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const date = new Date();
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth();
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [currentMonth, setCurrentMonth] =  useState(date.getMonth() + 1); //set monthNames index
    const [currentDay, setCurrentDay] = useState(date.getDate());
    const [weekdayIndex, setWeekdayIndex] = useState(date.getDay());  //weekday index
    const [daysArr, setDaysArr] = useState([]); 
    const monthNames = ['', 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
    const [calendarTransl, setCalendarTransl] = useState(new Animated.Value(-screenWidth));
    const calendarScale = useState(new Animated.Value(1));
    const [calendarArray, setCalendarArray] = useState([]);
    const [calendarWidth, setCalendarWidth] = useState(0);
    const yearWidth = 12 * screenWidth;
    const [visibleYear, setVisibleYear] = useState({});

    useEffect( () => {
        createCalendar();
    }, [currentYear, currentMonth, weekdayIndex])


    return (
        <View style={ containerStyles().screenHeightContainer }>
            { isLoading ? (
                <Text>Loading</Text>
            ) : (
                <View style={ containerStyles().calculatorMainContainer } >
                <View style={ calendarStyles().rowContainer }>
                    <TouchableOpacity onPress={ () => changeYear(false) } style={ calendarStyles().iconWrap }>
                        <Icon name="arrow-left" style={ calendarStyles().arrowShort } />
                    </TouchableOpacity>
                    <Text style={textStyle().h1}>{ currentYear }</Text>
                    <TouchableOpacity onPress={ () => changeYear(true) } style={ calendarStyles().iconWrap }>
                        <Icon name="arrow-right" style={ calendarStyles().arrowShort } />
                    </TouchableOpacity>
                </View>
                <View style={ calendarStyles().rowContainer }>
                    <View style={ calendarStyles().iconMainWrap }>
                        <TouchableOpacity onPress={ () => minMaxMonth(false) } style={ calendarStyles().iconWrap }>
                            <Icon name="long-arrow-left" style={ calendarStyles().arrowLong } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => changeMonth(false) } style={ calendarStyles().iconWrap }>
                            <Icon name="arrow-left" style={ calendarStyles().arrowShort } />
                        </TouchableOpacity>
                    </View>
                    <Text style={textStyle().h2}>{ monthNames[currentMonth] }</Text>
                    <View style={ calendarStyles().iconMainWrap }>
                        <TouchableOpacity onPress={ () => changeMonth(true) } style={ calendarStyles().iconWrap }>
                            <Icon name="arrow-right" style={ calendarStyles().arrowShort } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => minMaxMonth(true) } style={ calendarStyles().iconWrap }>
                            <Icon name="long-arrow-right" style={ calendarStyles().arrowLong } />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Animated.FlatList 
                     contentContainerStyle={ animations(calendarWidth, calendarTransl).calendarAnimation }
                     numColumns={ calendarArray.length }
                     keyExtractor={(item, index) => index.toString()}
                     data={ calendarArray }
                     renderItem={( prop ) => (
                        <FlatList 
                            contentContainerStyle={ calendarStyles(yearWidth).calendarMonthWrap }
                            numColumns={ 12 }
                            keyExtractor={(item, index) => index.toString()}
                            data={ prop.item.months }
                            renderItem={({ item }) => (
                                <Month 
                                    month={ item } 
                                    currentDay={ currentDay }
                                />
                            )}
                        />
                     )}
                    />
                        {/* <View style={ calendarStyles().leftCalendarBlock }>
                            <Month 
                                days={ daysArr } 
                                currentDay={ currentDay }
                                currentDayCondition={ thisYear == currentYear && thisMonth == currentMonth }
                            />
                        </View>
                    <View style={ calendarStyles().centerCalendarBlock }>
                        <Month 
                            days={ daysArr } 
                            currentDay={ currentDay }
                            currentDayCondition={ thisYear == currentYear && thisMonth == currentMonth }
                        />
                    </View>
                        <View style={ calendarStyles().rightCalendarBlock }>
                            <Month 
                                days={ daysArr } 
                                currentDay={ currentDay }
                                currentDayCondition={ thisYear == currentYear && thisMonth == currentMonth }
                            />
                        </View> */}
                </View>
            </View>
            ) }
        </View>
    )

    function createMonthsArr(yearObj, yearArrayLength){
        let monthsArray = [];
        for(let i = 1; i <= 12; i++){
            let monthObj = { month: i }
            if(yearObj.current && currentMonth == i) {
                const translationPosition = (yearArrayLength * 12) + (i - 1) // get translateX position of current month(include prev year months + months until current)
                setCalendarTransl((screenWidth * translationPosition))
                monthObj.current = true; 
            }
            if(i == 2 ) monthObj.days = createDaysArr(leapYear(currentYear), yearObj, monthObj)
            else if(i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12)
                monthObj.days = createDaysArr(31, yearObj, monthObj)
                else if(i == 4 || i == 6 || i == 8 || i == 11)
                    monthObj.days = createDaysArr(30, yearObj, monthObj)
            monthsArray.push(monthObj);
        }
        return monthsArray
    }

    function createDaysArr(lastDay, yearObj, monthObj){
        let arr = [];
        for(let i = 1; i <= lastDay; i++){
            let dayObj = { day: i }
            if( monthObj.current && i == currentDay) dayObj.current = true
            arr.push(dayObj);
        }
        const daysArr = insertEmptyToDaysArr(arr, yearObj, monthObj )
        return daysArr
    }
    
    function leapYear(year){
        if(year % 4 === 0){
            return 29
        }
        return 28
    }
    
    function insertEmptyToDaysArr(arr, yearObj, monthObj){
        const lastDay = arr.length;
        // let startTimes = new Date(currentYear + "-" + (currentMonth + 1) + "-01").getDay();
        //     startTimes = startTimes == 0 ? 7 : startTimes;
        // let endTimes = new Date(currentYear + "-" + (currentMonth + 1) + "-" + lastDay).getDay();
        //     endTimes = endTimes == 0 ? 7 : endTimes;
        let startTimes = new Date(yearObj.year + "-" + monthObj.month  + "-01").getDay();
            startTimes = startTimes == 0 ? 7 : startTimes;
        let endTimes = new Date(yearObj.year + "-" + monthObj.month + "-" + lastDay).getDay();
            endTimes = endTimes == 0 ? 7 : endTimes;
        for(let i = 1; i < startTimes; i++)
            arr.unshift({ day: '' });
            for(let i = 7; i > endTimes; i--)
                arr.push({ day: '' })
        return arr
    }
    
    function changeYear(increase){
        if(increase){
            if(currentYear < thisYear + 3) {
                calendarAnimations.translateContainerForward(calendarScale, calendarTransl)
                setCurrentYear(currentYear + 1);
            } else setCurrentYear(currentYear);
        } else {
            if(currentYear > 2020) {
                calendarAnimations.translateContainerBack(calendarScale, calendarTransl)
                setCurrentYear(currentYear - 1);
            } else setCurrentYear(currentYear)
        }
    }

    function changeMonth(increase){
        setIncrement(increase);
        if(increase){
            if(currentMonth < 11) {
                calendarAnimations.translateContainerForward(calendarScale, calendarTransl)
                setCurrentMonth(currentMonth + 1)
            } else setCurrentMonth(currentMonth)
        } else {
            if(currentMonth > 0) {
                calendarAnimations.translateContainerBack(calendarScale, calendarTransl)
                setCurrentMonth(currentMonth - 1)
            } else setCurrentMonth(currentMonth)
        }
    }

    function minMaxMonth(increase){
        setIncrement(increase);
        if(increase){
            if( currentMonth < 11 ) calendarAnimations.translateContainerForward(calendarScale, calendarTransl)
            setCurrentMonth(11)
        } else {
            if( currentMonth > 0 ) calendarAnimations.translateContainerBack(calendarScale, calendarTransl)
            setCurrentMonth(0)
        }
    }

    function createCalendar(){
        currentYear, currentMonth
        let yearsArray = [];
        for(let i = currentYear - 1; i <= currentYear + 5; i++){
            let yearObj = { year: i }
            if(currentYear == i) yearObj.current = true;
   
            // for(let j = 1; j <= 12; j++){
            //     let monthObj = { month: j }
            //     if(yearsObj.isCurrent && currentMonth == j) {
            //         const screenWidth = Dimensions.get('window').width;
            //         const translationPosition = yearArrayLength * j
            //         // setCalendarTransl(screenWidth * translationPosition)
            //         monthObj.isCurrent = true; 
            //     }
            //     if(j == 2 ) monthObj.days = createDaysArr(leapYear(currentYear), yearsObj, monthObj)
            //     else if(j == 1 || j == 3 || j == 5 || j == 7 || j == 8 || j == 10 || j == 12)
            //         monthObj.days = createDaysArr(31, yearsObj, monthObj)
            //         else if(j == 4 || j == 6 || j == 8 || j == 11)
            //             monthObj.isCurrent = createDaysArr(30, yearsObj, monthObj)
            //     monthsArray.push(monthObj);
            // }
            // const monthArray = createMonthsArr(yearObj, yearArrayLength)
            yearObj.months = createMonthsArr(yearObj, yearsArray.length)
            yearsArray.push(yearObj)
        }
        setCalendarArray(yearsArray)
        console.log("yearsArray, yearsArray", yearsArray)
        setVisibleYear(yearsArray.find(item => item.year == currentYear));
        setCalendarWidth(yearsArray.length * 12 * screenWidth)
        console.log("calendarWidth: ", calendarWidth)
            setIsLoading(false)
    }
}

export default Calendar

