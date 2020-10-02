import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';

const DetailRow = ({ props }) => {
    return (
        <View style={stylesGuestSingle().listItemWrap}>
            <Text style={stylesGuestSingle().componentTitle} >{ props.title }</Text>
            <View style={stylesGuestSingle().listItemInfoWrap} >
                <Text style={stylesGuestSingle().componentAmount} >{ (props.comp) ? (props.comp) : ('-') }</Text>
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