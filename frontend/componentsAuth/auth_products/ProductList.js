import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
 
class ProductList extends Component {

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    render() {
        return (
            <View key={this.props.item.id}>
                <View>
                    <Image style={{width: 50, height: 50}} source={{ uri: this.props.item.image }} />
                </View>
                <Text key={this.props.item.id} onPress={this.goToProduct}>{this.props.item.name}</Text>
            </View>
        )
    }
}

export default ProductList