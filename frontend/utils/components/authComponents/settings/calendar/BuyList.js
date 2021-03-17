
import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Animated, ScrollView, Pressable } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import IonIcon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { getSingleList, getRelatedProducts, createUpdateListRedux } from "../../../../redux/actions/calendar";
import { containerStyles, textStyle, modalStyles, inputStyles, btnStyles } from "../../../../src/styles/GeneralStyles";
import { buyListSingle } from "../../../../src/styles/CalendarStyles";
import { colors } from "../../../../src/styles/Colors";
import { verifyRegex } from "../../../../utils/HelperFunc";

//Components 
import Header from "../../../../utils/models/Header";
import Error from "../../../../utils/models/Error";
import Loading from "../../../../utils/models/Loading";
import EmptyList from "../../../../utils/models/EmptyList";
import CheckWithText from "../../../../utils/models/CheckWithText";
import ActionIcon from "../../../../utils/models/ActionIcon";
import ErrorModal from "../../../../utils/models/Error";

const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);
const { modalAnimations } = require("../../../../src/styles/Animations.js");

function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

function BuyList({ route, navigation: { navigate }, createUpdateListRedux }){
    const { createdAt, years, day } = route.params;
    const [loading, setLoading] = useState(true);
    const [errorObj, setErrorObj] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [list, setList] = useState([]);
    const [notes, setNotes] = useState({});  
    const [updatedAt, setUpdatedAt] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [editableList, setEditableList] = useState({
                                                checked: false,
                                                name: "",
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
                const tempObj = {...errorObj}
                tempObj.general = "Įvyko klaida";
                if(response == null) setErrorObj(tempObj)
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
                    navigate={ () => navigate("DayPage", { years: years, day: day }) }
                />
                { listIndex !== null && (
                    <EditSingleItem 
                        item={ editableList } 
                        errorObj={ errorObj }
                        close={ closeFunc }
                        editCreateListFunc={ (key, value) => editCreateListFunc(key, value) } 
                        editCreateListFuncQuantity={ (type) => editCreateListFuncQuantity(type) }
                        saveList={ () => pushToListArray(years, null, id) }
                    /> 
                )}
                <View style={ containerStyles().screenHeightContainerNoHeader }>
                { errorObj && errorObj.general ? (
                        <Error message={ errorObj.general  } />
                    ) : (
                        <>   
                            <View style={ buyListSingle().innerContainer }>
                                <View style={ buyListSingle().iconsWrap } >
                                    <TouchableOpacity style={ buyListSingle().iconWrap } onPress={ getCreateListIndex } >
                                        <IonIcon name="ios-add" style={ buyListSingle(colors.mainBtnOrange).icon }  />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ buyListSingle().iconWrap } >
                                        <MaterialIcon name="card-text-outline" style={ buyListSingle("#fff").icon } />
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
                                    <EmptyList message={"Sąrašas tuščias"} />
                                    <View style={ buyListSingle().bottomBlock }>
                                        <View><Text style={ textStyle().p }>Sukurta: { createdAt }</Text></View>
                                        <View><Text style={ textStyle().p }>Atnaujinta: { updatedAt }</Text></View>
                                    </View>
                                </View>
                            )}
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
        setListIndex(null)
    }

    function editCreateListFunc(key, value){
        let tempObj = {...editableList}
        tempObj[key] = value;
        if(key == "quantity"){
            const tempError = {...errorObj}
            tempError.quantity = '';
            if(!verifyRegex("quantityDigits", value)){
                const tempError = {...errorObj}
                tempError.quantity = "Digits allowed only.";
                setErrorObj(tempError)
            } 
        }
        setEditableList(tempObj)
    }

    function editCreateListFuncQuantity(type){
        let tempObj = {...editableList}
        const quant = parseInt(tempObj.quantity) 
        const tempError = {...errorObj}
        tempError.quantity = '';
        //do not let number to be smaller than 1
        if(type == "desc" && quant > 1){
            tempObj.quantity = quant - 1
            setEditableList(tempObj)
        } else if(type == "asc" && quant <= 150){  //do not let number to be larger than 1
            tempObj.quantity = quant + 1
            console.log("tempObj 2", tempObj)
            setEditableList(tempObj)
        }
    }

    function pushToListArray(){
        let tempArray;
        if(list && list.length > 0) {
            tempArray = [...list];
            tempArray.splice(listIndex, 0, editableList);
            setList(tempArray);
        } else {
            tempArray = [editableList]
            setList(tempArray);
        }
        const data = getListData("list", tempArray)
        editBuyListFunc(data)
    }

    function editBuyListFunc(data){
        if(errorObj && errorObj.quantity){
            const tempObj = {...errorObj}
            tempObj.general = "Please fill in all fields correctly.";
            setErrorObj(tempObj)
            return;
        } 
        createUpdateListRedux(years, data)
    }

    function getListData(type, value){
        const currentDateInit = new Date();
        const currentDate = `${currentDateInit.getFullYear()}-${sliceFunc(currentDateInit.getMonth() + 1)}-${sliceFunc(currentDateInit.getDate())}`;
        const dateHours = `${sliceFunc(currentDateInit.getHours())}:${sliceFunc(currentDateInit.getMinutes())}:${sliceFunc(currentDateInit.getSeconds())}`
        const updatedAt = `${ currentDate } ${ dateHours }`;
        let data = {
            name: name,
            date: date,
            list: list,
            created_at: createdAt,
            updated_at: updatedAt
        }
        data[type] = value; //change value of currently edited field
        return data;
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

function EditSingleItem({ item, errorObj, close, editCreateListFunc, editCreateListFuncQuantity, saveList }){
    const scale = useRef(new Animated.Value(0)).current;

    useState(() => {
        modalAnimations.modalScale(scale);
    }, [])

    return (
        <TouchableOpacity style={ modalStyles().modalWrapContainer } onPress={ close } >
            <AnimatedPressable style={ modalStyles(scale, true).animatedContainer }>
                <View style={ inputStyles().formTextGap } >
                    <CheckWithText
                        isSelected={ item.checked } 
                        item="Jau krepšelyje"
                        selectItem={ () => editCreateListFunc("checked", !item.checked)  }
                    />
                </View>
                 <View style={ inputStyles().inputContainer } >
                    <TextInput 
                        value={ item.name } 
                        onChangeText={ (value) => editCreateListFunc("name", value) }
                        style={ inputStyles().inputGreen }
                        maxLength={ 100 } 
                    />
                </View>
                <View style={ inputStyles().formTextGap } >
                    {/* { (errorObj !== "" && errorObj.quantity) && ( */}
                        <ErrorModal mesage={ "hello" } />
                    {/* )} */}
                    <View style={ inputStyles().inputRow }>
                        <TouchableOpacity 
                            onPress={ () => editCreateListFuncQuantity("desc") } 
                            style={ buyListSingle().largeFont } 
                        >
                            <IonIcon size={ 30 } name="md-arrow-back" />
                        </TouchableOpacity>
                        <TextInput  
                            type="text" 
                            // placeholder={ item.quantity.toString() }
                            value={ item.quantity }
                            defaultValue={ item.quantity }
                            maxLength={ 3 } 
                            onChangeText={ value => editCreateListFunc("quantity", value) }
                            style={ inputStyles((errorObj && errorObj.quantity)).inputGreenCentered }
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity 
                            onPress={ () => editCreateListFuncQuantity("asc") } 
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
                        <Text style={ btnStyles().inputBtnText }>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={ close } 
                        style={ btnStyles().inputBtnGrey }
                    >
                        <Text style={ btnStyles().inputBtnText }>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </AnimatedPressable>
        </TouchableOpacity>
    )
}
