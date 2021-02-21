import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, TouchableHighlight } from 'react-native';
import { textStyle, modalStyles } from '../styles/GeneralStyles';
import { fullModal } from '../styles/ModalStyles';
import { stylesGuestSingle } from '../styles/ProductStyles';
import { stylesGuest } from '../styles/CategoryStyles';
import { colors } from '../styles/Colors';
import ActionIcon from './ActionIcon';
import Modal from './Modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const { modalAnimations } = require('../styles/Animations.js');
function ProductModel({ 
    prop, 
    token, 
    isLiked,
    likeProduct, 
    unlikeProduct, 
    putToCart, 
    close,
    navigate
}){
    const scale = useState(new Animated.Value(0))[0];
    const [modelMsg, setModelMsg] = useState('');
    const buttonRef = useRef();
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
    const [pressNavigate, setPressNavigate] = useState(false)

    useEffect(() => {
        modalAnimations.buttonScale(scale);
    }, [])

    async function likeProductLocal(ref){
        const errorMsg = await likeProduct();
        if(errorMsg === true){
            return true
        } 
        callModal(ref, errorMsg);
    }

    function callModal(ref, errorMsg){
        ref.measure((fx, fy, width, height, px, py) => {
            const left = Math.round(px + width)
            const top = Math.round(py - height * 5)
            setLocationX(left)
            setLocationY(top)
        })
        setModelMsg(errorMsg)
    }

    const wrapHoverProps = {
        activeOpacity: 1,
        underlayColor: colors.mainBtnGreen,
        //style: this.state.isPressed ?  stylesGuest().itemWrapHover : stylesGuest().itemWrap,
        onHideUnderlay: () => setPressNavigate(false),
        onShowUnderlay: () => setPressNavigate(true),
        onPress: () => navigate("Product", {subcategoryId: prop.subcategoryId, productId: prop.id, name: prop.name, background: null })
    }

    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
           <Animated.View style={modalStyles(null, null, scale, true).animatedContainerFull} >
           { (modelMsg !== '') && (
                    <Modal title="Error" 
                        message={ modelMsg } 
                        close={ () => setModelMsg('') } 
                        ok="OK" color={colors.bordo} 
                        borderColor={colors.bordoTransparent}
                        locationX={ locationX }
                        locationY={ locationY }
                    /> 
                )}
               <View style={ stylesGuestSingle().topContainer }>
                    {prop.image ? (
                        <Image style={stylesGuestSingle().imageStyle} source={{ uri: prop.image }} />
                        ) : (
                            <Image style={stylesGuestSingle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')}  />
                    )}
                </View>
                    <View style={ fullModal().titleWrap }>
                        <Text style={ textStyle().h2 }>{ prop.name }</Text>
                    </View>
                <TouchableOpacity onPress={() => navigate("Product", { subcategoryId: prop.subcategoryId, productId: prop.id })}>
                </TouchableOpacity>
                <View style={ fullModal().btnWrapRow }>
                    <ActionIcon 
                        deactivateFunc={ unlikeProduct }
                        activateFunc={ (ref) => likeProductLocal(ref) }
                        errorCondition={ !token }
                        errorFunc={ (ref) => callModal(ref, 'Please register in order to complete this action.') }
                        mainIcon='ios-heart'
                        activeIcon='cart-outline'                         
                        activeColor={ colors.mainBtnOrange }
                        activeColorSec={ colors.mainBtnGreen }
                        isActive={ isLiked }
                    />
                    {/* <ActionIcon
                        deactivateFunc={ unselectProduct }
                        activateFunc={(ref) => selectProduct(ref) }
                        errorCondition={  selectErrorCondition }
                        // errorFunc={ (ref) => this.callModal(ref, 'Please select no more than 30 items.') }
                        mainIcon='md-checkmark'
                        activeIcon='format-list-bulleted'
                        activeColor={ colors.mainBtnGreen }
                        activeColorSec={ colors.mainBtnOrange }
                        isActive={ prop.isSelected }
                    /> */}
                </View>
                <TouchableHighlight {...wrapHoverProps} style={pressNavigate ? fullModal().navBtnWrapHover : fullModal().navBtnWrap }>
                    <View>
                        { prop.categoryId == 1 ? (
                            <>
                            <MaterialIcon style={pressNavigate ? stylesGuest().imgIconHover : fullModal().imgIcon } name="bottle-wine" />
                            </>
                        ) : (
                            <MaterialIcon style={ pressNavigate ? stylesGuest().imgIconHover : fullModal().imgIcon } name="food-apple-outline" />
                        )}
                        <Text style={ pressNavigate ? stylesGuest().itemTextHover : stylesGuest().itemText }>View</Text>
                        <Icon style={ pressNavigate ? stylesGuest().arrowIconHover : stylesGuest().arrowIcon } name="long-arrow-right" />
                    </View>
                </TouchableHighlight>
                {/* <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } /> */}
            </Animated.View>
        </TouchableOpacity>
    )

   
}

// function nameSlice(name){
//     if(name.length > 33) {
//        var newName = name.slice(0, 33);
//         return (
//             <Text style={ textStyle().p }>{ newName }...</Text>
//         )
//     } else {
//         return (
//             <Text style={ textStyle().p }>{ name }</Text>
//         )
//     }
// }


export default ProductModel