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
    const { healthy, unhealthy } = result;
    // const scaleAnimate = useState(new Animated.Value(0))[0];
    // const [energyCount, setEnergyCount] = useState(0);


    useEffect(() => {
        // callDiagramAnimation();
        console.log(healthy)
        console.log(unhealthy)
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
        saveCombination(healthy, unhealthy)
    }

    // const callDiagramAnimation = () => {
    //     Animations.diagramAnimation(scaleAnimate);
    // }

        return (
                Object.keys(result).length === 0 ? (
                    <View style={diagram().container}>
                    </View>
                ) : (
                    <ScrollView style={diagram().container} ref={scrollView => scrollTopRef = scrollView}>
                        <View style={diagram().mainContentContainer} >
                            <View style={diagram().productsContainer} >
                                <TouchableOpacity style={diagram().itemGoodWrap} onPress={() => navigate("Product", {subcategoryId: healthy.subcategory_id, productId: healthy.id})} >
                                    { healthy.image ? (
                                        <View style={diagram().imageContainerGood} >
                                            <Image style={diagram().image} source={{ uri: healthy.image }} />
                                        </View>
                                        ) : (
                                        <View style={diagram().imageContainerGood} >
                                            <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        </View> 
                                    )}
                                    <View style={diagram().title} >
                                        <Text style={diagram().text}>{ nameSlice(healthy.name) }</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={diagram().itemBadWrap} onPress={() => navigate("Product", {subcategoryId: unhealthy.subcategory_id, productId: unhealthy.id})}>
                                    {unhealthy.image ? (
                                        <View style={diagram().imageContainerBad} >
                                            <Image style={diagram().image} source={{ uri: unhealthy.image }} />
                                        </View>
                                        ) : (
                                        <View style={diagram().imageContainerBad} >
                                            <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        </View> 
                                    )}
                                    <View style={diagram().title} >
                                        <Text style={diagram().text}>{ nameSlice(unhealthy.name) }</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                            {/* Diagram */}
                        </View>
                        <View style={diagram().diagramContainer}>
                            <ResultsBestWorstChild 
                                title='Energy'
                                measurement='kcal'
                                matchComponent={ healthy.energy }
                                mismatchComponent={ unhealthy.energy }
                            />
                            <ResultsBestWorstChild 
                                title='Fat'
                                measurement='g'
                                matchComponent={ healthy.fat }
                                mismatchComponent={ unhealthy.fat }
                            />
                            <ResultsBestWorstChild 
                                title='Saturated fat'
                                measurement='g'
                                matchComponent={ healthy.saturated }
                                mismatchComponent={ unhealthy.saturated }
                            />
                            <ResultsBestWorstChild 
                                title='Carbohidrates'
                                measurement='g'
                                matchComponent={ healthy.carbs }
                                mismatchComponent={ unhealthy.carbs }
                            />
                            <ResultsBestWorstChild 
                                title='Sugar'
                                measurement='g'
                                matchComponent={ healthy.sugar }
                                mismatchComponent={ unhealthy.sugar }
                            />
                            <ResultsBestWorstChild 
                                title='Fiber'
                                measurement='g'
                                matchComponent={ healthy.fiber }
                                mismatchComponent={ unhealthy.fiber }
                            />
                            <ResultsBestWorstChild 
                                title='Protein'
                                measurement='g'
                                matchComponent={ healthy.protein }
                                mismatchComponent={ unhealthy.protein }
                            />
                            <ResultsBestWorstChild 
                                title='Salt'
                                measurement='g'
                                matchComponent={ healthy.salt }
                                mismatchComponent={ unhealthy.salt }
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
