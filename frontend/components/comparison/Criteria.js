import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { CriteriaStyles } from '../../components_additional/styles/CompareStyles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { compare } from '../../src/actions/comparisonActions';

const Criteria = ({compare, selectedProducts, result}) => {
    const [findBest, setFindBest] = useState(null);
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
        const arrayLength = array.length;
        var percentHealthyFoodOne = 0;
        var percentUnhealthyFoodOne = 0;
        var percentHealthyFoodTwo = 0;
        var percentUnhealthyFoodTwo = 0;
        var goodComponent = '';
        // var badComponent = '';
        // var productOne = '';
        let energyQuant = array[0].energy;
        let fatQuant = array[0].fat;
        let saturatedQuant = array[0].saturated;
        let carbsQuant = array[0].carbs;
        let sugarQuant = array[0].sugar;
        let fiberQuant = array[0].fiber;
        let proteinQuant = array[0].protein;
        let saltQuant = array[0].salt;
        let vitaminsQuant = array[0].vitamins;
        let energyLeast = array[0].energy;
        let fatLeast= array[0].fat;
        let saturatedLeast = array[0].saturated;
        let carbsLeast = array[0].carbs;
        let sugarLeast = array[0].sugar;
        let fiberLeast = array[0].fiber;
        let proteinLeast = array[0].protein;
        let saltLeast= array[0].salt;
        let vitaminsLeast = array[0].vitamins;
        let energyComponent = null;
        let energyMismatch = null;
        let fatComponent = null;
        let fatMismatch = null;
        let saturatedComponent = null;
        let saturatedMismatch = null;
        let carbsComponent = null;
        let carbsMismatch = null;
        let sugarComponent = null;
        let sugarMismatch = null;
        let fiberComponent = null;
        let fiberMismatch = null;
        let proteinComponent = null;
        let proteinMismatch = null;
        let saltComponent = null;
        let saltMismatch = null;
        let vitaminsComponent = null;
        let vitaminsMismatch = null;
        let badComponent = array[0];
        let productOne = array[0];
        let matchArray = [];
        let mismatchArray = [];
     console.log("----------------")
        for(var i = 0; i < arrayLength; i++) {
            let match = 0;
            let mismatch = 0;
            if(bulletEnergyActiveMost && !bulletEnergyActiveNone) { 
                if(energyQuant < array[i].energy) {
                    energyQuant =  array[i].energy;
                    energyComponent = array[i];
                    match++;
                } else if(energyLeast > array[i].energy){
                    energyLeast =  array[i].energy;
                    energyMismatch = array[i];
                    mismatch++;
                }
            } else if(!bulletEnergyActiveLeast && !bulletEnergyActiveNone) {
                if(energyQuant > array[i].energy) {
                    energyQuant =  array[i].energy;
                    energyComponent = array[i];
                    match++;
                } else if(energyLeast < array[i].energy) {
                    energyLeast =  array[i].energy;
                    energyMismatch = array[i];
                    mismatch++;
                }
            }

            if(bulletFatActiveMost && !bulletFatActiveNone) {
                if(fatQuant < array[i].fat) {
                    fatQuant = array[i].fat;
                    fatComponent = array[i];
                    match++;
                } else if(fatLeast > array[i].fat) {
                    fatLeast = array[i].fat;
                    fatMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletFatActiveLeast && !bulletFatActiveNone) {
                if(fatQuant > array[i].fat) {
                    fatQuant = array[i].fat;
                    fatComponent = array[i];
                    match++;
                } else if(fatLeast < array[i].fat) {
                    fatLeast = array[i].fat;
                    fatMismatch = array[i];
                    mismatch++;
                }
            }

            if(bulletSaturatedActiveMost && !bulletSaturatedActiveNone) {
                if(saturatedQuant < array[i].saturated) {
                    saturatedQuant =  array[i].saturated;
                    saturatedComponent = array[i];
                    match++;
                } else if(saturatedLeast > array[i].saturated) {
                    saturatedLeast =  array[i].saturated;
                    saturatedMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletSaturatedActiveLeast && !bulletSaturatedActiveNone) {
                if(saturatedQuant > array[i].saturated) {
                    saturatedQuant =  array[i].saturated;
                    saturatedComponent = array[i];
                    match++;
                } else if(saturatedLeast > array[i].saturated) {
                    saturatedLeast =  array[i].saturated;
                    saturatedMismatch = array[i];
                    mismatch++;
                } 
            }

            if(bulletCarbsActiveMost && !bulletCarbsActiveNone) {
                if(carbsQuant < array[i].carbs) {
                    carbsQuant = array[i].carbs;
                    carbsComponent = array[i];
                    match++;
                } else if (carbsLeast < array[i].carbs){
                    carbsLeast = array[i].carbs;
                    carbsMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletCarbsActiveLeast && !bulletCarbsActiveNone) {
                if(carbsQuant > array[i].carbs) {
                    carbsQuant = array[i].carbs;
                    carbsComponent = array[i];
                    match++;
                } else if (carbsLeast < array[i].carbs) {
                    carbsLeast = array[i].carbs;
                    carbsMismatch = array[i];
                    mismatch++;
                } 
            }

            if(bulletSugarActiveMost && !bulletSugarActiveNone) {
                if(sugarQuant < array[i].sugar) {
                    sugarQuant = array[i].sugar;
                    sugarComponent = array[i];
                    match++;
                } else if (sugarLeast > array[i].sugar) {
                    sugarLeast = array[i].sugar;
                    sugarMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletSugarActiveLeast && !bulletSugarActiveNone) {
                if(sugarQuant > array[i].sugar) {
                    sugarQuant = array[i].sugar;
                    sugarComponent = array[i];
                    match++;
                } else if (sugarLeast < array[i].sugar) {
                    sugarLeast = array[i].sugar;
                    sugarMismatch = array[i];
                    mismatch++;
                } 
            }

            if(bulletFiberActiveMost && !bulletFiberActiveNone) {
                if(fiberQuant < array[i].fiber) {
                    fiberQuant = array[i].fiber;
                    fiberComponent = array[i];
                    match++;
                } else if (fiberLeast > array[i].fiber) {
                    fiberLeast = array[i].fiber;
                    fiberMismatch = array[i].fiber;
                    mismatch++;
                } 
            } else if(bulletFiberActiveLeast && !bulletFiberActiveNone) {
                if(fiberQuant > array[i].fiber) {
                    fiberQuant = array[i].fiber;
                    fiberComponent = array[i];
                    match++;
                } else if (fiberLeast < array[i].fiber) {
                    fiberLeast = array[i].fiber;
                    fiberMismatch = array[i];
                    mismatch++;
                } 
            }

            if(bulletProteinActiveMost && !bulletProteinActiveNone) {
                if(proteinQuant < array[i].protein) {
                    proteinQuant = array[i].protein;
                    proteinComponent = array[i];
                    match++;
                } else if (proteinLeast > array[i].protein) {
                    proteinLeast = array[i].protein;
                    proteinMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletProteinActiveLeast && !bulletProteinActiveNone) {
                if(proteinQuant > array[i].protein) {
                    proteinQuant = array[i].protein;
                    proteinComponent = array[i];
                    match++;
                } else if (proteinLeast < array[i].protein) {
                    proteinLeast = array[i].protein;
                    proteinMismatch = array[i];
                    mismatch++;
                }
            }

            if(bulletSaltActiveMost && !bulletSaltActiveNone) {
                if(saltQuant < array[i].salt) {
                    saltQuant = array[i].salt;
                    saltComponent = array[i];
                    match++;
                } else if (saltLeast > array[i].salt) {
                    saltLeast = array[i].salt;
                    saltMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletSaltActiveLeast && !bulletSaltActiveNone) {
                if(saltQuant > array[i].salt) {
                    saltQuant = array[i].salt;
                    saltComponent = array[i];
                    match++;
                } else if (saltLeast < array[i].salt) {
                    saltLeast = array[i].salt;
                    saltMismatch = array[i];
                    mismatch++;
                } 
            }
            if(bulletVitaminsActiveMost && !bulletVitaminsActiveNone) {
                if(vitaminsQuant < array[i].vitamins) {
                    vitaminsQuant = array[i].vitamins;
                    vitaminsComponent = array[i];
                    match++;
                } else if (vitaminsLeast < array[i].vitamins) {
                    vitaminsLeast = array[i].vitamins;
                    vitaminsMismatch = array[i];
                    mismatch++;
                } 
            } else if(bulletVitaminsActiveLeast && !bulletVitaminsActiveNone) {
                if(vitaminsQuant > array[i].vitamins) {
                    vitaminsQuant = array[i].vitamins;
                    vitaminsComponent = array[i];
                    match++;
                } else if (vitaminsLeast < array[i].vitamins) {
                    vitaminsLeast = array[i].vitamins;
                    vitaminsMismatch = array[i];
                    mismatch++;
                } 
            }
            array[i].match = match;
            array[i].mismatch = mismatch;
        }
        if(energyComponent !== null) {
            matchArray.push(energyComponent);
        }
        if(fatComponent !== null) {
            matchArray.push(fatComponent);
        }
        if(saturatedComponent !== null) {
            matchArray.push(saturatedComponent);
        }
        if(carbsComponent !== null) {
            matchArray.push(carbsComponent);
        }
        if(sugarComponent !== null) {
            matchArray.push(sugarComponent);
        }

        if(fiberComponent !== null) {
            matchArray.push(fiberComponent);
        }
        if(proteinComponent !== null) {
            matchArray.push(proteinComponent);
        }
        if(saltComponent !== null) {
            matchArray.push(saltComponent);
        }
        if(vitaminsComponent !== null) {
            matchArray.push(vitaminsComponent);
        }

        // MISMATCH

        if(energyMismatch !== null) {
            mismatchArray.push(energyMismatch);
        }
        if(fatMismatch !== null) {
            mismatchArray.push(fatMismatch);
        }
        if(saturatedMismatch !== null) {
            mismatchArray.push(saturatedMismatch);
        }
        if(carbsMismatch !== null) {
            mismatchArray.push(carbsMismatch);
        }
        if(sugarMismatch !== null) {
            mismatchArray.push(sugarMismatch);
        }

        if(fiberMismatch !== null) {
            mismatchArray.push(fiberMismatch);
        }
        if(proteinMismatch !== null) {
            mismatchArray.push(proteinMismatch);
        }
        if(saltMismatch !== null) {
            mismatchArray.push(saltMismatch);
        }
        if(vitaminsMismatch !== null) {
            mismatchArray.push(vitaminsMismatch);
        }
        const matchArrayLength = matchArray.length;
        let gotMatch = null;

        console.log("array matches ", matchArray, " array mismatches ", mismatchArray);
        console.log("array ", array);

        // for (var i = 0; i < matchArrayLength; i++ ) {
        //     for (var j = 1; j < matchArrayLength; j++) {
        //         if(matchArray[i].id === matchArray[j].id && matchArray[i].subcategory_id === matchArray[j].subcategory_id) {
        //             let match = matchArray[i].match + matchArray[j].match;
        //             matchArray[i].match = match;
        //             matchArray[j].match = match;
        //             gotMatch = true;
        //             console.log(' matchArray[i].match',  matchArray[i].match, 'name',  matchArray[i].name);
        //             console.log(' matchArray[j].match',  matchArray[j].match, 'name',  matchArray[j].name)
        //         } else {
        //             gotMatch = false;
        //         }
        //     }
        // }
        // if(gotMatch) {
        //     const filteredDuplicates = matchArray.filter((item, index, self) => (
        //         index === self.findIndex((item2) => (
        //             item2.id === item.id && item2.subcategory_id === item.subcategory_id
        //         ))
        //     ));
        //             console.log("filtered dups ", filteredDuplicates, " sorted array: ", mathingProducts);
        //             const mathingProducts = filteredDuplicates.sort((a, b) => {
        //                 return b.match - a.match;
        //             })

        // }
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
                <IonIcon name="ios-calculator" style={CriteriaStyles().buttonResults} />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, { compare })(Criteria))