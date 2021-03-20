import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { stylesGuest } from '../../src/styles/ProductStyles';
import { topProductsStyle } from '../../src/styles/AdditionalStyles';
import { textStyle } from '../../src/styles/GeneralStyles';
import { colors } from '../../src/styles/Colors';

function SingleChild({ products }){

    return (
        products.map((item, index) => (
            <SingleItem 
                index={ index }
                item={ item.product }
                count={ item.count }
            />
        ))
    )
}

export default SingleChild

function SingleItem({ index, item, count }){

    return (
        <View style={stylesGuest().itemWrap} >
            <TouchableOpacity style={stylesGuest().TextPicWrap } onPress={ null }  >
                {item.image ? (
                    <View style={stylesGuest().imageWrap}>
                        <Image style={stylesGuest().image} source={{ uri: item.image }} />
                    </View>
                    ) : (
                    <View style={stylesGuest().imageWrap}>
                        <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                    </View> 
                )}
                <View style={stylesGuest().itemText} >
                    <Text style={textStyle().h4}>{ index + 1 }. { item.name }</Text>
                </View>
            </TouchableOpacity>
            <View 
                style={topProductsStyle().wrapIcon} 
            > 
                <MaterialIcon 
                    name="arrow-up" 
                    style={topProductsStyle(colors.darkerGray).icon} 
                />
                <Text style={topProductsStyle(null, colors.mainBtnGreen).text}>{ count }</Text>
            </View>
            {/* <AnimatedTouchable 
                style={stylesGuest(null, spinSelectBtn, isSelected).animatedWrap} 
                onPress={ !isSelected ? this.selectProduct : this.removeSelectProduct }
                ref={ component => this.selectBtnRef = component }
            > */}
            {/* { !isSelected ? (
                <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, null, listCheckScale).calcCheck} />
            ) : (
                <>
                    <AnimatedMaterialIcon name="format-list-bulleted"  style={stylesGuestSingle(null, null, null, listSelectScale).calcUncheckList} />
                    <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, checkSelectTransition).calcUncheckMainPg} />
                </>
            )} */}
        {/* </AnimatedTouchable> */}
    </View>
    )
}