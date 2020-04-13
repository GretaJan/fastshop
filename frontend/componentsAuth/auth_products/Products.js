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

    // componentDidUpdate(nextProps) {
    //     var updatedProduct = false;
    //     this.props.products.map(product => {
    //         nextProps.products.map(product2 => {
    //             if(product.name !== product2.name) {
    //                 updatedProduct = true
    //             }
    //         })})
    //        if(updatedProduct) {
    //         this.props.getProducts(this.state.id);
    //        }
    // } 

    componentDidUpdate(nextProps) {
        if (this.props.updated) {
            console.log("did update", this.props.updated);
        } else {
            console.log("did not update ",this.props.updated);
        }
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.push("Product_Auth", {subcategoryId: subcategoryId, productId: productId});
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
                            <Product item={item} 
                                    goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                            />
                        )} />
                        <Button title="Add product" onPress={() => { this.props.navigation.push("Add_Product", {subcategoryId: this.state.subcategory_id}) }} ></Button>
                    </View>
                 ))}
               
            </View>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    updated: state.products.updated,
    loading: state.products.loading,
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProducts})(Products))