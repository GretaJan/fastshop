import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})

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
            <View style={styles.container} >
                <Text>{this.props.product.name}</Text>
                <View style={styles.listContainer} >
                    <FlatList data={[
                                    { key: "Energy:" },
                                    { key: "Fat:" },
                                    { key: "Saturated:" },
                                    { key: "Carbohidrates:" },
                                    { key: "Sugar:" },
                                    { key: "Fiber:" },
                                    { key: "Protein:" },
                                    { key: "Salt:" },
                                    { key: "Vitamins:" },
                                ]} renderItem={({item}) => 
                                                <Text>{item.key}</Text>}
                    />
                    <FlatList data={[
                                    { key: this.props.product.energy },
                                    { key: this.props.product.fat },
                                    { key: this.props.product.saturated },
                                    { key: this.props.product.carbs },
                                    { key: this.props.product.sugar },
                                    { key: this.props.product.fiber },
                                    { key: this.props.product.protein },
                                    { key: this.props.product.salt },
                                    { key: this.props.product.vitamins },
                                ]} renderItem={({item}) => 
                                                <Text>{item.key}</Text>}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default withNavigation(connect(mapStateToProps, {getProduct})(Product))