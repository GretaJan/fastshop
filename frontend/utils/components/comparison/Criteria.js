import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { CriteriaStyles, productWrap } from '../../src/styles/CompareStyles';
import { containerStyles, textStyle, btnStyles } from '../../src/styles/GeneralStyles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { compare, clearResults } from '../../redux/actions/comparisonActions';
import { colors } from '../../src/styles/Colors';
import Modal from '../../utils/models/Modal';

//Components
import Header from '../../utils/models/Header';
import CriteriaChild from './CriteriaChild';

const { comparisonAnimations } = require('../../src/styles/Animations.js');

const Criteria = ({compare, clearResults, selectedProducts, navigation: { navigate }}) => {
    const [mostCriteria, setMostCriteria] = useState([]);
    const [leastCriteria, setLeastCriteria] = useState([]);
    const [calculated, setCalculated] = useState(null);
    const [modal, setModal] = useState(false);
    const scale = useState(new Animated.Value(1))[0];
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
 
    useEffect(() => {
        return setCalculated(false)
    }, [mostCriteria, leastCriteria])

    const buttonPosition = useCallback(event => {
        const { width, height, x, y } = event.nativeEvent.layout;
            setLocationX(Math.round(x - (width / 2)))
            setLocationY(Math.round(y + height - 65))
    }, []);

    return (
        <>
            <Header
                title="Choose Criteria"
                navigate={ () => navigate("SelectedProducts") }
            />
            {modal && 
            <Modal title="Warning" 
                message={'Please select at least one criteria.'} 
                close={() => setModal(false)} 
                ok="OK" color={colors.orange} borderColor={colors.inputOrange}
                locationX={ locationX }
                locationY={ locationY } 
            />
            }
            <View style={containerStyles().rowContainer}>
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
            </View>
            <View style={ containerStyles().screenHeightContainerNoHeader }>
                <CriteriaChild 
                    title='Energy'
                    originalName='energy'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/energy.png') }
                />
                <CriteriaChild 
                    title='Fat'
                    originalName='fat'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/fat.png') }
                />
                <CriteriaChild 
                    title='Saturated fat'
                    originalName='saturated'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/saturated.png') }
                />
                <CriteriaChild 
                    title='Carbohidrates'
                    originalName='carbs'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/carbs.png') }
                />
                <CriteriaChild 
                    title='Sugar'
                    originalName='sugar'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/sugar.png') }
                />
                <CriteriaChild 
                    title='Fiber'
                    originalName='fiber'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/fiber.png') }
                />
                <CriteriaChild 
                    title='Protein'
                    originalName='protein'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/protein.png') }
                />
                <CriteriaChild 
                    title='Salt'
                    originalName='salt'
                    setMostCriteria={ setMostCriteria }
                    setLeastCriteria={ setLeastCriteria }
                    icon={ require('../../src/images/nutrients/salt.png') }
                />
                <View style={ CriteriaStyles().resultBtnsWrap } onLayout={ buttonPosition } >
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
        </>
    )

    function countResults(){
        clearResults()
        if (mostCriteria.length === 0 && leastCriteria.length === 0) {    
                setModal(true);
        } else {
            setModal(false);
            const arrayLength = selectedProducts.length;
            let mostObj = {};
            let matchObj = {};
            let leastObj = {};
            let mismatchObj = {};
            for(let j = 0; j < mostCriteria.length; j++){
                const title = mostCriteria[j];
                mostObj[title] = -1;
                matchObj[title] = selectedProducts[0];
                for(let i = 0; i < arrayLength; i++) {
                    let item = selectedProducts[i][title];
                    let parsedItem = item ? parseInt(item) * 100 : 0;
                    if(mostObj[title] < parsedItem) { 
                        mostObj[title]  = parsedItem;
                        matchObj[title]  = selectedProducts[i];
                    }
                } 
            }
            for(let j = 0; j < leastCriteria.length; j++){
                const title = leastCriteria[j];
                mostObj[title] = selectedProducts[0][title] ? parseInt(selectedProducts[0][title]) * 100 : 0;
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
                    if(selectedProducts[i].id == bestMatchId) break;
                    let item = selectedProducts[i][title];
                    let parsedItem = item ? parseInt(item) * 100 : 0;
                    if(leastObj[title] > parsedItem) { 
                        leastObj[title]  = parsedItem;
                        mismatchObj[title]  = selectedProducts[i];
                    }
                } 
            }
            for(let j = 0; j < leastCriteria.length; j++){
                const title = leastCriteria[j];
                leastObj[title] = selectedProducts[0].id == bestMatchId ? selectedProducts[1][title] : selectedProducts[0][title]
                leastObj[title] = leastObj[title] ? parseInt(leastObj[title]) * 100 : 0;
                mismatchObj[title] = selectedProducts[0].id == bestMatchId ? selectedProducts[1] : selectedProducts[0];
                for(let i = 0; i < arrayLength; i++) {
                    if(selectedProducts[i].id == bestMatchId) break ;
                    let item = selectedProducts[i][title];
                    let parsedItem = item ? parseInt(item) * 100 : 0;
                    if(leastObj[title] < parsedItem) { 
                        leastObj[title]  = parsedItem;
                        mismatchObj[title]  = selectedProducts[i];
                    }
                }
            } 
            // MISMATCH
            for(const [key, item] of Object.entries(mismatchObj)){
                countMismatched[item.id] = (countMismatched[item.id] || 0) + 1;
            }
            for (const key in countMismatched) {
                if(maxMismatch < countMismatched[key]) {
                    bestMismatchId = key;
                    maxMismatch = countMismatched[key];
                }
            }
            findResult(bestMatchId, bestMismatchId);
        } 
}

    function findResult(bestMatchId, bestMismatchId) {
        const matchProduct = selectedProducts.find(item => item.id == bestMatchId)
        const mismatchProduct = selectedProducts.find(item => item.id == bestMismatchId)
        const data = {
            match: matchProduct,
            mismatch: mismatchProduct
        }    
        compare(data);
        setCalculated(true);
    }

    async function viewResults(){
        await navigate("Results");
        setCalculated(false);
    }

    function animateActiveBtn() {
        comparisonAnimations.pulsingBtn(scale);  
    }
}

const mapStateToProps = (state) => ({
    selectedProducts: state.selectedProducts.selectedProducts,
})

export default withNavigation(connect(mapStateToProps, { compare, clearResults })(Criteria))