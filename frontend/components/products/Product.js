import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     listContainer: {
//         flex: 1,
//         flexDirection: 'row'
//     }
// })

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
        console.log('image: ', this.props.product.image)
    }

    render() {
        return (
            <View style={stylesGuestSingle().container} >
                <Text>{this.props.product.name}</Text>
                {/* <TouchableOpacity style={stylesGuestSingle().iconSelectWrap}>
                    <Icon style={stylesGuestSingle().selectItemIcon} name="ios-checkmark-circle-outline" onPress={() => this.selectProduct} />
                </TouchableOpacity> */}
                {this.props.product.image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: this.props.product.image }} />
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
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.energy) ? (this.props.product.energy) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.fat) ? (this.props.product.fat) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.saturated) ? (this.props.product.saturated) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.carbs) ? (this.props.product.carbs) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.sugar) ? (this.props.product.sugar) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.fiber) ? (this.props.product.fiber) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.protein) ? (this.props.product.protein) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.salt) ? (this.props.product.salt) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (this.props.product.vitamins) ? (this.props.product.vitamins) : ('-') }</Text>
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