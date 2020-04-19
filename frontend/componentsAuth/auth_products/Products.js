import React, { Component } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';


class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

    async componentDidMount() {
        await this.props.getProducts(this.state.id);
    }

    findFunction = (searchName) => {
        this.setState({ inputTriggered: true })
        const tempData =  this.props.products.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const searchData = searchName.toLowerCase();
            return itemData.indexOf(searchData) > -1;
        })
        if(searchName == '') {
            this.setState({
                // tempArray: this.props.products,
                inputTriggered: false,
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
        return (
            <View>
                <Icon name="search" size={20} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }


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
                 {this.props.loading ? (
                     <Loading />
                 ) : (
                    (this.props.error !== '') ? (
                        <Error message={this.props.error} />
                    ) : (
                     <View>
                        {this.getInput()}
                        {!this.state.inputTriggered ? (
                            <FlatList data={this.props.products} renderItem={({item}) => (
                                <Product item={item} 
                                        goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                                />
                            )} />
                        ) : (
                            <FlatList data={this.state.tempArray} renderItem={({item}) => (
                                <Product item={item} 
                                        goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                                />
                            )} />
                        )}
                        <Button title="Add product" onPress={() => { this.props.navigation.push("Add_Product", {subcategoryId: this.state.id}) }} ></Button>
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