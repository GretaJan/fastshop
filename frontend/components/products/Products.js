import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: ''
    }

    async componentDidMount() {
        await this.props.getProducts(this.state.id);
    }

    

    findFunction = (searchName) => {
        const tempData =  this.props.products.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const searchData = searchName.toLowerCase();
            return itemData.indexOf(searchData) > -1;
        })
        if(searchName == '') {
            this.setState({
                tempArray: this.props.products,
                searchName: searchName
            })
        } else {
            this.setState({
                tempArray: tempData,
                searchName: searchName
            })
        }
    }

    getInput = () => {
        return <TextInput placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />
    }

    selectProduct = (item1, item2) => {
        this.props.productSelected(item1, item2);
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
                ) : (
                    (this.props.error !== '') ? (
                        <Error message={this.props.error} />
                    ) : (
                    <View>
                        <FlatList ListHeaderComponent={this.getInput} data={this.state.tempArray} renderItem={({item}) => (
                            <Product item={item} 
                                    selectProduct={(item1, item2) => this.selectProduct(item1, item2)} 
                                    goToProduct={(id1, id2) => this.props.navigation.push("Product", {subcategoryId: id1, productId: id2})} 
                            />
                        )} />
                    </View>
                )
            )
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProducts, productSelected})(Products))