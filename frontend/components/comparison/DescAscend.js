import React, {useState} from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { sortArray } from '../../src/actions/comparisonActions';
 
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

const DescAscend = ({ goBack, selectedProducts, sortArray}) => {
    const [desc] = useState(true);
    const [asc] = useState(false);
    
    const descAscEnergyFunc = () => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        console.log("Trigger", desc);
        console.log("SORTED: ", selectedProducts);
        let sortedArray = selectedProducts.sort(compare);
       
        sortArray(sortedArray);
    }
    const descAscSaturatedFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscCarbsFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscSugarFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscFiberFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscProteinFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscSaltFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }
    const descAscVitaminsFunc = (desc) => {
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
                desc ? comparison = 1 : comparison = -1
            } else if(propA < propB) {
                desc ? comparison = -1 : comparison = 1
            }
            return comparison
        }
        let sortedArray = selectedProducts.sort(compare);
        sortArray(sortedArray);
    }

    return (
        <View >
            <ScrollView  >
               <TouchableOpacity onPress={() => descAscEnergyFunc(desc)}>
                   <Text>Energy from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscEnergyFunc(asc)}>
                   <Text>Energy from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscFatFunc(desc)}>
                   <Text>Fat from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity> 
               <TouchableOpacity onPress={() => descAscFatFunc(asc)}>
                   <Text>Fat from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity> 
               <TouchableOpacity onPress={() => descAscSaturatedFunc(desc)}>
                   <Text>Saturated fat from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscSaturatedFunc(asc)}>
                   <Text>Saturated fat from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscCarbsFunc(desc)}>
                   <Text>Carbohidrates from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscCarbsFunc(asc)}>
                   <Text>Carbohidrates from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscSugarFunc(desc)}>
                   <Text>Sugar from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscSugarFunc(asc)}>
                   <Text>Sugar from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscFiberFunc(desc)}>
                   <Text>Fiber from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscFiberFunc(asc)}>
                   <Text>Fiber from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscProteinFunc(desc)}>
                   <Text>Protein from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscProteinFunc(asc)}>
                   <Text>Protein from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscSaltFunc(desc)}>
                   <Text>Salt from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscSaltFunc(asc)}>
                   <Text>Salt from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscVitaminsFunc(desc)}>
                   <Text>Vitamins from largest</Text>
                   <Icon name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => descAscVitaminsFunc(asc)}>
                   <Text>Vitamins from smallest</Text>
                   <Icon name="arrow-circle-down" />
               </TouchableOpacity>
           </ScrollView>
           <Button title="Clear results" onPress={goBack} />
       </View>
    )      
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
})


export default connect(mapStateToProps, {sortArray})(DescAscend)