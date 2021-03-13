import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { stylesGuest } from '../../../src/styles/CategoryStyles';
import { colors } from '../../../src/styles/Colors';

class Category extends Component {
    state = {
       isPressed: false,
    }

    goToSubcategories = () => {
        this.props.goToSubcategories();
    }

    render() {
        return (
            <TouchableHighlight {...this.wrapHoverProps} style={this.state.isPressed ? stylesGuest().itemWrapHover : stylesGuest().itemWrap }>
                <View>
                    { this.props.item.id == 1 ? (
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

    wrapHoverProps = {
        activeOpacity: 1,
        underlayColor: colors.mainBtnGreen,
        onHideUnderlay: () => this.setState({isPressed: false}),
        onShowUnderlay: () => this.setState({isPressed: true}),
        onPress: () => this.goToSubcategories()
    }
}

Category.propTypes = {
    goToSubcategories: PropTypes.func.isRequired,
    name: PropTypes.string,
    image: PropTypes.any 
}

export default Category