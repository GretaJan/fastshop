import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
 
class ProductList extends Component {

    render() {
        return (
            <Text key={this.props.item.id} onPress={() => navigation.push("Product_Auth", {subcategoryId: this.props.item.subcategory_id, productId: this.props.item.id})}>{this.props.item.name}</Text>
        )
    }
}

export default withNavigation(ProductList)