import React, { Component } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { searchBar } from '../../../src/styles/AdditionalStyles';
import { authProducts } from '../../../src/styles/ProductStyles';
import { backgroundForPages } from '../../../src/styles/AdditionalStyles';
import { colors } from '../../../src/styles/Colors';

//Components
import Product from './ProductList';
import Loading from '../../../utils/models/Loading';
import Modal from '../../../utils/models/Modal';
import EmptyList from '../../../utils/models/EmptyList';
import CircleButton from '../../../utils/models/CircleButton';

class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

    async componentDidMount() {
        await this.props.getProducts(this.props.route.params.subcategoryId, 1);
    }

    handleLoadMore = () => {
        setTimeout(() => {
            this.props.getProducts(this.state.id, this.props.currentPage + 1); 
        }, 600)
    }

    renderFooter = () => {
        return (
            <Loading />
        )
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

    goToProduct = (item) => {
        this.props.navigation.push("Product_Auth", { subcategoryId: item.subcategory_id, productId: item.id,  name: item.name });
    }

    render() {
        const { background } = this.props.route.params;
        return (
            this.props.loading ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>          
                ) : (
                    (this.props.error !== '') ? (
                        <View style={backgroundForPages(background).backgroundContainer} >
                            <Modal title="Warning" 
                                message={this.props.error} 
                                close={() => this.props.navigation.goBack()} 
                                ok="OK" color={colors.bordo} 
                                borderColor={colors.bordoTransparent}
                                horizontal={20} vertical={10}/>
                        </View>
                    ) : (
                        <View style={authProducts(background).container}>
                            {this.getInput() }
                            <CircleButton func={() => { this.props.navigation.push("Add_Product",  {subcategoryId: this.state.id, background: background}) }} />
                            {this.props.products.length == 0 ? (
                                <EmptyList message="Products list is empty" background={background} />
                            ) : (
                                <FlatList data={!this.state.inputTriggered ? this.props.products : this.state.tempArray} 
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={!this.props.lastPage ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.01}
                                            ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                            renderItem={({item}) => (
                                            <Product item={item} 
                                                    goToProduct={() =>  this.goToProduct(item)}
                                            />
                                    )}/>
                                )}
                        </View>
                    )
                )
            )
        }
    }

Products.propTypes = {
    getProducts: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.any,
        background: PropTypes.string
    }))
} 

const mapStateToProps = state => ({
    products: state.products.products,
    currentPage: state.products.currentPage,
    lastPage: state.products.lastPage,
    loading: state.products.loading,
    loadingNext: state.products.loadingNext,
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProducts})(Products))