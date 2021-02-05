import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Animated } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare, clearSelectedArray, goToList, sortArray } from '../../redux/actions/comparisonActions';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { productWrap } from '../../components_additional/styles/CompareStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

//Components
import Product from './selectedProductSingle';
import ConfirmModal from '../../components_additional/ModalCrud';
import EmptyList from '../../components_additional/EmptyListSelected';
import LoadingResults from '../../components_additional/LoadingResults';
import Modal from '../../components_additional/Modal';

const Animations = require('../../components_additional/styles/Animations.js');

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
        delConfirm: false,
        needAnimation: true,
        scale: new Animated.Value(1),
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
                {this.state.delConfirm && 
                    <View style={stylesGuest().delVerifyContainer}>
                        <ConfirmModal message="Are you sure you want to clear the list? " 
                            confirm={() => this.confirmClearList()}
                            title="Clear list"
                            close={() => this.setState({delConfirm: false})}
                            background={colors.mainWhiteYellow}
                            iconColor={colors.lightBurgundy}
                            borderColor={colors.bordoTransparent}
                            colorOne={colors.lightBurgundy}
                            colorTwo={colors.mediumGreen}
                            horizontal={20} vertical={15}
                        /> 
                    </View>
                }
                <MaterialIcon style={searchBar().searchBarIconSelected} name="playlist-remove" onPress={() => this.setState({delConfirm: true})}/>
                <Icon style={searchBar().searchBarIcon} name="search" onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInputInSelected} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }
    
    confirmClearList() {
        this.props.clearSelectedArray();
        this.setState({delConfirm: false})
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.navigate("Product", {subcategoryId: subcategoryId, productId: productId});
    }

    checkIfEnoughSelected(page) {
        const objectLength = Object.keys(this.props.selectedProducts).length;
        if(objectLength === 0) {
            this.setState({modalMessageNumber: true}) 
        } else {
            this.setState({modalMessageNumber: false}) 
            this.props.navigation.push(page);
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

    animateActiveBtn = () => {
        Animations.pulsingBtn(this.state.scale, this.state.needAnimation);
    }
    animateInactiveBtn = () => {
        Animations.pulsingBtnStop(this.state.scale);
    }

    goToResults = () => {
        this.props.navigation.push("Results");
    }

    render() {
        const objectLength = Object.keys(this.props.result).length;
        return (
                <View data-test='selectedComponents' style={stylesGuest().container} >
                    {this.state.loadingResults && <LoadingResults /> }
                    {(this.state.modalMessageNumber) && (
                    <Modal 
                        title="Warning" 
                        message={'Please select at least two products.'} 
                        close={() => this.setState({ modalMessageNumber: false })} 
                        ok="OK" color={colors.orange} borderColor={colors.inputOrange}
                        horizontal={20} vertical={10}/>
                    )}
                    {(this.props.selectedProducts.length == 0) ? (
                        <View style={productWrap().flatListScrollSmall} >
                            <EmptyList message={'Products have not been selected yet'} />
                        </View>
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
                            <TouchableOpacity testID="test-btn" style={productWrap().iconWrapTwo} onPress={ this.goToCriteriaPage } >
                                <IonIcon name="ios-calculator" style={productWrap().iconItem} />
                            </TouchableOpacity>
                            <View style={productWrap().textWrap} >
                                <Text style={productWrap().infoTxt}>Find best and worst match</Text>
                                <Text>Click Me!</Text>
                            </View>
                        </View> 
                        ) : (
                            <View style={productWrap().btnTwo}>                            
                                { this.animateActiveBtn() }
                                <Animated.View style={productWrap(this.state.scale).buttonWrapAnimated}>
                                    <TouchableOpacity style={productWrap().buttonAnimated} onPress={this.goToResults} >
                                        <IonIcon name="ios-stats" style={productWrap().iconItem} />
                                    </TouchableOpacity>
                                </Animated.View>
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

export default withNavigation(connect(mapStateToProps, {productSelected, deleteProductFromList, compare, clearSelectedArray, goToList, sortArray})(Products))
