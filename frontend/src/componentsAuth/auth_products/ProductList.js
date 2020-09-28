import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

class Product extends Component {

    goToProduct = () => {
        this.props.goToProduct();
    }

    render() {
        return (
            <TouchableOpacity style={stylesGuest().itemWrap} onPress={this.goToProduct} >
                <View style={stylesGuest().TextPicWrap} >
                    {this.props.item.image ? (
                        <View style={stylesGuest().imageWrap}>
                            <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                        </View>
                        ) : (
                        <View style={stylesGuest().imageWrap}>
                            <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                        </View> 
                    )}
                    <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
                </View>
                <Icon style={stylesGuest().iconItem} name="arrow-circle-right" />
            </TouchableOpacity>
        )
    }
}

Product.propTypes = {
    goToProduct: PropTypes.func,
    name: PropTypes.string,
    image: PropTypes.any,
} 

export default Product