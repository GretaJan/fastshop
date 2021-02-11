import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { clearResults, saveCombination } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import ResultsBestWorstChild from './ResultsBestWorstChild';

// const Animations = require('../../components_additional/styles/Animations.js');

const ResultsOfBestWorst = ({ result, clearResults, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const { match, mismatch } = result;


    useEffect(() => {
        // callDiagramAnimation();
        console.log(match)
        console.log(mismatch)
    }, [])
    const nameSlice = (name) => {
        if(name.length > 33) {
           var newName = name.slice(0, 33);
            return (
                <Text style={diagram().text}>{ newName }...</Text>
            )
        } else {
            return (
                <Text style={diagram().text}>{ name }</Text>
            )
        }
    }
    const scrollUp = () => {
        scrollTopRef.scrollTo({y: 0, animated: true});
    }

    const invokeClearResults = () => {
        clearResults();
        setTimeout(() => {
            navigate("SelectedProducts");
        }, 0)
    }

    const invokeSaveCombination = () => {
        saveCombination(match, mismatch)
    }

    return (
            Object.keys(result).length === 0 ? (
                <View style={diagram().container}>
                </View>
            ) : (
                <ScrollView style={diagram().container} ref={scrollView => scrollTopRef = scrollView}>
                    <View style={diagram().mainContentContainer} >
                        <View style={diagram().productsContainer} >
                            <TouchableOpacity style={diagram().itemGoodWrap} onPress={() => navigate("Product", {subcategoryId: match.subcategory_id, productId: match.id})} >
                                { match.image ? (
                                    <View style={diagram().imageContainerGood} >
                                        <Image style={diagram().image} source={{ uri: match.image }} />
                                    </View>
                                    ) : (
                                    <View style={diagram().imageContainerGood} >
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                    </View> 
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{ nameSlice(match.name) }</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={diagram().itemBadWrap} onPress={() => navigate("Product", {subcategoryId: mismatch.subcategory_id, productId: mismatch.id})}>
                                {mismatch.image ? (
                                    <View style={diagram().imageContainerBad} >
                                        <Image style={diagram().image} source={{ uri: mismatch.image }} />
                                    </View>
                                    ) : (
                                    <View style={diagram().imageContainerBad} >
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                    </View> 
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{ nameSlice(mismatch.name) }</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                        {/* Diagram */}
                    </View>
                    <View style={diagram().diagramContainer}>
                        <ResultsBestWorstChild 
                            title='Energy'
                            matchComponent={ match.energy }
                            matchComponentArr={ match.energyArr }
                            mismatchComponent={ mismatch.energy }
                            mismatchComponentArr={ mismatch.energyArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fat'
                            matchComponent={ match.fat }
                            matchComponentArr={ match.fatArr }
                            mismatchComponent={ mismatch.fat }
                            mismatchComponentArr={ mismatch.fatArr }
                        />
                        <ResultsBestWorstChild 
                            title='Saturated fat'
                            matchComponent={ match.saturated }
                            matchComponentArr={ match.saturatedArr }
                            mismatchComponent={ mismatch.saturated }
                            mismatchComponentArr={ mismatch.saturatedArr }
                        />
                        <ResultsBestWorstChild 
                            title='Carbohidrates'
                            matchComponent={ match.carbs }
                            matchComponentArr={ match.carbsArr }
                            mismatchComponent={ mismatch.carbs }
                            mismatchComponentArr={ mismatch.carbsArr }
                        />
                        <ResultsBestWorstChild 
                            title='Sugar'
                            matchComponent={ match.sugar }
                            matchComponentArr={ match.sugarArr }
                            mismatchComponent={ mismatch.sugar }
                            mismatchComponentArr={ mismatch.sugarArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fiber'
                            matchComponent={ match.fiber }
                            matchComponentArr={ match.fiberArr }
                            mismatchComponent={ mismatch.fiber }
                            mismatchComponentArr={ mismatch.fiberArr }
                        />
                        <ResultsBestWorstChild 
                            title='Protein'
                            matchComponent={ match.protein }
                            matchComponentArr={ match.proteinArr }
                            mismatchComponent={ mismatch.protein }
                            mismatchComponentArr={ mismatch.proteinArr }
                        />
                        <ResultsBestWorstChild 
                            title='Salt'
                            matchComponent={ match.salt }
                            matchComponentArr={ match.saltArr }
                            mismatchComponent={ mismatch.salt }
                            mismatchComponentArr={ mismatch.saltArr }
                        />  
                        <TouchableOpacity style={(diagram().scrollUp)} onPress={ scrollUp }>
                            <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeSaveCombination }>
                            <Text style={diagram().optionsBtnText}>Save Results</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeClearResults }>
                            <Text style={diagram().optionsBtnText}>Clear Results</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    )
}

const mapStateToProps = state => ({
    result: state.selectedProducts.result,
})

// function useInterval(callback, delay) {
//     const getCallback = useRef();

//     useEffect(() => {
//         getCallback.current = callback;
//     }, [callback]);
//     useEffect(() => {
//         function tick() {
//             getCallback.current();
//         }
//         if(delay !== null) {
//             let id = setInterval(tick, 0);
//             return () => clearInterval(id);
//         }
//     }, [delay])
// }


export default withNavigation(connect(mapStateToProps, {clearResults})(ResultsOfBestWorst))
