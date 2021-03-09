import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { getListByDay, deleteList } from '../../../redux/actions/calendar';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { singleDayStyle } from '../../../components_additional/styles/CalendarStyles';
import { containerStyles, textStyle } from '../../../components_additional/styles/GeneralStyles';
import { CriteriaStyles } from '../../../components_additional/styles/CompareStyles';
import { stylesGuest, stylesGuestSingle } from '../../../components_additional/styles/ProductStyles';
import { colors } from '../../../components_additional/styles/Colors';
//Components
import Loading from '../../../components_additional/models/Loading';
import CircleButton from '../../../components_additional/models/CircleButton';
import Header from '../../../components_additional/models/Header';
import ConfirmModal from '../../../components_additional/models/ModalCrud'

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { productAnimations } = require('../../../components_additional/styles/Animations');

function DayLists({ deleteList, route, navigation: { navigate } }){
    const [loading, setLoading] = useState(true);
    const { years, day } = route.params;
    const [list, setList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    const [confirmedDelete, setConfirmedDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        getListByDay(years, day).then(response => {
            setList(response)
            setLoading(false)
        })
    }, [])

    function goToList(id, name){
        navigate("BuyList", { id: id, name: name, years: years })
    }

    // function callRemoveAnimation() {
    //     const heightFunc = () => {
    //         setRemoveHeight(true)
    //     }
    //     setOpenModal(false)
    //     productAnimations.removeItem(removeTranslation, heightFunc, removeFromList)
    // }

    // function removeFromList(){
    //     const newArray = list.filter(item => item.id !== deleteItem);
    //     setList(newArray);
    //     setDeleteItem(null)
    //     console.log("delelelelel", deleteItem)
    //     setConfirmedDelete(false)
    // }

    function removeFromList(){
        const newArray = list.filter(item => item.id !== deleteItem);
        setList(newArray);
        deleteList(years, deleteItem)
        setDeleteItem(null)
        setConfirmedDelete(false)
    }

    function openDeleteModalFunc(id){
        setDeleteModal(true)
        setDeleteItem(id)
    }

    return (
        <>
            { deleteModal && (
                <ConfirmModal message="Ar tikrai norite ištrinti sąrašą?" 
                    confirm={ () => setConfirmedDelete(true) }
                    title="Patvirtinti"
                    close={() => setDeleteModal(false)}
                    background={colors.mainWhiteYellow}
                    iconColor={colors.lightBurgundy}
                    borderColor={colors.bordoTransparent}
                    colorOne={colors.lightBurgundy}
                    colorTwo={colors.mediumGreen}
                    horizontal={20} vertical={15}
                /> 
            )}
            <Header 
                title='Day List'
                navigate={ () => navigate("Calendar") }
            />
            <View style={ containerStyles().simpleContainer } >
                { loading ? (
                    <Loading />
                ) : (
                    <View style={ containerStyles().mainContainer }>
                        {/* <TouchableOpacity style={CriteriaStyles().buttonWrapOne} onPress={ () => console.log("helo") } >
                            <IonIcon name="ios-calculator" style={CriteriaStyles().buttonResults} />
                        </TouchableOpacity> */}
                        <CircleButton onPress={ () => console.log("helo") } />
                        { list.length == 0 ? (
                            <View>
                            </View>
                        ) : (
                            <ListArray
                                list={ list }
                                goToList={ (id, name) => goToList(id, name) }
                                confirmRemoveFunc={ (id) => openDeleteModalFunc(id) }
                                deleteItem={ deleteItem }
                                confirmedDelete={ confirmedDelete }
                                removeFromList={ removeFromList }
                                closeDelModal={ () => setDeleteModal(false) }
                            />          
                        )}
                    </View>
                    )}
            </View>
        </>
    )
}

export default connect(null, { deleteList })(DayLists)

function ListArray({ list, goToList, confirmRemoveFunc, deleteItem, removeFromList, confirmedDelete, closeDelModal }){

    return (
        <View>
            <FlatList 
                data={ list }
                renderItem={({ item }) => (
                    <SingleListItem 
                        item={ item }
                        goToList={ goToList }
                        deleteItem={ deleteItem }
                        confirmRemoveFunc={ confirmRemoveFunc }
                        confirmedDelete={ confirmedDelete }
                        removeFromList={ removeFromList }
                        closeDelModal={ closeDelModal }
                    />
                )}
            />
        </View>
    )
}

function SingleListItem({ item, goToList, deleteItem, confirmRemoveFunc, removeFromList, confirmedDelete, closeDelModal }){
    const removeTranslation = useRef(new Animated.Value(0)).current
    const [removeHeight, setRemoveHeight] = useState(false)
    // const removeTranslation = useRef(new Animated.Value(0)).current
    // const [removeHeight, setRemoveHeight] = useState(false)
    // return (
    //     <View style={stylesGuest().itemWrap} >
    //         <TouchableOpacity style={stylesGuest().TextPicWrap } onPress={ () => goToList(item.id, item.name) } >
    //             <Text style={stylesGuest().itemText} >{ item.name }</Text>
    //         </TouchableOpacity>
    //     </View>
    // )

    // function callRemoveAnimation() {
    //     const heightFunc = () => {
    //         setRemoveHeight(true)
    //     }
    //     productAnimations.removeItem(removeTranslation, heightFunc, removeFromList)
    // }
    useEffect(() => {
        if(confirmedDelete && deleteItem == item.id){
            callRemoveAnimation()
        }
    }, [confirmedDelete])

    function callRemoveAnimation() {
        closeDelModal(false)
        const heightFunc = () => {
            setRemoveHeight(true)
        }
        productAnimations.removeLargeItem(removeTranslation, heightFunc, removeFromList)
    }

    return (
        (!removeHeight) && (
            <AnimatedTouchableOpacity 
                style={ singleDayStyle(removeTranslation).listItemWrapTranslation } 
                onPress={ () => goToList(item.id, item.name)  } 
            >
                <View style={ singleDayStyle().listRowWrap } >
                    <View style={singleDayStyle().titleWrap}>
                        <View style={ stylesGuestSingle().componentIconWrap }>
                        <MaterialIcon style={ stylesGuestSingle().componentIcon }  size={ 40 }  name="format-list-checks" />
                        </View>
                        <Text style={textStyle().h2Bold} >{ item.name }</Text>
                    </View>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                    <Text style={singleDayStyle(null, item.is_completed ? colors.mainBtnGreen : colors.mainBtnOrange).componentTotalNo} >
                    <Text style={textStyle().h2} >{ item.totalItems }/{ item.checkedItems }</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={singleDayStyle().animatedWrap} onPress={ () => confirmRemoveFunc(item.id) }>
                        <MaterialIcon name="delete-outline" style={ stylesGuestSingle().calcRemove } />
                    </TouchableOpacity>
                </View>
                <View style={ singleDayStyle().wrapText }>
                    <Text style={textStyle().greyText} >Sukurta: { item.created_at }</Text>
                    <Text style={textStyle().greyText} >Atnaujinta: { item.updated_at }</Text>
                </View>
            </AnimatedTouchableOpacity>
        ) 
    )
}