import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { CriteriaStyles, productWrap } from '../../components_additional/styles/CompareStyles';
import { containerStyles, textStyle } from '../../components_additional/styles/GeneralStyles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { compare } from '../../redux/actions/comparisonActions';
import { colors } from '../../components_additional/styles/Colors';
import Modal from '../../components_additional/models/Modal';

import CriteriaChild from './CriteriaChild';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');

const Criteria = ({compare, selectedProducts, navigation}) => {
    const [energyCriteria, setEnergyCriteria] = useState(0);
    const [fatCriteria, setFatCriteria] = useState(0);
    const [saturatedCriteria, setSaturatedCriteria] = useState(0);
    const [carbsCriteria, setCarbsCriteria] = useState(0);
    const [sugarCriteria, setSugarCriteria] = useState(0);
    const [fiberCriteria, setFiberCriteria] = useState(0);
    const [proteinCriteria, setProteinCriteria] = useState(0);
    const [saltCriteria, setSaltCriteria] = useState(0);
    const [mostCriteria, setMostCriteria] = useState([]);
    const [leastCriteria, setLeastCriteria] = useState([]);
    const [noneCriteria, setNoneCriteria] = useState([]);
    const [calculated, setCalculated] = useState(null);
    const [modal, setModal] = useState(false);
    const scale = useState(new Animated.Value(1))[0];
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
 

    useEffect(() => {
        return setCalculated(false)
    }, [selectedProducts])

    const buttonPosition = useCallback(event => {
        const { width, height, x, y } = event.nativeEvent.layout;
            setLocationX(Math.round(x - (width / 2)))
            setLocationY(Math.round(y + height + 30))
    }, []);


    const countResults = () => {
        if (mostCriteria.length === 0 && leastCriteria.length === 0) {    
                setModal(true);
        } else {
            setModal(false);
            const arrayLength = selectedProducts.length;
            let mostObj = {};
            let matchObj = {};
            let leastObj = {};
            let mismatchObj = {};
            let matchArray = [];
            let mismatchArray = [];
            for(let j = 0; j < mostCriteria.length; j++){
                const title = mostCriteria[j];
                mostObj[title] = -1;
                matchObj[title] = selectedProducts[0];
                for(let i = 0; i < arrayLength; i++) {
                    let item = selectedProducts[i][title];
                    let parsedItem = item ? parseInt(item) * 100 : 0;
                    if(mostObj[title] > parsedItem) { 
                        mostObj[title]  = parsedItem;
                        matchObj[title]  = selectedProducts[i];
                    }
                } 
            }
            for(let j = 0; j < leastCriteria.length; j++){
                const title = leastCriteria[j];
                mostObj[title] = selectedProducts[0][title] ? parseInt(selectedProducts[0][title]) * 100 : 0;
                matchObj[title] = selectedProducts[0];
                console.log(" mostObj[title]:: ",  mostObj[title])
                for(let i = 0; i < arrayLength; i++) {
                    let item = selectedProducts[i][title];
                    let parsedItem = item ? parseInt(item) * 100 : 0;
                    if(mostObj[title] < parsedItem) { 
                        mostObj[title]  = parsedItem;
                        matchObj[title]  = selectedProducts[i];
                    }
                } 
            }

            let countMatched = {};
            let bestMatchId = 0;
            let maxMatch = 0;
            let countMismatched = {};
            let bestMismatchId = 0;
            let maxMismatch = 0;

            for(const [key, item] of Object.entries(matchObj)){
                countMatched[item.id]  = (countMatched[item.id] || 0) + 1;
            }
            for (const key in countMatched) {
                if(maxMatch < countMatched[key]) {
                    bestMatchId = key;
                    maxMatch = countMatched[key];
                }
            }

        
        for(let j = 0; j < mostCriteria.length; j++){
            const title = mostCriteria[j];
            leastObj[title] = selectedProducts[0].id == bestMatchId ? selectedProducts[1][title] : selectedProducts[0][title]
            leastObj[title] = mostObj[title] ? parseInt(mostObj[title]) * 100 : 0;
            mismatchObj[title] = selectedProducts[0].id == bestMatchId ? selectedProducts[1] : selectedProducts[0];
            for(let i = 0; i < arrayLength; i++) {
                if(selectedProducts[i].id == bestMatchId) { console.log("break 2"); break };
                let item = selectedProducts[i][title];
                let parsedItem = item ? parseInt(item) * 100 : 0;
                if(leastObj[title] < parsedItem) { 
                    leastObj[title]  = parsedItem;
                    mismatchObj[title]  = selectedProducts[i];
                }
            } 
        }
        for(let j = 0; j < leastCriteria.length; j++){
            const title = leastCriteria[j];
            leastObj[title] = selectedProducts[0].id == bestMatchId ? selectedProducts[1][title] : selectedProducts[0][title]
            leastObj[title] = leastObj[title] ? parseInt(leastObj[title]) * 100 : 0;
            for(let i = 0; i < arrayLength; i++) {
                if(selectedProducts[i].id == bestMatchId) { console.log("break 2"); break };
                let item = selectedProducts[i][title];
                let parsedItem = item ? parseInt(item) * 100 : 0;
                if(leastObj[title] > parsedItem) { 
                    leastObj[title]  = parsedItem;
                    mismatchObj[title]  = selectedProducts[i];
                }
            }
        } 
        // MISMATCH
   
        // mismatchArray.forEach(item => {
        //     countMismatched[item.id] = (countMismatched[item.id] || 0) + 1;
        // })
        for(const [key, item] of Object.entries(mismatchObj)){
            countMismatched[item.id] = (countMismatched[item.id] || 0) + 1;
        }
        for (const key in countMismatched) {
            if(maxMismatch < countMismatched[key]) {
                bestMismatchId = key;
                maxMismatch = countMismatched[key];
            }
        }
        console.log("amtch", bestMatchId)
        console.log("missamtch", bestMismatchId)

        findResult(bestMatchId, bestMismatchId);
    }

        
    }

    const findResult = function(bestMatchId, bestMismatchId) {
        const matchProduct = selectedProducts.find(item => item.id == bestMatchId)
        const mismatchProduct = selectedProducts.find(item => item.id == bestMismatchId)
        const data = {
            match: matchProduct,
            mismatch: mismatchProduct
        }    
        console.log(selectedProducts)
        console.log(data)
        compare(data);
        setCalculated(true);
    }

    const viewResults = async () => {
        await navigation.push('Results');
        setCalculated(false);
    }

    function animateActiveBtn() {
        comparisonAnimations.pulsingBtn(scale);  
    }
    return (
        <View style={containerStyles().screenHeightContainerMargin}>
            {modal && 
            <Modal title="Warning" 
                message={'Please select at least one criteria.'} 
                close={() => setModal(false)} 
                ok="OK" color={colors.orange} borderColor={colors.inputOrange}
                locationX={ locationX } 
                locationY={ locationY } 
            />
            }
            <View style={CriteriaStyles().itemContainer}>
                <View style={CriteriaStyles().titleWrap}>
                    <Text style={textStyle().h2}>Choose criteria</Text>
                </View>
                <View style={CriteriaStyles().bulletContainer}>
                    <Text style={CriteriaStyles().wrapThird}>
                        <Text style={textStyle().h2 }>Most</Text>
                    </Text>
                    <Text style={CriteriaStyles().wrapThird}>
                        <Text style={textStyle().h2 }>Least</Text>
                    </Text>
                    <Text style={CriteriaStyles().wrapThird}>
                        <Text style={textStyle().h2 }>None</Text>
                    </Text>
                </View>
            </View>
            <CriteriaChild 
                title='Energy'
                originalName='energy'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setLeastCriteria(currentArr => [...currentArr], currentArr )  }
                icon={ require('../../components_additional/images/nutrients/energy.png') }
            />
            <CriteriaChild 
                title='Fat'
                originalName='fat'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setFatCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/fat.png') }
            />
            <CriteriaChild 
                title='Saturated fat'
                originalName='saturated'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setSaturatedCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/saturated.png') }
            />
            <CriteriaChild 
                title='Carbohidrates'
                originalName='carbs'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setCarbsCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/carbs.png') }
            />
            <CriteriaChild 
                title='Sugar'
                originalName='sugar'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setSugarCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/sugar.png') }
            />
            <CriteriaChild 
                title='Fiber'
                originalName='fiber'
                // getComponentCriteria={ (value) => setFiberCriteria(value)  }
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                icon={ require('../../components_additional/images/nutrients/fiber.png') }
            />
            <CriteriaChild 
                title='Protein'
                originalName='protein'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setProteinCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/protein.png') }
            />
            <CriteriaChild 
                title='Salt'
                originalName='salt'
                setMostCriteria={ setMostCriteria }
                setLeastCriteria={ setLeastCriteria }
                setNoneCriteria={ setNoneCriteria }
                // getComponentCriteria={ (value) => setSaltCriteria(value)  }
                icon={ require('../../components_additional/images/nutrients/salt.png') }
            />
            <View style={ productWrap().btnTwo } onLayout={ buttonPosition } >
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
        </View>
    )
}

const mapStateToProps = (state) => ({
    selectedProducts: state.selectedProducts.comparisonArray,
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps, { compare })(Criteria))