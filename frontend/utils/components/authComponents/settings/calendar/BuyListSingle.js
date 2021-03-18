import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Pressable, Animated } from 'react-native';
import IonIcon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { getRelatedProducts } from "../../../../redux/actions/calendar";
import { containerStyles, textStyle, modalStyles, inputStyles, btnStyles, iconsStyles, animationStyles } from "../../../../src/styles/GeneralStyles";
import { buyListSingle } from "../../../../src/styles/CalendarStyles";
import { stylesGuest } from "../../../../src/styles/ProductStyles";

//Components 
import CheckWithText from "../../../../utils/models/CheckWithText";
import Check from "../../../../utils/models/Check";
import ErrorModal from "../../../../utils/models/Error";

const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);
const { modalAnimations, productAnimations } = require("../../../../src/styles/Animations.js");

export function List({ list, editCreateIsChecked, getCreateListIndex, closeDelModal, initiateDeleteModal, deleteIndex, editableList, removeFromList, confirmedDelete }){

    return (
        <View>
            <FlatList
                data={ list }
                keyExtractor={(item, index) => index.toString() }
                renderItem={({ item, index }) => (
                    <SingleItem 
                        item={ item }
                        index={ index }
                        getCreateListIndex={ () => getCreateListIndex(index) }
                        editCreateIsChecked={ (value) => editCreateIsChecked(value, index) }
                        initiateDeleteModal={ () => initiateDeleteModal(index) }
                        closeDelModal={ closeDelModal }
                        deleteIndex={ deleteIndex }
                        editableList={ editableList }
                        removeFromList={ removeFromList }
                        confirmedDelete={ confirmedDelete }
                    />
                )}
            />
        </View>
    )
}

function SingleItem({ item, index, editCreateIsChecked, getCreateListIndex, initiateDeleteModal, closeDelModal, deleteIndex, editableList, removeFromList, confirmedDelete }){
    const removeTranslation = useRef(new Animated.Value(0)).current;
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [removeHeight, setRemoveHeight] = useState(false);

    useEffect(() => {
        getRelatedProducts(item.related_products).then(response => {
            setRelatedProducts(response)
            setIsChecked(item.checked)
        })
        if(confirmedDelete && deleteIndex == index)
            callRemoveAnimation()
    }, [confirmedDelete])

    function checkedFunc(){
        setIsChecked(oldValue => !oldValue)
        editCreateIsChecked(!item.checked) 
    }

    function callRemoveAnimation() {
        closeDelModal()
        const heightFunc = () => {
            setRemoveHeight(true)
        }
        productAnimations.removeLargeItem(removeTranslation, heightFunc, removeFromList)
    }

    return (
        (!removeHeight) && (
            <TouchableOpacity 
                style={ animationStyles(null, removeTranslation).deleteAnimationWithHeight } 
                onPress={ getCreateListIndex }
            >
                <View style={ stylesGuest().itemWrap } >
                    <View style={stylesGuest().TextPicWrap }>
                        <Check
                            isChecked={ isChecked } 
                            func={ checkedFunc }
                        /> 
                        <View style={ stylesGuest().itemText }>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={ textStyle().h2 }>{ index + 1 }. </Text>
                                <Text style={ textStyle().h2 }>{ item.name }</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={ iconsStyles.iconWrapSmall } onPress={ getCreateListIndex }>
                    <Text style={ textStyle().h2 }>{ item.quantity }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ iconsStyles.iconWrapSmall } onPress={ getCreateListIndex }>
                        <MaterialIcon style={ iconsStyles.editIcon } name="pencil"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={ iconsStyles.iconWrapSmall } onPress={ initiateDeleteModal }>
                        <MaterialIcon style={ iconsStyles.orangeIcon} name="delete-outline"/>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={ relatedProducts }
                            keyExtractor={(item, index) => index.toString() }
                            renderItem={ ({ item, index }) => (
                                <View style={ containerStyles().rowOuterContainer }>
                                    <Text>{ index }.</Text>
                                    <Text>{ item.name }</Text>
                                </View>
                            ) }
                        /> 
                    </View>
                </View>
            </TouchableOpacity>
        )
    )
}

export function EditSingleItem({ item, errorObj, close, editCreateListFunc, editCreateListFuncQuantity, saveList }){
    const scale = useRef(new Animated.Value(0)).current;

    useState(() => {
        console.log("item", item)
        console.log("errorObj", errorObj)
        modalAnimations.modalScale(scale);
    }, [])

    return (
        <TouchableOpacity style={ modalStyles().modalWrapContainer } onPress={ close } >
            <AnimatedPressable style={ modalStyles(scale, true).animatedContainer } >
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
                    { (errorObj !== "" && errorObj.quantity) && (
                        <ErrorModal mesage={ "hello" } />
                    )}
                    <View style={ inputStyles().inputRow }>
                        <TouchableOpacity 
                            onPress={ () => editCreateListFuncQuantity("desc") } 
                            style={ buyListSingle().largeFont } 
                        >
                            <IonIcon size={ 30 } name="md-arrow-back" />
                        </TouchableOpacity>
                        <TextInput  
                            type="text" 
                            value={ item.quantity }
                            defaultValue={ item.quantity.toString() }
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
