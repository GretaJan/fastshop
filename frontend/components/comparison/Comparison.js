import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    }

}
 
class ProductList extends Component {
    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    removeFromList = () => {
        this.props.removeProduct( this.props.item.id);
    }

    render() {
        return (
            <View style={styles.itemWrap}>
                <View>
                    <Text>Most energy: {this.state.energy} </Text>
                    <Text>{this.state.name}</Text>
                </View>
                <View>
                    <Text>Most fat: {this.props.item.fat} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most saturated fat: {this.props.item.saturated} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most carbohidrates: {this.props.item.carbs} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most sugar: {this.props.item.sugar} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most fiber: {this.props.item.fiber} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most protein: {this.props.item.protein} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most salt: {this.props.item.salt} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
                <View>
                    <Text>Most vitamins: {this.props.item.vitamins} </Text>
                    <Text>{this.props.item.name}</Text>
                </View>
            </View>
        )
    }
}

export default ProductList