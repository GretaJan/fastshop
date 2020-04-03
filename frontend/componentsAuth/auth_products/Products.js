import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';

//Components
import Product from './ProductList';


class Products extends Component {
    state = {
        id: this.props.match.params.subcategoryId
    }

    componentDidMount() {
        console.log("Product!");
        console.log("categoryID: ",this.props.match.params.subcategoryId);
        this.props.getProducts(this.state.id);
    }

    render() {
        return (
            <View>
                 <Text>Products Auth</Text>
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