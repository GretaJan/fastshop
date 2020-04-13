import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
 
class ProductList extends Component {

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    render() {
        return (
            <Text key={this.props.item.id} onPress={this.goToProduct}>{this.props.item.name}</Text>
        )
    }
}

export default ProductList