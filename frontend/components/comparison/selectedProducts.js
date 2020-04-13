import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getProducts } from '../../src/actions/productActions';
import { productSelected, deleteProductFromList } from '../../src/actions/comparisonActions';

//Components
import Product from './selectedProductSingle';


class Products extends Component {
    state = {
    }

    // componentDidMount() {
    //     this.props.getProducts(this.state.id);
    // }

    removeProduct = (product) => {
        this.props.deleteProductFromList(product);
    }

    compareProducts = () => {
        console.log("Compare: ", this.props.selectedProducts);
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.push("Product_Auth", {subcategoryId: subcategoryId, productId: productId});
    }

    render() {
        return (
            <View>
                <FlatList data={this.props.selectedProducts} renderItem={({item}) => (
                    <Product item={item} 
                            removeProduct={(product) => this.removeProduct(product)}
                            goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                    />
                )} />
                <Button title="Calculate" onPress={() => this.compareProducts()} />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray
})

export default withNavigation(connect(mapStateToProps, {getProducts, productSelected, deleteProductFromList})(Products))