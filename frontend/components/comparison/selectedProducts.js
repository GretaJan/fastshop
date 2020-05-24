import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare, clearSelectedArray, goToList, sortArray, diagramResults } from '../../src/actions/comparisonActions';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { productWrap } from '../../components_additional/styles/CompareStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Components
import Product from './selectedProductSingle';
import Error from '../../components_additional/Error';
import EmptyList from '../../components_additional/EmptyListSelected';
import DescAscend from './DescAscend';
import LoadingResults from '../../components_additional/LoadingResults';
import Modal from '../../components_additional/Modal';

class Products extends Component {
    state = {
        sortedArray: [],
        show: true,
        hide: false,
        modalMessageNumber: false,
        optionsDisplay: true,
        showSearchInput: false,
        tempArray: this.props.selectedProducts,
        triggeredSearchBar: false,
        searchName: '',
    }
    findFunction(searchName) {
        this.setState({ triggeredSearchBar: true });
        const tempData = this.props.selectedProducts.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : '';
            const searchData = searchName.toUpperCase();
            return itemData.indexOf(searchData) > -1;
        })
        if(searchName == '') {
            this.setState({
                triggeredSearchBar: false,
                searchName: searchName,
            })
        } else {
            this.setState({
                tempArray: tempData,
                searchName: searchName,
            })
        } 
    }

    showSearchBar = () => {
        return (
            <View style={searchBar().searchBarContainer} >
                <Icon style={searchBar().searchBarIcon} name="search" size={20} onPress={() => this.props.clearSelectedArray()}/>
                <Icon style={searchBar().searchBarIcon} name="search" size={20} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }

    componentDidUpdate(prevState) {
        return prevState.selProducts !== this.state.selProducts;
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.navigate("Product", {subcategoryId: subcategoryId, productId: productId});
    }

    checkIfEnoughSelected(page) {
        const objectLength = Object.keys(this.props.selectedProducts).length;
        if(objectLength === 0) {
            this.setState({modalMessageNumber: true}) 
            console.log("false", objectLength)
        } else {
            this.setState({modalMessageNumber: false}) 
            this.props.navigation.push(page);
            console.log("true")
        }
    }

    goToDescAscPage = () => {
        this.checkIfEnoughSelected("DescAscend");
    }

    goToCriteriaPage = () => {
        this.checkIfEnoughSelected("Criteria");
    }

    deleteProduct = async (item) => {
        await this.props.deleteProductFromList(item.id);
        this.setState({triggeredSearchBar: false});
    } 

    render() {
        const objectLength = Object.keys(this.props.result).length
        return (
                <View style={stylesGuest().container} >
                    {this.state.loadingResults && <LoadingResults /> }
                    {(this.state.modalMessageNumber) && (
                    <Modal title="Warning" 
                        message={'Please select at least two products.'} 
                        close={() => this.setState({ modalMessageNumber: false })} 
                        ok="OK" color={colors.orange} borderColor={colors.inputOrange}
                        horizontal={20} vertical={10}/>
                    )}
                    {(this.props.selectedProducts.length == 0) ? (
                        <EmptyList message={'Products have not been selected yet'} />
                    ) : (    
                    <View style={(this.state.optionsDisplay) ? (productWrap().flatListScrollSmall) : (productWrap().flatListScrollFull)}>
                        {this.showSearchBar()}
                        {this.state.triggeredSearchBar ? (
                            <FlatList nestedScrollEnabled={true} contentContainerStyle={productWrap().arrayContainer } data={this.state.tempArray} renderItem={({item}) => (
                                <Product key={item} item={item} 
                                        removeProduct={() => this.deleteProduct(item)}
                                        goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                                />
                            )} />
                        ) : (
                            <FlatList nestedScrollEnabled={true} contentContainerStyle={productWrap().arrayContainer } data={this.props.selectedProducts} renderItem={({item}) => (
                                <Product key={item} item={item} 
                                        removeProduct={() => this.deleteProduct(item)}
                                        goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                                />
                            )} />
                        )}
                    </View>
                    )}
                { (this.state.optionsDisplay) && (
                <View style={productWrap().btnsContainer} >
                    <Text style={productWrap().transparentStripe} ></Text>
                    <View style={productWrap().btnOne}>
                        <TouchableOpacity style={productWrap().iconWrapOne} onPress={ this.goToDescAscPage } >
                            <IonIcon name="md-list" style={productWrap().iconItem}  />
                        </TouchableOpacity>
                        <View style={productWrap().textWrap} >
                            <Text style={productWrap().infoTxt} >Compare each component</Text>
                            <Text>Click Me!</Text>
                        </View>
                    </View>
                    {(objectLength == 0) ? (
                        <View style={productWrap().btnTwo}>
                            <TouchableOpacity style={productWrap().iconWrapTwo} onPress={ this.goToCriteriaPage } >
                                <IonIcon name="ios-calculator" style={productWrap().iconItem} />
                            </TouchableOpacity>
                            <View style={productWrap().textWrap} >
                                <Text style={productWrap().infoTxt}>Find best and worst match</Text>
                                <Text>Click Me!</Text>
                            </View>
                        </View> 
                        ) : (
                        <View style={productWrap().btnTwo}>
                            <TouchableOpacity style={productWrap().iconWrapTwo} onPress={() => this.props.navigation.push("Results") } >
                                <IonIcon name="ios-stats" style={productWrap().iconItem} />
                            </TouchableOpacity>
                            <View style={productWrap().textWrap} >
                                <Text style={productWrap().infoTxt}>View your results</Text>
                                <Text>Click Me!</Text>
                            </View>
                        </View> 
                    )} 
                </View> 
                )}
                <TouchableOpacity style={productWrap().optionsBtnWrap} onPress={() => this.setState({optionsDisplay: !this.state.optionsDisplay})}>
                    <Text style={productWrap().optionsBtnText}>
                        {this.state.optionsDisplay ? ("Hide Options") : ("Show Options")}
                    </Text>
                </TouchableOpacity>
            </View>
            )
    }

}

const mapStateToProps = state => ({ 
    selectedProducts: state.selectedProducts.comparisonArray,
    sorted: state.selectedProducts.sorted,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, {productSelected, deleteProductFromList, compare, clearSelectedArray, goToList, sortArray, diagramResults})(Products))