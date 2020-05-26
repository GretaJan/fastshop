import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { clearResults } from '../../src/actions/comparisonActions';
import { withNavigation } from 'react-navigation';

const Animations = require('../../components_additional/styles/Animations.js');

const ResultsOfBestWorst = ({ result, clearResults, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const [energyMatchInc, setEnergyMatchInc] = useState(0);
    const [fatMatchInc, setFatMatchInc] = useState(0);
    const [satMatchInc, setSatMatchInc] = useState(0);
    const [carbsMatchInc, setCarbsMatchInc] = useState(0);
    const [sugarMatchInc, setSugarMatchInc] = useState(0);
    const [fiberMatchInc, setFiberMatchInc] = useState(0);
    const [protMatchInc, setProtMatchInc] = useState(0);
    const [saltMatchInc, setSaltMatchInc] = useState(0);
    const [vitMatchInc, setVitMatchInc] = useState(0);
    const [energyMismatchInc, setEnergyMismatchInc] = useState(0);
    const [fatMismatchInc, setFatMismatchInc] = useState(0);
    const [satMismatchInc, setSatMismatchInc] = useState(0);
    const [carbsMismatchInc, setCarbsMismatchInc] = useState(0);
    const [sugarMismatchInc, setSugarMismatchInc] = useState(0);
    const [fiberMismatchInc, setFiberMismatchInc] = useState(0);
    const [protMismatchInc, setProtMismatchInc] = useState(0);
    const [saltMismatchInc, setSaltMismatchInc] = useState(0);
    const [vitMismatchInc, setVitMismatchInc] = useState(0);
    const delay = useState(50)[0];
    const { healthy, unhealthy } = result;
    const matchCarbs = parseFloat(healthy.carbs);
    const scaleAnimate = useState(new Animated.Value(0))[0];
    const numberAnimate = useState(new Animated.Value(0))[0];

    useInterval(() => {
        console.log("hello", carbsMatchInc)
        if(energyMatchInc < parseInt(healthy.energy)) {
            setEnergyMatchInc(energyMatchInc + 1)
        }
        if(fatMatchInc < healthy.fat) {
            console.log(typeof(fatMatchInc))
            setFatMatchInc(fatMatchInc + 0.1)
        }
        if(satMatchInc < parseInt(healthy.saturated)) {
            setSatMatchInc(satMatchInc + 1)
        }
        if(carbsMatchInc < healthy.carbs) {
            setCarbsMatchInc(carbsMatchInc + 0.1)
        }
        if(sugarMatchInc < parseInt(healthy.sugar)) {
            setSugarMatchInc(sugarMatchInc + 1)
        }
        if(fiberMatchInc < parseInt(healthy.fiber)) {
            setFiberMatchInc(fiberMatchInc + 0.1)
        }
        if(protMatchInc < parseInt(healthy.protein)) {
            setProtMatchInc(protMatchInc + 1)
        }
        if(saltMatchInc < parseInt(healthy.salt)) {
            setSaltMatchInc(saltMatchInc + 0.1)
        }
        if(vitMatchInc < parseInt(healthy.vitamins)) {
            setVitMatchInc(vitMatchInc + 0.1)
        }
        // Mismatch
        if(energyMismatchInc < parseInt(unhealthy.energy)) {
            setEnergyMismatchInc(energyMismatchInc + 1)
        }
        if(fatMismatchInc < parseInt(unhealthy.fat)) {
            setFatMismatchInc(fatMismatchInc + 0.1)
        }
        if(satMismatchInc < parseInt(unhealthy.saturated)) {
            setSatMismatchInc(satMismatchInc + 1)
        }
        if(carbsMismatchInc < parseInt(unhealthy.carbs)) {
            setCarbsMismatchInc(carbsMismatchInc + 0.1)
        }
        if(sugarMismatchInc < parseInt(unhealthy.sugar)) {
            setSugarMismatchInc(sugarMismatchInc + 1)
        }
        if(fiberMismatchInc < parseInt(unhealthy.fiber)) {
            setFiberMismatchInc(fiberMismatchInc + 0.1)
        }
        if(protMismatchInc < parseInt(unhealthy.protein)) {
            setProtMismatchInc(protMismatchInc + 1)
        }
        if(saltMismatchInc < parseInt(unhealthy.salt)) {
            setSaltMismatchInc(saltMismatchInc + 0.1)
        }
        if(vitMismatchInc < parseInt(unhealthy.vitamins)) {
            setVitMismatchInc(vitMismatchInc + 0.1)
        }
    }, 2000)

    useEffect(() => {
        callDiagramAnimation();
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
        }, 1)
    }

    const callDiagramAnimation = () => {
        Animations.diagramAnimation(scaleAnimate);
        Animations.numberAnimation(numberAnimate, parseInt(healthy.energy));
    }

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
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Energy</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.energy == null ? 0 : healthy.energy).lineOneEnergy} ></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{energyMatchInc}</Text>
                                            <Text style={diagram().measure} >kcal</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.energy == null ? '0' : unhealthy.energy).lineTwoEnergy}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{energyMismatchInc}</Text>
                                            <Text style={diagram().measure} >kcal</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Fat</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.fat == null ? '0' : healthy.fat).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ (fatMatchInc).toFixed(1) }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.fat == null ? '0' : unhealthy.fat).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ fatMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Saturated fat</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.saturated == null ? '0' : healthy.saturated).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ satMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.saturated == null ? '0' : unhealthy.saturated).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ satMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View> 
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Carbohidrates</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.carbs == null ? '0' : healthy.carbs).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <View style={diagram().numberWrap}>
                                                <Text style={diagram().number} >{ carbsMatchInc }</Text>
                                            </View>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.carbs == null ? '0' : unhealthy.carbs).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ carbsMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Sugar</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.sugar == null ? '0' : healthy.sugar).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ sugarMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.sugar == null ? '0' : unhealthy.sugar).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ sugarMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Fiber</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.fiber == null ? '0' : healthy.fiber).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ fiberMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.fiber == null ? '0' : unhealthy.fiber).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ fiberMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Protein</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.protein == null ? '0' : healthy.protein).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ protMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.protein == null ? '0' : unhealthy.protein).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ protMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Salt</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.salt == null ? '0' : healthy.salt).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ saltMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.salt == null ? '0' : unhealthy.salt).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ saltMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Vitamins</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(healthy.vitamins == null ? '0' : healthy.vitamins).lineOne}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ vitMatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                                <Text style={diagram(unhealthy.vitamins == null ? '0' : unhealthy.vitamins).lineTwo}></Text>
                                            </Animated.View>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{ vitMismatchInc }</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={(diagram().scrollUp)} onPress={ scrollUp }>
                                <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
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


function useInterval(func, delay) {
    const reference = useRef();
    useEffect(() => {
        reference.current = func;
    }, [func]);

    useEffect(() => {
        function tick() {
            reference.current();
        }
        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay])
} 

export default withNavigation(connect(mapStateToProps, {clearResults})(ResultsOfBestWorst))
