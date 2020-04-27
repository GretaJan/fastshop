import React, { Component } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare, clearResults, goToList, sortArray, diagramResults } from '../../src/actions/comparisonActions';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { productWrap } from '../../components_additional/styles/CompareStyles';
import ButtonStyled from '../../components_additional/Button';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';


//Components
import Product from './selectedProductSingle';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';
import DescAscend from './DescAscend';
import ResultsOfBestWorst from './ResultsOfBestWorst';
import { colors } from '../../components_additional/styles/Colors';

class Products extends Component {
    state = {
        sortedArray: [],
        show: true,
        hide: false,
        modalMessageNumber: false,
        modalMessageEqual: false,
        optionsDisplay: true,
        
        // mostEnergy: '',
        // energyName: '',
        // mostFat: '',
        // fatName: '',
        // mostSaturated: '',
        // nameSaturated: '',
        // leastcarbs: '',
        // nameCarbs: '',
        // leastSugar: '',
        // nameSugar: '',
        // mostFiber: '',
        // nameFiber: '',
        // mostProtein: '',
        // nameProtein: '',
        // leastSalt: '',
        // nameSalt: '',
        // mostVitamins: '',
        // nameVitamins: '',
    }

    comparisonResults = (result) => {
        // var result = {
        //         mostEnergy: this.state.mostEnergy,
        //         energyName: this.state.nameEnergy,
        //         mostFat: this.state.mostFat,
        //         nameFat: this.state.nameFat,
        //         mostSaturated: this.state.mostSaturated,
        //         nameSaturated: this.state.nameSaturated,
        //         leastcarbs: this.state.leastcarbs,
        //         nameCarbs: this.state.nameCarbs,
        //         leastSugar: this.state.leastSugar,
        //         nameSugar: this.state.nameSugar,
        //         mostFiber: this.state.mostFiber,
        //         nameFiber: this.state.nameFiber,
        //         mostProtein: this.state.mostProtein,
        //         nameProtein: this.state.nameProtein,
        //         leastSalt: this.state.leastSalt,
        //         nameSalt: this.state.nameSalt,
        //         mostVitamins: this.state.mostVitamins,
        //         nameVitamins: this.state.nameVitamins, 
        //     }
        
        this.props.navigation.push('Results');
    }

    // componentDidMount() => {
    //     this.props.productSelected
    // }

    findBestWorst = async () => {
        var array = this.props.selectedProducts;
        var goodComponents = [];
        var badComponents = [];
        var bestQualityId = '';
        var bestQualitySubcategoryId = '';
        var lowestQualityId = '';
        var lowestQualitySubcategoryId = '';
        var percentHealthyFoodOne = 0;
        var percentUnhealthyFoodOne = 0;
        var percentHealthyFoodTwo = 0;
        var percentUnhealthyFoodTwo = 0;

    
        if(array.length < 2) {
            this.setState({modalMessageNumber: true});
        } else {
            this.setState({modalMessageNumber: false});

            for(var i = 0; i < array.length; i++) {
                var productOne = array[i];
                var goodComponent = array[0];
                var badComponent = array[0];
                const one = array[0];
     
                for(var j = 1; j < this.props.selectedProducts.length; j++) {
                    var productTwo = this.props.selectedProducts[j];
                    var percentHealthyFoodTwo = array[j];  
                    const two = array[0];

                    const oneSaturated = productOne.saturated == null ? parseInt(0) : parseFloat(productOne.saturated);
                    const twoSaturated = productTwo.saturated == null ? parseInt(0) : parseFloat(productTwo.saturated);
                    const oneFiber = productOne.fiber == null ? parseInt(0) : parseFloat(productOne.fiber);
                    const twoFiber = productTwo.fiber == null ? parseInt(0) : parseFloat(productTwo.fiber);
                    const oneProtein = productOne.protein == null ? parseInt(0) : parseFloat(productOne.protein);
                    const twoProtein = productTwo.protein == null ? parseInt(0) : parseFloat(productTwo.protein);
                    const oneVitamins = productOne.vitamins == null ? parseInt(0) : parseFloat(productOne.vitamins);
                    const twoVitamins = productTwo.vitamins == null ? parseInt(0) : parseFloat(productTwo.vitamins);

                    const oneSugar = productOne.sugar == null ? parseInt(0) : parseFloat(productOne.sugar);
                    const twoSugar = productTwo.sugar == null ? parseInt(0) : parseFloat(productTwo.sugar);
                    const oneCarbs = productOne.carbs == null ? parseInt(0) : (parseFloat(productOne.carbs) - oneSugar);
                    const twoCarbs = productTwo.carbs == null ? parseInt(0) : (parseFloat(productTwo.carbs) - twoSugar);
                    const oneSalt = productOne.salt == null ? parseInt(0) : parseFloat(productOne.salt);
                    const twoSalt = productTwo.salt == null ? parseInt(0) : parseFloat(productTwo.salt);

                    const goodQualitiesOne = oneSaturated + oneFiber + oneProtein + oneVitamins;
                    const goodQualitiesTwo = twoSaturated + twoFiber + twoProtein + twoVitamins;
                    const badQualitiesOne = oneCarbs + oneSugar + oneSalt;
                    const badQualitiesTwo = twoCarbs + twoSugar + twoSalt;

                    if ( goodQualitiesOne < goodQualitiesTwo ) {
                        goodComponent = productTwo;
                        percentHealthyFoodOne = goodQualitiesTwo;
                        percentUnhealthyFoodOne = badQualitiesTwo;
                    } else {
                        goodComponent = productOne;
                        percentHealthyFoodOne = goodQualitiesOne;
                        percentUnhealthyFoodOne = badQualitiesOne;    
                    }
                    if ( badQualitiesOne > badQualitiesTwo ) {
                        badComponent = productOne;
                        percentHealthyFoodTwo = goodQualitiesOne;
                        percentUnhealthyFoodTwo = badQualitiesOne;
                    } else {
                        badComponent = productTwo;
                        percentHealthyFoodTwo = goodQualitiesTwo;
                        percentUnhealthyFoodTwo = badQualitiesTwo;
                    }
               
                }
            }
            this.setState({modalMessageEqual: false});
            const result = {
                healthier: {
                    id: goodComponent.id,
                    subId: goodComponent.subcategory_id,
                },
                unhealthier: {
                    id: badComponent.id,
                    subId: badComponent.subcategory_id,
                } 
            }

            const resultTwo = {
                healthier: {
                    goodComponents: percentHealthyFoodOne,
                    badComponents: percentUnhealthyFoodOne 
                },
                unhealthier: {
                    goodComponents: percentHealthyFoodTwo,
                    badComponents: percentUnhealthyFoodTwo
                }
                
            }
            await this.props.compare(result);            
            this.comparisonResults();
        }
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.navigate("Product", {subcategoryId: subcategoryId, productId: productId});
    }

    clearResults = () => {
        console.log("Clear")
        this.props.clearResults();
    }

    render() {
        return (
            (this.props.selectedProducts.length == 0) ? (
                <View>
                  <Modal title="Message" 
                                message="No products have been selected yet. Please go back." 
                                close={() => this.props.navigation.navigate("Categories")} 
                                ok="OK" color={colors.mainYellow} 
                                borderColor={colors.mainYellowTransparent}
                                horizontal={20} vertical={10}/>
                </View>
            ) : (
                <View style={stylesGuest().container} >
                    {(this.state.modalMessageEqual || this.state.modalMessageNumber) && (
                    <Modal title="Warning" 
                        message={(!this.state.modalMessageEqual) ? ('Please select at least two products.') : ('Unable to compare. Products have same qualities.')} 
                        close={() => this.setState({modalMessageEqual: false, modalMessageNumber: false})} 
                        ok="OK" color={colors.mainYellow} 
                        horizontal={20} vertical={10}/>
                    )}
                    <View style={(this.state.optionsDisplay) ? (productWrap().flatListScrollSmall) : (productWrap().flatListScrollFull)}>
                        <FlatList nestedScrollEnabled={true} contentContainerStyle={productWrap().arrayContainer } data={this.props.selectedProducts} renderItem={({item}) => (
                            <Product key={item} item={item} 
                                    removeProduct={() => this.props.deleteProductFromList(item)}
                                    goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                            />
                        )} />
                    </View>
                { (this.state.optionsDisplay) && (
                <View style={productWrap().btnsContainer} >
                    <View style={productWrap().btnOne}>
                        <TouchableOpacity style={productWrap().iconWrapOne} onPress={() => this.props.goToList(this.state.hide)} >
                            <IonIcon name="md-list" style={productWrap().iconItem}  />
                        </TouchableOpacity>
                        <View style={productWrap().textWrap} >
                            <Text style={productWrap().infoTxt} >Compare each component</Text>
                            <Text>Click Me!</Text>
                        </View>
                    </View>
                    <View style={productWrap().btnTwo}>
                        <View style={productWrap().iconWrapTwo} >
                            <IonIcon name="ios-calculator" style={productWrap().iconItem} onPress={() => this.findBestWorst()} />
                        </View>
                        <View style={productWrap().textWrap} >
                            <Text style={productWrap().infoTxt}>Find best and worst products</Text>
                            <Text>Click Me!</Text>
                        </View>
                        {/* <ButtonStyled color={colors.orange} title="CALCULATE" func={() => this.findBestWorst()} /> */}
                    </View> 
                </View> 
                )}
                <TouchableOpacity style={productWrap().optionsBtnWrap} onPress={() => this.setState({optionsDisplay: !this.state.optionsDisplay})}>
                    <Text style={productWrap().optionsBtnText}>
                        {this.state.optionsDisplay ? ("Hide Options") : ("Show Options")}
                    </Text>
                </TouchableOpacity>
                {(this.props.sorted == false) && (
                    <DescAscend goBack={() => {this.props.goToList(this.state.show), console.log("Go back", this.props.sorted)}} />
                )}
            </View>
            )
        )
    }

}

const mapStateToProps = state => ({ 
    selectedProducts: state.selectedProducts.comparisonArray,
    calculated: state.selectedProducts.calculated,
    sorted: state.selectedProducts.sorted,
})

export default withNavigation(connect(mapStateToProps, {productSelected, deleteProductFromList, compare, clearResults, goToList, sortArray, diagramResults})(Products))