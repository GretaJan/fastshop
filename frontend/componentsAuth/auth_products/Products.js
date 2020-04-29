import React, { Component } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts, getProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { authProducts } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';
import EmptyList from '../../components_additional/EmptyList';
import CircleButton from '../../components_additional/CircleButton';

class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

    async componentDidMount() {
        console.log("list: ", this.props.products, " id: ", this.state.id); 
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
            <View style={searchBar().searchBarContainer} >
                <Icon style={searchBar().searchBarIcon} name="search" size={20} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }

    goToProduct = async (item) => {
        // await this.props.getProduct();
        this.props.navigation.push("Product_Auth", { subcategoryId: item.subcategory_id, productId: item.id,  name: item.name });
    }

    render() {
        const { background } = this.props.route.params;
        return (
                this.props.loading ? (
                // <Loading background={background}/>
                <Text>Load</Text>                
                ) : (
                    <View style={authProducts(background).container}>
                    {this.getInput() }
                    <CircleButton func={() => { this.props.navigation.push("Add_Product",  {subcategoryId: this.state.id}) }} />
                    {this.props.products.length == 0 ? (
                        <EmptyList message="Products list is empty" background={background} />
                    ) : (
                        !this.state.inputTriggered ? (
                            <FlatList data={this.props.products} renderItem={({item}) => (
                                <Product item={item} 
                                        goToProduct={() => this.goToProduct(item)}
                                />
                            )} />
                        ) : (
                            <FlatList data={this.state.tempArray} renderItem={({item}) => (
                                <Product item={item} 
                                        goToProduct={() => this.goToProduct(item)}
                                />
                            )} />
                        )
                    )}
                </View>
                )
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    // updated: state.products.updated,
    loading: state.products.loading,
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProducts, getProduct})(Products))