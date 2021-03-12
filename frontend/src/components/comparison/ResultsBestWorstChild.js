import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Image } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { textStyle } from '../../components_additional/styles/GeneralStyles';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');

function ResultsBestWorstChild({title, matchComponent, matchComponentArr, mismatchComponent, mismatchComponentArr}){
    const scaleAnimate = useRef(new Animated.Value(0)).current;
    const numAnimateFirst = useRef(new Animated.Value(0)).current;
    const numAnimateSec = useRef(new Animated.Value(0)).current;
    const numAnimateThird = useRef(new Animated.Value(0)).current;
    const numAnimateFourth = useRef(new Animated.Value(0)).current;
    const mismNumAnimateFirst = useRef(new Animated.Value(0)).current;
    const mismNumAnimateSec = useRef(new Animated.Value(0)).current;
    const mismNumAnimateThird = useRef(new Animated.Value(0)).current;
    const mismNumAnimateFourth = useRef(new Animated.Value(0)).current;
    var icons = {
        Energy: require('../../components_additional/images/nutrients/energy.png'),
        Fat: require('../../components_additional/images/nutrients/fat.png'),
        Saturatedfat: require('../../components_additional/images/nutrients/saturated.png'),
        Carbohidrates: require('../../components_additional/images/nutrients/carbs.png'),
        Sugar: require('../../components_additional/images/nutrients/sugar.png'),
        Fiber: require('../../components_additional/images/nutrients/fiber.png'),
        Protein: require('../../components_additional/images/nutrients/protein.png'),
        Salt: require('../../components_additional/images/nutrients/salt.png'),
    }
    useEffect(() => {
        getAnimationsParams();
    }, [scaleAnimate, numAnimateFirst, numAnimateSec, numAnimateThird, numAnimateFourth, matchComponent, mismatchComponent])

    function getAnimationsParams(){
        callDiagramAnimation();
        
        if(matchComponentArr) {
            if(matchComponentArr[0]) callNumAnimation(matchComponentArr[0].length, numAnimateFirst)
            if(matchComponentArr[1]) callNumAnimation(matchComponentArr[1].length, numAnimateSec)
            if(matchComponentArr[2]) callNumAnimation(matchComponentArr[2].length, numAnimateThird)
            if(matchComponentArr[3]) callNumAnimation(matchComponentArr[3].length, numAnimateFourth)
        } 
        if(mismatchComponentArr){
            if(mismatchComponentArr[0]) callNumAnimation(mismatchComponentArr[0].length, mismNumAnimateFirst)
            if(mismatchComponentArr[1]) callNumAnimation(mismatchComponentArr[1].length, mismNumAnimateSec)
            if(mismatchComponentArr[2]) callNumAnimation(mismatchComponentArr[2].length, mismNumAnimateThird)
            if(mismatchComponentArr[3]) callNumAnimation(mismatchComponentArr[3].length, mismNumAnimateFourth)
        }
    }
    const callNumAnimation = (length, ref) => {
        comparisonAnimations.numbersAnimation(ref, -((length - 1) * 24.75))
    }

    const callDiagramAnimation = () => {
        comparisonAnimations.diagramAnimation(scaleAnimate);
    }

    const renderArrays = (currentArray, numAnimation) => {
        return (
            <Animated.FlatList
                style={numAnimation}
                showsVerticalScrollIndicator={ false }
                data={ currentArray }
                vertical={ true }
                renderItem={ ({item, index}) => <Text style={textStyle().h4} >{item}</Text> }
            />     
        )
    }

    return (
        <View style={diagram().diagramWrap}>
            <View style={diagram().linesWrap} >
            <View style={stylesGuestSingle().titleWrap}>
                <View style={ stylesGuestSingle().componentIconWrap }>
                    <Image style={ stylesGuestSingle().componentIcon } source={ icons[title.replace(/\s+/g, '')] }  />
                </View>
                <Text style={textStyle().h4} >{ title }</Text>
            </View>
            </View>
            { title == 'Energy' ? (
                 <View style={diagram().diagramLineWrap}>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(matchComponent == null ? 0 : matchComponent).lineOneEnergy} ></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <View style={diagram().itemNumberWrapAnimation} > 
                                 { matchComponentArr ? (
                                    <>
                                        <View style={diagram().itemNumberWrapAnimationEnergy} >
                                            { renderArrays(matchComponentArr[0], animations(null, numAnimateFirst).numbersTransitionFirst) }
                                        </View>
                                        { matchComponentArr[1] != 0 ? (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[1], animations(null, numAnimateSec).numbersTransitionSec)} 
                                            </View>
                                        ) : (
                                            <Text style={ textStyle().h4 }>0</Text>   
                                        )}
                                        { matchComponentArr[2] && (
                                            matchComponentArr[2] != 0 ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(matchComponentArr[2], animations(null, numAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={textStyle().h4}>0</Text>   
                                            )
                                        )} 
                                        { matchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[3], animations(null, numAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={textStyle().h4}>0</Text> ) }
                            </View>
                            <Text style={diagram().measure} >kcal</Text>
                        </View>
                    </View>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(mismatchComponent == null ? '0' : mismatchComponent).lineTwoEnergy}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <View style={diagram().itemNumberWrapAnimation} > 
                                 { mismatchComponentArr ? (
                                    <>
                                        <View style={diagram().itemNumberWrapAnimationSingle} >
                                            { renderArrays(mismatchComponentArr[0], animations(null, mismNumAnimateFirst).numbersTransitionFirst) }
                                        </View>
                                        { mismatchComponentArr[1] && (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[1], animations(null, mismNumAnimateSec).numbersTransitionSec)} 
                                            </View>
                                        )}
                                        { mismatchComponentArr[2] && (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[2], animations(null, mismNumAnimateThird).numbersTransitionThird)} 
                                            </View> 
                                        )} 
                                        { mismatchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[3], animations(null, mismNumAnimateFourth).numbersTransitionFourth)}
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={textStyle().h4}>0</Text> ) }
                            </View>
                            <Text style={diagram().measure} >kcal</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={diagram().diagramLineWrap}>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(matchComponent == null ? '0' : matchComponent).lineOne}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <View style={diagram().itemNumberWrapAnimation} > 
                                 { matchComponentArr ? (
                                    <>
                                        <View style={diagram().itemNumberWrapAnimationSingle} >
                                            { renderArrays(matchComponentArr[0], animations(null, numAnimateFirst).numbersTransitionFirst) }
                                        </View>
                                        { matchComponentArr[1] != '.' ? (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[1], animations(null, numAnimateSec).numbersTransitionSec)} 
                                            </View>
                                        ) : (
                                            <Text style={ diagram().amountDot }>.</Text>   
                                        )}
                                        { matchComponentArr[2] && (
                                            matchComponentArr[2] != '.' ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(matchComponentArr[2], animations(null, numAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={ diagram().amountDot }>.</Text>   
                                            )
                                        )} 
                                        { matchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[3], animations(null, numAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={textStyle().h4}>0</Text> ) }
                            </View>
                            <Text style={diagram().measure}>g</Text>
                        </View>
                    </View>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(mismatchComponent == null ? '0' : mismatchComponent).lineTwo}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <View style={diagram().itemNumberWrapAnimation} > 
                                 { mismatchComponentArr ? (
                                    <>
                                        <View style={diagram().itemNumberWrapAnimationSingle} >
                                            { renderArrays(mismatchComponentArr[0], animations(null, mismNumAnimateFirst).numbersTransitionFirst) }
                                        </View>
                                        { mismatchComponentArr[1] != '.' ? (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[1], animations(null, mismNumAnimateSec).numbersTransitionSec)} 
                                            </View>
                                        ) : (
                                            <Text style={ diagram().amountDot }>.</Text>   
                                        )}
                                        { mismatchComponentArr[2] && (
                                            mismatchComponentArr[2] != '.' ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(mismatchComponentArr[2], animations(null, mismNumAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={ diagram().amountDot }>.</Text>   
                                            )
                                        )} 
                                        { mismatchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[3], animations(null, mismNumAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={textStyle().h4}>0</Text> ) }
                            </View>
                            <Text style={diagram().measure} >g</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default ResultsBestWorstChild