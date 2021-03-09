import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getBuyListsByDate, createDaysArr } from '../../../redux/actions/calendar';
import { containerStyles, textStyle } from '../../../components_additional/styles/GeneralStyles';
import { animations } from '../../../components_additional/styles/AnimationStyles';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import { CriteriaStyles } from '../../../components_additional/styles/CompareStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';


//Component 
import Month from './SingleMonth';
import Header from '../../../components_additional/models/Header';
import CreateListModal from './CreateListModal';

const { calendarAnimations } = require('../../../components_additional/styles/Animations.js')

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

//add 0 to the beggining of month in less than 10
function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

function Calendar({ navigation: { navigate } }){
    const [isLoading, setIsLoading] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const [listsDates, setListsDates] = useState([]);
    const monthNames = ['', 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
    const date = new Date();
    const initialYear = date.getFullYear();
    const initialMonth = sliceFunc(date.getMonth() + 1);
    const initialDay = sliceFunc(date.getDate());
    const [currentYear, setCurrentYear] = useState(initialYear);
    const [currentMonth, setCurrentMonth] = useState(initialMonth); //set monthNames index
    const [calendarWidth, setCalendarWidth] = useState(0);
    const calendarTransl = useRef(new Animated.Value(-screenWidth + 20)).current;
    const [translateTo, setTranslateTo] = useState(-screenWidth + 20);
    const [translateInnerList, setTranslateInnerList] = useState(0);
    const [calendarArray, setCalendarArray] = useState([]);
    const [openListModel, setOpenListModel] = useState(false);

    async function initialArray(){
        const date = `${ initialYear }-${ initialMonth }`;
        const lists = await getBuyListsByDate(date);
        if (lists) setListsDates(lists);
        const monthObj = {
            name: initialMonth,
            days: createDaysArr(initialYear, initialMonth)
        }
        const calendarArr= [{
            year: initialYear,
            months: [monthObj]
        }]
        const newChangedArr = countPrevDateInit(calendarArr);
        const initialArr = countNextDateInt(newChangedArr)
        setCalendarArray(initialArr)
        return Promise.resolve(false);
    }

    useEffect(() => {
        initialArray().then((resp) => {
            setIsLoading(resp);
        })
    }, [listsDates])

    
    function arrayMain() {
        return calendarArray.map((item) => (
            item.months.map(month => (
                <Month 
                    key={ month.name }
                    month={ month } 
                    currentDay={ initialDay }
                    currentYear={ currentYear }
                    isCurrentCondition={ initialMonth == month.name && item.year === initialYear }
                    listsArray={ listsDates }
                    goToInnerPage={ (years, day) => goToInnerPage(years, day) }
                />
                )
            )
        ))
    }

    return (
        <>
            <Header 
                title='Kalendorius'
                navigate={ () => navigate("SettingsScreen") }
            />
            { openListModel && (
                <CreateListModal 
                    currentYear={ initialYear }
                    currentMonth={ initialMonth }
                    currentDay={ initialDay }
                    close={ () => setOpenListModel(false) }
                    goToNewList={ (id, years) => navigate("BuyList", { id: id, years: years }) }
                />
            ) }
            <View style={ containerStyles().screenHeightContainer }>
                { isLoading ? (
                    <Text>Loading</Text>
                ) : (
                    <>
                        <View style={ calendarStyles().calculatorMainContainer } >
                            <Weeks 
                                currentYear={ currentYear }
                                currentMonth={ currentMonth }
                                translateLeft={ animateBack }
                                translateRight={ animateForward }
                            />
                            <View style={ calendarStyles().calendarWrap }>
                                <Animated.View style={ animations(calendarWidth, calendarTransl).calendarAnimation } >
                                    <View style={ calendarStyles(translateInnerList).calendarWrapInner }>
                                        { arrayMain() }
                                    </View>
                                </Animated.View>
                            </View>
                        </View>
                        <View style={ calendarStyles().btnEdit }>
                            <TouchableOpacity style={CriteriaStyles('#fff').buttonWrapOne} onPress={() => setOpenListModel(true)} >
                                <IonIcon name="md-create" style={CriteriaStyles().buttonResults} />
                            </TouchableOpacity>
                        </View>
                    </>
                ) }
            </View>
        </>
    )

    function animateBack(){
        if(currentMonth == 1 && currentYear <= 2020) return
        countPrevDate()
        const translateMonth = translateTo + screenWidth - 20 //translate to left
        calendarAnimations.translateContainer(calendarTransl, translateMonth, 400)
        setTranslateTo(translateMonth);
       
    }

    function animateForward(){
        let disallowedYear = initialYear + 3;
        if(currentMonth == 12 && currentYear >= disallowedYear) return
        countNextDate()
        const translateMonth = translateTo - screenWidth + 20 //translate to right
        calendarAnimations.translateContainer(calendarTransl, translateMonth, 400)
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
            prevMonth = sliceFunc(parseInt(currentMonth) - 1);
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
                    name: sliceFunc(nextMonth),
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
            nextMonth = parseInt(currentMonth) + 1;
            const monthArr = {
                    name: sliceFunc(nextMonth),
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
                        name: sliceFunc(appendMonth),
                        days: createDaysArr(prevYear, 12)
                    }
                    const newObj = {
                        year: prevYear,
                        months: [monthObj]
                    }
                    yearIndex = changedArray.map(item => item.year).indexOf(prevYear);
                    changedArray.splice(yearIndex, 0, newObj)
                    setTranslateInnerList(oldValue => oldValue - screenWidth + 20)
                    setCalendarWidth(oldValue => oldValue + screenWidth - 20);
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
                prevMonth = sliceFunc(parseInt(currentMonth) - 1);
                appendMonth = sliceFunc(parseInt(currentMonth) - 2);
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
                setTranslateInnerList(oldValue => oldValue - screenWidth + 20)
                // const finalWidth = getFlatListWidth(changedArray) 
                setCalendarWidth(oldValue => oldValue + screenWidth - 20);
            }
            setCurrentMonth(prevMonth)
        }
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
                appendMonth = '01';
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
                    setCalendarWidth(oldValue => oldValue + screenWidth);
                }
            }
            setCurrentMonth(12)
        } else {
            if(currentMonth == 12){
                appendMonth = '02';
                nextMonth = '01';
                setCurrentYear(nextYear)
            } else {
                nextMonth = sliceFunc(parseInt(currentMonth) + 1);
                appendMonth = sliceFunc(parseInt(currentMonth) + 2);
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
                setCalendarWidth(oldValue => oldValue + screenWidth);
            }
            setCurrentMonth(nextMonth)
        }   
        // const finalWidth = getFlatListWidth(changedArray) 
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

    function goToInnerPage(years, day){
        navigate("DayPage", { years: years, day: day })
    }

}


export default withNavigation(Calendar)


function Weeks({ currentYear, currentMonth, translateLeft, translateRight }){
    const monthNames = ['', 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis' ]
    const dayNames = ['Pr', 'A', 'T', 'K', 'Pn', 'Š', 'S'];

    return (
        <>
        <View style={ calendarStyles().rowContainerMonth }>
                <TouchableOpacity onPress={ translateLeft } style={ calendarStyles().iconWrap }>
                    <IonIcon name="ios-copy" style={ calendarStyles().arrowShort } />
                </TouchableOpacity>
                <Text style={ textStyle().h2 }>{currentYear } { monthNames[parseInt(currentMonth)] }</Text>
                <TouchableOpacity onPress={ translateRight } style={ calendarStyles().iconWrap }>
                    <IonIcon name="ios-copy" style={ calendarStyles().arrowShort } />
                </TouchableOpacity>
            </View>
        <View style={ calendarStyles().rowContainerWeek }>
            <FlatList 
                contentContainerStyle={ stylesGuest().horizontalWrap } 
                numColumns={7} 
                keyExtractor={(item, index) => index.toString()}
                data={ dayNames }
                renderItem={( dayName, index ) => (
                    <View style={ calendarStyles().dayTitleWrap }>
                        <Text style={ textStyle().h2 }>{ dayName.item}</Text>
                    </View>
                )}
            />
        </View>
        </>
    )
}
