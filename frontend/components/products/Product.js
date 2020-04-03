import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';

class Product extends Component {
    state = {
        id: this.props.match.params.productId
    }

    componentDidMount() {

        const subcategory_id = this.props.product.subcategory_id
        
        this.props.getProduct(subcategory_id, this.state.id);
    }

    render() {
        return (
            <View>
                <Text>{ this.props.product.id }</Text>
                <Text>{ this.props.product.id }</Text>
                <Text></Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default connect(mapStateToProps, {getProduct})(Product)