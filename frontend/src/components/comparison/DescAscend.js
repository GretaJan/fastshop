import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { sortArray } from '../../redux/actions/comparisonActions';
import { descAscDropDown } from '../../components_additional/styles/CompareStyles';
import { withNavigation } from 'react-navigation';

const styles = {
    container: {
        marginTop: 8,
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    }

}

const DescAscend = ({ selectedProducts, sortArray, navigation }) => {
    const [desc] = useState(true);
    const [asc] = useState(false);

    const descAscEnergyFunc = async (descAsc) => {

        function compare(a, b) {
            // if(a.energy == null) {
            //     a.energy = 0;
            // } 
            // if(b.energy == null) {
            //     b.energy = 0;
            // }
            const propA = a.energy;
            const propB = b.energy;

            let comparison = 0;

            if(propA > propB) {
                descAsc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                descAsc ? comparison = -1 : comparison = 1
            }
            return comparison
        }

        console.log("Trigger", desc);
        console.log("SORTED: ", selectedProducts);

        let sortedArray = selectedProducts.sort(compare);
       
        await sortArray(sortedArray);
        navigation.push("SelectedProducts");
    }
    const descAscFatFunc = async (descAsc) => {

        function compare(a, b) {
            // if(a.energy == null) {
            //     a.energy = 0;
            // } 
            // if(b.energy == null) {
            //     b.energy = 0;
            // }
            const propA = a.fat;
            const propB = b.fat;

            let comparison = 0;

            if(propA > propB) {
                descAsc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                descAsc ? comparison = -1 : comparison = 1
            }
            return comparison
        }

        console.log("Trigger", desc);
        console.log("SORTED: ", selectedProducts);

        let sortedArray = selectedProducts.sort(compare);
       
        await sortArray(sortedArray);
        navigation.push("SelectedProducts");

    }
    const descAscSaturatedFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.saturated == null) {
            //     a.saturated = 0;
            // } 
            // if(b.saturated == null) {
            //     b.saturated = 0;
            // }

            const propA = a.saturated;
            const propB = b.saturated;

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
    const descAscCarbsFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.carbs == null) {
            //     a.carbs = 0;
            // } 
            // if(b.carbs == null) {
            //     b.carbs = 0;
            // }

            const propA = a.carbs;
            const propB = b.carbs;

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
    const descAscSugarFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.sugar == null) {
            //     a.sugar = 0;
            // } 
            // if(b.sugar == null) {
            //     b.sugar = 0;
            // }
            const propA = a.sugar;
            const propB = b.sugar;

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
    const descAscFiberFunc = async(descAsc) => {

        // if(a.fiber == null) {
        //     a.fiber = 0;
        // } 
        // if(b.fiber == null) {
        //     b.fiber = 0;
        // }
        function compare(a, b) {
            const propA = a.fiber;
            const propB = b.fiber;

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
    const descAscProteinFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.protein == null) {
            //     a.protein = 0;
            // } 
            // if(b.protein == null) {
            //     b.protein = 0;
            // }
            const propA = a.protein;
            const propB = b.protein;

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
    const descAscSaltFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.salt == null) {
            //     a.salt = 0;
            // } 
            // if(b.salt == null) {
            //     b.salt = 0;
            // }
            const propA = a.salt;
            const propB = b.salt;

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
    const descAscVitaminsFunc = async(descAsc) => {

        function compare(a, b) {
            // if(a.vitamins == null) {
            //     a.vitamins = 0;
            // } 
            // if(b.vitamins == null) {
            //     b.vitamins = 0;
            // }
            const propA = a.vitamins;
            const propB = b.vitamins;

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
               <TouchableOpacity style={descAscDropDown().itemWrap} 
                                onPress={() => { descAscEnergyFunc(desc) }}>
                   <Text style={descAscDropDown().text} >Energy from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} 
                                onPress={() => { descAscEnergyFunc(asc) }}>
                   <Text style={descAscDropDown().text} >Energy from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscFatFunc(desc)}>
                   <Text style={descAscDropDown().text} >Fat from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscFatFunc(asc)}>
                   <Text style={descAscDropDown().text} >Fat from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSaturatedFunc(desc)}>
                   <Text style={descAscDropDown().text} >Saturated fat from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSaturatedFunc(asc)}>
                   <Text style={descAscDropDown().text} >Saturated fat from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscCarbsFunc(desc)}>
                   <Text style={descAscDropDown().text} >Carbohidrates from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscCarbsFunc(asc)}>
                   <Text style={descAscDropDown().text} >Carbohidrates from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSugarFunc(desc)}>
                   <Text style={descAscDropDown().text} >Sugar from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSugarFunc(asc)}>
                   <Text style={descAscDropDown().text} >Sugar from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscFiberFunc(desc)}>
                   <Text style={descAscDropDown().text} >Fiber from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscFiberFunc(asc)}>
                   <Text style={descAscDropDown().text} >Fiber from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscProteinFunc(desc)}>
                   <Text style={descAscDropDown().text} >Protein from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscProteinFunc(asc)}>
                   <Text style={descAscDropDown().text} >Protein from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSaltFunc(desc)}>
                   <Text style={descAscDropDown().text} >Salt from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscSaltFunc(asc)}>
                   <Text style={descAscDropDown().text} >Salt from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscVitaminsFunc(desc)}>
                   <Text style={descAscDropDown().text} >Vitamins from largest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAscDropDown().itemWrap} onPress={() => descAscVitaminsFunc(asc)}>
                   <Text style={descAscDropDown().text} >Vitamins from smallest</Text>
                   <Icon style={descAscDropDown().icon} name="arrow-circle-down" />
               </TouchableOpacity>
           </ScrollView>
       </View>
    )      
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
})


export default withNavigation(connect(mapStateToProps, {sortArray})(DescAscend))