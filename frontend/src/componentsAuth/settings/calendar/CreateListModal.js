import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { modalStyles, textStyle, inputStyles, btnStyles, containerStyles } from '../../../components_additional/styles/GeneralStyles';
import { createDaysArr } from '../../../redux/actions/generalActions';
import { connect } from 'react-redux';
import { createUpdateListRedux } from '../../../redux/actions/calendar';
import { CriteriaStyles } from '../../../components_additional/styles/CompareStyles';
import { stylesGuest } from '../../../components_additional/styles/SubcategoryStyles';
import { calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { animations } from '../../../components_additional/styles/AnimationStyles';
import { FlatList } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

const { modalAnimations, comparisonAnimations, calendarAnimations } = require('../../../components_additional/styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

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

    useEffect(() => {
        modalAnimations.buttonScale(scale)
    }, [])

    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
        <Animated.View style={modalStyles(null, null, scale, true).animatedContainer} >
           <Text style={ textStyle().h3 }>Sukurti naują sąrašą</Text>
                <View style={ calendarStyles().datesAnimWrapper }>
                    <Animated.View style={ animations(null, calendarTransl).calendarDatesAnimation } >
                            <FlatList 
                                contentContainerStyle={ containerStyles().horizontalWrap }
                                numColumns={ 3 }
                                // style={ calendarStyles().datesModal }
                                // data={ yearsArray }
                                data={ yearsArray }
                                renderItem={({ item, index }) => (
                                    <SingleOption 
                                        columns={ 3 }
                                        item={ item }
                                        selectedYear={ selectedYear }
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
                                renderItem={({ item, index }) => (
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
                                renderItem={({ item, index }) => (
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
                   {/* <View style={ inputStyles().inputContainer }>
                       <Text style={ textStyle().p } >Please enter the code we sent you to Your email</Text>
                       {error !== '' && ( <Error message={ error } /> ) }
                       <TextInput
                           onChangeText={ (value) => console.log(value) }
                           style={ inputStyles(error).inputGreen }
                       />
                   </View> */}

                   {/* <View style={ btnStyles().buttonsRowWrap }>
                       <TouchableOpacity 
                           onPress={ () => console.log("hll")  } 
                           style={ btnStyles().inputBtnGreen }
                       >
                           <Text style={ btnStyles().inputBtnText } >Sukurti</Text>
                       </TouchableOpacity>
                       <TouchableOpacity 
                           onPress={ () => console.log("hll") } 
                           style={ btnStyles().inputBtnGrey }
                       >
                           <Text style={ btnStyles().inputBtnText } >Atšaukti</Text>
                       </TouchableOpacity>
                   </View> */}
                   { progress < 3 ? (
                        <TouchableOpacity 
                            onPress={ () => translateInnerContainer() } 
                            style={ btnStyles().inputBtnGrey }
                        >
                            <Text style={ btnStyles().inputBtnText } >Pasirinkti mėnesį</Text>
                        </TouchableOpacity>
                   ) : (
                    <TouchableOpacity 
                        onPress={ () => createList() } 
                        style={ btnStyles().inputBtnGrey }
                    >
                        <Text style={ btnStyles().inputBtnText } >Sukurti</Text>
                    </TouchableOpacity>
                   )}          
       </Animated.View>
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
        setProgress(oldValue => oldValue + 1);
    }

    async function createList() {
        const selectedDate = {
            fullDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
            keyDate: `${selectedYear}-${selectedMonth}`
        }
        const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        const listItemId = await createUpdateListRedux(selectedDate, currentDate)
        goToNewList(listItemId, selectedDate.keyDate)
    }
}

export default connect(null, { createUpdateListRedux })(CreateListModal)

function SingleOption({ columns, item, isSelected, selectItem, selectedYear }){
    const checkScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(isSelected){
            checkScale.setValue(1);
        }
    }, [isSelected])

    function selectItemLocal(){
        selectItem()
        comparisonAnimations.checkScaleGrow(checkScale);  
    }

    return (
        <View style={ inputStyles(columns).shortInputContainer }>
            <TouchableOpacity style={inputStyles().inputRow} onPress={ selectItemLocal }>
                <View style={CriteriaStyles().bulletWrapInner}>
                { isSelected && (
                    <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
                )}
                </View>
                <View style={ inputStyles().optionText }>
                    <Text style={ textStyle().h4 }>{ item }</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}