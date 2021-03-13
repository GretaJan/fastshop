import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { stylesGuest, stylesGuestSingle } from '../../src/styles/ProductStyles';

const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const { productAnimations } = require('../../src/styles/Animations');

 
class Product extends Component {
    state = {
        removeTranslation: new Animated.Value(0),
        removeHeight: false,
    }

    goToProduct = () => {
        this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
    }

    removeFromList = () => {
        const heightFunc = () => {
            this.setState({ removeHeight: true })
        }
        productAnimations.removeItem(this.state.removeTranslation, heightFunc, this.props.removeProduct)
    }

    render() {
        return (
            !this.state.removeHeight && (
                <Animated.View style={ stylesGuest(null, null, null, this.state.removeTranslation).itemWrapTranslation }>
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
                    <TouchableOpacity style={stylesGuest(null, '0deg', 0).animatedWrap} onPress={this.removeFromList}>
                        <AnimatedIonIcon name="md-close" style={ stylesGuestSingle().calcRemove } />
                    </TouchableOpacity>
                </Animated.View>
            )
        )
    }
}

export default Product