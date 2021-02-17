import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { textStyle } from '../../components_additional/styles/GeneralStyles';

var icons = {
    Energy: require('../../components_additional/images/nutrients/energy.png'),
    Fat: require('../../components_additional/images/nutrients/fat.png'),
    Saturatedfat: require('../../components_additional/images/nutrients/saturated.png'),
    Carbohidrates: require('../../components_additional/images/nutrients/carbs.png'),
    Sugar: require('../../components_additional/images/nutrients/sugar.png'),
    Fiber: require('../../components_additional/images/nutrients/fiber.png'),
    Protein: require('../../components_additional/images/nutrients/protein.png'),
    Salt: require('../../components_additional/images/nutrients/salt.png'),
}

const DetailRow = ({ props }) => {

    return (
        <View style={stylesGuestSingle().listItemWrap}>
            <View style={stylesGuestSingle().titleWrap}>
                <View style={ stylesGuestSingle().componentIconWrap }>
                    <Image style={ stylesGuestSingle().componentIcon } source={ icons[props.title.replace(/\s+/g, '')] }  />
                </View>
                <Text style={textStyle().h5} >{ props.title }</Text>
            </View>
            <View style={stylesGuestSingle().listItemInfoWrap} >
                <Text style={stylesGuestSingle().componentAmount} >{ (props.component) ? (props.component) : ('0') }</Text>
                <Text style={stylesGuestSingle().componentMeasure} >{ props.measure }</Text>
            </View>
        </View>
    )
}

DetailRow.propTypes = {
    title: PropTypes.string.isRequired,
    comp: PropTypes.number,
    measure: PropTypes.string.isRequired
}

export default DetailRow