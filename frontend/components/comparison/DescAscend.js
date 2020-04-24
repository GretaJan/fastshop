import React, {useState} from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { sortArray } from '../../src/actions/comparisonActions';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { descAsc } from '../../components_additional/styles/CompareStyles';

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
       
        sortArray(sortedArray);
    }
    const descAscSaturatedFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscCarbsFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscSugarFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscFiberFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscProteinFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscSaltFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }
    const descAscVitaminsFunc = (descAsc) => {

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
        sortArray(sortedArray);
    }

    return (
        <View style={descAsc().container}>  
            <TouchableOpacity style={descAsc().btnWrap}>   
                <View style={descAsc().iconWrap} onPress={() => goBack} >
                    <IonIcon name="ios-arrow-dropleft" style={descAsc().btnIcon}  />
                </View>
                <View style={descAsc().textWrap} >
                    <Text style={descAsc().btnText}>Go Back</Text>
                </View>
            </TouchableOpacity>
            <ScrollView  >
               <TouchableOpacity style={descAsc().itemWrap} 
                                onPress={() => { descAscEnergyFunc(desc) }}>
                   <Text style={descAsc().text} >Energy from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} 
                                onPress={() => { descAscEnergyFunc(asc) }}>
                   <Text style={descAsc().text} >Energy from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscFatFunc(desc)}>
                   <Text style={descAsc().text} >Fat from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscFatFunc(asc)}>
                   <Text style={descAsc().text} >Fat from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity> 
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSaturatedFunc(desc)}>
                   <Text style={descAsc().text} >Saturated fat from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSaturatedFunc(asc)}>
                   <Text style={descAsc().text} >Saturated fat from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscCarbsFunc(desc)}>
                   <Text style={descAsc().text} >Carbohidrates from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscCarbsFunc(asc)}>
                   <Text style={descAsc().text} >Carbohidrates from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSugarFunc(desc)}>
                   <Text style={descAsc().text} >Sugar from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSugarFunc(asc)}>
                   <Text style={descAsc().text} >Sugar from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscFiberFunc(desc)}>
                   <Text style={descAsc().text} >Fiber from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscFiberFunc(asc)}>
                   <Text style={descAsc().text} >Fiber from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscProteinFunc(desc)}>
                   <Text style={descAsc().text} >Protein from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscProteinFunc(asc)}>
                   <Text style={descAsc().text} >Protein from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSaltFunc(desc)}>
                   <Text style={descAsc().text} >Salt from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscSaltFunc(asc)}>
                   <Text style={descAsc().text} >Salt from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscVitaminsFunc(desc)}>
                   <Text style={descAsc().text} >Vitamins from largest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-up" />
               </TouchableOpacity>
               <TouchableOpacity style={descAsc().itemWrap} onPress={() => descAscVitaminsFunc(asc)}>
                   <Text style={descAsc().text} >Vitamins from smallest</Text>
                   <Icon style={descAsc().icon} name="arrow-circle-down" />
               </TouchableOpacity>
           </ScrollView>
       </View>
    )      
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray,
})


export default connect(mapStateToProps, {sortArray})(DescAscend)