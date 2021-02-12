import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class Category extends Component {
    state = {
       isPressed: false,
    }

    goToSubcategories = () => {
        this.props.goToSubcategories();
    }

    wrapHoverProps = {
        activeOpacity: 1,
        underlayColor: colors.mainBtnGreen,
        //style: this.state.isPressed ?  stylesGuest().itemWrapHover : stylesGuest().itemWrap,
        onHideUnderlay: () => this.setState({isPressed: false}),
        onShowUnderlay: () => this.setState({isPressed: true}),
        onPress: () => this.goToSubcategories()
    }
    textHoverProps = {
        activeOpacity: 1,
        underlayColor: colors.mainBtnGreen,
        style: this.state.isPressed ?  stylesGuest().itemWrapHover : stylesGuest().itemWrap,
        onHideUnderlay: () => this.setState({isPressed: false}),
        onShowUnderlay: () => this.setState({isPressed: true}),
        onPress: () => this.goToSubcategories()
    }

    render() {
        return (
            // <TouchableOpacity style={stylesGuest().itemWrap} onPress={() => this.goToSubcategories()}>
            //     {this.props.item.image ? (
            //         <View style={stylesGuest().imageWrap}>
            //             <Image style={stylesGuest().image} source={{uri: this.props.item.image}} />     
            //         </View>
            //         ) : (
            //         <View style={stylesGuest().imageWrap}>
            //             <IonIcon style={stylesGuest().imageIcon} name="md-images" />
            //         </View>
            //     )}
            //     <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
            // </TouchableOpacity >
            // <TouchableOpacity style={stylesGuest().itemWrap} onPress={() => this.goToSubcategories()}>
            <TouchableHighlight {...this.wrapHoverProps} style={this.state.isPressed ? stylesGuest().itemWrapHover : stylesGuest().itemWrap }>
                <View>
                    {/* {this.props.item.image ? (
                        <View style={stylesGuest().imageWrap}>
                           <Image style={stylesGuest().image} source={{uri: this.props.item.image}} />     
                        </View>
                        ) : (
                        <View style={stylesGuest().imageWrap}>
                            <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                        </View>
                    )} */}
                    { this.props.item.name == 'Beverage' ? (
                        <>
                           <MaterialIcon style={this.state.isPressed ? stylesGuest().imgIconHover : stylesGuest().imgIcon } name="bottle-wine" />
                        </>
                    ) : (
                         <MaterialIcon style={ this.state.isPressed ? stylesGuest().imgIconHover : stylesGuest().imgIcon } name="food-apple-outline" />
                    )}
                    <Text style={ this.state.isPressed ? stylesGuest().itemTextHover : stylesGuest().itemText }>{this.props.item.name}</Text>
                    <Icon style={ this.state.isPressed ? stylesGuest().arrowIconHover : stylesGuest().arrowIcon } name="long-arrow-right" />
                </View>
            </TouchableHighlight>
        )  
    }
}

Category.propTypes = {
    goToSubcategories: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.any 
}

export default Category