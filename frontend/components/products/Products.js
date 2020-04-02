import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/reducers';


//Components
import Product from './ProductList';


class Products extends Component {

    componendDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <View>
                 <Text>Products</Text>
                <FlatList data={this.props.products} renderItem={({item}) => (
                    <Product item={item} />
                )} />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    products: state.products.products
})

export default connect(mapStateToProps, {getProducts})(Products)