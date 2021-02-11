import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { CriteriaStyles } from '../../components_additional/styles/CompareStyles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { compare } from '../../redux/actions/comparisonActions';
import { colors } from '../../components_additional/styles/Colors';
import Modal from '../../components_additional/Modal';

const Animations = require('../../components_additional/styles/Animations.js');

const Criteria = ({compare, selectedProducts, navigation}) => {
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
    const [calculated, setCalculated] = useState(null);
    const [modal, setModal] = useState(false);
    const scale = useState(new Animated.Value(1))[0];

    function setMost(most, least, none) {
        most(true);
        least(false);
        none(false);
        setCalculated(false);
    }
    function setLeast(most, least, none) {
        most(false);
        least(true);
        none(false);
        setCalculated(false);
    }
    function setNone(most, least, none) {
        most(false);
        least(false);
        none(true);
        setCalculated(false);
    }

    const energyMost = () => {
        setMost(setBulletEnergyActiveMost, setBulletEnergyActiveLeast, setBulletEnergyActiveNone);
    }
    const energyLeast = () => {
        setLeast(setBulletEnergyActiveMost, setBulletEnergyActiveLeast, setBulletEnergyActiveNone);
    }
    const energyNone = () => {
        setNone(setBulletEnergyActiveMost, setBulletEnergyActiveLeast, setBulletEnergyActiveNone);

    }
    const fatMost = () => {
        setMost(setBulletFatActiveMost, setBulletFatActiveLeast, setBulletFatActiveNone);
    }
    const fatLeast = () => {
        setLeast(setBulletFatActiveMost, setBulletFatActiveLeast, setBulletFatActiveNone);
    }
    const fatNone = () => {
        setNone(setBulletFatActiveMost, setBulletFatActiveLeast, setBulletFatActiveNone);
    }
    const saturatedMost = () => {
        setMost(setBulletSaturatedActiveMost, setBulletSaturatedActiveLeast, setBulletSaturatedActiveNone);
    }
    const saturatedLeast = () => {
        setLeast(setBulletSaturatedActiveMost, setBulletSaturatedActiveLeast, setBulletSaturatedActiveNone);
    }
    const saturatedNone = () => {
        setNone(setBulletSaturatedActiveMost, setBulletSaturatedActiveLeast, setBulletSaturatedActiveNone);
    }
    const carbsMost = () => {
        setMost(setBulletCarbsActiveMost, setBulletCarbsActiveLeast, setBulletCarbsActiveNone);
    }
    const carbsLeast = () => {
        setLeast(setBulletCarbsActiveMost, setBulletCarbsActiveLeast, setBulletCarbsActiveNone);
    }
    const carbsNone = () => {
        setNone(setBulletCarbsActiveMost, setBulletCarbsActiveLeast, setBulletCarbsActiveNone);
    }
    const sugarMost = () => {
        setMost(setBulletSugarActiveMost, setBulletSugarActiveLeast, setBulletSugarActiveNone);
    }
    const sugarLeast = () => {
        setLeast(setBulletSugarActiveMost, setBulletSugarActiveLeast, setBulletSugarActiveNone);

    }
    const sugarNone = () => {
        setNone(setBulletSugarActiveMost, setBulletSugarActiveLeast, setBulletSugarActiveNone);
    }
    const fiberMost = () => {
        setMost(setBulletFiberActiveMost, setBulletFiberActiveLeast, setBulletFiberActiveNone);
    }
    const fiberLeast = () => {
        setLeast(setBulletFiberActiveMost, setBulletFiberActiveLeast, setBulletFiberActiveNone);
    }
    const fiberNone = () => {
        setNone(setBulletFiberActiveMost, setBulletFiberActiveLeast, setBulletFiberActiveNone);
    }
    const proteinMost = () => {
        setMost(setBulletProteinActiveMost, setBulletProteinActiveLeast, setBulletProteinActiveNone);
    }
    const proteinLeast = () => {
        setLeast(setBulletProteinActiveMost, setBulletProteinActiveLeast, setBulletProteinActiveNone);
    }
    const proteinNone = () => {
        setNone(setBulletProteinActiveMost, setBulletProteinActiveLeast, setBulletProteinActiveNone);
    }
    const saltMost = () => {
        setMost(setBulletSaltActiveMost, setBulletSaltActiveLeast, setBulletSaltActiveNone);
    }
    const saltLeast = () => {
        setLeast(setBulletSaltActiveMost, setBulletSaltActiveLeast, setBulletSaltActiveNone);
    }
    const saltNone = () => {
        setNone(setBulletSaltActiveMost, setBulletSaltActiveLeast, setBulletSaltActiveNone);
    }
    const vitaminsMost = () => {
        setMost(setBulletVitaminsActiveMost, setBulletVitaminsActiveLeast, setBulletVitaminsActiveNone);
    }
    const vitaminsLeast = () => {
        setLeast(setBulletVitaminsActiveMost, setBulletVitaminsActiveLeast, setBulletVitaminsActiveNone);
    }
    const vitaminsNone = () => {
        setNone(setBulletVitaminsActiveMost, setBulletVitaminsActiveLeast, setBulletVitaminsActiveNone);
    }

    function setVariables(bulletNone, most, least, arrayElement) {
        if(!bulletNone) {
            most = arrayElement;
            least = arrayElement;
        }
    }

    const countResults = () => {
    if ( !bulletEnergyActiveMost && !bulletEnergyActiveLeast && !bulletFatActiveMost && !bulletFatActiveLeast && 
        !bulletSaturatedActiveMost && !bulletSaturatedActiveLeast && !bulletCarbsActiveMost && !bulletCarbsActiveLeast && 
        !bulletSugarActiveMost && !bulletSugarActiveLeast && !bulletFiberActiveMost && !bulletFiberActiveLeast &&
        !bulletProteinActiveMost && !bulletProteinActiveLeast && !bulletSaltActiveMost && !bulletSaltActiveLeast &&
        !bulletVitaminsActiveMost && !bulletVitaminsActiveLeast ) {
        setModal(true);
    } else {
        setModal(false);
        const array = selectedProducts;
        const arrayLength = array.length;
        const firstProduct = array[0];
        let energyMost = parseInt(firstProduct.energy);
        let fatMost = parseInt(firstProduct.fat) * 100;
        let saturatedMost = parseInt(firstProduct.saturated) * 100;
        let carbsMost = parseInt(firstProduct.carbs) * 100;
        let sugarMost = parseInt(firstProduct.sugar) * 100;
        let fiberMost = parseInt(firstProduct.fiber) * 100;
        let proteinMost = parseInt(firstProduct.protein) * 100;
        let saltMost = parseInt(firstProduct.salt) * 100;
        let vitaminsMost = parseInt(firstProduct.vitamins) * 100;
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
        let matchArray = [];
        let mismatchArray = [];

        if(bulletEnergyActiveMost) energyComponent = firstProduct;
        if(bulletFatActiveMost) fatComponent = firstProduct;
        if(bulletSaturatedActiveMost) saturatedComponent = firstProduct;
        if(bulletCarbsActiveMost) carbsComponent = firstProduct;
        if(bulletSugarActiveMost) sugarComponent = firstProduct;
        if(bulletFiberActiveMost) fiberComponent = firstProduct;
        if(bulletProteinActiveMost) proteinComponent = firstProduct;
        if(bulletSaltActiveMost) saltComponent = firstProduct;
        if(bulletVitaminsActiveMost) vitaminsComponent = firstProduct

        for(let i = 1; i < arrayLength; i++) {
            const parsedEnergy = parseInt(array[i].energy) * 100;
            const parsedFat = parseInt(array[i].fat) * 100;
            const parsedSaturated = parseInt(array[i].saturated) * 100;
            const parsedCarbs = parseInt(array[i].carbs) * 100;
            const parsedSugar = parseInt(array[i].sugar) * 100;
            const parsedFiber = parseInt(array[i].fiber) * 100;
            const parsedProtein = parseInt(array[i].protein) * 100;
            const parsedSalt = parseInt(array[i].salt) * 100;
            const parsedVitamins = parseInt(array[i].vitamins) * 100;

            if(bulletEnergyActiveMost && energyMost < parsedEnergy) { 
                energyMost =  parsedEnergy;
                energyComponent = array[i];
            }
            if(bulletFatActiveMost && fatMost < parsedFat) {
                fatMost = parsedFat;
                fatComponent = array[i];
            } 

            if(bulletSaturatedActiveMost && saturatedMost < parsedSaturated) {
                saturatedMost =  parsedSaturated;
                saturatedComponent = array[i];
            } 

            if(bulletCarbsActiveMost && carbsMost < parsedCarbs) {
                carbsMost = parsedCarbs;
                carbsComponent = array[i];
            } 

            if(bulletSugarActiveMost && sugarMost < parsedSugar) {
                sugarMost = parsedSugar;
                sugarComponent = array[i];
            } 

            if(bulletFiberActiveMost && fiberMost < parsedFiber) {
                fiberMost = parsedFiber;
                fiberComponent = array[i];
            } 

            if(bulletProteinActiveMost && proteinMost < parsedProtein) {
                proteinMost = parsedProtein;
                proteinComponent = array[i];
            } 

            if(bulletSaltActiveMost && saltMost < parsedSalt) {
                saltMost = parsedSalt;
                saltComponent = array[i];
            } 

            if(bulletVitaminsActiveMost && vitaminsMost < parsedVitamins) {
                vitaminsMost = parsedVitamins;
                vitaminsComponent = array[i];
            } 
        }

        // MATCH
        if(energyComponent !== null)  matchArray.push(energyComponent);
        if(fatComponent !== null) matchArray.push(fatComponent);
        if(saturatedComponent !== null) matchArray.push(saturatedComponent);
        if(carbsComponent !== null) matchArray.push(carbsComponent);
        if(sugarComponent !== null) matchArray.push(sugarComponent);
        if(fiberComponent !== null) matchArray.push(fiberComponent);
        if(proteinComponent !== null) matchArray.push(proteinComponent);
        if(saltComponent !== null) matchArray.push(saltComponent);
        if(vitaminsComponent !== null) matchArray.push(vitaminsComponent);
        let countMatched = {};
        let bestMatchId = 0;
        let countMismatched = {};
        let bestMismatchId = 0;
        let maxMatch = 0;
        let maxMismatch = 0;
        matchArray.forEach(item => {
            countMatched[item.id] = (countMatched[item.id] || 0) + 1;
        })
        for (const key in countMatched) {
            if(maxMatch < countMatched[key]) {
                bestMatchId = key;
                maxMatch = countMatched[key];
            }
        }

        let leastProduct = array[0].id != bestMatchId ? array[0] : array[1];
        console.log("leeeast", array)
        let energyLeast = parseInt(leastProduct.energy) * 100;
        let fatLeast = parseInt(leastProduct.fat) * 100;
        let saturatedLeast = parseInt(leastProduct.saturated) * 100;
        let carbsLeast = parseInt(leastProduct.carbs) * 100;
        let sugarLeast = parseInt(leastProduct.sugar) * 100;
        let fiberLeast = parseInt(leastProduct.fiber) * 100;
        let proteinLeast = parseInt(leastProduct.protein) * 100;
        let saltLeast= parseInt(leastProduct.salt) * 100;
        let vitaminsLeast = parseInt(leastProduct.vitamins) * 100;
        if(bulletEnergyActiveLeast) energyMismatch = leastProduct;
        if(bulletFatActiveLeast) fatMismatch = leastProduct
        if(bulletSaturatedActiveLeast) saturatedMismatch = leastProduct;
        if(bulletCarbsActiveLeast) carbsMismatch = leastProduct;
        if(bulletSugarActiveLeast) sugarMismatch = leastProduct;
        if(bulletFiberActiveLeast) fiberMismatch = leastProduct;
        if(bulletProteinActiveLeast) proteinMismatch = leastProduct;
        if(bulletSaltActiveLeast) saltMismatch = leastProduct;
        if(bulletVitaminsActiveLeast) vitaminsMismatch = leastProduct;

        for(let i = 1; i < arrayLength; i++) {
            if(array[i].id !== bestMatchId) {
                console.log("noooo", energyMismatch);
                const parsedEnergy = parseInt(array[i].energy) * 100;
                const parsedFat = parseInt(array[i].fat) * 100;
                const parsedSaturated = parseInt(array[i].saturated) * 100;
                const parsedCarbs = parseInt(array[i].carbs) * 100;
                const parsedSugar = parseInt(array[i].sugar) * 100;
                const parsedFiber = parseInt(array[i].fiber) * 100;
                const parsedProtein = parseInt(array[i].protein) * 100;
                const parsedSalt = parseInt(array[i].salt) * 100;
                const parsedVitamins = parseInt(array[i].vitamins) * 100;
    
               if(bulletEnergyActiveLeast && energyLeast > parsedEnergy) {
                   console.log("ACTIVE")
                    energyLeast =  parsedEnergy;
                    energyMismatch = array[i];
                }
                if(bulletFatActiveLeast && fatLeast > parsedFat) {
                    fatLeast = parsedFat;
                    fatMismatch = array[i];
                }
                if(bulletSaturatedActiveLeast && saturatedLeast > parsedSaturated) { 
                    saturatedLeasr =  parsedSaturated;
                    saturatedMismatch = array[i];
                }
    
                if(bulletCarbsActiveLeast && carbsLeast > parsedCarbs) {
                    carbsLeast = parsedCarbs;
                    carbsMismatch = array[i];
                }
    
                if(bulletSugarActiveLeast && sugarLeast > parsedSugar) {
                    sugarLeast = parsedSugar;
                    sugarMismatch = array[i];
                }
    
                if(bulletFiberActiveLeast && fiberLeast > parsedFiber) {
                    fiberLeast = parsedFiber;
                    fiberMismatch = array[i];
                }
    
                if(bulletProteinActiveLeast && proteinLeast > parsedProtein) {
                    proteinLeast = parsedProtein;
                    proteinMismatch = array[i]; 
                }
    
                if(bulletSaltActiveMost && saltLeast > parsedSal) {
                    saltLeast = parsedSalt;
                    saltMismatch = array[i];
                } 

                if(bulletVitaminsActiveMost && vitaminsLeast > parsedVitamins) {
                    vitaminsLeast = parsedVitaminss;
                    vitaminsMismatch = array[i];
                }
            }
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
        mismatchArray.forEach(item => {
            countMismatched[item.id] = (countMismatched[item.id] || 0) + 1;
        })
        for (const key in countMismatched) {
            if(maxMismatch < countMismatched[key]) {
                bestMismatchId = key;
                maxMismatch = countMismatched[key];
            }
        }
        findResult(bestMatchId, bestMismatchId);
    }

        
    }

    const countMatch = function(bestMatchId, bestMismatchId) {
      
        // let countMatched = {};
        // let countMismatched = {};
        // let maxMatch = 0;
        // let maxMatchAlt = 0;
        // let maxMismatch = 0;
        // let bestMatchId= null;
        // let worstMatchId = null;
        // let matchProduct;
        // let mismatchProduct;
        
        // matchArray.forEach(matchItem => {
        //     mismatchArray.forEach(mismatchItem => {
        //         if()
        //     })
        // })

        // matchArray.forEach(item => {
        //     countMatched[item.id] = (countMatched[item.id] || 0) + 1;
        // })
        // mismatchArray.forEach(item => {
        //     countMismatched[item.id] = (countMismatched[item.id] || 0) + 1;
        // })
        // console.log("COUINT MAATCHED", countMatched)
        // console.log("COUINT MIIIISSSSMAATCHED", countMismatched)
        // for (const key in countMatched) {
        //     if(maxMatch < countMatched[key]) {
        //         bestMatchId = key;
        //         maxMatch = countMatched[key];
        //     }
        // }
        // for (const key in countMismatched) {
        //     if(maxMismatch < countMismatched[key] && bestMatchId !== key) {
        //         worstMatchId = key;
        //         maxMismatch = countMismatched[key];
        //     }
        // }
        // if(bestMatchId !== worstMatchId){
        //     matchProduct = selectedProducts.find(item => item.id == bestMatchId)
        //     mismatchProduct = selectedProducts.find(item => item.id == worstMatchId)
        // } else {
        //     for (const key in countMismatched) {
        //         if(maxMismatch < countMismatched[key] && countMismatched[key] !== bestMatchId) {
        //             worstMatchId = key;
        //             maxMismatch = countMismatched[key];
        //         }
        //     }
        // }
        
    
        // if(Object.keys(countMatched).length > 1 && Object.keys(countMismatched).length > 1 && bestMatchId === worstMatchId) {
        //     let bestMatchAltId = null;
        //     let countMatchedAlt = {};
        //     var newArray = matchArray.filter(item => ( 
        //        !(item.id == bestMatchId.split(" ")[0] && item.subcategory_id == bestMatchId.split(" ")[1])
        //     ));
            
        //     newArray.forEach(item => {
        //         countMatchedAlt[item.id + " " + item.subcategory_id] = (countMatchedAlt[item.id + " " + item.subcategory_id] || 0) + 1;
        //     })
        //     for (const key in countMatchedAlt) {   
        //         if(maxMatchAlt < countMatchedAlt[key]) {
        //             bestMatchAltId = key;
        //             maxMatchAlt = countMatchedAlt[key];
        //         }
        //     }
        //     // findResult(bestMatchAltId, worstMatchId);
        // } else {
        //     // findResult(bestMatchId, worstMatchId);
        // }
    }
    const findResult = function(bestMatchId, bestMismatchId) {
        const matchProduct = selectedProducts.find(item => item.id == bestMatchId)
        const mismatchProduct = selectedProducts.find(item => item.id == bestMismatchId)
        const data = {
            match: matchProduct,
            mismatch: mismatchProduct
        }    
        compare(data);
        setCalculated(true);
    }

    const viewResults = async () => {
        await navigation.push('Results');
        setCalculated(false);
    }

    function animateActiveBtn() {
        Animations.pulsingBtn(scale);  
    }
    return (
        <View style={CriteriaStyles().container}>
            {modal && 
             <Modal title="Warning" 
                message={'Please select at least one criteria.'} 
                close={() => setModal(false)} 
                ok="OK" color={colors.orange} borderColor={colors.inputOrange}
                horizontal={20} vertical={10}
            />
            }
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
            { !calculated ? (
                <TouchableOpacity style={CriteriaStyles().buttonWrapOne} onPress={countResults} >
                    <IonIcon name="ios-calculator" style={CriteriaStyles().buttonResults} />
                </TouchableOpacity>
            ) : (
                <Animated.View style={CriteriaStyles(scale).buttonWrapAnimated}>
                    {animateActiveBtn()}
                    <TouchableOpacity style={CriteriaStyles().buttonAnimated} onPress={viewResults} >
                            <IonIcon name="ios-stats" style={CriteriaStyles().buttonResults}  />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    )
}

const mapStateToProps = (state) => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, { compare })(Criteria))