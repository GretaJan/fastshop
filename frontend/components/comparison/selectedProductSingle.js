import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { compareSingle } from '../../components_additional/styles/CompareStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

// const styles = {
//     container: {
//         marginTop: 8,
//         // marginLeft: 10,
//         // marginRight: 10
//     },
//     itemWrap: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         backgroundColor:'lightgrey',
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingTop: 5,
//     },
//     itemText: {
//         width: 'auto',
//         fontSize: 20
//     },
//     itemButton: {
//         flexBasis: '40'
//     },
//     iconItem: {
//         paddingRight: 10
//     }

// }
 
class ProductList extends Component {

    // selectProduct = () => {
    //     this.props.selectProduct(this.props.item.id, this.props.item.subcategory_id);
    // }

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    removeFromList = () => {
        this.props.removeProduct( this.props.item.id);
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
                    </View> 
                )}
                <Text style={stylesGuest().itemText} key={this.props.item.id.toString()}>{this.props.item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesGuest().iconWrap} onPress={this.removeFromList}>
                    <Icon style={stylesGuest().iconItem} name="times-circle" onPress={this.selectProduct} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProductList