import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { sortArray } from '../../redux/actions/comparisonActions';
import { descAscDropDown } from '../../src/styles/CompareStyles';
import { containerStyles, textStyle } from '../../src/styles/GeneralStyles';
import { withNavigation } from 'react-navigation';

import Header from '../../utils/models/Header';

function DescAscend({ selectedProducts, sortArray, navigation }){
    const [desc] = useState(true);
    const [asc] = useState(false);

    async function reorderItemFunc(descAsc, item){
        function compare(a, b) {
            const propA = a[item];
            const propB = b[item];
            let comparison = 0;
            if(propA > propB) {
                descAsc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                descAsc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        await sortArray(sortedArray);
        navigation.push("SelectedProducts");
    }

    return (
        <>
            <Header
                title="Choose single criteria"
                navigate={ () => navigation.push("SelectedProducts") }
            />
            <View style={ containerStyles().simpleContainer }>  
                <ScrollView style={ containerStyles().background }>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => { reorderItemFunc(desc, 'energy') }}>
                        <Text style={textStyle().h2} >Energy from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => { reorderItemFunc(asc, 'energy') }}>
                        <Text style={textStyle().h2} >Energy from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'fat')}>
                        <Text style={textStyle().h2} >Fat from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity> 
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'fat')}>
                        <Text style={textStyle().h2} >Fat from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity> 
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'saturated')}>
                        <Text style={textStyle().h2} >Saturated fat from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'saturated')}>
                        <Text style={textStyle().h2} >Saturated fat from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'carbs')}>
                        <Text style={textStyle().h2} >Carbohidrates from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'carbs')}>
                        <Text style={textStyle().h2} >Carbohidrates from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'sugar')}>
                        <Text style={textStyle().h2} >Sugar from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'sugar')}>
                        <Text style={textStyle().h2} >Sugar from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'fiber')}>
                        <Text style={textStyle().h2} >Fiber from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'fiber')}>
                        <Text style={textStyle().h2} >Fiber from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'protein')}>
                        <Text style={textStyle().h2} >Protein from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'protein')}>
                        <Text style={textStyle().h2} >Protein from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'salt')}>
                        <Text style={textStyle().h2} >Salt from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'salt')}>
                        <Text style={textStyle().h2} >Salt from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'vitamins')}>
                        <Text style={textStyle().h2} >Vitamins from largest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
                    </TouchableOpacity>
                    <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'vitamins')}>
                        <Text style={textStyle().h2} >Vitamins from smallest</Text>
                        <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )      
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.selectedProducts,
})


export default withNavigation(connect(mapStateToProps, {sortArray})(DescAscend))