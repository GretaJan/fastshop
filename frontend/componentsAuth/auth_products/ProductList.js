import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
 
class ProductList extends Component {

    render() {
        return (
            <Text key={this.props.item.id} onPress={() => navigation.push(`/product_auth/${this.props.item.subcategory_id}/${this.props.item.id}`)}>{this.props.item.name}</Text>
        )
    }
}

export default ProductList