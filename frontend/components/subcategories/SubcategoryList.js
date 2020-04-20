import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';


class SubcategoryList extends Component {

    goToProducts = () => {
        this.props.goToProducts(this.props.item.id);
    }

    render() {
        return (
            <TouchableOpacity style={stylesGuest().itemWrap} key={this.props.item.id} onPress={this.goToProducts } >
                <Text key={this.props.item.id} >{this.props.item.name}</Text>
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
                    <Icon style={stylesGuest().iconItem} name="arrow-circle-right" size={20} onPress={this.selectProduct} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default SubcategoryList