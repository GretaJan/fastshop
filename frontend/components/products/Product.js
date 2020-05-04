import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Loading from '../../components_additional/Loading';
import Modal from '../../components_additional/Modal';

class Product extends Component {
    static navigationOptions = {
        headerTitle: "PRODUCT DETAILS2",
    };

    state = {
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId
    }

    selectProduct = () => {
        // this.props.productSelected(this.props.product.subcategory_id, this.props.product.id);
        this.props.productSelected(this.props.product.id, this.props.product.subcategory_id )
    }


    async componentDidMount() {
        await this.props.getProduct( this.state.subcategoryId, this.state.productId);
    }

    render() {
        const { background } = this.props.route.params;
        const { subcategory_id, image, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, background_color } = this.props.product;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                (this.props.error !== '') ? (
                    <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.navigate("Login")} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    </View>
                ) : (
                <View style={stylesGuestSingle(background).container} >
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
                            <IonIcon style={stylesGuestSingle(background).emptyIcon} name="ios-checkmark-circle-outline" />
                        </TouchableOpacity>
                        <View style={stylesGuestSingle(background).triangle} ></View>
                        <View style={stylesGuestSingle(background).underTriangle} ></View>
                        <ScrollView style={stylesGuestSingle(background).listContainer} >
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (energy) ? (energy) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Fat</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (fat) ? (fat) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Saturated fat</Text>
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
                                <Text style={stylesGuestSingle().componentTitle} >Sugar</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (sugar) ? (sugar) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Fiber</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (fiber) ? (fiber) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Protein</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (protein) ? (protein) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Salt</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (salt) ? (salt) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={stylesGuestSingle().componentTitle} >Vitamins</Text>
                                <View style={stylesGuestSingle().listItemInfoWrap} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                </View>
                            </View>
                    </ScrollView>
                </View>
            )
        )
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    error: state.categories.error,
    loading: state.categories.loading,
})

export default withNavigation(connect(mapStateToProps, {getProduct, productSelected})(Product))