import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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
                <View style={stylesGuestSingle().listContainer} >
                    <FlatList style={stylesGuestSingle().listItemsTitleWrap} 
                                data={[
                                    { key: "Energy:" },
                                    { key: "Fat:" },
                                    { key: "Saturated:" },
                                    { key: "Carbohidrates:" },
                                    { key: "Sugar:" },
                                    { key: "Fiber:" },
                                    { key: "Protein:" },
                                    { key: "Salt:" },
                                    { key: "Vitamins:" },
                                ]} renderItem={({item}) => 
                                                <Text style={stylesGuestSingle().listItemsTitle } >{item.key}</Text>}
                    />
                    <FlatList style={stylesGuestSingle().listItemsWrap}
                                data={[
                                    { key: (this.props.product.energy) ? (this.props.product.energy) : ('-') },
                                    { key: (this.props.product.fat) ? (this.props.product.fat) : '-' },
                                    { key: (this.props.product.saturated) ? (this.props.product.saturated) : '-' },
                                    { key: (this.props.product.carbs) ? (this.props.product.carbs) : '-' },
                                    { key: (this.props.product.sugar) ? (this.props.product.sugar) : '-' },
                                    { key: (this.props.product.fiber) ? (this.props.product.fiber) : '-'  },
                                    { key: (this.props.product.protein) ? (this.props.product.protein) : '-'  },
                                    { key: (this.props.product.salt) ? (this.props.product.salt) : '-'  },
                                    { key: (this.props.product.vitamins) ? (this.props.product.vitamins) : '-'  },
                                ]} renderItem={({item}) => 
                                                <Text style={stylesGuestSingle().listItems } >{item.key}</Text>}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default withNavigation(connect(mapStateToProps, {getProduct})(Product))