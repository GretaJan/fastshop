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

const ResultsOfAll = ({nameEnergy, mostEnergy, mostEnergyImg, nameFat, mostFat, mostFatImg, nameSaturated, mostSaturated, mostSaturatedImg,
                    nameCarbs, mostCarbs, mostCarbsImg, nameSugar, mostSugar, mostSugarImg, nameFiber, mostFiber, mostFiberImg,nameProtein, 
                    mostProtein, mostProteinImg, nameSalt, mostSalt, mostSaltImg, nameVitamins, mostVitamins, mostVitaminsImg, 
                    clearResults }) => {

        return (
         <View style={stylesGuestSingle().container} >
             <ScrollView style={stylesGuestSingle().listContainer} >
                <View style={stylesGuestSingle().listItemWrap}>
                {this.props.product.image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostEnergyImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameEnergy}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostEnergy) ? (mostEnergy) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                </View>
                <View style={stylesGuestSingle().listItemWrap}>
                    {mostFatImg ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostFatImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameFat}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostFat) ? (mostFat) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {this.props.product.mostSaturatedImg ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ mostSaturatedImge }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameSaturated}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostSaturated) ? (mostSaturated) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {mostCarbsImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostCarbsImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameCarbs}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostCarbs) ? (mostCarbs) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {nameSugarImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: nameSugarImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameSugar}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostSugar) ? (mostSugar) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {mostFiberImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostFiberImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameFiber}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostFiber) ? (mostFiber) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {mostProteinImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostProteinImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameProtein}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostProtein) ? (mostProtein) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {mostSaltImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostSaltImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameSalt}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostSalt) ? (mostSalt) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {mostVitaminsImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: mostVitaminsImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Energy</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameVitamins}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostVitamins) ? (mostVitamins) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                <Button title="Clear results" onPress={clearResults} />
            </ScrollView>
        </View>
        )
}

export default ResultsOfAll