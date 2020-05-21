import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { CriteriaStyles } from '../../components_additional/styles/CompareStyles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { compare } from '../../src/actions/comparisonActions';

const Criteria = ({compare, selectedProducts, result}) => {
    const [bulletEnergyActiveMost, setBulletEnergyActiveMost] = useState(false);
    const [bulletEnergyActiveLeast, setBulletEnergyActiveLeast] = useState(false);
    const [bulletEnergyActiveNone, setBulletEnergyActiveNone] = useState(false);
    const [bulletFatActiveMost, setBulletFatActiveMost] = useState(false);
    const [bulletFatActiveLeast, setBulletFatActiveLeast] = useState(false);
    const [bulletFatActiveNone, setBulletFatActiveNone] = useState(false);
    const [bulletSaturatedActiveMost, setBulletSaturatedActiveMost] = useState(false);
    const [bulletSaturatedActiveLeast, setBulletSaturatedActiveLeast] = useState(false);
    const [bulletSaturatedActiveNone, setBulletSaturatedActiveNone] = useState(false);
    const [bulletCarbsActiveMost, setBulletCarbsActiveMost] = useState(false);
    const [bulletCarbsActiveLeast, setBulletCarbsActiveLeast] = useState(false);
    const [bulletCarbsActiveNone, setBulletCarbsActiveNone] = useState(false);
    const [bulletSugarActiveMost, setBulletSugarActiveMost] = useState(false);
    const [bulletSugarActiveLeast, setBulletSugarActiveLeast] = useState(false);
    const [bulletSugarActiveNone, setBulletSugarActiveNone] = useState(false);
    const [bulletFiberActiveMost, setBulletFiberActiveMost] = useState(false);
    const [bulletFiberActiveLeast, setBulletFiberActiveLeast] = useState(false);
    const [bulletFiberActiveNone, setBulletFiberActiveNone] = useState(false);
    const [bulletProteinActiveMost, setBulletProteinActiveMost] = useState(false);
    const [bulletProteinActiveLeast, setBulletProteinActiveLeast] = useState(false);
    const [bulletProteinActiveNone, setBulletProteinActiveNone] = useState(false);
    const [bulletSaltActiveMost, setBulletSaltActiveMost] = useState(false);
    const [bulletSaltActiveLeast, setBulletSaltActiveLeast] = useState(false);
    const [bulletSaltActiveNone, setBulletSaltActiveNone] = useState(false);
    const [bulletVitaminsActiveMost, setBulletVitaminsActiveMost] = useState(false);
    const [bulletVitaminsActiveLeast, setBulletVitaminsActiveLeast] = useState(false);
    const [bulletVitaminsActiveNone, setBulletVitaminsActiveNone] = useState(false);

    const energyMost = () => {
        setBulletEnergyActiveMost(true);
        setBulletEnergyActiveLeast(false);
        setBulletEnergyActiveNone(false);
    }
    const energyLeast = () => {
        setBulletEnergyActiveMost(false);
        setBulletEnergyActiveLeast(true);
        setBulletEnergyActiveNone(false);
    }
    const energyNone = () => {
        setBulletEnergyActiveMost(false);
        setBulletEnergyActiveLeast(false);
        setBulletEnergyActiveNone(true);
    }
    const fatMost = () => {
        setBulletFatActiveMost(true);
        setBulletFatActiveLeast(false);
        setBulletFatActiveNone(false);
    }
    const fatLeast = () => {
        setBulletFatActiveMost(false);
        setBulletFatActiveLeast(true);
        setBulletFatActiveNone(false);
    }
    const fatNone = () => {
        setBulletFatActiveMost(false);
        setBulletFatActiveLeast(false);
        setBulletFatActiveNone(true);
    }
    const saturatedMost = () => {
        setBulletSaturatedActiveMost(true);
        setBulletSaturatedActiveLeast(false);
        setBulletSaturatedActiveNone(false);
    }
    const saturatedLeast = () => {
        setBulletSaturatedActiveMost(false);
        setBulletSaturatedActiveLeast(true);
        setBulletSaturatedActiveNone(false);
    }
    const saturatedNone = () => {
        setBulletSaturatedActiveMost(false);
        setBulletSaturatedActiveLeast(false);
        setBulletSaturatedActiveNone(true);
    }
    const carbsMost = () => {
        setBulletCarbsActiveMost(true);
        setBulletCarbsActiveLeast(false);
        setBulletCarbsActiveNone(false);
    }
    const carbsLeast = () => {
        setBulletCarbsActiveMost(false);
        setBulletCarbsActiveLeast(true);
        setBulletCarbsActiveNone(false);
    }
    const carbsNone = () => {
        setBulletCarbsActiveMost(false);
        setBulletCarbsActiveLeast(false);
        setBulletCarbsActiveNone(true);
    }
    const sugarMost = () => {
        setBulletSugarActiveMost(true);
        setBulletSugarActiveLeast(false);
        setBulletSugarActiveNone(false);
    }
    const sugarLeast = () => {
        setBulletSugarActiveMost(false);
        setBulletSugarActiveLeast(true);
        setBulletSugarActiveNone(false);
    }
    const sugarNone = () => {
        setBulletSugarActiveMost(false);
        setBulletSugarActiveLeast(false);
        setBulletSugarActiveNone(true);
    }
    const fiberMost = () => {
        setBulletFiberActiveMost(true);
        setBulletFiberActiveLeast(false);
        setBulletFiberActiveNone(false);
    }
    const fiberLeast = () => {
        setBulletFiberActiveMost(false);
        setBulletFiberActiveLeast(true);
        setBulletFiberActiveNone(false);
    }
    const fiberNone = () => {
        setBulletFiberActiveMost(false);
        setBulletFiberActiveLeast(false);
        setBulletFiberActiveNone(true);
    }
    const proteinMost = () => {
        setBulletProteinActiveMost(true);
        setBulletProteinActiveLeast(false);
        setBulletProteinActiveNone(false);
    }
    const proteinLeast = () => {
        setBulletProteinActiveMost(false);
        setBulletProteinActiveLeast(true);
        setBulletProteinActiveNone(false);
    }
    const proteinNone = () => {
        setBulletProteinActiveMost(false);
        setBulletProteinActiveLeast(false);
        setBulletProteinActiveNone(true);
    }
    const saltMost = () => {
        setBulletSaltActiveMost(true);
        setBulletSaltActiveLeast(false);
        setBulletSaltActiveNone(false);
    }
    const saltLeast = () => {
        setBulletSaltActiveMost(false);
        setBulletSaltActiveLeast(true);
        setBulletSaltActiveNone(false);
    }
    const saltNone = () => {
        setBulletSaltActiveMost(false);
        setBulletSaltActiveLeast(false);
        setBulletSaltActiveNone(true);
    }
    const vitaminsMost = () => {
        setBulletVitaminsActiveMost(true);
        setBulletVitaminsActiveLeast(false);
        setBulletVitaminsActiveNone(false);
    }
    const vitaminsLeast = () => {
        setBulletVitaminsActiveMost(false);
        setBulletVitaminsActiveLeast(true);
        setBulletVitaminsActiveNone(false);
    }
    const vitaminsNone = () => {
        setBulletVitaminsActiveMost(false);
        setBulletVitaminsActiveLeast(false);
        setBulletVitaminsActiveNone(true);
    }

    const countResults = () => {
        var array = selectedProducts;
        var percentHealthyFoodOne = 0;
        var percentUnhealthyFoodOne = 0;
        var percentHealthyFoodTwo = 0;
        var percentUnhealthyFoodTwo = 0;
        var goodComponent = '';
        // var badComponent = '';
        // var productOne = '';
        let energyComponent = array[0].energy;
        let energyIndex = 0;
        let fatComponent = array[0].fat;
        let fatIndex = 0;
        let saturatedComponent = array[0].saturated;
        let saturatedIndex = 0;
        let carbsComponent = array[0].carbs;
        let carbsIndex = 0;
        let sugarComponent = array[0].sugar;
        let sugarIndex = 0;
        let fiberComponent = array[0].fiber;
        let fiberIndex = 0;
        let proteinComponent = array[0].protein;
        let proteinIndex = 0;
        let saltComponent = array[0].salt;
        let saltIndex = 0;
        let vitaminsComponent = array[0].vitamins;
        let vitaminsIndex = 0;
        let badComponent = array[0];
        let productOne = array[0];
        let matchArray = [];
        let mismatchArray = [];
     
        for(var i = 1; i < array.length; i++) {
            if(bulletEnergyActiveMost && !bulletEnergyActiveNone) { 
                if(energyComponent < array[i].energy) {
                    energyComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                }
            } else if(!bulletEnergyActiveLeast && !bulletEnergyActiveNone) {
                if(energyComponent > array[i].energy) {
                    energyComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                }
            }

            if(bulletFatActiveMost && !bulletFatActiveNone) {
                if(fatComponent < array[i].fat) {
                    fatComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletFatActiveLeast && !bulletFatActiveNone) {
                if(fatComponent > array[i].fat) {
                    fatComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                }
            }

            if(bulletSaturatedActiveMost && !bulletSaturatedActiveNone) {
                if(saturatedComponent < array[i].saturated) {
                    saturatedComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletSaturatedActiveLeast && !bulletSaturatedActiveNone) {
                if(saturatedComponent > array[i].saturated) {
                    saturatedComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }

            if(bulletCarbsActiveMost && !bulletCarbsActiveNone) {
                if(carbsComponent < array[i].carbs) {
                    carbsComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletCarbsActiveLeast && !bulletCarbsActiveNone) {
                if(carbsComponent > array[i].carbs) {
                    carbsComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }

            if(bulletSugarActiveMost && !bulletSugarActiveNone) {
                if(sugarComponent < array[i].sugar) {
                    sugarComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletSugarActiveLeast && !bulletSugarActiveNone) {
                if(sugarComponent > array[i].sugar) {
                    sugarComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }

            if(bulletFiberActiveMost && !bulletFiberActiveNone) {
                if(fiberComponent < array[i].fiber) {
                    fiberComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletFiberActiveLeast && !bulletFiberActiveNone) {
                if(fiberComponent > array[i].fiber) {
                    fiberComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }

            if(bulletProteinActiveMost && !bulletProteinActiveNone) {
                if(proteinComponent < array[i].protein) {
                    proteinComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletProteinActiveLeast && !bulletProteinActiveNone) {
                if(proteinComponent > array[i].protein) {
                    proteinComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                }
            }

            if(bulletSaltActiveMost && !bulletSaltActiveNone) {
                if(saltComponent < array[i].salt) {
                    saltComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletSaltActiveLeast && !bulletSaltActiveNone) {
                if(saltComponent > array[i].salt) {
                    saltComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }
            if(bulletVitaminsActiveMost && !bulletVitaminsActiveNone) {
                if(vitaminsComponent < array[i].vitamins) {
                    vitaminsComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            } else if(bulletVitaminsActiveLeast && !bulletVitaminsActiveNone) {
                if(vitaminsComponent > array[i].vitamins) {
                    vitaminsComponent = array[i];
                    matchArray.push(array[i]);
                } else {
                    mismatchArray.push(array[i]);
                } 
            }
        }

        for(var i = 0; i < matchArray.length; i++) {
            for(var j = 1; j < matchArray.length; j++) {
                if(matchArray[i] === matchArray[j]) {
                    
                }
            }
        }

    }


    return (
        <View style={CriteriaStyles().container}>
            <View style={CriteriaStyles().itemContainer}>
                <Text  style={CriteriaStyles().itemTitle}>Choose criteria</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <Text style={CriteriaStyles().wrapThird}>Most</Text>
                    <Text style={CriteriaStyles().wrapThird}>Least</Text>
                    <Text style={CriteriaStyles().wrapThird}>None</Text>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Energy</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={energyMost}>
                            <Text style={bulletEnergyActiveMost ? CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={energyLeast}>
                            <Text style={bulletEnergyActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={energyNone}>
                            <Text style={bulletEnergyActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Fat</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fatMost}>
                            <Text style={bulletFatActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fatLeast}>
                            <Text style={bulletFatActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fatNone}>
                            <Text style={bulletFatActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Saturated fat</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saturatedMost}>
                            <Text style={bulletSaturatedActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saturatedLeast}>
                            <Text style={bulletSaturatedActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saturatedNone}>
                            <Text style={bulletSaturatedActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Carbohidrates</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={carbsMost}>
                            <Text style={bulletCarbsActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={carbsLeast}>
                            <Text style={bulletCarbsActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={carbsNone}>
                            <Text style={bulletCarbsActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Sugar</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={sugarMost}>
                            <Text style={bulletSugarActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={sugarLeast}>
                            <Text style={bulletSugarActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={sugarNone}>
                            <Text style={bulletSugarActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Fiber</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fiberMost}> 
                            <Text style={bulletFiberActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fiberLeast}>
                            <Text style={bulletFiberActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={fiberNone}>
                            <Text style={bulletFiberActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Protein</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={proteinMost}>
                            <Text style={bulletProteinActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={proteinLeast}>
                            <Text style={bulletProteinActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={proteinNone}>
                            <Text style={bulletProteinActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Salt</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saltMost}>
                            <Text style={bulletSaltActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saltLeast}>
                            <Text style={bulletSaltActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={saltNone}>
                            <Text style={bulletSaltActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CriteriaStyles().itemContainer}>
                <Text style={CriteriaStyles().itemTitle}>Vitamins</Text>
                <View style={CriteriaStyles().bulletContainer}>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={vitaminsMost}>
                            <Text style={bulletVitaminsActiveMost ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={vitaminsLeast}>
                            <Text style={bulletVitaminsActiveLeast ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CriteriaStyles().wrapThird}>
                        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={vitaminsNone}>
                            <Text style={bulletVitaminsActiveNone ?  CriteriaStyles().bulletActive : CriteriaStyles().bulletInactive} ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={CriteriaStyles().buttonWrap} onPress={countResults} >
                <IonIcon name="ios-calculator" style={CriteriaStyles().buttonResults} onPress={() => this.findBestWorst()} />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, { compare })(Criteria))