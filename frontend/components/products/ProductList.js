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

    selectProduct = (e) => {
        e.preventDefault();
        this.props.selectProduct(this.props.item.id, this.props.item.subcategory_id);
    }

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id);
    }

    render() {
        return (
            <TouchableOpacity key={this.props.item.id} style={styles.itemWrap} onPress={this.goToProduct} >
                <Text key={this.props.item.id}>{this.props.item.name}</Text>
                <View style={styles.itemWrap}>
                    <Icon style={styles.iconItem} name="arrow-circle-right" size={35} color="firebrick" onPress={this.selectProduct} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProductList