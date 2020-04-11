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

    selectProduct = () => {
        this.props.selectProduct(this.props.item.id, this.props.item.subcategory_id);
    }

    removeFromList = (product) => {
        this.props.removeProduct(product);
    }

    render() {
        return (
            <View style={styles.itemWrap}>
                <Text key={this.props.item.id} onPress={() => navigation.push(`/product/${this.props.item.subcategory_id}/${this.props.item.id}`)}>{this.props.item.name}</Text>
                <View style={styles.itemWrap}>
                    <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.removeFromList(this.props.item.id)} />
                </View>
            </View>
        )
    }
}

export default ProductList