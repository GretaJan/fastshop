import React, { useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { CriteriaStyles } from '../../components_additional/styles/CompareStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

//Components
import CheckInput from '../../components_additional/models/Check';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function CriteriaChild({ title, originalName, setMostCriteria, setLeastCriteria, setNoneCriteria, icon }){
    const [activeMost, setActiveMost] = useState(false);
    const [activeLeast, setActiveLeast] = useState(false);
    const [activeNone, setActiveNone] = useState(false);
    const checkScale = useState(new Animated.Value(0))[0];

    const itemMost = () => {
        setActiveMost(true);
        setActiveLeast(false);
        setActiveNone(false);
        // comparisonAnimations.checkScaleGrow(checkScale);  
        setMostCriteria(oldArr => [...oldArr, originalName])
        setLeastCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        })
        setNoneCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        })
    }
    const itemLeast = () => {
        setActiveMost(false);
        setActiveLeast(true);
        setActiveNone(false);
        // comparisonAnimations.checkScaleGrow(checkScale);  
        setLeastCriteria(oldArr => [...oldArr, originalName] )
        setMostCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        } )
        setNoneCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        })
    }
    const itemNone = () => {
        setActiveMost(false);
        setActiveLeast(false);
        setActiveNone(true);
        // comparisonAnimations.checkScaleGrow(checkScale);  
        setNoneCriteria(oldArr => [...oldArr, originalName])
        setMostCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        })
        setLeastCriteria(oldArr => {
            let index = oldArr.indexOf(originalName);
            if(index > -1) oldArr.splice(index, 1)
            return [...oldArr]
        })
    }


    return (
        <View style={CriteriaStyles().itemContainer}>
            {/* <Text style={CriteriaStyles().itemTitle}>{ title }</Text> */}
            <View style={CriteriaStyles().titleWrap}>
                <View style={ stylesGuestSingle().componentIconWrap }>
                <Image style={ stylesGuestSingle().componentIcon } source={ icon }  />
                </View>
                <Text style={stylesGuestSingle().componentTitle} >{ title }</Text>
            </View>
            <View style={CriteriaStyles().bulletContainer}>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeMost } func={ itemMost } />
                    {/* <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={ itemMost }>
                        <View style={CriteriaStyles().bulletWrapInner}>
                        { activeMost && (
                            <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
                        )}
                        </View>
                    </TouchableOpacity> */}
                </View>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeLeast } func={ itemLeast } />
                    {/* <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={ itemLeast }>
                        <View style={CriteriaStyles().bulletWrapInner}>
                        { activeLeast && (
                            <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
                        )}
                        </View>
                    </TouchableOpacity> */}
                </View>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeNone } func={ itemNone } />
                    {/* <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={ itemNone }>
                        <View style={CriteriaStyles().bulletWrapInner}>
                        { activeNone && (
                            <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
                        )}
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )

}

export default CriteriaChild