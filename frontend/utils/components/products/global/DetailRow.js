import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { stylesGuestSingle } from '../../../src/styles/ProductStyles';
import { textStyle } from '../../../src/styles/GeneralStyles';

var icons = {
    Energy: require('../../../src/images/nutrients/energy.png'),
    Fat: require('../../../src/images/nutrients/fat.png'),
    Saturatedfat: require('../../../src/images/nutrients/saturated.png'),
    Carbohidrates: require('../../../src/images/nutrients/carbs.png'),
    Sugar: require('../../../src/images/nutrients/sugar.png'),
    Fiber: require('../../../src/images/nutrients/fiber.png'),
    Protein: require('../../../src/images/nutrients/protein.png'),
    Salt: require('../../../src/images/nutrients/salt.png'),
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