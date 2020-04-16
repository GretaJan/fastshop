import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare, clearResults } from '../../src/actions/comparisonActions';

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

    comparisonResults = (result) => {
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
        this.props.compare(result);
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

        for(var i = 0; i < array.length; i++) {
            var productOne = array[i];
                energy = productOne.energy;
                energyN = productOne.name;
            for(var j = 1; j < this.props.selectedProducts.length; j++) {
                var productTwo = this.props.selectedProducts[j];

                if ( productOne.fat < productTwo.fat ) {
                    fat = productTwo.fat;
                    fatN = productTwo.name;
                }
                if ( productOne.saturated < productTwo.saturated ) {
                    saturated = productTwo.saturated;
                    saturatedN = productTwo.name;
                }
                if ( productOne.carbs < productTwo.carbs ) {
                    carbs = productTwo.carbs;
                    carbsN = productTwo.name;
                }
                if ( productOne.sugar < productTwo.enesugarrgy ) {
                    sugar = productTwo.sugar;
                    sugarN = productTwo.name;
                }
                if ( productOne.fiber < productTwo.fiber ) {
                    fiber = productTwo.fiber;
                    fiberN = productTwo.name;
                }
                if ( productOne.protein < productTwo.protein ) {
                    protein = productTwo.protein;
                    proteinN = productTwo.name;
                }
                if ( productOne.salt < productTwo.salt ) {
                    salt = productTwo.salt;
                    saltN = productTwo.name;
                }
                if ( productOne.vitamins < productTwo.vitamins ) {
                    vitamins = productTwo.vitamins;
                    vitaminsN = productTwo.name;
                }
            }
        }
        var result = {
            mostEnergy: energy,
            nameEnergy: energyN,
            mostFat: fat,
            nameFat: fatN,
            mostSaturated:saturated,
            nameSaturated: saturatedN,
            mostCarbs: carbs,
            nameCarbs: carbsN,
            mostSugar: sugar,
            nameSugar: sugarN,
            mostFiber: fiber,
            nameFiber: fiberN,
            mostProtein: protein,
            nameProtein: proteinN,
            mostSalt: salt,
            nameSalt: saltN,
            mostVitamins: vitamins,
            nameVitamins: vitaminsN, 
        }
        const countAll = true
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
            for(var j = 1; j < this.props.selectedProducts.length; j++) {
                var productTwo = this.props.selectedProducts[j];

                // if ( productOne.fat > productTwo.fat ) {
                //     fat = productTwo.fat;
                //     fatN = productTwo.name;
                //     goodComponents[i]++; 
                // } else {
                //     goodComponents[j]++; 
                // }
                if ( productOne.saturated < productTwo.saturated ) {
                    goodComponents[j]++; 
                    console.log("first less: sat: productOne ", productOne.name + " " + productOne.saturated + " productTwo: " + productTwo.name + " " + productTwo.saturated )
                } else if ( productOne.saturated > productTwo.saturated ){
                    goodComponents[i]++; 
                    console.log("first less: sat: productOne ", productOne.name + " " + productOne.saturated + " productTwo: " + productTwo.name + " " + productTwo.saturated )
                }
                if ( productOne.carbs < productTwo.carbs ) {
                    badComponents[j]++;
                    console.log("first less: carbs: productOne ", productOne.name + " " + productOne.carbs + " productTwo: " + productTwo.name + " " + productTwo.carbs )

                } else if ( productOne.carbs > productTwo.carbs ) {
                    badComponents[i]++;
                    console.log("first less: carbs: productOne ", productOne.name + " " + productOne.carbs + " productTwo: " + productTwo.name + " " + productTwo.carbs )
                }
                if ( productOne.sugar < productTwo.sugar ) {
                    badComponents[j]++;
                    console.log("first less: sugar: productOne ", productOne.name + " " + productOne.sugar + " productTwo: " + productTwo.name + " " + productTwo.sugar )

                } else if ( productOne.sugar > productTwo.sugar ){
                    badComponents[i]++;
                    console.log("first less: sugar: productOne ", productOne.name + " " + productOne.sugar + " productTwo: " + productTwo.name + " " + productTwo.sugar )
                }
                if ( productOne.fiber < productTwo.fiber ) {
                    goodComponents[j]++; 
                    console.log("first less: fiber: productOne ", productOne.name + " " + productOne.fiber + " productTwo: " + productTwo.name + " " + productTwo.fiber )
                } else if ( productOne.fiber < productTwo.fiber ){
                    goodComponents[i]++; 
                    console.log("first less: fiber: productOne ", productOne.name + " " + productOne.fiber + " productTwo: " + productTwo.name + " " + productTwo.fiber )
                }
                if ( productOne.protein < productTwo.protein ) {
                    goodComponents[j]++; 
                    console.log("first less: protein: productOne ", productOne.name + " " + productOne.protein + " productTwo: " + productTwo.name + " " + productTwo.protein )
                } else if (productOne.protein > productTwo.protein) {
                    goodComponents[i]++; 
                    console.log("first less: protein: productOne ", productOne.name + " " + productOne.protein + " productTwo: " + productTwo.name + " " + productTwo.protein )
                }
                if ( productOne.salt < productTwo.salt ) {
                    badComponents[j]++;
                    console.log("first less: salt: productOne ", productOne.name + " " + productOne.salt + " productTwo: " + productTwo.name + " " + productTwo.salt )
                } else if ( productOne.salt > productTwo.salt ) {
                    badComponents[i]++;
                    console.log("first less: salt: productOne ", productOne.name + " " + productOne.salt + " productTwo: " + productTwo.name + " " + productTwo.salt )
                }
                if ( productOne.vitamins < productTwo.vitamins ) {
                    goodComponents[j]++; 
                    console.log("first less: vitamins: productOne ", productOne.name + " " + productOne.vitamins + " productTwo: " + productTwo.name + " " + productTwo.vitamins )
                } else if (productOne.vitamins > productTwo.vitamins) {
                    goodComponents[i]++; 
                    console.log("first less: vitamins: productOne ", productOne.name + " " + productOne.vitamins + " productTwo: " + productTwo.name + " " + productTwo.vitamins )
                }

                console.log("good components: " + goodComponents[i] + " j: " + goodComponents[j] );
                console.log("bad components: " + badComponents[i] + " j: " + badComponents[j] )

                if(goodComponents[i] > goodComponents[j] &&  badComponents[i] < badComponents[j]) {
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

                    //Bad Quality
                    lowestQualityProduct = productTwo.name;
                    saturatedBad = productTwo.saturated;
                    carbsBad = productTwo.carbs;
                    sugarBad = productTwo.sugar;
                    fiberBad = productTwo.fiber;
                    proteinBad = productTwo.protein;
                    saltBad = productTwo.salt;
                    vitaminsBad = productTwo.vitamins;
                } else if (goodComponents[i] < goodComponents[j] &&  badComponents[i] < badComponents[j]) {
                    //Quality
                    bestQualityProduct = productTwo.name;
                    saturatedGood = productOne.saturated;
                    carbsGood = productOne.carbs;
                    sugarGood = productOne.sugar;
                    fiberGood = productOne.fiber;
                    proteinGood = productOne.protein;
                    saltGood = productOne.salt;
                    vitaminsGood = productOne.vitamins;

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
            }
        }

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
        console.log("Result: ", result);
        // const countAll = false
        // this.comparisonResults(result, countAll);
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
                  <Button title="Products" onPress={() => this.compareProducts()} />
                </View>
            ) : (
                (!this.props.calculated) ? (
                    <View>
                        <FlatList data={this.props.selectedProducts} renderItem={({item}) => (
                            <Product key={item} item={item} 
                                    removeProduct={() => this.removeProduct(item)}
                                    goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                            />
                        )} />
                        <Text>Compare all products: </Text>
                        <Button title="Calculate" onPress={() => this.findAll()} />
                        <Text>Find best and worst products:</Text>
                        <Button title="Calculate" onPress={() => this.findBestWorst()} />
                    </View>
                ) : (
                //     (this.props.calculatedAll) ? (

                //         <ResultsOfAll nameEnergy={this.props.result.nameEnergy} 
                //                         mostEnergy={this.props.result.mostEnergy}
                //                         nameFat={this.props.result.nameFat}
                //                         mostFat={this.props.result.mostFat}
                //                         nameFat={this.props.result.nameFat}
                //                         nameSaturated={this.props.result.nameSaturated}
                //                         mostSaturated={this.props.result.mostSaturated}
                //                         nameCarbs={this.props.result.nameCarbs}
                //                         mostCarbs={this.props.result.mostCarbs}
                //                         nameSugar={this.props.result.nameSugar}
                //                         nameSugar={this.props.result.nameSugar}
                //                         nameFiber={this.props.result.nameFiber}
                //                         nameProtein={this.props.result.nameProtein}
                //                         mostProtein={this.props.result.mostProtein}
                //                         nameSalt={this.props.result.nameSalt}
                //                         mostSalt={this.props.result.mostSalt}
                //                         nameVitamins={this.props.result.nameVitamins}
                //                         mostVitamins={this.props.result.mostVitamins}
                //                         clearResults={() => this.clearResults()}
                //         />
                //     ) : (
                //         <ResultsOfBestWorst bestQuality={this.props.result.goodQuality.productName} 
                //                         saturatedGood={this.props.result.goodQuality.saturated}
                //                         carbsGood={this.props.result.goodQuality.carbs}
                //                         sugarGood={this.props.result.goodQuality.sugar}
                //                         fiberGood={this.props.result.goodQuality.fiber}
                //                         proteinGood={this.props.result.goodQuality.protein}
                //                         saltGood={this.props.result.goodQuality.salt}
                //                         vitaminsGood={this.props.result.badQuality.quality.productName}
                //                         lowestQuality={this.props.result.badQuality.saturated}
                //                         saturatedBad={this.props.result.badQuality.carbs}
                //                         carbsBad={this.props.result.badQuality.sugar}
                //                         sugarBad={this.props.result.badQuality.fiber}
                //                         fiberBad={this.props.result.badQuality.protein}
                //                         proteinBad={this.props.result.badQuality.salt}
                //                         saltBad={this.props.result.badQuality.vitamins}
                //                         clearResults={() => this.clearResults()}
                //         />
                //     )
                <View>
                    </View>
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