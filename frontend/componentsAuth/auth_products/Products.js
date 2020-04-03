import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/reducers';


//Components
import Product from './ProductList';


class Products extends Component {
    state = {
        id: this.props.match.params.subcategoryId
    }

    componendDidMount() {
        this.props.getProducts(this.state.id);
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