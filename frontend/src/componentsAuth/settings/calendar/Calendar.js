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
    const flatlistRef = useRef(0)
    const [isLoading, setIsLoading] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const date = new Date();
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [currentMonth, setCurrentMonth] =  useState(date.getMonth() + 1); //set monthNames index
    const [currentDay, setCurrentDay] = useState(date.getDate());
    const calendarTransl = useRef(new Animated.Value(-screenWidth)).current;
    const [calendarChildrenTransl, setCalendarChildrenTransl] = useState(0);
    const [calendarWidth, setCalendarWidth] = useState(0);
    const [translateTo, setTranslateTo] = useState(-screenWidth);
    const [calendarArray, setCalendarArray] = useState([]);
    const mainFlatlistCol = 12 * 5;

    async function initialArray(){
        const monthObj = {
            name: currentMonth,
            days: createDaysArr(currentYear, currentMonth)
        }
        const calendarArr= [{
            year: currentYear,
            months: [monthObj]
        }]
        console.log("calendarObjcalendarObjcalendarObjcalendarObj: ", calendarArr[0].months)
        const newChangedArr = countPrevDateInit(calendarArr);
        console.log("USEEESTATEEE", newChangedArr)
        const initialArr = countNextDate(newChangedArr.changedArr)
        setCalendarArray(initialArr.changedArr)
        return Promise.resolve(false);
    }

    useEffect(() => {
        const func = initialArray()
        func.then((resp) => {
            setIsLoading(resp);
        })
    }, [])

    useEffect(() => {

    }, [currentYear, currentMonth])


    return (
        <View style={ containerStyles().screenHeightContainer }>
            { isLoading ? (
                <Text>Loading</Text>
            ) : (
                <View style={ containerStyles().calculatorMainContainer } >
                {/* <View style={ calendarStyles().rowContainer }>
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
                        <TouchableOpacity onPress={ swipeLeftFunc } style={ calendarStyles().iconWrap }>
                            <Icon name="arrow-left" style={ calendarStyles().arrowShort } />
                        </TouchableOpacity>
                    </View>
                    <Text style={textStyle().h2}>{ monthNames[currentMonth] }</Text>
                    <View style={ calendarStyles().iconMainWrap }>
                        <TouchableOpacity onPress={ swipeRightFunc } style={ calendarStyles().iconWrap }>
                            <Icon name="arrow-right" style={ calendarStyles().arrowShort } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => minMaxMonth(true) } style={ calendarStyles().iconWrap }>
                            <Icon name="long-arrow-right" style={ calendarStyles().arrowLong } />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <MonthsYearsComponent 
                    currentYear={ currentYear }
                    currentMonth={ currentMonth }
                    translateBackFunc={(value) => animateBack() }
                    translateForwardFunc={(value, state) => animateForward() }
                />
                <Animated.View style={ animations(calendarWidth, calendarTransl).calendarAnimation }>
                    <FlatList 
                        contentContainerStyle={ stylesGuest().calendarMonthWrap }
                        numColumns={ mainFlatlistCol }
                        keyExtractor={(item, index) => index.toString()}
                        data={ calendarArray }
                        renderItem={( prop ) => {
                            const monthsLength = prop.item.months.length;
                            return (
                                <FlatList 
                                    ref={ flatlistRef }
                                    contentContainerStyle={ calendarStyles(monthsLength * screenWidth).flatlistWrap }
                                    style={  calendarStyles(calendarChildrenTransl).calendarMonthWrapStyle }
                                    numColumns={ 12 }
                                    keyExtractor={(item, index) => index.toString()}
                                    data={ prop.item.months }
                                    renderItem={({ item }) => (
                                        <Month 
                                            month={ item } 
                                            currentDay={ currentDay }
                                            isCurrentCondition={ currentMonth == item.name && prop.item.year === currentYear }
                                        />
                                    )}
                                />
                            ) 
                        }}
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
                </Animated.View>
            </View>
            ) }
        </View>
    )

    // function createMonthsArr(yearObj){
    //     let monthsArray = [];
    //     for(let i = 1; i <= 12; i++){
    //         let monthObj = { month: i }
    //         if(yearObj.current && currentMonth == i) monthObj.current = true; 
    //         if(i == 2 ) monthObj.days = createDaysArr(leapYear(currentYear), yearObj, monthObj)
    //         else if(i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12)
    //             monthObj.days = createDaysArr(31, yearObj, monthObj)
    //             else if(i == 4 || i == 6 || i == 8 || i == 11)
    //                 monthObj.days = createDaysArr(30, yearObj, monthObj)
    //         monthsArray.push(monthObj);
    //     }
    //     return monthsArray
    // }

    function createDaysArr(year, month){
        let daysCount = 0;
        if(month == 2 ) daysCount = leapYear(year)
            else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                daysCount = 31
                    else if(month == 4 || month == 6 || month == 8 || month == 11)
                        daysCount = 30
        let arr = [];
        for(let i = 1; i <= daysCount; i++){
            // let dayObj = { day: i }
            // if( monthObj.current && i == currentDay) dayObj.current = true
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
    
    // function changeYear(increase){
    //     if(increase){
    //         if(currentYear < thisYear + 3) {
    //             calendarAnimations.translateContainerForward(calendarTransl)
    //             setCurrentYear(currentYear + 1);
    //         } else setCurrentYear(currentYear);
    //     } else {
    //         if(currentYear > 2020) {
    //             calendarAnimations.translateContainerBack(calendarTransl)
    //             setCurrentYear(currentYear - 1);
    //         } else setCurrentYear(currentYear)
    //     }
    // }

    // function changeMonth(increase){
    //     setIncrement(increase);
    //     if(increase){
    //         if(currentMonth < 11) {
    //             calendarAnimations.translateContainerForward(calendarTransl)
    //             setCurrentMonth(currentMonth + 1)
    //         } else setCurrentMonth(currentMonth)
    //     } else {
    //         if(currentMonth > 0) {
    //             calendarAnimations.translateContainerBack(calendarTransl)
    //             setCurrentMonth(currentMonth - 1)
    //         } else setCurrentMonth(currentMonth)
    //     }
    // }

    // function swipeLeftFunc(){
    //     if(currentMonth > 1 && currentYear > 2020){
    //         const yearsDiff = currentYear - 2020;
    //         const decreaseMonth = currentMonth - 1;
    //         const translationPosition = screenWidth * (yearsDiff * 12 + decreaseMonth) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentMonth(decreaseMonth)
    //     } else if(currentMonth == 1 && currentYear > 2020){
    //         const decreaseYear = currentYear - 1;
    //         const yearsDiff = decreaseYear - 2020;
    //         const translationPosition = screenWidth * (yearsDiff * 12 + 11) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentYear(decreaseYear)
    //         setCurrentMonth(12)
    //     } else if (currentYear > 2020) {
    //         const decreaseYear = currentYear - 1;
    //         const yearsDiff = decreaseYear - 2020;
    //         const translationPosition = screenWidth * (yearsDiff * 12) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentYear(decreaseYear)
    //         setCurrentMonth(1)
    //     }
    // }

    // function swipeRightFunc(){
    //     if(currentMonth < 12 && currentYear < currentYear + 5){
    //         const yearsDiff = currentYear - 2020;
    //         // const increaseMonth = currentMonth + 1;
    //         const translationPosition = screenWidth * (yearsDiff * 12 + currentMonth) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentMonth(value => value + 1)
    //     } else if(currentMonth == 12 && currentYear < currentYear + 5){
    //         const increaseYear = currentYear + 1;
    //         const yearsDiff = increaseYear - 2020;
    //         const translationPosition = screenWidth * (yearsDiff * 12 + 11) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentYear(increaseYear)
    //         setCurrentMonth(1)
    //     } else if (currentYear < currentYear + 5){
    //         const increaseYear = currentYear + 1;
    //         const yearsDiff = increaseYear - 2020;
    //         const translationPosition = screenWidth * (yearsDiff * 12 + currentMonth) * -1 // get translateX position of current month(include prev year months + months until current)
    //         // setCalendarTransl(translationPosition)
    //         calendarAnimations.translateContainerBack(new Animated.Value(translationPosition))
    //         setCurrentYear(increaseYear)
    //         setCurrentMonth(value => value + 1)
    //     }
    // }

    // function minMaxMonth(increase){
    //     setIncrement(increase);
    //     if(increase){
    //         if( currentMonth < 11 ) calendarAnimations.translateContainerForward(calendarScale, calendarTransl)
    //         setCurrentMonth(11)
    //     } else {
    //         if( currentMonth > 0 ) calendarAnimations.translateContainerBack(calendarScale, calendarTransl)
    //         setCurrentMonth(0)
    //     }
    // }

    // function createCalendar(){
    //     currentYear, currentMonth
    //     let yearsArray = [];
    //     for(let i = currentYear - 1; i <= currentYear + 5; i++){
    //         let yearObj = { year: i }
    //         if(currentYear == i) yearObj.current = true;
   
    //         // for(let j = 1; j <= 12; j++){
    //         //     let monthObj = { month: j }
    //         //     if(yearsObj.isCurrent && currentMonth == j) {
    //         //         const screenWidth = Dimensions.get('window').width;
    //         //         const translationPosition = yearArrayLength * j
    //         //         // setCalendarTransl(screenWidth * translationPosition)
    //         //         monthObj.isCurrent = true; 
    //         //     }
    //         //     if(j == 2 ) monthObj.days = createDaysArr(leapYear(currentYear), yearsObj, monthObj)
    //         //     else if(j == 1 || j == 3 || j == 5 || j == 7 || j == 8 || j == 10 || j == 12)
    //         //         monthObj.days = createDaysArr(31, yearsObj, monthObj)
    //         //         else if(j == 4 || j == 6 || j == 8 || j == 11)
    //         //             monthObj.isCurrent = createDaysArr(30, yearsObj, monthObj)
    //         //     monthsArray.push(monthObj);
    //         // }
    //         // const monthArray = createMonthsArr(yearObj, yearArrayLength)
    //         yearObj.months = createMonthsArr(yearObj)
    //         yearsArray.push(yearObj)
    //     }
    //     setCalendarArray(yearsArray)
    //     setVisibleYear(yearsArray.find(item => item.year == currentYear));
    //     setCalendarWidth(yearsArray.length * 12 * screenWidth)
    //     const yearsDiff = currentYear - 2020;
    //     const decreaseMonth = currentMonth - 1;
    //     const translationPosition = screenWidth * (yearsDiff * 12 + decreaseMonth) * -1 // get translateX position of current month(include prev year months + months until current)
    //     setCalendarTransl(translationPosition)
    //         setIsLoading(false)
    // }

    // function createCalendar(yearsArray, initial){
    //     if(initial){

    //         const prevMonth = yearsArray[0].months - 1;
    //         const newPrevObj = countPrevDate(yearsArray[0].year, prevMonth)
    //         const newNextObj = countNextDate(yearsArray[0].year, prevMonth)
    //         return yearsArray.unshift(newNextObj); 
    //         // if(prevMonth == 1){
    //         //     const prevYear = yearsArray[0].year - 1;
    //         // }
    //         // if(prevYear >= 2020){
    //         //     let yearObj = { year: i }

    //         //     yearsArray.unshift()
    //         // }
             
    //     }

    // }

    function animateBack(){
        const obj = countPrevDate(calendarArray)
        const translateMonth = translateTo + screenWidth //translate to left
        setCalendarChildrenTransl(oldTranslate => oldTranslate - screenWidth)
        calendarAnimations.translateContainerBack(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
        setCurrentYear(obj.year)
        setCurrentMonth(obj.month)
        console.log("currenttt month", obj.month)
        console.log("translateMonth::: ", translateMonth)
        console.log("CalendarChildrenTransl(::: ", calendarChildrenTransl)
        console.log("objjjjj month(::: ", obj)
    }

    function animateForward(){
        const obj = countNextDate(calendarArray)
        const translateMonth = translateTo - screenWidth //translate to right
        setCalendarChildrenTransl(oldTranslate => oldTranslate + screenWidth)
        calendarAnimations.translateContainerForward(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
        setCurrentYear(obj.year)
        setCurrentMonth(obj.month)
        console.log("translateMonth::: ", translateMonth)
        console.log("CalendarChildrenTransl(::: ", calendarChildrenTransl)
        console.log("objjjjj month(::: ", obj.month)
        // changedArr: currentArray,
        // year: nextYear,
        // month: nextMonth



    }

    function countPrevDateInit(currentArray){
        console.log("currentArraycurrentArray: ", currentArray)
        let prevYear = currentYear;
        let prevMonth = currentMonth;
        if(currentMonth == 1){
            const initialYear = 2020;
            if(prevYear > initialYear){
                prevYear = currentYear - 1;
                prevMonth = 12
                const monthObject = {
                    name: prevMonth,
                    days: createDaysArr(prevYear, 1)
                }
                const newArrObj = {
                    year: prevYear,
                    months: monthObject
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
            console.log(" createDaysArr(currentYear, prevMonth)",  monthObj)
            console.log("monthIndex111000 ", currentArray[0].months)
            const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
            console.log("monthIndex111", currentArray[yearIndex].months)
            const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
            console.log("monthIndex", currentArray[yearIndex].months)
            currentArray[yearIndex].months.splice(monthIndex, 0, monthObj)
            console.log("curra arrrr", currentArray)
        }
        const finalWidth = getFlatListWidth(currentArray) 
        setCalendarWidth(finalWidth);
        return {
            changedArr: currentArray,
            year: prevYear,
            month: prevMonth
        }
    }

    function countPrevDate(currentArray){
        console.log("currenffffftArray", currentArray)
        let prevMonth = currentMonth;
        let prevYear = currentYear;
        let appendMonth = 0;
        let appendYear = 0;
        let yearIndex = 0;
        let monthIndex = 0;
        const prevCalendarYear = currentYear - 1;
        // if(currentMonth <= 2){
            // const prevCalendarYear = currentYear - 1;
            // if(prevCalendarYear >= 2020){
        if(currentMonth == 2) {
            console.log("current", currentMonth)
            prevMonth = 1;
            if(prevCalendarYear >= 2020){
                appendMonth = 12;
                // prevYear = currentYear - 1;
                const  monthObj = {
                    name: appendMonth,
                    days: createDaysArr(prevCalendarYear, 12)
                }
                const newObj = {
                    year: prevCalendarYear,
                    months: [monthObj]
                }
                yearIndex = currentArray.map(item => item.year).indexOf(prevCalendarYear);
                currentArray.splice(yearIndex, 0, newObj)
            }
            console.log("appendMonth", appendMonth)
        } else {
            if(currentMonth == 1) {
                if(prevCalendarYear >= 2020){
                    appendMonth = 11;
                    prevMonth = 12;
                } else {
                    appendMonth = false
                    prevMonth = 1;
                }
            } else {
                prevCalendarYear = currentMonth // changed prev year to current year
                prevMonth = currentMonth - 1;
                appendMonth = currentMonth - 2;
            }
            if(appendMonth){
                const monthObject = {
                    name: appendMonth,
                    days: createDaysArr(prevCalendarYear, appendMonth)
                }
                const yearIndex = currentArray.map(item => item.year).indexOf(prevCalendarYear);
                const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(prevMonth);
                currentArray[yearIndex].months.splice(monthIndex, 0, monthObject)
                // yearIndex = currentArray.map(item => item.year).indexOf(prevCalendarYear);
                // monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
            }
        }
                
                    // prevYear = currentYear - 1;
                    // prevMonth = 12
                    // const  monthObj = {
                    //     name: appendMonth,
                    //     days: createDaysArr(appendMonth, 12)
                    // }
                    // const newObj = {
                    //     year: prevYear,
                    //     months: [monthObj]
                    // }
                
        //         }      
        // } else {       
        //     prevMonth = currentMonth - 1;
        //     const monthObject = {
        //         name: prevMonth,
        //         days: createDaysArr(currentYear, prevMonth)
        //     }
        //     const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
        //     const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
        //     currentArray[yearIndex].months.splice(monthIndex, 0, monthObject)
        // }
        const finalWidth = getFlatListWidth(currentArray) 
        setCalendarWidth(finalWidth);
        // calendarTransl.setValue()
        return {
            changedArr: currentArray,
            year: prevYear,
            month: prevMonth
        }
    }
    function countNextDate(currentArray){
        let nextYear = currentYear;
        let nextMonth = currentMonth;
        if(currentMonth == 12){
            const currentYearAdditional = currentYear + 3;
            if(nextYear <= currentYearAdditional){
                nextYear = currentYear + 1;
                nextMonth = 1
                const monthObject = {
                    name: nextMonth,
                    days: createDaysArr(nextYear, 1)
                }
                const newArrObj = {
                    year: nextYear,
                    months: monthObject
                }
                const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
                currentArray.splice(yearIndex + 1, 0, newArrObj)
            }
        } else {
            nextMonth = currentMonth + 1;
            const monthObj = {
                    name: nextMonth,
                    days: createDaysArr(currentYear, nextMonth)
            }
            const yearIndex = currentArray.map(item => item.year).indexOf(currentYear);
            const monthIndex = currentArray[yearIndex].months.map(item => item.name).indexOf(currentMonth);
            currentArray[yearIndex].months.splice(monthIndex + 1, 0, monthObj)
        }
        const finalWidth = getFlatListWidth(currentArray) 
        setCalendarWidth(finalWidth);
        return {
            changedArr: currentArray,
            year: nextYear,
            month: nextMonth
        }
    }

    function getFlatListWidth(currentArray){
        let arrayWidth = 0;
        currentArray.forEach((item) => {
            item.months.forEach(() => {
                arrayWidth++;
            })
        })
        return arrayWidth * screenWidth
    }
    function swipeLeft(){
        let calendarObj = countPrevDate(calendarArray)
        const currentArray = calendarObj.changedArr
        const arrayLength = currentArray.length; 
        currentArray.months.forEach(() => {
            arrayLength++;
        })
        setCurrentYear(calendarObj.year)
        setCurrentMonth(calendarObj.month)
    }
}

export default Calendar

function MonthsYearsComponent({ currentYear, currentMonth, translateBackFunc, translateForwardFunc }){
    const monthNames = ['', 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
    const dayNames = ['Pr', 'A', 'T', 'K', 'Pn', 'Š', 'S'];
    const [thisYear, setThisYear] = useState(currentYear)
    const [thisMonth, setThisMonth] = useState(currentMonth)
    const screenWidth = Dimensions.get('window').width;
  
    useEffect( () => {
        // setThisYear(currentYear)
        // setThisMonth(currentMonth)
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

    function swipeLeftFunc(){
        if(thisMonth > 1 && thisYear > 2020){
            const yearsDiff = thisYear - 2020;
            const decreaseMonth = thisMonth - 1;
            const translationPosition = screenWidth * (yearsDiff * 12 + decreaseMonth) * -1 // get translateX position of current month(include prev year months + months until current)
            translateBackFunc(new Animated.Value(translationPosition))
            setThisYear(decreaseMonth)
        } else if(thisMonth == 1 && thisYear > 2020){
            const decreaseYear = thisYear - 1;
            const yearsDiff = decreaseYear - 2020;
            const translationPosition = screenWidth * (yearsDiff * 12 + 11) * -1 // get translateX position of current month(include prev year months + months until current)
            translateBackFunc(new Animated.Value(translationPosition))
            setThisYear(decreaseYear)
            setThisMonth(12)
        } else if (thisYear > 2020) {
            const decreaseYear = thisYear - 1;
            const yearsDiff = decreaseYear - 2020;
            const translationPosition = screenWidth * (yearsDiff * 12) * -1 // get translateX position of current month(include prev year months + months until current)
            translateBackFunc(new Animated.Value(translationPosition))
            setThisYear(decreaseYear)
            setThisMonth(1)
        }
    }

    function swipeRightFunc(){
        if(thisMonth < 12 && thisYear < thisYear + 5){
            const yearsDiff = thisYear - 2020;
            const translationPosition = screenWidth * (yearsDiff * 12 + thisMonth) * -1 // get translateX position of current month(include prev year months + months until current)
            translateForwardFunc(new Animated.Value(translationPosition), thisMonth + 1)
            setThisMonth(value => value + 1)
        } else if(thisMonth == 12 && thisYear < thisYear + 5){
            const increaseYear = thisYear + 1;
            const yearsDiff = increaseYear - 2020;
            const translationPosition = screenWidth * (yearsDiff * 12 + 11) * -1 // get translateX position of current month(include prev year months + months until current)
            translateForwardFunc(new Animated.Value(translationPosition))
            setThisYear(increaseYear)
            setThisMonth(1)
        } else if (thisYear < thisYear + 5){
            const increaseYear = thisYear + 1;
            const yearsDiff = increaseYear - 2020;
            const translationPosition = screenWidth * (yearsDiff * 12 + thisMonth) * -1 // get translateX position of current month(include prev year months + months until current)
            translateForwardFunc(new Animated.Value(translationPosition))
            setThisYear(increaseYear)
            setThisMonth(value => value + 1)
        }
    }
}

