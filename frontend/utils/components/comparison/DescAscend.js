import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { sortArray } from '../../redux/actions/comparisonActions';
import { descAscDropDown } from '../../src/styles/CompareStyles';
import { withNavigation } from 'react-navigation';

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
        <View style={descAscDropDown().container}>  
            <ScrollView>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => { reorderItemFunc(desc, 'energy') }}>
                   <Text style={descAscDropDown().text} >Energy from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} 
                                onPress={() => { reorderItemFunc(asc, 'energy') }}>
                   <Text style={descAscDropDown().text} >Energy from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'fat')}>
                   <Text style={descAscDropDown().text} >Fat from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'fat')}>
                   <Text style={descAscDropDown().text} >Fat from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'saturated')}>
                   <Text style={descAscDropDown().text} >Saturated fat from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'saturated')}>
                   <Text style={descAscDropDown().text} >Saturated fat from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'carbs')}>
                   <Text style={descAscDropDown().text} >Carbohidrates from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'carbs')}>
                   <Text style={descAscDropDown().text} >Carbohidrates from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'sugar')}>
                   <Text style={descAscDropDown().text} >Sugar from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'sugar')}>
                   <Text style={descAscDropDown().text} >Sugar from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'fiber')}>
                   <Text style={descAscDropDown().text} >Fiber from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'fiber')}>
                   <Text style={descAscDropDown().text} >Fiber from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'protein')}>
                   <Text style={descAscDropDown().text} >Protein from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'protein')}>
                   <Text style={descAscDropDown().text} >Protein from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'salt')}>
                   <Text style={descAscDropDown().text} >Salt from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'salt')}>
                   <Text style={descAscDropDown().text} >Salt from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(desc, 'vitamins')}>
                   <Text style={descAscDropDown().text} >Vitamins from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => reorderItemFunc(asc, 'vitamins')}>
                   <Text style={descAscDropDown().text} >Vitamins from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
           </ScrollView>
       </View>
    )      
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.selectedProducts,
})


export default withNavigation(connect(mapStateToProps, {sortArray})(DescAscend))