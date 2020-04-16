import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
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
 
// class ResultsOfAll extends Component {
//     goToProduct = () => {
//         this.props.goToProduct(this.props.item.subcategory_id, this.props.item.id)
//     }

//     removeFromList = () => {
//         this.props.removeProduct( this.props.item.id);
//     }

const ResultsOfAll = ({nameEnergy, mostEnergy, nameFat, mostFat, nameSaturated, mostSaturated, 
                    nameCarbs, mostCarbs, nameSugar, mostSugar, nameFiber, mostFiber, nameProtein, mostProtein, 
                    nameSalt, mostSalt, nameVitamins, mostVitamins, clearResults }) => {

        return (
            <View>
                <Text>Calculations</Text>
                <View>
                    <FlatList data={[
                            { key: "Product:" },
                            { key: "Most energy:" },
                            { key: "Product:" },
                            { key: "Most fat:" },
                            { key: "Product:" },
                            { key: "Most saturated fat:" },
                            { key: "Product:" },
                            { key: "Most carbohidrates:" },
                            { key: "Product:" },
                            { key: "Most Sugar:" },
                            { key: "Product:" },
                            { key: "Most fiber:" },
                            { key: "Product:" },
                            { key: "Most protein:" },
                            { key: "Product:" },
                            { key: "Most salt:" },
                            { key: "Product:" },
                            { key: "Most Vitamins:" },
                        ]} renderItem={({item}) => 
                                <Text>{item.key}</Text>}
                    />
                </View>
                <View>
                    <FlatList data={[
                            { key: nameEnergy },
                            { key: mostEnergy },
                            { key: nameFat },
                            { key: mostFat },
                            { key: nameSaturated },
                            { key: mostSaturated },
                            { key: nameCarbs },
                            { key: mostCarbs },
                            { key: nameSugar },
                            { key: mostSugar },
                            { key: nameFiber },
                            { key: mostFiber },
                            { key: nameProtein },
                            { key: mostProtein },
                            { key: nameSalt },
                            { key: mostSalt },
                            { key: nameVitamins },
                            { key: mostVitamins },
                        ]} renderItem={({item}) => 
                            <Text>{item.key}</Text>}
                    />
                </View>
             <Button title="Clear results" onPress={clearResults} />
         </View>
        )
}

export default ResultsOfAll