import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts, unmountProducts } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import EmptyList from '../../components_additional/EmptyList';
import Modal from '../../components_additional/Modal';

class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false,
        overload: null,
    }

    async componentDidMount() {
        await this.props.getProducts(this.state.id, 1);
    }

    componentWillUnmount() {
        this.props.unmountProducts();
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
                <Icon style={searchBar().searchBarIcon} name="search" onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }

     selectProduct = (item1, item2) => {
        if(this.props.comparisonArray.length <= 3) {
            this.props.productSelected(item1, item2);
        } else {
            this.setState({overload: 'Please select no more than 30 items.'})
            console.log(this.state.overload)
        }
    }

    goToProduct = (item) => {
        this.props.navigation.push("Product", {subcategoryId: item.subcategory_id, productId: item.id, name: item.name, background: item.background_color});
    }

    render() {
        const { background } = this.props.route.params;
        return (
            (this.props.loading) ? (
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
                    <View style={stylesGuest(background).container}>
                        {this.state.overload !== null && (
                            <Modal title="Limit exceeded" 
                                message={this.state.overload} 
                                close={() => this.setState({overload: null})} 
                                ok="OK" color={colors.orange} 
                                borderColor={colors.inputOrange}
                                horizontal={20} vertical={10}/>
                        )}
                        {this.getInput()}
                        {(this.props.products.length == 0) ? (
                            // <View style={backgroundForPages(background).backgroundContainer} >
                                <EmptyList message="The List is empty" background={background} />
                            // </View>
                            ) : (
                            !this.state.inputTriggered ? (
                                <FlatList data={this.props.products} 
                                // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                        onEndReached={!this.props.lastPage ? this.handleLoadMore : null}
                                        onEndReachedThreshold={0.01}
                                        ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                        renderItem={({item}) => (
                                    <Product key={item} item={item} 
                                        selectProduct={(item1, item2) => this.selectProduct(item1, item2)} 
                                        goToProduct={() => this.goToProduct(item)} />
                                    )} />
                            ) : (
                                <FlatList data={this.state.tempArray} renderItem={({item}) => (
                                    <Product key={item} item={item} 
                                        selectProduct={(item1, item2) => this.selectProduct(item1, item2)} 
                                        goToProduct={() => this.goToProduct(item)} />
                                )} />
                            )
                        )}
                    </View>
                )
            )
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    currentPage: state.products.currentPage,
    lastPage: state.products.lastPage,
    loading: state.products.loading,
    loadingNext: state.products.loadingNext,
    error: state.products.error,
    comparisonArray: state.selectedProducts.comparisonArray,
})

export default withNavigation(connect(mapStateToProps, {getProducts, productSelected, unmountProducts})(Products))