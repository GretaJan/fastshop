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

const ResultsOfBestWorst = ({ bestQuality, saturatedGood, carbsGood, sugarGood, fiberGood, proteinGood, saltGood, vitaminsGood, 
                    lowestQuality, saturatedBad, carbsBad, sugarBad, fiberBad, proteinBad, saltBad, vitaminsBad, clearResults }) => {

        return (
            <View>
                <View>
                    <Text>We recommend:</Text> 
                    <Text>{bestQuality}</Text>
                    <View>
                        <FlatList data={[
                                { key: "Saturated:" },
                                { key: "Carbohydrates:" },
                                { key: "Sugar:" },
                                { key: "fiber:" },
                                { key: "Protein:" },
                                { key: "Salt:" },
                                { key: "Vitamins:" },
                            ]} renderItem={({item}) => 
                                    <Text>{item.key}</Text>}
                        />
                    </View>
                    <View>
                        <FlatList data={[
                                { key: saturatedGood },
                                { key: carbsGood },
                                { key: sugarGood },
                                { key: fiberGood },
                                { key: proteinGood },
                                { key: saltGood },
                                { key: vitaminsGood },
                            ]} renderItem={({item}) => 
                                <Text>{item.key}</Text>}
                        />
                    </View>
                </View>
                <View>
                <Text>We do not recommend:</Text> 
                    <Text>{lowestQuality}</Text>
                    <View>
                        <FlatList data={[
                                { key: "Saturated:" },
                                { key: "Carbohydrates:" },
                                { key: "Sugar:" },
                                { key: "fiber:" },
                                { key: "Protein:" },
                                { key: "Salt:" },
                                { key: "Vitamins:" },
                            ]} renderItem={({item}) => 
                                    <Text>{item.key}</Text>}
                        />
                    </View>
                    <View>
                        <FlatList data={[
                                { key: saturatedBad },
                                { key: carbsBad },
                                { key: sugarBad },
                                { key: fiberBad },
                                { key: proteinBad },
                                { key: saltBad },
                                { key: vitaminsBad },
                            ]} renderItem={({item}) => 
                                <Text>{item.key}</Text>}
                        />
                    </View>
                </View>
             <Button title="Clear results" onPress={clearResults} />
         </View>
        )
}

export default ResultsOfBestWorst