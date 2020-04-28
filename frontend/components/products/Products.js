import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '../../src/actions/productActions';
import { productSelected } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Product from './ProductList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';

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
        console.log('products: ', this.props.products)
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
        this.props.productSelected(item1, item2);
    }

    goToProduct = (item) => {
        this.props.navigation.push("Product", {subcategoryId: item.subcategory_id, productId: item.id, name: item.name, background: item.background_color});
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
                ) : (
                    (this.props.error !== '') ? (
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.goBack()} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    ) : (
                    <View style={stylesGuest().container}>
                        {this.getInput()}
                        {(this.props.products.length == 0) ? (
                            <Modal title="Warning" 
                                message="The list is empty. PLease go back." 
                                close={() => this.props.navigation.goBack()} 
                                ok="Go back" color={colors.mainYellow} 
                                borderColor={colors.mainYellowTransparent}
                                horizontal={20} vertical={10}/>
                            ) : (
                            !this.state.inputTriggered ? (
                                <FlatList data={this.props.products} renderItem={({item}) => (
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
    loading: state.products.loading,
    error: state.products.error,
})

export default withNavigation(connect(mapStateToProps, {getProducts, productSelected})(Products))