
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import IonIcon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { getSingleList, createUpdateListRedux } from "../../../../redux/actions/calendar";
import { containerStyles, textStyle } from "../../../../src/styles/GeneralStyles";
import { buyListSingle } from "../../../../src/styles/CalendarStyles";
import { colors } from "../../../../src/styles/Colors";
import { verifyRegex } from "../../../../utils/HelperFunc";

//Components 
import Header from "../../../../utils/models/Header";
import { EditSingleItem, List } from './BuyListSingle';
import Error from "../../../../utils/models/Error";
import Loading from "../../../../utils/models/Loading";
import EmptyList from "../../../../utils/models/EmptyList";
import ConfirmModal from "../../../../utils/models/ModalCrud";

function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

function BuyList({ route, navigation: { navigate }, createUpdateListRedux }){
    const { createdAt, years, day } = route.params;
    const initialList = {
                    checked: false,
                    name: "",
                    quantity: 1,
                    related_products: []
                }
    const [loading, setLoading] = useState(true);
    const [errorObj, setErrorObj] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [list, setList] = useState([]);
    const [notes, setNotes] = useState({});  
    const [updatedAt, setUpdatedAt] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [editableList, setEditableList] = useState(initialList);
    const [listIndex, setListIndex] = useState(null);
    const [isEditList, setIsEditList] = useState(false);
    const [confirmedDelete, setConfirmDelete] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

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
           
    }, [])

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
                 { deleteIndex !== null && (
                    <ConfirmModal message="Ar tikrai norite ištrinti sąrašą?" 
                        confirm={ () => setConfirmDelete(true) }
                        title="Patvirtinti"
                        close={ closeDelModal }
                        background={colors.mainWhiteYellow}
                        iconColor={colors.lightBurgundy}
                        borderColor={colors.bordoTransparent}
                        colorOne={colors.lightBurgundy}
                        colorTwo={colors.mediumGreen}
                        horizontal={20} vertical={15}
                    /> 
                )}
                { listIndex !== null && (
                    <EditSingleItem 
                        item={ editableList } 
                        errorObj={ errorObj }
                        close={ closeListModal }
                        editCreateListFunc={ (key, value) => editCreateListFunc(key, value) } 
                        editCreateListFuncQuantity={ (type) => editCreateListFuncQuantity(type) }
                        saveList={ pushToListArray }
                    /> 
                )}
                <View style={ containerStyles().screenHeightContainerNoHeader }>
                { errorObj && errorObj.general ? (
                        <Error message={ errorObj.general  } />
                    ) : (
                        <>   
                            <View style={ buyListSingle().innerContainer }>
                                <View style={ buyListSingle().iconsWrap } >
                                    <TouchableOpacity style={ buyListSingle().iconWrap } onPress={ () => getCreateListIndex(null) } >
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
                                <View style={ containerStyles().screenHeightContainer }>
                                    <List
                                        list={ list }
                                        getCreateListIndex={ (index) => getCreateListIndex(index) }
                                        editCreateIsChecked={ (value, index) => editCreateIsChecked(value, index) }
                                        initiateDeleteModal={ (index) => initiateDeleteModal(index) }
                                        deleteIndex={ deleteIndex }
                                        editableList={ editableList }
                                        closeDelModal={ closeDelModal }
                                        removeFromList={ removeFromList }
                                        confirmedDelete={ confirmedDelete }
                                    />
                                    <View style={ buyListSingle().bottomBlock }>
                                        <View><Text style={ textStyle().p }>Sukurta: { createdAt }</Text></View>
                                        <View><Text style={ textStyle().p }>Atnaujinta: { updatedAt }</Text></View>
                                    </View>
                                </View>
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

    function getCreateListIndex(index){
    
        if(index || index === 0){
            let listItem = list[index];
            setEditableList(listItem);
            setIsEditList(true)
            setListIndex(index)
        } else {
            const listLength = list ? list.length : 0;
            if(listLength === 0) setListIndex(0)
                else setListIndex(listLength)
        }
    }

    function closeListModal(){
        setListIndex(null)
        setEditableList(initialList)
        setErrorObj('')
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
        delete tempError.quantity;
        //do not let number to be smaller than 1
        if(type == "desc" && quant > 1){
            tempObj.quantity = quant - 1
            setEditableList(tempObj)
        } else if(type == "asc" && quant <= 150){  //do not let number to be larger than 1
            tempObj.quantity = quant + 1
            setEditableList(tempObj)
        }
    }

    function pushToListArray(){
        let tempArray;
        if(!isEditList) {
            if(list && list.length > 0) {
                tempArray = [...list];
                tempArray.splice(listIndex, 0, editableList);
                setList(tempArray);
            } else {
                tempArray = [editableList]
                setList(tempArray);
            }
        } else {
            tempArray = [...list];
            tempArray.splice(listIndex, 1, editableList);
            setList(tempArray);
            setIsEditList(false)
        }
        setListIndex(null)
        setEditableList(initialList)
        const data = getListData("list", tempArray)
        editBuyListFunc(data)
    }

    function editBuyListFunc(data){
        let tempError = {...errorObj}
        if(tempError) delete tempError.quantity;
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
        setUpdatedAt(updatedAt);
        data[type] = value; //change value of currently edited field
        return data;
    }

    function editCreateIsChecked(value, index){
        let tempList = [...list];
        tempList[index].checked = value
        setList(tempList);
        const data = getListData("list", tempList)
        createUpdateListRedux(years, data)
    }

    function initiateDeleteModal(index){
        const listToBeDeleted = list[index];
        setEditableList(listToBeDeleted)
        setDeleteIndex(index)
    }

    function closeDelModal(){
        setDeleteIndex(null)
        setEditableList(initialList)
        setConfirmDelete(false)
    }

    function removeFromList(){
        let tempArray = [...list];
        let removedItemArr = tempArray.splice(deleteIndex, 1);
        const data = getListData("list", removedItemArr)
        createUpdateListRedux(years, data)
        setList(removedItemArr)
        closeDelModal()
    }
}


export default withNavigation(connect(null, { createUpdateListRedux })(BuyList))

