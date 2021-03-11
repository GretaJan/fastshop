import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

class Subcategory extends Component {

    goToProducts = () => {
        this.props.goToProducts();
    }

    render() {
        return (
            <TouchableOpacity style={stylesGuest(null, this.props.item.background, this.props.index + 1).itemWrap} key={this.props.item.id.toString()} onPress={this.goToProducts } >
                {this.props.item.image ? (
                    <View style={stylesGuest().imageWrap} >
                        <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                    </View>
                    ) : (
                    <View style={stylesGuest().imageWrap} >
                        <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                    </View>
                )}
                <View style={stylesGuest().textWrap}>
                    <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

Subcategory.propTypes = {
    goToProducts: PropTypes.func.isRequired,
    name: PropTypes.string,
    image: PropTypes.any
}
export default Subcategory