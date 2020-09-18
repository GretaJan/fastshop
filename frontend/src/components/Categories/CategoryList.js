import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';



class CategoryList extends Component {

    goToSubcategories = () => {
        this.props.goToSubcategories();
    }

    render() {
        return (
            <TouchableOpacity style={stylesGuest().itemWrap} onPress={() => this.goToSubcategories()}>
                {this.props.item.image ? (
                    <View style={stylesGuest().imageWrap}>
                        <Image style={stylesGuest().image} source={{uri: this.props.item.image}} />     
                    </View>
                    ) : (
                    <View style={stylesGuest().imageWrap}>
                        <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                    </View>
                )}
                <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
            </TouchableOpacity >
        )  
    }
}

export default CategoryList