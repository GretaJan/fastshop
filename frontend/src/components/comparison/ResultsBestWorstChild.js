import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';

const Animations = require('../../components_additional/styles/Animations.js');

function ResultsBestWorstChild({title, measurement, matchComponent, mismatchComponent}){
    const scaleAnimate = useState(new Animated.Value(0))[0];
    const [matchSpeed, setMatchSpeed] = useState(0);
    const [mismatchSpeed, setMismatchSpeed] = useState(0);
    const [originalMatchFirst, setOriginalMatchFirst] = useState('0');
    const [originalMatchSec, setOriginalMatchSec] = useState('0');
    const [originalMismatchFirst, setOriginalMismatchFirst] = useState('0');
    const [originalMismatchSec, setOriginalMismatchSec] = useState('0');
    const [matchNumsFirst, setMatchNumsFirst] = useState('0');
    const [matchNumsSec, setMatchNumsSec] = useState('0');
    const [mismatchNumsFirst, setMismatchNumsFirst] = useState('0');
    const [mismatchNumsSec, setMismatchNumsSec] = useState('0');

    useEffect(() => {
        callDiagramAnimation();
        let matchSpeed = title === 'Energy' ? (100 / matchComponent) : (!matchComponent ? null : (matchComponent / 1000))
        let mismatchSpeed = title === 'Energy' ? (100 / mismatchComponent) : (!mismatchComponent ? null : (mismatchComponent / 1000))
        if(title !== 'Energy'){
            splitComponents(matchComponent, setMatchNumsFirst, setMatchNumsSec, setOriginalMatchFirst, setOriginalMatchSec);
            splitComponents(mismatchComponent, setMismatchNumsFirst, setMismatchNumsSec, setOriginalMismatchFirst, setOriginalMismatchSec);
        } else {
            splitComponents(null, setMatchNumsFirst, setMismatchNumsFirst, null, null);
        }
        setMatchSpeed(matchSpeed)
        setMismatchSpeed(mismatchSpeed)
    }, [scaleAnimate])

    useInterval(() => {
        if(matchComponent) {
            let increasedNum = title == 'Energy' ? parseInt(matchNumsFirst) : getFloat(matchNumsFirst, matchNumsSec);
            let originalMatch = title == 'Energy' ? parseInt(matchComponent) : getFloat(originalMatchFirst, originalMatchSec)
            if(increasedNum < originalMatch){
                if(title !== 'Energy'){
                    let intNum = splitSplitedNum(originalMatchFirst, matchNumsFirst);
                    let decimalNum = splitSplitedNum(originalMatchSec, matchNumsSec)
                    setMatchNumsFirst(intNum)
                    setMatchNumsSec(decimalNum)
                } else {
                    setMatchNumsFirst(splitSplitedNum(matchComponent, matchNumsFirst))
                }
            }
        }
    }, matchSpeed)

    useInterval(() => {
        if(mismatchComponent) {
            let increasedNum = title == 'Energy' ? parseInt(mismatchNumsFirst) : getFloat(mismatchNumsFirst, mismatchNumsSec);
            let originalMismatch = title == 'Energy' ? parseInt(mismatchComponent) : getFloat(originalMismatchFirst, originalMismatchSec)
            if(increasedNum < originalMismatch){
                if(title !== 'Energy'){
                    let intNum = splitSplitedNum(originalMismatchFirst, mismatchNumsFirst);
                    let decimalNum = splitSplitedNum(originalMismatchSec, mismatchNumsSec)
                    setMismatchNumsFirst(intNum)
                    setMismatchNumsSec(decimalNum)
                } else {
                    setMismatchNumsFirst(splitSplitedNum(mismatchComponent, mismatchNumsFirst));
                }
            }
        }
    }, mismatchSpeed)

    const callDiagramAnimation = () => {
        Animations.diagramAnimation(scaleAnimate);
    }

    return (
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
                            <Text style={diagram().number} >{ matchNumsFirst }</Text>
                            <Text style={diagram().measure} >{ measurement }</Text>
                        </View>
                    </View>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(mismatchComponent == null ? '0' : mismatchComponent).lineTwoEnergy}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <Text style={diagram().number} >{ mismatchComponent == null ? '0' : mismatchNumsFirst }</Text>
                            <Text style={diagram().measure} >{ measurement }</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={diagram().diagramLineWrap}>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(matchComponent == null ? '0' : matchComponent).lineTwoEnergy}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <Text style={diagram().number} >
                                { matchComponent == null ? '0' : matchNumsFirst +'.'+ matchNumsSec } 
                            </Text>
                            <Text style={diagram().measure} >{ measurement }</Text>
                        </View>
                    </View>
                    <View style={diagram().numberDiagramWrap}>
                        <View style={diagram().singleLineWrap}>
                            <Animated.View style={ animations(scaleAnimate).diagramScale }>
                                <Text style={diagram(mismatchComponent == null ? '0' : mismatchComponent).lineTwoEnergy}></Text>
                            </Animated.View>
                        </View>
                        <View style={diagram().itemNumberWrap} >
                            <Text style={diagram().number} >{ 
                                mismatchComponent == null ? '0' : mismatchNumsFirst +'.'+ mismatchNumsSec}
                            </Text>
                            <Text style={diagram().measure} >{ measurement }</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

function useInterval(callback, delay) {
    const intervalId = useRef(() => {})
    const getCallback = useRef(() => {});

    useEffect(() => {
        getCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if(delay){
            intervalId.current = setInterval(() => {
                getCallback.current();
            }, delay)
        }
        return () => clearInterval(intervalId.current)
    }, [delay])
}

function splitComponents(comp, setFirst, setSec, setOriginalFirst, setOriginalSec){
    if(comp){
        let splitMatch = comp.toString().split('.');
        setOriginalFirst(splitMatch[0])
        setOriginalSec(splitMatch[1])
        if(splitMatch[0].length === 2){
            setFirst('00')
        }
        if(splitMatch[1].length === 2){
            setSec('00')
        }
    } else {
        setFirst('0000');
        setSec('0000');
    }
}

function splitSplitedNum(origin, copy){
    const tempArr = [];
    origin.toString().split("").forEach((letter, originIndex) => {
        copy.split("").forEach((tempLetter, copyIndex) => {
            let parseNum = parseInt(letter);
            let parseNumTemp = parseInt(tempLetter);
            if(originIndex == copyIndex){
                if(parseNumTemp < parseNum){
                    parseNumTemp++;
                }
                tempArr.push(parseNumTemp);
            }
        })
    })
    return tempArr.join("");
}

function getFloat(firstPart, secPart){
    let stringNum = `${firstPart}.${secPart}`;
    return Math.trunc(((parseFloat(stringNum)).toFixed(2) * 100))
}

export default ResultsBestWorstChild