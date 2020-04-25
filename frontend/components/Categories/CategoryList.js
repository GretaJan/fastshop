import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest, shadow } from '../../components_additional/styles/CategoryStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';



class CategoryList extends Component {

    // render() {
    //     const { route } = this.props;

    //     export default function(props) {s
    //         return (
    //             <TouchableOpacity style={styles.itemWrap} onPress={() => { route.subcategories.this.props.item.id }}>
    //                 <Text key={this.props.item.id.toString()} >{this.props.item.name}</Text>
    //                 <Icon name="arrow-circle-right" size={20} />
    //             </TouchableOpacity >
    //         )
    //     }
        
    // }

    goToSubcategories = () => {
        this.props.goToSubcategories(this.props.item.id)
    }

    render() {
        return (
            // <TouchableOpacity style={styles.itemWrap} onPress={this.goToSubcategories}>
            <TouchableOpacity style={stylesGuest().itemWrap} key={this.props.item.id.toString()} onPress={() => this.goToSubcategories()}>
                {this.props.item.image ? (
                  
                        <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                   
                    ) : (
                        <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                        // <Image style={stylesGuest().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                
                )}
                <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
                {/* <Icon name="arrow-circle-right" size={20} /> */}
            </TouchableOpacity >
        )  
    }
}

export default CategoryList