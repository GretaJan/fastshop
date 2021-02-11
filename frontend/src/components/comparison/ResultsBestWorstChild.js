import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';

const Animations = require('../../components_additional/styles/Animations.js');

function ResultsBestWorstChild({title, matchComponent, matchComponentArr, mismatchComponent, mismatchComponentArr}){
    const [loading, setLoading] = useState(false);
    const scaleAnimate = useRef(new Animated.Value(0)).current;
    const numAnimateFirst = useRef(new Animated.Value(0)).current;
    const numAnimateSec = useRef(new Animated.Value(0)).current;
    const numAnimateThird = useRef(new Animated.Value(0)).current;
    const numAnimateFourth = useRef(new Animated.Value(0)).current;
    const mismNumAnimateFirst = useRef(new Animated.Value(0)).current;
    const mismNumAnimateSec = useRef(new Animated.Value(0)).current;
    const mismNumAnimateThird = useRef(new Animated.Value(0)).current;
    const mismNumAnimateFourth = useRef(new Animated.Value(0)).current;
    // const [matchSpeed, setMatchSpeed] = useState(0);
    // const [mismatchSpeed, setMismatchSpeed] = useState(0);
    // const [originalMatchFirst, setOriginalMatchFirst] = useState('0');
    // const [originalMatchSec, setOriginalMatchSec] = useState('0');
    // const [originalMismatchFirst, setOriginalMismatchFirst] = useState('0');
    // const [originalMismatchSec, setOriginalMismatchSec] = useState('0');
    // const [matchNumsFirst, setMatchNumsFirst] = useState('0');
    // const [matchNumsSec, setMatchNumsSec] = useState('0');
    // const [mismatchNumsFirst, setMismatchNumsFirst] = useState('0');
    // const [mismatchNumsSec, setMismatchNumsSec] = useState('0');
    // const [matchNumsFirstArr, setMatchNumsFirstArr] = useState(['0']);
    // const [matchNumsSecArr, setMatchNumsSecArr] = useState(['0']);
    // const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        getAnimationsParams();
    }, [scaleAnimate, numAnimateFirst, numAnimateSec, numAnimateThird, numAnimateFourth])

    function getAnimationsParams(){
        callDiagramAnimation();
        
        if(matchComponentArr) {
            // if(matchComponentArr[0]) callNumAnimationFirst(matchComponentArr[0].length, numAnimateFirst)
            // if(matchComponentArr[1]) callNumAnimationSec(matchComponentArr[1].length, numAnimateSec)
            // if(matchComponentArr[2]) callNumAnimationThird(matchComponentArr[2].length, numAnimateThird)
            // if(matchComponentArr[3]) callNumAnimationFourth(matchComponentArr[3].length, numAnimateFourth)
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
       
       
        // let matchSpeed = title === 'Energy' ? (100 / matchComponent) : (!matchComponent ? null : (matchComponent / 1000))
        // let mismatchSpeed = title === 'Energy' ? (100 / mismatchComponent) : (!mismatchComponent ? null : (mismatchComponent / 1000))
        // if(title !== 'Energy'){
            // splitComponents(matchComponent, setMatchNumsFirstArr, setMatchNumsFirst, setMatchNumsSec, setOriginalMatchFirst, setOriginalMatchSec);
            // splitComponents(mismatchComponent, setMatchNumsFirstArr, setMismatchNumsFirst, setMismatchNumsSec, setOriginalMismatchFirst, setOriginalMismatchSec);
        //     splitDecimalComponents(matchComponent, setMatchNumsFirstArr, setMatchNumsSecArr)
        // } else {
            // splitComponents(null,  setMatchNumsFirstArr, setMatchNumsFirst, setMismatchNumsFirst, null, null);
        // }
        // setMatchSpeed(matchSpeed)
        // setMismatchSpeed(mismatchSpeed)
      
    }
    const callNumAnimation = (length, ref) => {
        Animations.numbersAnimation(ref, -(length * 23 - 20))
    }

    // const callNumAnimationFirst = (length) => {
    //     Animations.numbersAnimation(numAnimateFirst, -(length * 23 - 20))
    // }
    // const callNumAnimationSec = (length) => {
    //     Animations.numbersAnimation(numAnimateSec, -(length * 23 - 20))
    // }
    // const callNumAnimationThird = (length) => {
    //     Animations.numbersAnimation(numAnimateThird, -(length * 23 - 20))
    // }
    // const callNumAnimationFourth = (length) => {
    //     Animations.numbersAnimation(numAnimateFourth, -(length * 23 - 20))
    // }

    // function numOpacities(){
    //     numAnimate.addListener((progress) => {
    //         console.log("prooo", progress.value)
    //         let progressVal = Math.round(progress.value) * -1;
    //         setOpacity(progressVal);
    //       });
    // }

    // useInterval(() => {
    //     if(matchComponent) {
    //         let increasedNum = title == 'Energy' ? parseInt(matchNumsFirst) : getFloat(matchNumsFirst, matchNumsSec);
    //         let originalMatch = title == 'Energy' ? parseInt(matchComponent) : getFloat(originalMatchFirst, originalMatchSec)
    //         if(increasedNum < originalMatch){
    //             if(title !== 'Energy'){
    //                 let intNum = splitSplitedNum(originalMatchFirst, matchNumsFirst);
    //                 let decimalNum = splitSplitedNum(originalMatchSec, matchNumsSec)
    //                 setMatchNumsFirst(intNum)
    //                 setMatchNumsSec(decimalNum)
    //             } else {
    //                 setMatchNumsFirst(splitSplitedNum(matchComponent, matchNumsFirst))
    //             }
    //         }
    //     }
    // }, matchSpeed)

    // useInterval(() => {
    //     if(mismatchComponent) {
    //         let increasedNum = title == 'Energy' ? parseInt(mismatchNumsFirst) : getFloat(mismatchNumsFirst, mismatchNumsSec);
    //         let originalMismatch = title == 'Energy' ? parseInt(mismatchComponent) : getFloat(originalMismatchFirst, originalMismatchSec)
    //         if(increasedNum < originalMismatch){
    //             if(title !== 'Energy'){
    //                 let intNum = splitSplitedNum(originalMismatchFirst, mismatchNumsFirst);
    //                 let decimalNum = splitSplitedNum(originalMismatchSec, mismatchNumsSec)
    //                 setMismatchNumsFirst(intNum)
    //                 setMismatchNumsSec(decimalNum)
    //             } else {
    //                 setMismatchNumsFirst(splitSplitedNum(mismatchComponent, mismatchNumsFirst));
    //             }
    //         }
    //     }
    // }, mismatchSpeed)

    const callDiagramAnimation = () => {
        Animations.diagramAnimation(scaleAnimate);
    }

    const renderArrays = (currentArray, numAnimation) => {
        return (
            <Animated.FlatList
                style={numAnimation}
                showsVerticalScrollIndicator={ false }
                data={ currentArray }
                vertical={ true }
                renderItem={ ({item, index}) => <Text style={diagram().animatedNum} >{item}</Text> }
            />     
        )
    }

    // const renderItemComponent = () => (
    //     matchNumsFirstArr.map(item => (
    //         <Animated.Text style={ animations(null, numAnimate).numbersTransition} >
    //             { item }
    //         </Animated.Text>
    //     ))
    // )

    // function getNumPosition(event){
    //     const {x, y, width, height} = event.nativeEvent.layout;
    //     console.log("position",numAnimate)
    //     // if(y == 0) setItemOpacity(1);
    //     // setItemOpacity(0);
    // }

    return (
        loading ? (
            <Text>Loading...</Text>
        ) : (
        <View style={diagram().diagramWrap}>
            <View style={diagram().linesWrap} >
                <Text style={diagram().componentTitle} >{ title }</Text>
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
                            {/* <Text style={diagram().number} >{ matchComponent }</Text> */}
                            <View style={diagram().itemNumberWrapAnimation} > 
                                 { matchComponentArr ? (
                                    <>
                                        <View style={diagram().itemNumberWrapAnimationSingle} >
                                            { renderArrays(matchComponentArr[0], animations(null, numAnimateFirst).numbersTransitionFirst) }
                                        </View>
                                        { matchComponentArr[1] != 0 ? (
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[1], animations(null, numAnimateSec).numbersTransitionSec)} 
                                            </View>
                                        ) : (
                                            <Text style={animations().animatedSecDot}>0</Text>   
                                        )}
                                        { matchComponentArr[2] && (
                                            matchComponentArr[2] != 0 ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(matchComponentArr[2], animations(null, numAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={diagram().animatedThirdDot}>0</Text>   
                                            )
                                        )} 
                                        { matchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[3], animations(null, numAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={diagram().animatedNum}>0</Text> ) }
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
                            {/* <Text style={diagram().number} >{ mismatchComponent == null ? '0' : mismatchComponent }</Text> */}
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
                                ) : ( <Text style={diagram().animatedNum}>0</Text> ) }
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
                                            <Text style={animations().animatedSecDot}>.</Text>   
                                        )}
                                        { matchComponentArr[2] && (
                                            matchComponentArr[2] != '.' ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(matchComponentArr[2], animations(null, numAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={diagram().animatedThirdDot}>.</Text>   
                                            )
                                        )} 
                                        { matchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(matchComponentArr[3], animations(null, numAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={diagram().animatedNum}>0</Text> ) }
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
                            {/* <Text style={diagram().number} >
                                {mismatchComponent == null ? '0' : mismatchNumsFirst +'.'+ mismatchNumsSec}
                            </Text> */}
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
                                            <Text style={animations().animatedSecDot}>.</Text>   
                                        )}
                                        { mismatchComponentArr[2] && (
                                            mismatchComponentArr[2] != '.' ? (
                                                <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                    { renderArrays(mismatchComponentArr[2], animations(null, mismNumAnimateThird).numbersTransitionThird)} 
                                                </View>
                                            ) : (
                                                <Text style={diagram().animatedThirdDot}>.</Text>   
                                            )
                                        )} 
                                        { mismatchComponentArr[3] && ( 
                                            <View style={diagram().itemNumberWrapAnimationSingle} > 
                                                { renderArrays(mismatchComponentArr[3], animations(null, mismNumAnimateFourth).numbersTransitionFourth) }
                                            </View>
                                        )} 
                                    </>
                                ) : ( <Text style={diagram().animatedNum}>0</Text> ) }
                            </View>
                            <Text style={diagram().measure} >g</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
        )
    )
}

// function useInterval(callback, delay) {
//     const intervalId = useRef(() => {})
//     const getCallback = useRef(() => {});

//     useEffect(() => {
//         getCallback.current = callback;
//     }, [callback]);
//     useEffect(() => {
//         if(delay){
//             intervalId.current = setInterval(() => {
//                 getCallback.current();
//             }, delay)
//         }
//         return () => clearInterval(intervalId.current)
//     }, [delay])
// }
// const matchNumsFirstArrFunc = (number) => {
//     let arr = []
//     for(let i = 0; i <= number; i++){
//         arr.push(i);
//     }
//     return arr;
// }

// function splitComponents(comp, setMatchNumsFirstArr, setFirst, setSec, setOriginalFirst, setOriginalSec){
//     if(comp){
//         let splitMatch = comp.toString().split('.');
//         setOriginalFirst(splitMatch[0])
//         setMatchNumsFirstArr(matchNumsFirstArrFunc(splitMatch[0]))
//         setOriginalSec(splitMatch[1])
//         callNumAnimation(splitMatch[0])
//         callNumAnimation(splitMatch[2])
//         callNumAnimation(splitMatch[3])
//         if(splitMatch[0].length === 2){
//             setFirst('00')
//         }
//         if(splitMatch[1].length === 2){
//             setSec('00')
//         }
//     } else {
//         setFirst('000');
//         setSec('000');
//     }
// }
// function splitDecimalComponents(component, setFirst, setSec){
//     if(component){
//         let splitMatch = component.toString().split('.');
//         let tempFirstArr = [];
//         let tempSecArr = [];
//         splitMatch[0].split('').forEach((item) => {
//             let numArr = createNumbersArray(parseInt(item));
//             tempFirstArr.push(numArr)
//         })
//         splitMatch[1].split('').forEach((item) => {
//             let numArr = createNumbersArray(parseInt(item));
//             tempSecArr.push(numArr)
//         })
//         console.log("twwmp", tempFirstArr)
//         setFirst(tempFirstArr)
//         setSec(tempSecArr)
//     }
// }

// function createNumbersArray(array){
//     let numbersArr = [];
//     for(let i = 0; i < array.length; i++ ){
//         numbersArr.push(i);
//     }
//     return numbersArr;
// }
// function splitSplitedNum(origin, copy){
//     const tempArr = [];
//     origin.toString().split("").forEach((letter, originIndex) => {
//         copy.split("").forEach((tempLetter, copyIndex) => {
//             let parseNum = parseInt(letter);
//             let parseNumTemp = parseInt(tempLetter);
//             if(originIndex == copyIndex){
//                 if(parseNumTemp < parseNum){
//                     parseNumTemp++;
//                 }
//                 tempArr.push(parseNumTemp);
//             }
//         })
//     })
//     return tempArr.join("");
// }

// function getFloat(firstPart, secPart){
//     let stringNum = `${firstPart}.${secPart}`;
//     return Math.trunc(((parseFloat(stringNum)).toFixed(2) * 100))
// }

export default ResultsBestWorstChild