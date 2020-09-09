import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
 
class ProductList extends Component {

    selectProduct = () => {
        this.props.selectProduct(this.props.item.id, this.props.item.subcategory_id);
    }

    goToProduct = () => {
        this.props.goToProduct();
    }

    render() {
        return (
            <View style={stylesGuest().itemWrap} key={this.props.item.id.toString()} >
                <TouchableOpacity style={stylesGuest().TextPicWrap } onPress={this.goToProduct}  >
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
                </TouchableOpacity>
                <TouchableOpacity style={stylesGuest().iconWrap} onPress={this.selectProduct} >
                    <Icon style={stylesGuest().iconItem} name="check-circle-o" />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProductList