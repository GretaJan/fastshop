import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    const initialYear = date.getFullYear();
    const initialMonth = date.getMonth() + 1;
    const [currentYear, setCurrentYear] = useState(initialYear);
    const [currentMonth, setCurrentMonth] = useState(initialMonth); //set monthNames index
    const [currentDay, setCurrentDay] = useState(date.getDate());
    // const calendarTransl = useRef(new Animated.Value(-screenWidth)).current;
    const calendarTransl = useRef(new Animated.Value(0)).current;
    const [calendarWidth, setCalendarWidth] = useState(0);
    const [translateTo, setTranslateTo] = useState(0);
    const [translateInnerList, setTranslateInnerList] = useState(-screenWidth);
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
        const newChangedArr = countPrevDateInit(calendarArr);
        const initialArr = countNextDateInt(newChangedArr.changedArr)
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

    const buttonPosition = useCallback(event => {
        const { width, height } = event.nativeEvent.layout;
        console.log("WIDTH: ", width)
    })
    
    function arrayMain() {
        return calendarArray.map((item) => (
            item.months.map(month => (
                    <Month 
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
                <View style={ calendarStyles().calendarWrap }>
                    <Animated.View  onLayout={ buttonPosition } style={ animations(calendarWidth, calendarTransl).calendarAnimation }>
                        <View style={ calendarStyles(translateInnerList).calendarWrapInner }>
                            { arrayMain() }
                        </View>
                    </Animated.View>
                    {/* <Animated.FlatList 
                        contentContainerStyle={ stylesGuest().calendarMonthWrap }
                        style={ animations(calendarWidth, calendarTransl).calendarAnimation }
                        numColumns={ mainFlatlistCol }
                        keyExtractor={(item, index) => index.toString()}
                        ref={ flatlistRef }
                        data={ calendarArray }
                        renderItem={( prop ) => {
                            const monthsLength = prop.item.months.length;
                            return (
                                <FlatList 
                                    contentContainerStyle={ calendarStyles(monthsLength * screenWidth).flatlistWrap }
                                    style={  calendarStyles(translateInnerList).calendarMonthWrapStyle }
                                    numColumns={ 12 }
                                    keyExtractor={(item, index) => index.toString()}
                                    data={ prop.item.months }
                                    renderItem={({ item }) => (
                                        <Month 
                                            month={ item } 
                                            currentDay={ currentDay }
                                            isCurrentCondition={ initialMonth == item.name && prop.item.year === initialYear }
                                        />
                                    )}
                                />
                            ) 
                        }}
                    /> */}
                </View>
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
        calendarAnimations.translateContainerBack(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
    }

    function animateForward(){
        let disallowedYear = initialYear + 3;
        if(currentMonth == 12 && currentYear >= disallowedYear) return
        countNextDate()
        const translateMonth = translateTo - screenWidth //translate to right
        calendarAnimations.translateContainerForward(calendarTransl, translateMonth)
        setTranslateTo(translateMonth);
    }

    function countPrevDateInit(currentArray){
        let prevYear = currentYear;
        let prevMonth = currentMonth;
        console.log("BACK", currentMonth)
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
        return {
            changedArr: currentArray,
            year: prevYear,
            month: prevMonth
        }
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
        return {
            changedArr: currentArray,
            year: nextYear,
            month: nextMonth
        }
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
                    // if((initialYear == prevYear + 1 && initialMonth - 1 > 1) || (initialMonth == 1 && prevMonth < 12 )) {
                    //     setTranslateInnerList(oldValue => oldValue - screenWidth)
                    //     console.log("translate: ", translateInnerList - screenWidth)
                    // } else if((initialMonth - 1 == 1 && initialYear == prevYear + 1) || (initialYear == prevYear) && prevMonth == initialMonth - 1){
                    //     setTranslateInnerList(oldValue => oldValue - screenWidth)
                    //     console.log("translate 0", 0)
                    // }
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

                console.log("initial month 1: ", initialMonth > 1 )
                console.log("initial month 2: ", appendMonth, ':: ', initialMonth - 1)
                console.log("initial month 3: ", initialMonth == 1)
                console.log("initial month 4: ", prevMonth < 12 )
                // if((initialYear == prevYear + 1 && initialMonth - 1 > 1) || (initialMonth == 1 && prevMonth < 12 )) {
                //     setTranslateInnerList(oldValue => oldValue - screenWidth)
                //     console.log("translate: ", translateInnerList - screenWidth)
                // } else if((initialMonth - 1 == 1 && initialYear == prevYear + 1) || (initialYear == prevYear) && prevMonth == initialMonth - 1){
                //     setTranslateInnerList(- screenWidth)
                //     console.log("translate 0", 0)
                // }
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
                // setTranslateInnerList(oldValue => oldValue + screenWidth)
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

