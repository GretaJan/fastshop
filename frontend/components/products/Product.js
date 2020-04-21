import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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

    // static getDerivedStateFromProps(props) {
    //     console.log("Product is: ", props.product.name)
    // }

    async componentDidMount() {
        await this.props.getProduct( this.state.subcategoryId, this.state.productId);
    }

    render() {
        return (
            <View style={stylesGuestSingle().container} >
                <Text>{this.props.product.name}</Text>
                {this.props.product.image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: this.props.product.image }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                )}
                    <View style={stylesGuestSingle().emptyItem}>
                        <Icon style={stylesGuestSingle().emptyIcon} name="info" />
                    </View>
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

export default withNavigation(connect(mapStateToProps, {getProduct})(Product))