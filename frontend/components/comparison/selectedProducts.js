import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';
import { productSelected, deleteProductFromList } from '../../src/actions/comparisonActions';

//Components
import Product from './selectedProductSingle';


class Products extends Component {
    state = {
    }

    componentDidMount() {
        this.props.getProducts(this.state.id);
    }

    removeProduct = (product) => {
        this.props.deleteProductFromList(product);
    }

    compareProducts = () => {
        console.log("Compare: ", this.props.selectedProducts);
    }

    render() {
        return (
            <View>
                <Text>Selected Products</Text>
                <FlatList data={this.props.selectedProducts} renderItem={({item}) => (
                    <Product item={item} removeProduct={(product) => this.removeProduct(product)}/>
                )} />
                <Button title="Calculate" onPress={() => this.compareProducts()} />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray
})

export default connect(mapStateToProps, {getProducts, productSelected, deleteProductFromList})(Products)