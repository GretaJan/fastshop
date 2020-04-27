import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

class SubcategoryList extends Component {

    goToProducts = () => {
        this.props.goToProducts(this.props.item.id);
    }

    render() {
        return (
            <TouchableOpacity style={stylesGuest().itemWrap} key={this.props.item.id.toString()} onPress={this.goToProducts } >
                {this.props.item.image ? (
                    <View style={stylesGuest().imageWrap} >
                        <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                    </View>
                    ) : (
                    <View style={stylesGuest().imageWrap} >
                        <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                        {/* <Image style={stylesGuest().image} source={require('../../components_additional/images/noimage.jpeg')}  />  */}
                    </View>
                )}
                {/* <View style={stylesGuest().itemWrap}>
                    <Icon style={stylesGuest().iconItem} name="arrow-circle-right" size={20} onPress={this.selectProduct} />
                </View> */}
                <View style={stylesGuest().textWrap}>
                    <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
                </View>
                {/* <View style={{flex:0.2}}></View> */}
            </TouchableOpacity>
        )
    }
}

export default SubcategoryList