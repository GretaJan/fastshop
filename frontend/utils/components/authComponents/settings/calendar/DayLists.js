import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getListByDay, deleteList } from '../../../../redux/actions/calendar';
import { singleDayStyle, buyListSingle } from '../../../../src/styles/CalendarStyles';
import { containerStyles, textStyle, iconsStyles } from '../../../../src/styles/GeneralStyles';
import { stylesGuestSingle } from '../../../../src/styles/ProductStyles';
import { colors } from '../../../../src/styles/Colors';
//Components
import Loading from '../../../../utils/models/Loading';
import CircleButton from '../../../../utils/models/CircleButton';
import Header from '../../../../utils/models/Header';
import ConfirmModal from '../../../../utils/models/ModalCrud';
import EmptyList from '../../../../utils/models/EmptyList';
import CreateListModal from './CreateListModal';

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { productAnimations } = require('../../../../src/styles/Animations');

function DayLists({ deleteList, route, navigation: { navigate } }){
    const [loading, setLoading] = useState(true);
    const { years, day } = route.params;
    const yearsSplit = years.split('-');
    const [list, setList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    const [confirmedDelete, setConfirmedDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [openCreateListModel, setOpenCreateListModel] = useState(false);

    useEffect(() => {
        getListByDay(years, day).then(response => {
            setList(response)
            setLoading(false)
        })
    }, [])

    function goToList(createdAt, name){
        navigate("BuyList", { createdAt: createdAt, name: name, years: years, day: day })
    }

    function removeFromList(){
        const newArray = list.filter(item => item.id !== deleteItem);
        setList(newArray);
        deleteList(years, deleteItem)
        setDeleteItem(null)
        setConfirmedDelete(false)
    }

    function openDeleteModalFunc(createdAt){
        setDeleteModal(true)
        setDeleteItem(createdAt)
    }

    function goToNewList(createdAt, years){
        navigate("BuyList", { createdAt: createdAt, years: years })
        setOpenCreateListModel(false)
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
            { openCreateListModel && (
                <CreateListModal 
                    thisYear={ new Date().getFullYear() }
                    currentYear={ yearsSplit[0] }
                    currentMonth={ yearsSplit[1] }
                    currentDay={ day }
                    close={ () => setOpenCreateListModel(false) }
                    goToNewList={ (createdAt, years) => goToNewList(createdAt, years) }
                />
            )}
            <View style={ containerStyles().simpleContainer } >
                { loading ? (
                    <Loading />
                ) : (
                    <View style={ containerStyles().mainContainer }>
                         <View style={ buyListSingle().innerContainer }>
                                <View style={ buyListSingle().iconsWrap } >
                                    <TouchableOpacity style={ buyListSingle().iconWrap } onPress={ () => setOpenCreateListModel(true) } >
                                        <IonIcon name="ios-add" style={ buyListSingle(colors.mainBtnOrange).icon }  />
                                    </TouchableOpacity>
                                </View>
                                <View style={ buyListSingle().titleTextWrap }>
                                    <View>
                                        <Text style={ textStyle().h4 }>{ years }-{ day }</Text>
                                    </View>
                                </View>
                            </View>
                        { list.length == 0 ? (
                            <View style={ containerStyles().screenHeightContainer }>
                                <EmptyList message={'Sąrašas tuščias'} />
                            </View>
                        ) : (
                            <ListArray
                                list={ list }
                                goToList={ (createdAt, name) => goToList(createdAt, name) }
                                confirmRemoveFunc={ (createdAt) => openDeleteModalFunc(createdAt) }
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
                keyExtractor={(item, index) => index.toString() }
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

    useEffect(() => {
        if(confirmedDelete && deleteItem == item.created_at)
            callRemoveAnimation()
    }, [confirmedDelete])

    function callRemoveAnimation() {
        closeDelModal()
        const heightFunc = () => {
            setRemoveHeight(true)
        }
        productAnimations.removeLargeItem(removeTranslation, heightFunc, removeFromList)
    }

    return (
        (!removeHeight) && (
            <AnimatedTouchableOpacity 
                style={ singleDayStyle(removeTranslation).listItemWrapTranslation } 
                onPress={ () => goToList(item.created_at, item.name)  } 
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
                    <TouchableOpacity style={iconsStyles.iconWrap} onPress={ () => confirmRemoveFunc(item.created_at) }>
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