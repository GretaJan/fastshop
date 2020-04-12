import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';


class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId
    }

    async componentDidMount() {
        await this.props.getProducts(this.state.id);
    }

    render() {
        return (
            <View>
                 <Text>Products Auth</Text>
                 {this.props.loading ? (
                     <Loading />
                 ) : (
                    (this.props.error !== '') ? (
                        <Error message={this.props.error} />
                    ) : (
                     <View>
                        <FlatList data={this.props.products} renderItem={({item}) => (
                            <Product item={item} />
                        )} />
                        <Button title="Add product" onPress={() => { this.props.navigation.push("Add_Product", {productId: this.state.id}) }} ></Button>
                    </View>
                 ))}
               
            </View>
        )
    }
}

const mapStateToProps = state => (console.log("array of products: ", state.products.products),{
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProducts})(Products))