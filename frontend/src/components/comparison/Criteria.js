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
        let energyQuant = parseInt(array[0].energy);
        let fatQuant = parseInt(array[0].fat) * 100;
        let saturatedQuant = parseInt(array[0].saturated) * 100;
        let carbsQuant = parseInt(array[0].carbs) * 100;
        let sugarQuant = parseInt(array[0].sugar) * 100;
        let fiberQuant = parseInt(array[0].fiber) * 100;
        let proteinQuant = parseInt(array[0].protein) * 100;
        let saltQuant = parseInt(array[0].salt) * 100;
        let vitaminsQuant = parseInt(array[0].vitamins) * 100;
        let energyLeast = parseInt(array[0].energy) * 100;
        let fatLeast= parseInt(array[0].fat) * 100;
        let saturatedLeast = parseInt(array[0].saturated) * 100;
        let carbsLeast = parseInt(array[0].carbs) * 100;
        let sugarLeast = parseInt(array[0].sugar) * 100;
        let fiberLeast = parseInt(array[0].fiber) * 100;
        let proteinLeast = parseInt(array[0].protein) * 100;
        let saltLeast= parseInt(array[0].salt) * 100;
        let vitaminsLeast = parseInt(array[0].vitamins) * 100;
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

        if(bulletEnergyActiveMost || bulletEnergyActiveLeast) {
            energyComponent = array[0];
            energyMismatch = array[0];
        }
        if(bulletFatActiveMost || bulletFatActiveLeast) {
            fatComponent = array[0];
            fatMismatch = array[0];
        }
        if(bulletSaturatedActiveMost || bulletSaturatedActiveLeast) {
            saturatedComponent = array[0];
            saturatedMismatch = array[0];
        }
        if(bulletCarbsActiveMost || bulletCarbsActiveLeast) {
            carbsComponent = array[0];
            carbsMismatch = array[0];
        }
        if(bulletSugarActiveMost || bulletSugarActiveLeast) {
            sugarComponent = array[0];
            sugarMismatch = array[0];
        }
        if(bulletFiberActiveMost || bulletFiberActiveLeast) {
            fiberComponent = array[0];
            fiberMismatch = array[0];
        }
        if(bulletProteinActiveMost || bulletProteinActiveLeast) {
            proteinComponent = array[0];
            proteinMismatch = array[0];
        }
        if(bulletSaltActiveMost || bulletSaltActiveLeast) {
            saltComponent = array[0];
            saltMismatch = array[0];
        }
        if(bulletVitaminsActiveMost || bulletVitaminsActiveLeast) {
            vitaminsComponent = array[0];
            vitaminsMismatch = array[0];
        }
        for(let i = 1; i < arrayLength; i++) {
            const parsedEnergy = parseInt(array[i].energy) * 100;
            // const parsedFat = parseInt(array[i].fat) * 100;
            const parsedFat = parseInt(array[i].fat);
            const parsedSaturated = parseInt(array[i].saturated);
            const parsedCarbs = parseInt(array[i].carbs);
            const parsedSugar = parseInt(array[i].sugar);
            const parsedFiber = parseInt(array[i].fiber);
            const parsedProtein = parseInt(array[i].protein);
            const parsedSalt = parseInt(array[i].salt);
            const parsedVitamins = parseInt(array[i].vitamins);
            if(parseInt(array[0].fat) < array[1].fat) {
                console.log("yes IT IS-------------", array[1].fat, " ", array[0], " 2: ", array[1])
            } else {
                console.log("no IT IS-------------", array[1].fat, " ", array[1], " 2: ", array[2])
            }
            array
            if(bulletEnergyActiveMost) { 
                if(energyQuant < parsedEnergy) {
                    energyQuant =  array[i].energy;
                    energyComponent = array[i];
                    console.log('energyQuantONE', energyQuant)
                } else if(energyLeast > parsedEnergy){
                    energyLeast =  array[i].energy;
                    energyMismatch = array[i];
                }
            } else if(bulletEnergyActiveLeast) {
                if(energyLeast > parsedEnergy) {
                    energyLeast =  array[i].energy;
                    energyComponent = array[i];
                } else if(energyQuant < parsedEnergy) {
                    energyQuant =  array[i].energy;
                    energyMismatch = array[i];
                }
            }
            if(bulletFatActiveMost) {
                if(fatQuant < parsedFat) {
                    fatQuant = array[i].fat;
                    fatComponent = array[i];
                    console.log("FAT MOST BIGGER", fatComponent.name, ": ", fatQuant )
                } else if(fatLeast < parsedFat) {
                    fatLeast = array[i].fat;
                    fatMismatch = array[i];
                    fatLeast = array[i].fat;
                    console.log("FAT MOST SMALLER", fatMismatch.name, ": ", fatLeast)
                } 
            } else if(bulletFatActiveLeast) {
                if(fatLeast > parsedFat) {
                    fatLeast = array[i].fat;
                    fatComponent = array[i];
                    console.log("fatlmost Fat 6666 ", fatComponent)
                } else if(fatQuant < parsedFat) {
                    fatQuant = array[i].fat;
                    fatMismatch = array[i];
                    console.log("fatlmost Fat ", fatMismatch)
                }
            }

            if(bulletSaturatedActiveMost) {
                if(saturatedQuant < parsedSaturated) {
                    saturatedQuant =  array[i].saturated;
                    saturatedComponent = array[i];
                } else if(saturatedLeast > parsedSaturated) {
                    saturatedLeast =  array[i].saturated;
                    saturatedMismatch = array[i];
                } 
            } else if(bulletSaturatedActiveLeast) {
                if(saturatedLeast > parsedSaturated) {
                    saturatedLeast =  array[i].saturated;
                    saturatedComponent = array[i];
                } else if(saturatedQuant > parsedSaturated) {
                    saturatedQuant =  array[i].saturated;
                    saturatedMismatch = array[i];
                } 
            }

            if(bulletCarbsActiveMost) {
                if(carbsQuant < parsedCarbs) {
                    carbsQuant = array[i].carbs;
                    carbsComponent = array[i];
                } else if (carbsLeast <  parsedCarbs){
                    carbsLeast = array[i].carbs;
                    carbsMismatch = array[i];
                } 
            } else if(bulletCarbsActiveLeast) {
                if(carbsLeast > parsedCarbs) {
                    carbsLeast = array[i].carbs;
                    carbsComponent = array[i];
                } else if (carbsQuant < parsedCarbs) {
                    carbsQuant = array[i].carbs;
                    carbsMismatch = array[i];
                } 
            }

            if(bulletSugarActiveMost) {
                if(sugarQuant < parsedSugar) {
                    sugarQuant = array[i].sugar;
                    sugarComponent = array[i];
                } else if (sugarLeast > parsedSugar) {
                    sugarLeast = array[i].sugar;
                    sugarMismatch = array[i];
                } 
            } else if(bulletSugarActiveLeast) {
                if(sugarLeast > parsedSugar) {
                    sugarLeast = array[i].sugar;
                    sugarComponent = array[i];
                } else if (sugarQuant < parsedSugar) {
                    sugarQuant = array[i].sugar;
                    sugarMismatch = array[i];
                } 
            }

            if(bulletFiberActiveMost) {
                if(fiberQuant < parsedFiber) {
                    fiberQuant = array[i].fiber;
                    fiberComponent = array[i];
                } else if (fiberLeast > parsedFiber) {
                    fiberLeast = array[i].fiber;
                    fiberMismatch = array[i].fiber;
                } 
            } else if(bulletFiberActiveLeast) {
                if(fiberLeast > parsedFiber) {
                    fiberLeast = array[i].fiber;
                    fiberComponent = array[i];
                } else if (fiberQuant < parsedFiber) {
                    fiberQuant = array[i].fiber;
                    fiberMismatch = array[i];
                } 
            }

            if(bulletProteinActiveMost) {
                if(proteinQuant < parsedProtein) {
                    proteinQuant = array[i].protein;
                    proteinComponent = array[i];
                } else if (proteinLeast > parsedProtein) {
                    proteinLeast = array[i].protein;
                    proteinMismatch = array[i];
                } 
            } else if(bulletProteinActiveLeast) {
                if(proteinLeast > parsedProtein) {
                    proteinLeast = array[i].protein;
                    proteinComponent = array[i];
                } else if (proteinQuant < parsedProtein) {
                    proteinQuant = array[i].protein;
                    proteinMismatch = array[i];
                }
            }

            if(bulletSaltActiveMost) {
                if(saltQuant < parsedSalt) {
                    saltQuant = array[i].salt;
                    saltComponent = array[i];
                } else if (saltLeast > parsedSalt) {
                    saltLeast = array[i].salt;
                    saltMismatch = array[i];
                } 
            } else if(bulletSaltActiveLeast) {
                if(saltLeast > parsedSalt) {
                    saltLeast = array[i].salt;
                    saltComponent = array[i];
                } else if (saltQuant < parsedSalt) {
                    saltQuant = array[i].salt;
                    saltMismatch = array[i];
                } 
            }
            if(bulletVitaminsActiveMost) {
                if(vitaminsQuant < parsedSalt) {
                    vitaminsQuant = array[i].vitamins;
                    vitaminsComponent = array[i];
                } else if (vitaminsLeast < parsedSalt) {
                    vitaminsLeast = array[i].vitamins;
                    vitaminsMismatch = array[i];
                } 
            } else if(bulletVitaminsActiveLeast) {
                if(vitaminsLeast > parsedVitamins) {
                    vitaminsLeast = array[i].vitamins;
                    vitaminsComponent = array[i];
                } else if (vitaminsQuant < parsedVitamins) {
                    vitaminsQuant = array[i].vitamins;
                    vitaminsMismatch = array[i];
                } 
            }
        }
        // MATCH
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
        console.log("check error", matchArray, "2: ", mismatchArray)
        countMatch(matchArray, mismatchArray);
    }

        
    }

    const countMatch = function(matchArray, mismatchArray) {
        let countMatched = {};
        let countMismatched = {};
        let maxMatch = 0;
        let maxMatchAlt = 0;
        let maxMismatch = 0;
        let bestMatchId = null;
        let worstMatchId = null;
        matchArray.forEach(item => {
            countMatched[item.id + " " + item.subcategory_id] = (countMatched[item.id + " " + item.subcategory_id] || 0) + 1;
        })
        mismatchArray.forEach(item => {
            countMismatched[item.id + " " + item.subcategory_id] = (countMismatched[item.id + " " + item.subcategory_id] || 0) + 1;
        })
        for (const key in countMatched) {
            if(maxMatch < countMatched[key]) {
                bestMatchId = key;
                maxMatch = countMatched[key];
            }
        }
        for (const key in countMismatched) {
            if(maxMismatch < countMismatched[key]) {
                worstMatchId = key;
                maxMismatch = countMismatched[key];
            }
        }
        if(Object.keys(countMatched).length > 1 && Object.keys(countMismatched).length > 1 && bestMatchId === worstMatchId) {
            let bestMatchAltId = null;
            let countMatchedAlt = {};
            var newArray = matchArray.filter(item => ( 
               !(item.id == bestMatchId.split(" ")[0] && item.subcategory_id == bestMatchId.split(" ")[1])
            ));
            
            newArray.forEach(item => {
                countMatchedAlt[item.id + " " + item.subcategory_id] = (countMatchedAlt[item.id + " " + item.subcategory_id] || 0) + 1;
            })
            for (const key in countMatchedAlt) {   
                if(maxMatchAlt < countMatchedAlt[key]) {
                    bestMatchAltId = key;
                    maxMatchAlt = countMatchedAlt[key];
                }
            }
            findResult(bestMatchAltId, worstMatchId);
        } else {
            findResult(bestMatchId, worstMatchId);
        }
    }
    const findResult = function(bestMatchId, worstMatchId) {
        const bestMatch_id = bestMatchId.split(" ")[0]; 
        const bestMatch_subcategoryId = bestMatchId.split(" ")[1]; 
        const worstMatch_id = worstMatchId.split(" ")[0]; 
        const worstMatch_subcategoryId = worstMatchId.split(" ")[1]; 
        const result = {
            healthier: {
                id: bestMatch_id,
                subId: bestMatch_subcategoryId,
            },
            unhealthier: {
                id: worstMatch_id,
                subId: worstMatch_subcategoryId,
            } 
        }    
        compare(result);
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