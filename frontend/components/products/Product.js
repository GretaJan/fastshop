import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

class Product extends Component {
    static navigationOptions = {
        headerTitle: "PRODUCT DETAILS2",
    };

    state = {
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId
    }

    selectProduct = () => {
        this.props.productSelected(this.props.product.subcategory_id, this.props.product.id);
    }


    async componentDidMount() {
        await this.props.getProduct( this.state.subcategoryId, this.state.productId);
        console.log('image: ', image)
    }

    render() {
        const { subcategory_id, image, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, background_color } = this.props.product;
        return (
            <View style={stylesGuestSingle().container} >
                <Text>{this.props.product.name}</Text>
                {/* <TouchableOpacity style={stylesGuestSingle().iconSelectWrap}>
                    <Icon style={stylesGuestSingle().selectItemIcon} name="ios-checkmark-circle-outline" onPress={() => this.selectProduct} />
                </TouchableOpacity> */}
                {image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: image }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                )}
                    <TouchableOpacity style={stylesGuestSingle().emptyItem} onPress={() => this.selectProduct()}>
                        <IonIcon style={stylesGuestSingle().emptyIcon} name="ios-checkmark-circle-outline" />
                    </TouchableOpacity>
                    <View style={stylesGuestSingle().triangle} ></View>
                    <ScrollView style={stylesGuestSingle().listContainer} >
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (energy) ? (energy) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fat) ? (fat) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (saturated) ? (saturated) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (carbs) ? (carbs) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (sugar) ? (sugar) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fiber) ? (fiber) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (protein) ? (protein) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (salt) ? (salt) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default withNavigation(connect(mapStateToProps, {getProduct, productSelected})(Product))