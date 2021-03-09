
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getSingleList, getRelatedProducts } from '../../../redux/actions/calendar';
import { containerStyles, textStyle, modalStyles, inputStyles, btnStyles } from '../../../components_additional/styles/GeneralStyles';
import { buyListSingle, calendarStyles } from '../../../components_additional/styles/CalendarStyles';
import { diagram, productWrap } from '../../../components_additional/styles/CompareStyles';
import { colors } from '../../../components_additional/styles/Colors';

//Components 
import Header from '../../../components_additional/models/Header';
import Error from '../../../components_additional/models/Error';
import Loading from '../../../components_additional/models/Loading';
import EmptyList from '../../../components_additional/models/EmptyList';
import CheckInput from '../../../components_additional/models/Check';
import ActionIcon from '../../../components_additional/models/ActionIcon';

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const { modalAnimations } = require('../../../components_additional/styles/Animations.js');
function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

function BuyList({ route, navigation: { navigate } }){
    const { id, years } = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [list, setList] = useState([]);
    const [notes, setNotes] = useState({});  
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [editableList, setEditableList] = useState({
                                                checked: false,
                                                name: '',
                                                quantity: 1,
                                                related_products: []
                                            });
    const [listIndex, setListIndex] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            getSingleList(id, years).then(response => {
                if(response){
                    setName(response.name)
                    setDate(response.date)
                    setList(response.list)
                    setNotes(response.notes)
                    setCreatedAt(response.created_at)
                    setUpdatedAt(response.updated_at)
                    setIsCompleted(response.is_completed)
                } else {
                    setError('Įvyko klaida.')
                }
                setLoading(false)
            })
        }, 500)
    },[])

    return (
        loading ? (
            <View style={ containerStyles().screenHeightContainer }>
                <Loading />
            </View>
        ) : (
            <>
                { listIndex && (
                    <EditSingleItem 
                        item={ editableObj } 
                        index={ listIndex }
                        close={ closeFunc }
                        editCreateListFunc={ (key, value) => editCreateListFunc(key, value) } 
                        editCreateListFuncQuantity={ (type) => editCreateListFuncQuantity(type) }
                        saveList={ () => editBuyListFunc(years, null, id) }
                    />
                )}
                <Header 
                    title={ name }
                    navigate={ () => navigate("Calendar") }
                />
                <View style={ containerStyles().screenHeightContainer }>
                { error ? (
                        <Error message={ error } />
                    ) : (
                        <>
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
                                    <View>
                                        <AnimatedIonIcon name="md-checkmark" color='#32bd81' style={ diagram(null, 0).iconTranslation } />
                                        <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, 0).iconTranslation } />
                                        <Text style={ textStyle().h4 }>Užbaigta</Text>
                                    </View>
                                </View>
                            </View>
                            <ScrollView contentContainerStyle={ containerStyles().flatListScrollFullCalendar }>
                                { list ? (
                                    <List
                                        list={ list }
                                    />
                                ) : (
                                    <EmptyList message={'Sąrašas tuščias'} />
                                )}
                                <View style={ buyListSingle().bottomBlock }>
                                    <View><Text style={ textStyle().p }>Sukurta: { createdAt }</Text></View>
                                    <View><Text style={ textStyle().p }>Atnaujinta: { updatedAt }</Text></View>
                                </View>
                            </ScrollView>
                        </>
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
        setEditModal(false)
    }

    function editCreateListFunc(key, value){
        const tempObj = {...editableObj}
        tempObj[key] = value
        setEditableObj(tempObj)
    }

    function editCreateListFuncQuantity(type){
        let tempObj = {...editableObj}
        //do not let number to be smaller than 1
        if(type == 'desc' && editableObj.quantity > 1){
            tempObj.quantity = value - 1
            setEditableObj(tempObj)
        } else {
            //do not let number to be larger than 1
            if(editableObj.quantity < 150 ){
                tempObj.quantity = value + 1
                setEditableObj(tempObj)
            }
        }
    }

    function editBuyListFunc(){
    const currentDate = new Date();
    const updatedDate = `${currentDate.getFullYear()}-${sliceFunc(currentDate.getMonth() + 1)}-${sliceFunc(currentDate.getDate())}`;
        const data = {
            id: id,
            name: name,
            date: date,
            notes: notes,
            created_at: createdAt,
            updated_at: updatedDate
        }
        createUpdateListRedux(years, data)
    }

}

export default withNavigation(BuyList)

function List({ list }){

    return (
        <View>
            <FlatList
                data={ list.list }
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
    const scale = useState(new Animated.Value(0))[0];

    useState(() => {
        modalAnimations.buttonScale(scale);
    }, [])

    return (
        <TouchableOpacity style={ modalStyles().modalWrapContainer } onPress={ close } >
            <Animated.View style={ modalStyles(null, null, scale, true).animatedContainer } >
                <View style={ inputStyles().inputContainer } >
                    <CheckInput isVisible={ item.checked } func={ () => editCreateListFunc('checked', !item.checked) } />
                    <TextInput 
                        value={ item.name } 
                        onChangeText={ (value) => editCreateListFunc('name', value) }
                        style={ inputStyles().inputGreen }
                    />
                </View>
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
            </Animated.View>
        </TouchableOpacity>
    )
}
