import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, FlatList, Pressable } from 'react-native';
import { modalStyles, textStyle, inputStyles, btnStyles, containerStyles } from '../../../components_additional/styles/GeneralStyles';
import { createDaysArr } from '../../../redux/actions/generalActions';
import { connect } from 'react-redux';
import { createUpdateListRedux } from '../../../redux/actions/calendar';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { animations } from '../../../components_additional/styles/AnimationStyles';

//Components
import CheckWithText from '../../../components_additional/models/CheckWithText';

const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);
const { modalAnimations, calendarAnimations } = require('../../../components_additional/styles/Animations.js');

function createYearsArray(currentYear){
    let array = [];
    let lastYear = currentYear + 3;
    let firstYear = 2020;
    for(let i = firstYear; i <= lastYear; i++){
        array.push(i);
    }
    return  array
}

function createMonthArray(currentYear){
    let monthsArray = [];
    for(let i = 1; i <= 12; i++){
        monthsArray.push(i);
    }
    return monthsArray;
}

function CreateListModal({ close, currentYear, currentMonth, currentDay, createUpdateListRedux, goToNewList }){
    const scale = useRef(new Animated.Value(0)).current;
    const itemWidth = 0;
    const calendarTransl = useRef(new Animated.Value(0)).current;
    const [error, setError] = useState('');
    const yearsArray = createYearsArray(currentYear);
    const [monthsArray, setMonthsArray] = useState(createMonthArray(currentYear));
    const [daysArray, setDaysArray] = useState(createDaysArr(currentYear, currentMonth));
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [progress, setProgress] = useState(1);
    const [chosenItem, setChosenItem] = useState('metus')

    useEffect(() => {
        modalAnimations.modalScale(scale)
    }, [])

    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
            <AnimatedPressable style={modalStyles(null, null, scale, true).animatedContainer} >
                <Text style={ textStyle().h3 }>Sukurti naują sąrašą</Text>
                    <View style={ calendarStyles().datesAnimWrapper }>
                        <Animated.View style={ animations(null, calendarTransl).calendarDatesAnimation } >
                            <FlatList 
                                contentContainerStyle={ containerStyles().horizontalWrap }
                                numColumns={ 3 }
                                data={ yearsArray }
                                renderItem={({ item }) => (
                                    <SingleOption 
                                        columns={ 3 }
                                        item={ item }
                                        selectItem={ () => chooseYear(item) }
                                        isSelected={ selectedYear == item }
                                    />
                                )}
                            />
                            <FlatList 
                                contentContainerStyle={containerStyles().horizontalWrap}  
                                numColumns={ 4 }
                                style={ calendarStyles().datesModal }
                                data={ monthsArray }
                                renderItem={({ item }) => (
                                    <SingleOption 
                                        columns={ 4 }
                                        item={ item }
                                        selectItem={ () => chooseYear(item) }
                                        isSelected={ selectedMonth == item }
                                    />
                                )}
                            />
                            <FlatList 
                                contentContainerStyle={containerStyles().horizontalWrap}
                                numColumns={ 5 }
                                style={ calendarStyles().datesModal }
                                data={ daysArray }
                                renderItem={({ item }) => (
                                    <SingleOption 
                                        columns={ 5 }
                                        item={ item }
                                        selectItem={ () => chooseDay(item) }
                                        isSelected={ selectedDay == item }
                                    />
                                )}
                            />
                        </Animated.View>
                    </View>
                        { progress < 3 ? (
                            <TouchableOpacity 
                                onPress={ () => translateInnerContainer() } 
                                style={ btnStyles().inputBtnGrey }
                            >
                                <Text style={ btnStyles().inputBtnText } >Pasirinkti { chosenItem }</Text>
                            </TouchableOpacity>
                        ) : (
                        <TouchableOpacity 
                            onPress={ () => createList() } 
                            style={ btnStyles().inputBtnGrey }
                        >
                            <Text style={ btnStyles().inputBtnText } >Sukurti</Text>
                        </TouchableOpacity>
                    )}          
                </AnimatedPressable>
            </TouchableOpacity>
    )

    function chooseYear(item){
        setSelectedYear(item)
        const monthArr = createMonthArray(item);
        setMonthsArray(monthArr);
    }

    function chooseDay(item){
        setSelectedMonth(item)
        const daysArr = createDaysArr(setSelectedYear, item)
        daysArr.filter(filterItem => filterItem !== '')
        setDaysArrray(daysArr)
    }

    function chooseDay(item){
        setSelectedDay(item);
    }

    function translateInnerContainer(){
        const translateTo = calendarTransl._value - ((Dimensions.get('window').width - 40) * progress);
        calendarAnimations.translateContainer(calendarTransl, translateTo, 300)
        const newName = progress == 1 ? 'mėnesį' : 'dieną';
        setChosenItem(newName)
        setProgress(oldValue => oldValue + 1);
     
    }

    async function createList() {
        const selectedDate = {
            fullDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
            keyDate: `${selectedYear}-${selectedMonth}`
        }
        const createdAt = await createUpdateListRedux(selectedDate)
        goToNewList(createdAt, selectedDate.keyDate)
    }
}

export default connect(null, { createUpdateListRedux })(CreateListModal)

function SingleOption({ columns, item, isSelected, selectItem }){

    return (
        item !== '' && (
            <View style={ inputStyles(columns).shortInputContainer }>
                <CheckWithText
                    isSelected={ isSelected } 
                    item={ item } 
                    selectItem={ selectItem }
                />
            </View>
        )
    )
}