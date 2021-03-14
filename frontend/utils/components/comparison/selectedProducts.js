import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Platform, UIManager } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { selectProductToCalc, removeProductFromSelected, compare, clearSelectedArray, goToList, sortArray } from '../../redux/actions/comparisonActions';
import { containerStyles, textStyle } from '../../src/styles/GeneralStyles';
import { productWrap } from '../../src/styles/CompareStyles';
import { colors } from '../../src/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

//Components
import Product from './selectedProductSingle';
import Header from '../../utils/models/Header';
import ConfirmModal from '../../utils/models/ModalCrud';
import EmptyList from '../../utils/models/EmptyList';
import LoadingResults from '../../utils/models/LoadingResults';
import Modal from '../../utils/models/Modal';
import SearchBar from '../../utils/models/SearchBar';

const { comparisonAnimations } = require('../../src/styles/Animations.js');

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
class Products extends Component {
    state = {
        sortedArray: [],
        show: true,
        hide: false,
        modelMsg: '',
        optionsDisplay: true,
        showSearchInput: false,
        tempArray: this.props.selectedProducts,
        triggeredSearchBar: false,
        searchName: '',
        delConfirm: false,
        needAnimation: true,
        scaleBtn: new Animated.Value(1),
        transitionBtnsWrap: new Animated.Value(0),
        scaleBtnsWrap: new Animated.Value(1),
        locationX: 0,
        locationY: 0,
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
    
    confirmClearList() {
        this.props.clearSelectedArray();
        this.setState({delConfirm: false})
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.navigate("Product", {subcategoryId: subcategoryId, productId: productId});
    }

    callModal = (activeBtn, msg) => {
        activeBtn.measure( (fx, fy, width, height, px, py) => {
            console.log(Math.round(px + width + 5))
            console.log(Math.round(py + (height + 30)))
            this.setState({ locationX: Math.round(px + width + 5) })
            this.setState({ locationY: Math.round(py + (height - 125)) })
        })        
        this.setState({ modelMsg: msg }) 
    }

    checkIfEnoughSelected(page, activeBtn) {
        const objectLength = Object.keys(this.props.selectedProducts).length;
        if(objectLength === 0) {
            const msg = 'Please select at least two products.';
            this.callModal(activeBtn, msg)
        } else {
            this.setState({modelMsg: ''}) 
            this.props.navigation.push(page);
        } 
    }

    goToDescAscPage = () => {
        this.checkIfEnoughSelected("DescAscend", this.compareFirstBtn);
    }

    goToCriteriaPage = () => {
        if(this.props.token) {
            if(this.props.selectedProducts.length < 2){
                const msg = 'Please select at least two products.';
                this.callModal(this.compareSecBtn, msg)
            } else {
                this.checkIfEnoughSelected("Criteria", this.compareSecBtn)
            }
        } else {
            const msg = 'Please register in order to complete this action.';
            this.callModal(this.compareSecBtn, msg)
        }
    }

    showHideOptionsContainer = () => {
        const statefunc = () => {
            this.setState({optionsDisplay: !this.state.optionsDisplay })
        }
        if(this.state.optionsDisplay){
            comparisonAnimations.optionBtnsHide(this.state.transitionBtnsWrap, statefunc);   
        } else {
            comparisonAnimations.optionBtnsShow(this.state.transitionBtnsWrap, statefunc);
        }
        
    }

    deleteProduct = async (item) => {
        await this.props.removeProductFromSelected(item.id);
        this.setState({triggeredSearchBar: false});
    } 

    animateActiveBtn = () => {
        comparisonAnimations.pulsingBtn(this.state.scaleBtn, this.state.needAnimation);
    }
    animateInactiveBtn = () => {
        comparisonAnimations.pulsingBtnStop(this.state.scaleBtn);
    }

    goToResults = () => {
        if(this.props.token) {
            this.props.navigation.push("Results");
        } else {
            this.setState({ modelMsg: 'Please register in order to complete this action.' })
        }
  
    }

    render() {
        const objectLength = Object.keys(this.props.result).length;
        const { locationX, locationY, loadingResults, modelMsg, optionsDisplay, triggeredSearchBar, tempArray, scaleBtn, transitionBtnsWrap, scaleBtnsWrap } = this.state;
        const { selectedProducts } = this.props;

        return (
            <>
                <Header
                    title="Calculator"
                    navigate={ null }
                />
                <SearchBar 
                    func={ (value) => this.findFunction(value) }
                    parentValue={ this.state.searchName }
                    additionalFunc={ () => this.setState({ delConfirm: true }) }
                />      
                 { (modelMsg !== '') && (
                    <Modal 
                        title="Warning" 
                        message={ modelMsg } 
                        close={() => this.setState({ modelMsg: '' })} 
                        ok="Ok" color={colors.orange} borderColor={colors.inputOrange}
                        locationX={ locationX }
                        locationY={ locationY }
                    />
                )}
                <View data-test='selectedComponents' style={containerStyles().screenHeightContainerNoHeader} >
                        { loadingResults && <LoadingResults /> }
                            { this.state.delConfirm && (
                                <ConfirmModal 
                                    message="Are you sure you want to clear the list? " 
                                    confirm={() => this.confirmClearList()}
                                    title="CLEAR LIST"
                                    close={() => this.setState({delConfirm: false})}
                                    background={colors.mainWhiteYellow}
                                    iconColor={colors.mainBtnOrange}
                                    iconName="md-close"
                                /> 
                            )}
                            {(selectedProducts.length == 0) ? (
                                <EmptyList message={'Products have not been selected yet'} />
                            ) : (    
                            <View style={(optionsDisplay) ? (containerStyles().flatListScrollSmall) : (containerStyles().flatListScrollFull)}>
                                <FlatList 
                                    nestedScrollEnabled={true} 
                                    contentContainerStyle={ null } 
                                    data={ triggeredSearchBar ? (tempArray) : (selectedProducts) } 
                                    renderItem={({item}) => (
                                        <Product key={item} item={item} 
                                            removeProduct={() => this.deleteProduct(item)}
                                            goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                                        /> )} 
                                    />
                            </View>
                            )}
                            <Animated.View style={ productWrap(scaleBtnsWrap, transitionBtnsWrap).btnsContainer } >
                                <Text style={ productWrap().transparentStripe } ></Text>
                                <View style={ productWrap().btnOne }>
                                    <TouchableOpacity style={productWrap().iconWrapOne} ref={view => { this.compareFirstBtn = view; }} onPress={ this.goToDescAscPage } >
                                        <IonIcon name="md-list" style={productWrap().iconItem}  />
                                    </TouchableOpacity>
                                    <View style={productWrap().textWrap} >
                                        <Text style={textStyle().h2} >Compare each component</Text>
                                        <Text>Click Me!</Text>
                                    </View>
                                </View>
                                {(objectLength == 0) ? (
                                <View style={productWrap().btnTwo}>
                                    <TouchableOpacity testID="test-btn" ref={view => { this.compareSecBtn = view; }} style={productWrap().iconWrapTwo} onPress={ this.goToCriteriaPage } >
                                        <IonIcon name="ios-calculator" style={productWrap().iconItem} />
                                    </TouchableOpacity>
                                    <View style={productWrap().textWrap} >
                                        <Text style={textStyle().h2}>Find best and worst match</Text>
                                        <Text>Click Me!</Text>
                                    </View>
                                </View> 
                                ) : (
                                    <View style={productWrap().btnTwo}>                            
                                        { this.animateActiveBtn() }
                                        <Animated.View style={productWrap(scaleBtn).buttonWrapAnimated}>
                                            <TouchableOpacity style={productWrap().buttonAnimated} onPress={ this.goToResults } >
                                                <IonIcon name="ios-stats" style={productWrap().iconItem} />
                                            </TouchableOpacity>
                                        </Animated.View>
                                        <View style={productWrap().textWrap} >
                                            <Text style={textStyle().h2}>View your results</Text>
                                            <Text>Click Me!</Text>
                                        </View>
                                    </View> 
                                )}
                            </Animated.View>
                            <TouchableOpacity style={productWrap().optionsBtnWrap} onPress={ this.showHideOptionsContainer }>
                                <Text style={productWrap().optionsBtnText}>
                                    { optionsDisplay ? ("Hide Options") : ("Show Options")}
                                </Text>
                            </TouchableOpacity>
                </View>
            </>
        )
    }

}

const mapStateToProps = state => ({ 
    token: state.auth.token,
    selectedProducts: state.selectedProducts.selectedProducts,
    sorted: state.selectedProducts.sorted,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, {selectProductToCalc, removeProductFromSelected, compare, clearSelectedArray, goToList, sortArray})(Products))
