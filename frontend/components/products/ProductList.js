import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
            <TouchableOpacity style={stylesGuest().itemWrap} key={this.props.item.id} onPress={this.goToProduct} >
                <Text key={this.props.item.id}>{this.props.item.name}</Text>
                {this.props.item.image ? (
                    <View>
                        <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                    </View>
                    ) : (
                    <View>
                        <Image style={stylesGuest().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                    </View> 
                )}
                <View style={stylesGuest().itemWrap}>
                    <Icon style={styles.iconItem} name="arrow-circle-right" size={35} color="firebrick" onPress={this.selectProduct} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProductList