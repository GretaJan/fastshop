
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Animated, ScrollView, Pressable } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getSingleList, getRelatedProducts, createUpdateListRedux } from '../../../../redux/actions/calendar';
import { containerStyles, textStyle, modalStyles, inputStyles, btnStyles } from '../../../../src/styles/GeneralStyles';
import { buyListSingle } from '../../../../src/styles/CalendarStyles';
import { colors } from '../../../../src/styles/Colors';

//Components 
import Header from '../../../../utils/models/Header';
import Error from '../../../../utils/models/Error';
import Loading from '../../../../utils/models/Loading';
import EmptyList from '../../../../utils/models/EmptyList';
import CheckWithText from '../../../../utils/models/CheckWithText';
import ActionIcon from '../../../../utils/models/ActionIcon';

const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);
const { modalAnimations } = require('../../../../src/styles/Animations.js');

function BuyList({ route, navigation: { navigate }, createUpdateListRedux }){
    const { createdAt, years } = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [list, setList] = useState([]);
    const [notes, setNotes] = useState({});  
    const [updatedAt, setUpdatedAt] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [editableList, setEditableList] = useState({
                                                checked: false,
                                                name: '',
                                                quantity: 1,
                                                related_products: []
                                            });
    const [listIndex, setListIndex] = useState(null);

    async function getListFunc(){
        return getSingleList(createdAt, years).then((response) => {
                if(response){
                    setName(response.name)
                    setDate(response.date)
                    setList(response.list)
                    setNotes(response.notes)
                    setUpdatedAt(response.updated_at)
                    setIsCompleted(response.is_completed)
                    return true
                } else {
                    return response
                }
            });
    }


    useEffect(() => {
        setTimeout(() => {
            getListFunc().then(response => {
                if(response == null) setError('Įvyko klaida')
                setLoading(false)
            })
        }, 500)
           
    },[])

    return (
        loading ? (
            <View style={ containerStyles().screenHeightContainerNoHeader }>
                <Loading />
            </View>
        ) : (
            <>
                <Header 
                    title={ name }
                    navigate={ () => navigate("Calendar") }
                />
                <View style={ containerStyles().screenHeightContainerNoHeader }>
                { error ? (
                        <Error message={ error } />
                    ) : (
                        <View>
                            { listIndex !== null && (
                                <EditSingleItem 
                                    item={ editableList } 
                                    close={ closeFunc }
                                    editCreateListFunc={ (key, value) => editCreateListFunc(key, value) } 
                                    editCreateListFuncQuantity={ (type) => editCreateListFuncQuantity(type) }
                                    saveList={ () => editBuyListFunc(years, null, id) }
                                /> 
                            )}
                            <View style={ buyListSingle().innerContainer }>
                                <View style={ buyListSingle().iconsWrap } >
                                    <TouchableOpacity style={ buyListSingle().iconWrap } onPress={ getCreateListIndex } >
                                        <IonIcon name="ios-add" style={ buyListSingle(colors.mainBtnOrange).icon }  />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ buyListSingle().iconWrap } >
                                        <MaterialIcon name="card-text-outline" style={ buyListSingle('#fff').icon } />
                                    </TouchableOpacity>
                                </View>
                                <View style={ buyListSingle().titleTextWrap }>
                                    <View>
                                        <Text style={ textStyle().h4 }>{ date }</Text>
                                    </View>
                                </View>
                            </View>
                            { list ? (
                                <ScrollView contentContainerStyle={ containerStyles().flatListScrollFullCalendar }>
                                    <List
                                        list={ list }
                                    />
                                    <View style={ buyListSingle().bottomBlock }>
                                        <View><Text style={ textStyle().p }>Sukurta: { createdAt }</Text></View>
                                        <View><Text style={ textStyle().p }>Atnaujinta: { updatedAt }</Text></View>
                                    </View>
                                </ScrollView>
                            ) : (
                                <View style={ containerStyles().screenHeightContainer }>
                                    <EmptyList message={'Sąrašas tuščias'} />
                                    <View style={ buyListSingle().bottomBlock }>
                                        <View><Text style={ textStyle().p }>Sukurta: { createdAt }</Text></View>
                                        <View><Text style={ textStyle().p }>Atnaujinta: { updatedAt }</Text></View>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </>
        )
    )

    function getCreateListIndex(){
        const listLength = list ? list.length : 0;
        if(listLength === 0) setListIndex(0)
            else setListIndex(listLength - 1)
    }

    function closeFunc(){
        setListIndex(null)
    }

    function editCreateListFunc(key, value){
        let tempObj = {...editableList}
        tempObj[key] = value
        setEditableList(tempObj)
    }

    function editCreateListFuncQuantity(type){
        let tempObj = {...editableList}
        //do not let number to be smaller than 1
        if(type == 'desc' && tempObj.quantity > 1){
            tempObj.quantity = tempObj.quantity - 1
            setEditableList(tempObj)
        } else if(type == 'asc' && tempObj.quantity < 150){  //do not let number to be larger than 1
            tempObj.quantity = tempObj.quantity + 1
            setEditableList(tempObj)
        }
    }

    function editBuyListFunc(){
        const data = {
            name: name,
            date: date,
            notes: notes,
            list: list,
            created_at: createdAt,
        }
        createUpdateListRedux(years, data)
    }
}


export default withNavigation(connect(null, { createUpdateListRedux })(BuyList))

function List({ list }){

    return (
        <View>
            <FlatList
                data={ list.list }
                keyExtractor={(item, index) => index.toString() }
                renderItem={({ item, index }) => (
                    <SingleItem 
                        item={ item }
                        index={ index + 1 }
                    />
                )}
            />
        </View>
    )
}

function SingleItem({ item, index }){
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        getRelatedProducts(item.related_products).then(response => {
            setRelatedProducts(response)
        })

    }, [])

    return (
        <View>
            <Text>{ item.checked }</Text>
            <Text>{ index }.</Text>
            <Text>{ item.name }</Text>
            <Text>{ item.quantity }</Text>
            <FlatList
                data={ relatedProducts }
                keyExtractor={(item, index) => index.toString() }
                renderItem={ ({ item, index }) => (
                    <View>
                        <Text>{ index }.</Text>
                        <Text>{ item.name }</Text>
                    </View>
                ) }
            /> 
            <ActionIcon
                mainIcon="create-outline"
                activeIcon="create-outline" 
                activeColor={ colors.mainGrey } 
                activeColorSec={ colors.mainBtnGreen } 
                isActive={ false } 
                activateFunc={ () => editFunc(item.id) } 
                deactivateFunc={ () => cancelEditFunc(item.id)} 
                errorCondition={ null } 
                errorFunc={ null } 
            />
        </View>
    )
}

function EditSingleItem({ item, close, editCreateListFunc, editCreateListFuncQuantity, saveList }){
    const scale = useRef(new Animated.Value(0)).current;

    useState(() => {
        modalAnimations.modalScale(scale);
    }, [])

    return (
        <TouchableOpacity style={ modalStyles().modalWrapContainer } onPress={ close } >
            <AnimatedPressable style={ modalStyles(null, null, scale, true).animatedContainer }>
                <View style={ inputStyles().formTextGap } >
                    <CheckWithText
                        isSelected={ item.checked } 
                        item="Jau krepšelyje"
                        selectItem={ () => editCreateListFunc('checked', !item.checked)  }
                    />
                </View>
                 <View style={ inputStyles().inputContainer } >
                    <TextInput 
                        value={ item.name } 
                        onChangeText={ (value) => editCreateListFunc('name', value) }
                        style={ inputStyles().inputGreen }
                        maxLength={ 100 }
                    />
                </View>
                <View style={ inputStyles().formTextGap } >
                    <View style={ inputStyles().inputRow }>
                        <TouchableOpacity 
                            onPress={ () => editCreateListFuncQuantity('desc') } 
                            style={ buyListSingle().largeFont } 
                        >
                            <IonIcon size={ 30 } name="md-arrow-back" />
                        </TouchableOpacity>
                        <View style={ buyListSingle().editQuantity } >
                            <Text style={ textStyle().largeFont }>{ item.quantity }</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={ () => editCreateListFuncQuantity('asc') } 
                            style={ buyListSingle().largeFont }  
                        >
                            <IonIcon  size={ 30 } name="md-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ btnStyles().buttonsRowWrap }>
                    <TouchableOpacity 
                        onPress={ saveList } 
                        style={ btnStyles().inputBtnGreen }
                    >
                        <Text style={ btnStyles().inputBtnText } >Išsaugoti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={ close } 
                        style={ btnStyles().inputBtnGrey }
                    >
                        <Text style={ btnStyles().inputBtnText } >Atšaukti</Text>
                    </TouchableOpacity>
                </View>
            </AnimatedPressable>
        </TouchableOpacity>
    )
}
