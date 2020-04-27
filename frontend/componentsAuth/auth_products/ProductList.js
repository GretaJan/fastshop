import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

class ProductList extends Component {

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    render() {
        return (
            <View style={stylesGuest().itemWrap} key={this.props.item.id.toString()} >
                <TouchableOpacity style={stylesGuest().TextPicWrap} onPress={this.goToProduct} >
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
                <TouchableOpacity style={stylesGuest().iconWrap} >
                    <Icon style={stylesGuest().iconItem} name="pencil" />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProductList