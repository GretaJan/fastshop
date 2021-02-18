import React, { Component } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { closeErrorWarning } from '../../redux/actions/generalActions';
import { selectProductToCalc, removeProductFromSelected } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/models/Loading';
import EmptyList from '../../components_additional/models/EmptyList';
import Modal from '../../components_additional/models/Modal';

class Products extends Component {
    state = {
        id: this.props.route.params.subcategoryId,
        tempArray: this.props.products,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false,
        // overload: null,
        modelMsg: '',
    }

    componentDidMount() {
        this.props.getProducts(this.props.allProducts, this.state.id, 0);
    }

    handleLoadMore = () => {
        this.props.getProducts(this.props.allProducts, this.state.id, this.props.nextPage); 
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
        this.props.navigation.push("Product", {subcategoryId: item.subcategory_id, productId: item.id, name: item.name, background: item.background});
    }


    render() {
        const { background } = this.props.route.params;
        const { modelMsg } = this.state;
        const { selectedProducts } = this.props;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>             
                    ) : (
                        <>
                        {/* { this.props.error !== '' && (
                            <Modal title="Warning" 
                                message={this.props.error} 
                                close={() => this.props.closeErrorWarning('REMOVE_GET_PRODUCTS_ERROR') }
                                ok="OK" color={colors.bordo} 
                                borderColor={colors.bordoTransparent}
                                horizontal={20} vertical={10}
                            />
                        )} */}
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
                            {this.getInput()}
                            {(this.props.products.length == 0) ? (
                                    <EmptyList message="The List is empty" background={background} />
                                ) : (
                                    <FlatList 
                                            data={  !this.state.inputTriggered ? this.props.products : this.state.tempArray} 
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={(this.props.nextPage < this.props.lastPage) ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.02}
                                            ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                            renderItem={({item}) => (
                                        <Product 
                                                ref={ view => { this.productRef = view } }
                                                item={item} 
                                                selectProduct={(productId) =>this.props.selectProductToCalc(selectedProducts, productId) } 
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
    tempArray: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        image: PropTypes.any,
    })),
    searchName: PropTypes.string,
    inputTriggered: PropTypes.bool,
    showSearchInput: PropTypes.bool,
    // overload: PropTypes.any,
    products: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        image: PropTypes.any,
    })),
    nextPage: PropTypes.number,
    lastPage: PropTypes.bool,
    loading: PropTypes.bool,
    loadingNext: PropTypes.bool,
    error: PropTypes.string,
    selectedProducts: PropTypes.array
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    allProducts: state.dataUpload.allProducts,
    products: state.products.products,
    nextPage: state.products.nextPage,
    lastPage: state.products.lastPage,
    loading: state.products.loading,
    loadingNext: state.products.loadingNext,
    error: state.products.error,
})

export default withNavigation(connect(mapStateToProps, {getProducts, closeErrorWarning, selectProductToCalc, removeProductFromSelected })(Products))