import React, { Component } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';
import { selectProductToCalc, removeProductFromSelected } from '../../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { containerStyles } from '../../../src/styles/GeneralStyles';
import { backgroundForPages } from '../../../src/styles/AdditionalStyles';
import { colors } from '../../../src/styles/Colors';

//Components
import Product from './ProductList';
import Header from '../../../utils/models/Header';
import Loading from '../../../utils/models/Loading';
import EmptyList from '../../../utils/models/EmptyList';
import Modal from '../../../utils/models/Modal';
import SearchBar from '../../../utils/models/SearchBar';

class Products extends Component {
    state = {
        loading: true,
        loadingNext: false,
        subcategoryId: this.props.route.params.subcategoryId,
        products: [], 
        searchProducts: [], 
        error: '', 
        currentPage: 0, 
        lastPage: 0,
        searchName: '',
        inputTriggered: false,
        modelMsg: ''
    }

    componentDidMount(){
        getProducts(this.state.subcategoryId, 0).then(response => {
            if(response){
                console.log("response", response)
                const productsResp = response.products;
                this.setState({ 
                    products: productsResp, 
                    searchProducts: productsResp, 
                    lastPage: response.lastPage 
                })
            } else {
                this.setState({ error: 'Įvyko klaida.' })
            }
            this.setState({ loading: false })
        })
    }

    handleLoadMore = () => {
        this.setState({ loadingNext: true })
        const { subcategoryId, currentPage } = this.state;
        const nextPage = currentPage + 1;
        getProducts(subcategoryId, nextPage).then(response => {
            if(response){
                this.setState({ 
                    products: response, 
                    searchProducts: response, 
                })
            } else {
                this.setState({ error: 'Įvyko klaida.' })
            }
            this.setState({ loadingNext: false })
        })
    }

    renderFooter = () => {
        return (
            <Loading />
        )
    }

    findFunction = (searchName) => {
        this.setState({ inputTriggered: true })
        const tempData =  this.state.products.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const searchData = searchName.toLowerCase();
            return itemData.indexOf(searchData) > -1;
        })
        if(searchName == '') {
            this.setState({
                inputTriggered: false,
                searchName: searchName
            })
        } else {
            this.setState({
                searchProducts: tempData,
                searchName: searchName
            })
        }
    }

    callModal = (activeBtn, msg) => {
        activeBtn.measure( (fx, fy, width, height, px, py) => {
            this.setState({ locationX: Math.round(px + width + 5) })
            this.setState({ locationY: Math.round(py + (height + 30)) })
        })        
        this.setState({ modelMsg: msg }) 
    }

     selectProduct = (productId) => {
        // if(this.props.selectedProducts.length <= 30) {
            this.props.selectProductToCalc(this.props.selectedProducts, productId);
        // } else {
        //     const msg = 'Please select no more than 30 items.';
        //     this.callModal(this.productRef, msg)
        // }
    }

    callOverloadError = () => {
        const msg = 'Please select no more than 30 items.';
        this.callModal(this.productRef, msg)
    }


    goToProduct = (item) => {
        const { name, categoryId, categoryName } = this.props.route.params;
        this.props.navigation.push("Product", {
            subcategoryId: item.subcategory_id, 
            subcategoryName: name,
            productId: item.id, 
            background: item.background,
            categoryId: categoryId,
            categoryName: categoryName,
        });
    }


    render() {
        const { background, name, categoryId, categoryName } = this.props.route.params;
        const { 
            modelMsg, 
            loading, 
            loadingNext, 
            products, 
            subcategoryId,
            searchProducts, 
            error, 
            currentPage, 
            lastPage, 
            searchName, 
            inputTriggered,
        } = this.state;
        const { selectedProducts } = this.props;

        return (
            loading ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>             
                ) : (
                    <>
                    { error !== '' && (
                        <Modal title="Warning" 
                            message={ error } 
                            close={() => this.setState({ error: '' }) }
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}
                        />
                    )}
                    <Header 
                        title={ name }
                        navigate={ () => this.props.navigation.push("Subcategories", {
                            categoryId: categoryId, 
                            name: categoryName, 
                            background: background
                        }) }
                    />
                    <SearchBar 
                        func={ (value) => this.findFunction(value) }
                        parentValue={ searchName }
                    />
                    <View style={containerStyles(background).simpleContainer}>
                        { modelMsg !== '' && (
                            <Modal title="Limit exceeded" 
                                message={ modelMsg } 
                                close={() => this.setState({ modelMsg: '' })} 
                                ok="OK" color={colors.orange} 
                                borderColor={colors.inputOrange}
                                horizontal={20} vertical={10}
                            />
                        )}
                        {(products.length == 0) ? (
                                <EmptyList message="The List is empty" background={background} />
                            ) : (
                                <FlatList 
                                    data={ !inputTriggered ? products : searchProducts} 
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={(currentPage < lastPage) ? this.handleLoadMore : null}
                                    onEndReachedThreshold={0.02}
                                    ListFooterComponent={ loadingNext ? this.renderFooter : null } 
                                    renderItem={({item}) => (
                                        <Product 
                                            ref={ view => { this.productRef = view } }
                                            item={item} 
                                            selectProduct={(productId) => this.props.selectProductToCalc(selectedProducts, productId, subcategoryId) } 
                                            removeProductFromSelected={(productId) =>  this.props.removeProductFromSelected(productId) }
                                            goToProduct={() => this.goToProduct(item)}
                                            selectedProducts={ selectedProducts } 
                                            callModal={ this.callOverloadError }
                                        />
                                )} />
                        )}
                    </View>
                </>
            )
        )
    }
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    searchProducts: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        image: PropTypes.any,
    })),
    searchName: PropTypes.string,
    inputTriggered: PropTypes.bool,
    products: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        image: PropTypes.any,
    })),
    currentPage: PropTypes.number,
    lastPage: PropTypes.bool,
    loading: PropTypes.bool,
    loadingNext: PropTypes.bool,
    error: PropTypes.string,
    selectedProducts: PropTypes.array
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.selectedProducts,
})

export default withNavigation(connect(mapStateToProps, { selectProductToCalc, removeProductFromSelected })(Products))