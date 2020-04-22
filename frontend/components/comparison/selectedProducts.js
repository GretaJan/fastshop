import React, { Component } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare, clearResults } from '../../src/actions/comparisonActions';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import { productWrap } from '../../components_additional/styles/CompareStyles';
import ButtonStyled from '../../components_additional/Button';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';


//Components
import Product from './selectedProductSingle';
import Error from '../../components_additional/Error';
import ResultsOfAll from './ResultsOfAll';
import ResultsOfBestWorst from './ResultsOfBestWorst';

class Products extends Component {
    state = {
        // mostEnergy: '',
        // energyName: '',
        // mostFat: '',
        // fatName: '',
        // mostSaturated: '',
        // nameSaturated: '',
        // mostCarbs: '',
        // nameCarbs: '',
        // mostSugar: '',
        // nameSugar: '',
        // mostFiber: '',
        // nameFiber: '',
        // mostProtein: '',
        // nameProtein: '',
        // mostSalt: '',
        // nameSalt: '',
        // mostVitamins: '',
        // nameVitamins: '',
    }

    removeProduct = (product) => {
        this.props.deleteProductFromList(product);
    }

    comparisonResults = (result, countAll) => {
        // var result = {
        //         mostEnergy: this.state.mostEnergy,
        //         energyName: this.state.nameEnergy,
        //         mostFat: this.state.mostFat,
        //         nameFat: this.state.nameFat,
        //         mostSaturated: this.state.mostSaturated,
        //         nameSaturated: this.state.nameSaturated,
        //         mostCarbs: this.state.mostCarbs,
        //         nameCarbs: this.state.nameCarbs,
        //         mostSugar: this.state.mostSugar,
        //         nameSugar: this.state.nameSugar,
        //         mostFiber: this.state.mostFiber,
        //         nameFiber: this.state.nameFiber,
        //         mostProtein: this.state.mostProtein,
        //         nameProtein: this.state.nameProtein,
        //         mostSalt: this.state.mostSalt,
        //         nameSalt: this.state.nameSalt,
        //         mostVitamins: this.state.mostVitamins,
        //         nameVitamins: this.state.nameVitamins, 
        //     }
        this.props.compare(result, countAll);
    }

    findAll = () => {
        var array = this.props.selectedProducts;
        var energy = '';
        var fat = '';
        var saturated = '';
        var carbs = '';
        var sugar = '';
        var fiber = '';
        var protein = '';
        var salt = '';
        var vitamins = '';
        var energyN = '';
        var fatN = '';
        var saturatedN = '';
        var carbsN = '';
        var sugarN = '';
        var fiberN = '';
        var proteinN = '';
        var saltN = '';
        var vitaminsN = '';
        var energyI = '';
        var fatI = '';
        var saturatedI = '';
        var carbsI = '';
        var sugarI = '';
        var fiberI = '';
        var proteinI = '';
        var saltI = '';
        var vitaminsI = '';

        for(var i = 0; i < array.length; i++) {
            var productOne = array[i];
                energy = productOne.energy;
                energyN = productOne.name;
            for(var j = 1; j < this.props.selectedProducts.length - 1; j++) {
                var productTwo = this.props.selectedProducts[j];

                if ( productOne.fat < productTwo.fat ) {
                    fat = productTwo.fat;
                    fatN = productTwo.name;
                    fatI = productTwo.image;
                }
                if ( productOne.saturated < productTwo.saturated ) {
                    saturated = productTwo.saturated;
                    saturatedN = productTwo.name;
                    saturatedI = productTwo.image;
                }
                if ( productOne.carbs < productTwo.carbs ) {
                    carbs = productTwo.carbs;
                    carbsN = productTwo.name;
                    carbsI = productTwo.image;
                }
                if ( productOne.sugar < productTwo.enesugarrgy ) {
                    sugar = productTwo.sugar;
                    sugarN = productTwo.name;
                    sugarI = productTwo.image;
                }
                if ( productOne.fiber < productTwo.fiber ) {
                    fiber = productTwo.fiber;
                    fiberN = productTwo.name;
                    fiberI = productTwo.image;
                }
                if ( productOne.protein < productTwo.protein ) {
                    protein = productTwo.protein;
                    proteinN = productTwo.name;
                    proteinI = productTwo.image;
                }
                if ( productOne.salt < productTwo.salt ) {
                    salt = productTwo.salt;
                    saltN = productTwo.name;
                    saltI = productTwo.image;
                }
                if ( productOne.vitamins < productTwo.vitamins ) {
                    vitamins = productTwo.vitamins;
                    vitaminsN = productTwo.name;
                    vitaminsI = productTwo.image;
                }
            }
        }
        var result = {
            mostEnergy: energy,
            nameEnergy: energyN,
            mostEnergyImg: energyI,
            mostFat: fat,
            nameFat: fatN,
            mostFatImg: fatI,
            mostSaturated:saturated,
            nameSaturated: saturatedN,
            mostSaturatedImg: saturatedI,
            mostCarbs: carbs,
            nameCarbs: carbsN,
            mostCarbsImg: carbsI,
            mostSugar: sugar,
            nameSugar: sugarN,
            mostSugarImg: sugarI,
            mostFiber: fiber,
            nameFiber: fiberN,
            mostFiberImg: fiberI,
            mostProtein: protein,
            nameProtein: proteinN,
            mostProteinImg: proteinI,
            mostSalt: salt,
            nameSalt: saltN,
            mostSaltImg: saltI,
            mostVitamins: vitamins,
            nameVitamins: vitaminsN, 
            mostVitaminsImg: vitaminsI,
        }
        let countAll = true
        this.comparisonResults(result, countAll);
    }

    findBestWorst = () => {
        var array = this.props.selectedProducts;
        // var energy = '';
        // var fat = '';
        var saturatedGood = 0;
        var carbsGood = 0;
        var sugarGood = 0;
        var fiberGood = 0;
        var proteinGood = 0;
        var saltGood = 0;
        var vitaminsGood = 0;
        var saturatedBad = 0;
        var carbsBad = 0;
        var sugarBad = 0;
        var fiberBad = 0;
        var proteinBad = 0;
        var saltBad = 0;
        var vitaminsBad = 0;
        var goodComponents = [];
        var badComponents = [];
        var bestQualityProduct = '';
        var lowestQualityProduct = '';

        for(var i = 0; i < array.length; i++) {
            var productOne = array[i];
                goodComponents[i] = 0;
                badComponents[i] = 0;
            for(var j = 1; j < this.props.selectedProducts.length - 1; j++) {
                var productTwo = this.props.selectedProducts[j];
                goodComponents[j] = 0;
                badComponents[j] = 0;
                // if ( productOne.fat > productTwo.fat ) {
                //     fat = productTwo.fat;
                //     fatN = productTwo.name;
                //     goodComponents[i]++; 
                // } else {
                //     goodComponents[j]++; 
                // }
                console.log("goodTwo: ", productOne.name);
                console.log("goodOne: ", goodComponents[i]);
                console.log("BadOne: ", productTwo.name);
                console.log("BadOne: ", goodComponents[j]);
                if ( productOne.saturated < productTwo.saturated ) {
                    goodComponents[j]++; 
                } else if ( productOne.saturated > productTwo.saturated ){
                    goodComponents[i]++; 
                }
                if ( productOne.carbs < productTwo.carbs ) {
                    badComponents[j]++;
                } else if ( productOne.carbs > productTwo.carbs ) {
                    badComponents[i]++;
                }
                if ( productOne.sugar < productTwo.sugar ) {
                    badComponents[j]++;
                } else if ( productOne.sugar > productTwo.sugar ){
                    badComponents[i]++;
                }
                if ( productOne.fiber < productTwo.fiber ) {
                    goodComponents[j]++; 
                } else if ( productOne.fiber < productTwo.fiber ){
                    goodComponents[i]++; 
                }
                if ( productOne.protein < productTwo.protein ) {
                    goodComponents[j]++; 
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                } else if (productOne.protein > productTwo.protein) {
                    goodComponents[i]++; 
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                }
                if ( productOne.salt < productTwo.salt ) {
                    badComponents[j]++;
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                } else if ( productOne.salt > productTwo.salt ) {
                    badComponents[i]++;
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                }
                if ( productOne.vitamins < productTwo.vitamins ) {
                    goodComponents[j]++; 
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                } else if (productOne.vitamins > productTwo.vitamins) {
                    goodComponents[i]++; 
                    console.log("productTwo.name", productTwo.name, " one, ", productOne.name);
                }
                console.log("goodTwo: ", productOne.name);
                console.log("goodOne: ", goodComponents[i]);
                console.log("BadOne: ", productTwo.name);
                console.log("BadOne: ", goodComponents[j]);

                if(goodComponents[i] > goodComponents[j]) {
                    // healtyElementsOne = productOne.fat + productOne.fiber + productOne.protein + productOne.vitamins;
                    // healtyElementsTwo = productTwo.fat + productTwo.fiber + productTwo.protein + productTwo.vitamins;
                    // unhealtyElementsOne = productOne.carbs + productOne.salt;
                    // unhealtyElementsOne = productTwo.carbs + productTwo.salt;
                    //Quality
                    bestQualityProduct = productOne.name;
                    saturatedGood = productOne.saturated;
                    carbsGood = productOne.carbs;
                    sugarGood = productOne.sugar;
                    fiberGood = productOne.fiber;
                    proteinGood = productOne.protein;
                    saltGood = productOne.salt;
                    vitaminsGood = productOne.vitamins;
                    console.log("goodOne: ", bestQualityProduct);
                    
                } else if (goodComponents[i] < goodComponents[j]) {
                    //Quality
                    bestQualityProduct = productTwo.name;
                    saturatedGood = productTwo.saturated;
                    carbsGood = productTwo.carbs;
                    sugarGood = productTwo.sugar;
                    fiberGood = productTwo.fiber;
                    proteinGood = productTwo.protein;
                    saltGood = productTwo.salt;
                    vitaminsGood = productTwo.vitamins;
                    console.log("goodTwo: ", bestQualityProduct);
                }
                
                if (badComponents[i] > badComponents[j]) {
                    //Bad Quality
                    lowestQualityProduct = productOne.name;
                    saturatedBad = productOne.saturated;
                    carbsBad = productOne.carbs;
                    sugarBad = productOne.sugar;
                    fiberBad = productOne.fiber;
                    proteinBad = productOne.protein;
                    saltBad = productOne.salt;
                    vitaminsBad = productOne.vitamins;
                    console.log("BadTwo: ", lowestQualityProduct);
                } else if (badComponents[i] < badComponents[j]) {
                     //Bad Quality
                     lowestQualityProduct = productOne.name;
                     saturatedBad = productTwo.saturated;
                     carbsBad = productTwo.carbs;
                     sugarBad = productTwo.sugar;
                     fiberBad = productTwo.fiber;
                     proteinBad = productTwo.protein;
                     saltBad = productTwo.salt;
                     vitaminsBad = productTwo.vitamins;
                }
                console.log("BadOne: ", productTwo.vitamins);

            }
        }

        // var goodQuality = {};
        // var badQuality = {}

        // if(bestQualityProduct = '') {
        //     goodQuality = {}
        // } else {
        //     goodQuality = {
        //         productName: bestQualityProduct,
        //         saturated:saturatedGood,
        //         carbs: carbsGood,
        //         sugar: sugarGood,
        //         fiber: fiberGood,
        //         protein: proteinGood,
        //         salt: saltGood,
        //         vitamins: vitaminsGood
        //     }
        // }
        // if(worseQualityProduct == '') {
        //     badQuality = {}
        // } else {
        //     badQuality = {
        //         productName: lowestQualityProduct,
        //         saturated: saturatedBad,
        //         carbs: carbsBad,
        //         sugar: sugarBad,
        //         fiber: fiberBad,
        //         protein: proteinBad,
        //         salt: saltBad,
        //         vitamins: vitaminsBad
        //     }
        // }
        // var result = {
        //     goodQuality,
        //     badQuality
        // }
        var result = {
            goodQuality: {
                productName: bestQualityProduct,
                saturated:saturatedGood,
                carbs: carbsGood,
                sugar: sugarGood,
                fiber: fiberGood,
                protein: proteinGood,
                salt: saltGood,
                vitamins: vitaminsGood
            },
            badQuality: {
                productName: lowestQualityProduct,
                saturated: saturatedBad,
                carbs: carbsBad,
                sugar: sugarBad,
                fiber: fiberBad,
                protein: proteinBad,
                salt: saltBad,
                vitamins: vitaminsBad
            }
        }
        // var result = {
        //         productName: bestQualityProduct,
        //         saturated:saturatedGood,
        //         carbs: carbsGood,
        //         sugar: sugarGood,
        //         fiber: fiberGood,
        //         protein: proteinGood,
        //         salt: saltGood,
        //         vitamins: vitaminsGood
        //     }

        let countAll = false
        this.comparisonResults(result, countAll);
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
            (this.props.calculated == null) ? (
                <View>
                  <Error message="No products have been selected yet. Please go back or select you products here:" />
                  {/* <Button title="Products" onPress={() => this.compareProducts()} /> */}
                </View>
            ) : (
                (!this.props.calculated) ? (
                    <View style={stylesGuest().container} >
                        <FlatList contentContainerStyle={productWrap().arrayContainer } data={this.props.selectedProducts} renderItem={({item}) => (
                            <Product key={item} item={item} 
                                    removeProduct={() => this.removeProduct(item)}
                                    goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                            />
                        )} />
                        <View style={productWrap().btnsContainer} >
                            <View style={productWrap().btnOne}>
                                {/* <ButtonStyled color={colors.yellowGreenish} title="CALCULATE" func={() => this.findAll()} /> */}
                                <View style={productWrap().iconWrapOne} >
                                    <IonIcon name="ios-calculator" style={productWrap().iconItem} onPress={() => this.findAll()} />
                                </View>
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
                    </View>
                ) : (
                    (this.props.calculatedAll) ? (
                        <ResultsOfAll nameEnergy={this.props.result.nameEnergy} 
                                        mostEnergy={this.props.result.mostEnergy}
                                        mostEnergyImg={this.props.result.mostEnergyImg}
                                        nameFat={this.props.result.nameFat}
                                        mostFat={this.props.result.mostFat}
                                        mostFatImg={this.props.result.mostFatImg}
                                        nameFat={this.props.result.nameFat}
                                        nameSaturated={this.props.result.nameSaturated}
                                        mostSaturated={this.props.result.mostSaturated}
                                        mostSaturatedImg={this.props.result.mostSaturatedImg}
                                        nameCarbs={this.props.result.nameCarbs}
                                        mostCarbs={this.props.result.mostCarbs}
                                        mostCarbsImg={this.props.result.mostCarbsImg}
                                        nameSugar={this.props.result.nameSugar}
                                        mostSugar={this.props.result.mostSugar}
                                        mostSugarImg={this.props.result.mostSugarImg}
                                        nameFiber={this.props.result.nameFiber}
                                        mostFiber={this.props.result.mostFiber}
                                        nameProtein={this.props.result.nameProtein}
                                        mostProtein={this.props.result.mostProtein}
                                        mostProteinImg={this.props.result.mostProteinImg}
                                        nameSalt={this.props.result.nameSalt}
                                        mostSalt={this.props.result.mostSalt}
                                        mostSaltImg={this.props.result.mostSaltImg}
                                        nameVitamins={this.props.result.nameVitamins}
                                        mostVitamins={this.props.result.mostVitamins}
                                        mostVitaminsImg={this.props.result.mostVitaminsImg}
                                        clearResults={() => this.clearResults()}
                        />
                    ) : (
                        <ResultsOfBestWorst bestQuality={this.props.result.goodQuality.productName} 
                                        saturatedGood={this.props.result.goodQuality.saturated}
                                        carbsGood={this.props.result.goodQuality.carbs}
                                        sugarGood={this.props.result.goodQuality.sugar}
                                        fiberGood={this.props.result.goodQuality.fiber}
                                        proteinGood={this.props.result.goodQuality.protein}
                                        saltGood={this.props.result.goodQuality.salt}
                                        vitaminsGood={this.props.result.goodQuality.vitamins}
                                        lowestQuality={this.props.result.badQuality.productName}
                                        saturatedBad={this.props.result.badQuality.saturated}
                                        carbsBad={this.props.result.badQuality.carbs}
                                        sugarBad={this.props.result.badQuality.sugar}
                                        fiberBad={this.props.result.badQuality.fiber}
                                        proteinBad={this.props.result.badQuality.protein}
                                        saltBad={this.props.result.badQuality.salt}
                                        vitaminsBad={this.props.result.badQuality.vitamins}
                                        clearResults={() => this.clearResults()}
                        />
                    )
                )
                      
            )
        )
    }

}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
    calculated: state.selectedProducts.calculated,
    calculatedAll: state.selectedProducts.calculatedAll,
})

export default withNavigation(connect(mapStateToProps, {productSelected, deleteProductFromList, compare, clearResults})(Products))