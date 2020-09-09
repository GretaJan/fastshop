import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { clearResults } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';

const Animations = require('../../components_additional/styles/Animations.js');

const ResultsOfBestWorst = ({ result, clearResults, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const { healthy, unhealthy } = result;
    const scaleAnimate = useState(new Animated.Value(0))[0];
    const [energyCount, setEnergyCount] = useState(0);

    useInterval(() => {
        setEnergyCount(energyCount + 1)
    }, 1000)

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
        }, 0)
    }

    const callDiagramAnimation = () => {
        Animations.diagramAnimation(scaleAnimate);
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
                                            {/* <Text style={diagram().number} >{ healthy.energy == null ? 0 : healthy.energy }</Text> */}
                                            <Text style={diagram().number} >{ energyCount }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.energy == null ? '0' : unhealthy.energy }</Text>
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
                                            <Text style={diagram().number} >{ healthy.fat == null ? '0' : healthy.fat }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.fat == null ? '0' : unhealthy.fat }</Text>
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
                                            <Text style={diagram().number} >{ healthy.saturated == null ? '0' : healthy.saturated }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.saturated == null ? '0' : unhealthy.saturated }</Text>
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
                                                <Text style={diagram().number} >{ healthy.carbs == null ? '0' : healthy.carbs }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.carbs == null ? '0' : unhealthy.carbs }</Text>
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
                                            <Text style={diagram().number} >{ healthy.sugar == null ? '0' : healthy.sugar }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.sugar == null ? '0' : unhealthy.sugar }</Text>
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
                                            <Text style={diagram().number} >{ healthy.fiber == null ? '0' : healthy.fiber }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.fiber == null ? '0' : unhealthy.fiber }</Text>
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
                                            <Text style={diagram().number} >{ healthy.protein == null ? '0' : healthy.protein }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.protein == null ? '0' : unhealthy.protein }</Text>
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
                                            <Text style={diagram().number} >{ healthy.salt == null ? '0' : healthy.salt }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.salt == null ? '0' : unhealthy.salt }</Text>
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
                                            <Text style={diagram().number} >{ healthy.vitamins == null ? '0' : healthy.vitamins }</Text>
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
                                            <Text style={diagram().number} >{ unhealthy.vitamins == null ? '0' : unhealthy.vitamins }</Text>
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

function useInterval(callback, delay) {
    const getCallback = useRef();

    useEffect(() => {
        getCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        function tick() {
            getCallback.current();
        }
        if(delay !== null) {
            let id = setInterval(tick, 0);
            return () => clearInterval(id);
        }
    }, [delay])
}


export default withNavigation(connect(mapStateToProps, {clearResults})(ResultsOfBestWorst))
