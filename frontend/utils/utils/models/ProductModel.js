import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, TouchableHighlight, Pressable } from 'react-native';
import { textStyle, modalStyles, containerStyles } from '../../src/styles/GeneralStyles';
import { fullModal } from '../../src/styles/ModalStyles';
import { stylesGuestSingle } from '../../src/styles/ProductStyles';
import { stylesGuest } from '../../src/styles/CategoryStyles';
import { colors } from '../../src/styles/Colors';
import ActionIcon from './ActionIcon';
import Modal from './Modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { modalAnimations } = require('../../src/styles/Animations.js');

function ProductModel({ 
    prop, 
    token, 
    isLiked,
    likeProduct, 
    unlikeProduct,  
    close,
    navigateFunc
}){
    const scale = useState(new Animated.Value(0))[0];
    const [modelMsg, setModelMsg] = useState('');
    const buttonRef = useRef();
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
    const [pressNavigate, setPressNavigate] = useState(false)

    useEffect(() => {
        modalAnimations.modalScale(scale);
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
        onHideUnderlay: () => setPressNavigate(false),
        onShowUnderlay: () => setPressNavigate(true),
        onPress: () => navigateFunc()
    }

    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
           <AnimatedPressable style={modalStyles(scale, true).animatedContainerFull} >
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
               <View style={ containerStyles().rowContainerTop }>
                    {prop.image ? (
                        <Image style={stylesGuestSingle().imageStyle} source={{ uri: prop.image }} />
                        ) : (
                            <Image style={stylesGuestSingle().imageStyle} source={require('../../src/images/noimage.jpeg')}  />
                    )}
                </View>
                    <View style={ fullModal().titleWrap }>
                        <Text style={ textStyle().h2 }>{ prop.name }</Text>
                    </View>
                <TouchableOpacity onPress={ navigateFunc }>
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
            </AnimatedPressable>
        </TouchableOpacity>
    )
}

export default ProductModel