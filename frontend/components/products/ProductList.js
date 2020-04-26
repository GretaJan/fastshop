import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
 
class ProductList extends Component {

    selectProduct = () => {
        this.props.selectProduct(this.props.item.id, this.props.item.subcategory_id);
    }

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id);
    }

    render() {
        return (
            <View style={stylesGuest().itemWrap}>
                <TouchableOpacity style={stylesGuest().TextPicWrap} key={this.props.item.id.toString()} onPress={this.goToProduct} >
                    {this.props.item.image ? (
                        <View style={stylesGuest().imageWrap}>
                            <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                        </View>
                        ) : (
                        <View style={stylesGuest().imageWrap}>
                            <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                            {/* <Image style={stylesGuest().image} source={require('../../components_additional/images/noimage.jpeg')}  /> */}
                        </View> 
                    )}
                    <Text style={stylesGuest().itemText} key={this.props.item.id.toString()}>{this.props.item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesGuest().iconWrap} onPress={this.selectProduct} >
                    <Icon style={stylesGuest().iconItem} name="check-circle-o" />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProductList