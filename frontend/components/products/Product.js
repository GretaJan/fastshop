import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';

class Product extends Component {
    state = {
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId
    }

    // static getDerivedStateFromProps(props) {
    //     console.log("Product is: ", props.product.name)
    // }

    componentDidMount() {
        this.props.getProduct( this.state.subcategoryId, this.state.productId);
    }

    render() {
        return (
            <View>
                <Text>{ this.props.product.id }</Text>
                <Text>{ this.props.product.name }</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default withNavigation(connect(mapStateToProps, {getProduct})(Product))