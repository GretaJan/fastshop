import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
    const initialYear = date.getFullYear();
    const initialMonth = date.getMonth() + 1;
    const [currentYear, setCurrentYear] = useState(initialYear);
    const [currentMonth, setCurrentMonth] = useState(initialMonth); //set monthNames index
    const [currentDay, setCurrentDay] = useState(date.getDate());
    const calendarTransl = useRef(new Animated.Value(0)).current;
    const [calendarWidth, setCalendarWidth] = useState(0);
    const [translateTo, setTranslateTo] = useState(0);
    const [translateInnerList, setTranslateInnerList] = useState(0);
    const [calendarArray, setCalendarArray] = useState([]);

    function initialArray(){
        const monthObj = {
            name: currentMonth,
            days: createDaysArr(currentYear, currentMonth)
        }
        const calendarArr= [{
            year: currentYear,
            months: [monthObj]
        }]
        const newChangedArr = countPrevDateInit(calendarArr);
        const initialArr = countNextDateInt(newChangedArr)
        setCalendarArray(initialArr)
        setTranslateInnerList(-screenWidth)
        return Promise.resolve(false);
    }

    useEffect(() => {
        initialArray().then((resp) => {
            setIsLoading(resp);
        })
    }, [])

    
    function arrayMain() {
        return calendarArray.map((item) => (
            item.months.map(month => (
                    <Month 
                        key={ month.name }
                        month={ month } 
                        currentDay={ currentDay }
                        isCurrentCondition={ initialMonth == month.name && item.year === initialYear }
                    />
                )
            )
        ))
    }

    return (
        <View style={ containerStyles().screenHeightContainer }>
            { isLoading ? (
                <Text>Loading</Text>
            ) : (
                <View style={ containerStyles().calculatorMainContainer } >
                    <MonthsYearsComponent 
                        currentYear={ currentYear }
                        currentMonth={ currentMonth }
                        translateBackFunc={(value) => animateBack() }
                        translateForwardFunc={(value, state) => animateForward() }
                    />
                    <View style={ calendarStyles().calendarWrap }>
                        <Animated.View style={ animations(calendarWidth, calendarTransl).calendarAnimation }>
                            <View style={ calendarStyles(translateInnerList).calendarWrapInner }>
                                { arrayMain() }
                            </View>
                        </Animated.View>
                    </View>
                </View>
            ) }
        </View>
    )

    function createDaysArr(year, month){
        let daysCount = 0;
        if(month == 2 ) daysCount = leapYear(year)
            else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                daysCount = 31
                    else if(month == 4 || month == 6 || month == 9 || month == 11)
                        daysCount = 30
        let arr = [];
        for(let i = 1; i <= daysCount; i++){
            arr.push(i);
        }
        const daysArr = insertEmptyToDaysArr(arr, year, month)
        return daysArr
    }
    
    function leapYear(year){
        if(year % 4 === 0){
            return 29
        }
        return 28
    }
    
    function insertEmptyToDaysArr(arr, year, month){
        const lastDay = arr.length;
        let startTimes = new Date(year + "-" + month  + "-01").getDay();
            startTimes = startTimes == 0 ? 7 : startTimes;
        let endTimes = new Date(year + "-" + month + "-" + lastDay).getDay();
            endTimes = endTimes == 0 ? 7 : endTimes;
        for(let i = 1; i < startTimes; i++)
            arr.unshift('');
            for(let i = 7; i > endTimes; i--)
                arr.push('')
        return arr
    }

    function animateBack(){
        if(currentMonth == 1 && currentYear <= 2020) return
        countPrevDate()
        const translateMonth = translateTo + screenWidth //translate to left
        calendarAnimations.translateContainer(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
    }

    function animateForward(){
        let disallowedYear = initialYear + 3;
        if(currentMonth == 12 && currentYear >= disallowedYear) return
        countNextDate()
        const translateMonth = translateTo - screenWidth //translate to right
        calendarAnimations.translateContainer(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
    }

    function countPrevDateInit(currentArray){
        let prevYear = currentYear;
        let prevMonth = currentMonth;
        if(currentMonth == 1){
            const initialYear = 2020;
            if(prevYear > initialYear){
                prevYear = currentYear - 1;
                prevMonth = 12
                const monthObj = {
                    name: prevMonth,
                    days: createDaysArr(prevYear, 1)
                }
                const newArrObj = {
                    year: prevYear,
                    months: [monthObj]
                }
                const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
                currentArray.splice(yearIndex, 0, newArrObj)
            }
        } else {
            prevMonth = currentMonth - 1;
            const monthObj = {
                    name: prevMonth,
                    days: createDaysArr(currentYear, prevMonth)
            }
            const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
            const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
            currentArray[yearIndex].months.splice(monthIndex, 0, monthObj)
        }
        const finalWidth = getFlatListWidth(currentArray) 
        setCalendarWidth(finalWidth);
        return currentArray
    }

    function countNextDateInt(currentArray){
        let nextYear = currentYear;
        let nextMonth = currentMonth;
        if(currentMonth == 12){
            const currentYearAdditional = currentYear + 3;
            if(nextYear <= currentYearAdditional){
                nextYear = currentYear + 1;
                nextMonth = 1
                const monthObj = {
                    name: nextMonth,
                    days: createDaysArr(nextYear, 1)
                }
                const newArrObj = {
                    year: nextYear,
                    months: [monthObj]
                }
                const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
                currentArray.splice(yearIndex + 1, 0, newArrObj)
            }
        } else {
            nextMonth = currentMonth + 1;
            const monthArr = {
                    name: nextMonth,
                    days: createDaysArr(currentYear, nextMonth)
            }
            const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
            const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
            currentArray[yearIndex].months.splice(monthIndex + 1, 0, monthArr)
        }
        const finalWidth = getFlatListWidth(currentArray) 
        setCalendarWidth(finalWidth);
        return currentArray
    }

    //check if month is already attached to visible calendar array
    function checkIfExists(currentArray, year, month){
        const yearIndex = currentArray.map(item => item.year).indexOf(year);
        if(yearIndex > -1){
            const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(month);
            if(monthIndex > -1) return false;
                return true
        }
        return true;
    }


    function countPrevDate(){
        console.log("transalte 1", new Date())
        let prevMonth = currentMonth;
        let prevYear = currentYear - 1;
        let appendMonth = 0;
        let yearIndex = 0;
        let changedArray = [...calendarArray];
        if(currentMonth == 2) {
            prevMonth = 1;
            if(prevYear >= 2020){
                appendMonth = 12;
                const appendItem = checkIfExists(changedArray, prevYear, appendMonth)
                if(appendItem){
                    const  monthObj = {
                        name: appendMonth,
                        days: createDaysArr(prevYear, 12)
                    }
                    const newObj = {
                        year: prevYear,
                        months: [monthObj]
                    }
                    yearIndex = changedArray.map(item => item.year).indexOf(prevYear);
                    changedArray.splice(yearIndex, 0, newObj)
                    setTranslateInnerList(oldValue => oldValue - screenWidth)
                }
            }
            setCurrentMonth(prevMonth)
        } else {
            if(currentMonth == 1) {
                    appendMonth = 11;
                    prevMonth = 12;
                    setCurrentYear(prevYear)
            } else {
                prevYear = currentYear // changed prev year to current year
                prevMonth = currentMonth - 1;
                appendMonth = currentMonth - 2;
            }
            const appendItem = checkIfExists(changedArray, prevYear, appendMonth)
            if(appendItem){
                const monthObject = {
                    name: appendMonth,
                    days: createDaysArr(prevYear, appendMonth)
                }
                const yearIndex = changedArray.map(item => item.year).indexOf(prevYear);
                const monthIndex = changedArray[yearIndex].months.map(item => item.name).indexOf(prevMonth);
                changedArray[yearIndex].months.splice(monthIndex, 0, monthObject)
                setTranslateInnerList(oldValue => oldValue - screenWidth)
            }
            setCurrentMonth(prevMonth)
        }
        const finalWidth = getFlatListWidth(changedArray) 
        setCalendarWidth(finalWidth);
        setCalendarArray(changedArray);
    }
    function countNextDate(){
        let nextYear = currentYear + 1;
        let nextMonth = currentMonth;
        let appendMonth = currentMonth;
        let changedArray = [...calendarArray]
        const currentYearAdditional = initialYear + 4;
        if(currentMonth == 11){
            if(nextYear < currentYearAdditional){
                appendMonth = 1;
                const appendItem = checkIfExists(changedArray, nextYear, appendMonth)
                if(appendItem){
                    const monthObj = {
                        name: appendMonth,
                        days: createDaysArr(nextYear, appendMonth)
                    }
                    const newArrObj = {
                        year: nextYear,
                        months: [monthObj]
                    }
                    const yearIndex = changedArray.map(item => item.year).indexOf(currentYear);
                    changedArray.splice(yearIndex + 1, 0, newArrObj)
                }
            }
            setCurrentMonth(12)
        } else {
            if(currentMonth == 12){
                appendMonth = 2;
                nextMonth = 1;
                setCurrentYear(nextYear)
            } else {
                nextMonth = currentMonth + 1;
                appendMonth = currentMonth + 2;
                nextYear = currentYear
            }
            const appendItem = checkIfExists(changedArray, nextYear, appendMonth)
            if(appendItem){
                const monthObj = {
                    name: appendMonth,
                    days: createDaysArr(nextYear, appendMonth)
                }
                const yearIndex = changedArray.map(item => item.year).indexOf(nextYear);
                const monthIndex = changedArray[yearIndex].months.map(item => item.name).indexOf(nextMonth);
                changedArray[yearIndex].months.splice(monthIndex + 1, 0, monthObj)
            }
            setCurrentMonth(nextMonth)
        }   
        const finalWidth = getFlatListWidth(changedArray) 
        setCalendarWidth(finalWidth);
        setCalendarArray(changedArray)
    }


    function getFlatListWidth(currentArray){
        let arrayWidth = 0;
        currentArray.forEach((item) => {
            arrayWidth += item.months.length
            // item.months.forEach(() => {
            //     arrayWidth++;
            // })
        })
        return arrayWidth * screenWidth
    }

}

export default Calendar

function MonthsYearsComponent({ currentYear, currentMonth, translateBackFunc, translateForwardFunc }){
    const monthNames = ['', 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
    const dayNames = ['Pr', 'A', 'T', 'K', 'Pn', 'Š', 'S'];
  
    useEffect( () => {
    }, [currentYear, currentMonth])


    return (
        <View>
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
                    <TouchableOpacity onPress={ translateBackFunc } style={ calendarStyles().iconWrap }>
                        <Icon name="long-arrow-left" style={ calendarStyles().arrowLong } />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ translateBackFunc } style={ calendarStyles().iconWrap }>
                        <Icon name="arrow-left" style={ calendarStyles().arrowShort } />
                    </TouchableOpacity>
                </View>
                <Text style={textStyle().h2}>{ monthNames[currentMonth] }</Text>
                <View style={ calendarStyles().iconMainWrap }>
                    <TouchableOpacity onPress={ translateForwardFunc } style={ calendarStyles().iconWrap }>
                        <Icon name="arrow-right" style={ calendarStyles().arrowShort } />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => minMaxMonth(true) } style={ calendarStyles().iconWrap }>
                        <Icon name="long-arrow-right" style={ calendarStyles().arrowLong } />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={ calendarStyles().rowContainer }>
                <FlatList 
                    contentContainerStyle={ stylesGuest().horizontalWrap } 
                    numColumns={7} 
                    keyExtractor={(item, index) => index.toString()}
                    data={ dayNames }
                    renderItem={( dayName, index ) => (
                        <View style={ calendarStyles().dayWrap }>
                            <Text style={ textStyle().h2 }>{ dayName.item}</Text>
                        </View>
                    ) }
                />
            </View>
        </View>
    )
}

