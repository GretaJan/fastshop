import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { productSelected, deleteProductFromList, compare } from '../../src/actions/comparisonActions';

//Components
import Product from './selectedProductSingle';
import Comparison from './Comparison';

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

    compareProducts = () => {
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
        // this.setState({
        //     mostEnergy: energy,
        //     energyName: energyN,
        //     mostFat: fat,
        //     fatName: fatN,
        //     mostSaturated: saturated,
        //     nameSaturated: saturatedN,
        //     mostCarbs: carbs,
        //     nameCarbs: carbsN,
        //     mostSugar: sugar,
        //     nameSugar: sugarN,
        //     mostFiber: fiber,
        //     nameFiber: fiberN,
        //     mostProtein: protein,
        //     nameProtein: proteinN,
        //     mostSalt: salt,
        //     nameSalt: saltN,
        //     mostVitamins: vitamins,
        //     nameVitamins: vitaminsN,
        // });
        var result = {
            mostEnergy: energy,
            energyName: energyN,
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
        this.comparisonResults(result);
    }

    goToProduct = (subcategoryId, productId) => {
        this.props.navigation.navigate("Product", {subcategoryId: subcategoryId, productId: productId});
    }

    render() {
        return (
            (!this.props.calculated) ? (
                <View>
                    <FlatList data={this.props.selectedProducts} renderItem={({item}) => (
                        <Product key={item} item={item} 
                                removeProduct={() => this.removeProduct(item)}
                                goToProduct={(id1, id2) => this.goToProduct(id1, id2)}
                        />
                    )} />
                    <Button title="Calculate" onPress={() => this.compareProducts()} />
                </View>
            ) : (
                <View>
                   <View>
                        <Text>Most energy: {this.props.result.mostEnergy} </Text>
                        <Text>{this.props.result.nameEnergy}</Text>
                    </View>
                    <View>
                        <Text>Most fat: {this.props.result.mostFat} </Text>
                        <Text>{this.props.result.nameFat}</Text>
                    </View>
                    <View>
                        <Text>Most saturated fat: {this.props.result.mostSaturated} </Text>
                        <Text>{this.props.result.nameFat}</Text>
                    </View>
                    <View>
                        <Text>Most carbohidrates: {this.props.result.mostCarbs} </Text>
                        <Text>{this.props.result.nameCarbs}</Text>
                    </View>
                    <View>
                        <Text>Most sugar: {this.props.result.mostSugar} </Text>
                        <Text>{this.props.result.nameSugar}</Text>
                    </View>
                    <View>
                        <Text>Most fiber: {this.props.result.mostFiber} </Text>
                        <Text>{this.props.result.nameFiber}</Text>
                    </View>
                    <View>
                        <Text>Most protein: {this.props.result.mostProtein} </Text>
                        <Text>{this.props.result.nameProtein}</Text>
                    </View>
                    <View>
                        <Text>Most salt: {this.props.result.mostSalt} </Text>
                        <Text>{this.props.result.nameSalt}</Text>
                    </View>
                    <View>
                        <Text>Most vitamins: {this.props.result.mostVitamins} </Text>
                        <Text>{this.props.result.nameVitamins}</Text>
                    </View>
                </View>
            )
            

        )
    }

}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
    calculated: state.selectedProducts.calculated
})

export default withNavigation(connect(mapStateToProps, {productSelected, deleteProductFromList, compare})(Products))