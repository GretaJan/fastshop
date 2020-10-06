import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { productSelected } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Loading from '../../components_additional/Loading';
import Modal from '../../components_additional/Modal';
import ProductComponent from './DetailRow';

class ProductDetails extends Component {
    state = {
        productDetails: [],
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId
    }

    async componentDidMount() {
        // await NetInfo.fetch(status => {
        //     if(status.isConnected)
        await this.props.getProduct( this.state.subcategoryId, this.state.productId);
        // })
        this.setState({productDetails: [
            { title: 'Energy', component: this.props.product.product.energy, measure: 'kcal' },
            { title: 'Fat', component: this.props.product.product.fat, measure: 'g' },
            { title: 'Saturated fat', component: this.props.product.product.saturated, measure: 'g' },
            { title: 'Carbohidrates', component: this.props.product.carbs, measure: 'g' },
            { title: 'Sugar', component: this.props.product.product.sugar, measure: 'g' },
            { title: 'Fiber', component: this.props.product.product.fiber, measure: 'g' },
            { title: 'Protein', component: this.props.product.product.protein, measure: 'g' },
            { title: 'Salt', component: this.props.product.product.salt, measure: 'g' },
        ]})
    }

    selectProduct = () => {
        this.props.productSelected(this.props.product.subcategory_id, this.props.product.id )
    }

    render() {
        const { image, background } = this.props.product;
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
                <View style={stylesGuestSingle(this.props.route.params.background).container} >
                    {image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().imageStyle} source={{ uri: image }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View>  
                    )}
                        <TouchableOpacity style={stylesGuestSingle().emptyItem} onPress={() => this.selectProduct()}>
                            <IonIcon style={stylesGuestSingle(background).emptyIcon} name="ios-checkmark-circle-outline" />
                        </TouchableOpacity>
                        <View style={stylesGuestSingle(background).triangle} ></View>
                        <View style={stylesGuestSingle(background).underTriangle} ></View>
                        <ScrollView style={stylesGuestSingle(background).listContainer} >
                            <FlatList data={ this.state.productDetails } renderItem={({ item }) => (
                                <ProductComponent props={ item } />
                            )} />
                        </ScrollView>
                    </View>
            )
        )
        )
    }
}

ProductDetails.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productSelected: PropTypes.func.isRequired,
    productDetails: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        component: PropTypes.number,
        measure: PropTypes.string.isRequired
    })),
    image: PropTypes.any,
    background: PropTypes.string
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    error: state.products.error,
    loading: state.products.loading,
})

export default withNavigation(connect(mapStateToProps, {getProduct, productSelected})(ProductDetails))