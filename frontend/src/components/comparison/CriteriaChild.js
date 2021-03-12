import React, {useState } from 'react';
import { View, Text, Image } from 'react-native';
import { CriteriaStyles } from '../../components_additional/styles/CompareStyles';
import { textStyle } from '../../components_additional/styles/GeneralStyles';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';

//Components
import CheckInput from '../../components_additional/models/Check';

function CriteriaChild({ title, originalName, setMostCriteria, setLeastCriteria, icon }){
    const [activeMost, setActiveMost] = useState(false);
    const [activeLeast, setActiveLeast] = useState(false);
    const [activeNone, setActiveNone] = useState(false);

    return (
        <View style={CriteriaStyles().itemContainer}>
            <View style={CriteriaStyles().titleWrap}>
                <View style={ stylesGuestSingle().componentIconWrap }>
                    <Image style={ stylesGuestSingle().componentIcon } source={ icon }  />
                </View>
                <Text style={ textStyle().h5 }>{ title }</Text>
            </View>
            <View style={CriteriaStyles().bulletContainer}>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeMost } func={ itemMost } />
                </View>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeLeast } func={ itemLeast } />
                </View>
                <View style={CriteriaStyles().wrapThird}>
                    <CheckInput isVisible={ activeNone } func={ itemNone } />
                </View>
            </View>
        </View>
    )

    function itemMost(){
        setActiveMost(true);
        setActiveLeast(false);
        setActiveNone(false);
        setMostCriteria(oldArr => [...oldArr, originalName])
        setLeastCriteria(oldArr => removeCriteriaItemFromArray(oldArr))
    }
    function itemLeast(){
        setActiveMost(false);
        setActiveLeast(true);
        setActiveNone(false);
        setLeastCriteria(oldArr => [...oldArr, originalName] )
        setMostCriteria(oldArr => removeCriteriaItemFromArray(oldArr))
    }
    function itemNone(){
        setActiveMost(false);
        setActiveLeast(false);
        setActiveNone(true);
        setMostCriteria(oldArr => removeCriteriaItemFromArray(oldArr))
        setLeastCriteria(oldArr => removeCriteriaItemFromArray(oldArr))
    }

    function removeCriteriaItemFromArray(oldArray){
        let index = oldArray.indexOf(originalName);
        if(index > -1) oldArray.splice(index, 1)
        return [...oldArray]
    }

}

export default CriteriaChild