import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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

const ResultsOfAll = ({nameFat, mostFat, mostFatImg, nameCarbs, leastCarbs, leastCarbsImg, nameSugar, leastSugar, leastSugarImg, 
                    nameFiber, mostFiber, mostFiberImg,nameProtein, mostProtein, mostProteinImg, nameSalt, leastSalt, leastSaltImg, 
                    nameVitamins, mostVitamins, mostVitaminsImg, clearResults }) => {

        return (
         <View style={stylesGuestSingle().container} >
             <ScrollView style={stylesGuestSingle().listContainer} >
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
                    <Text style={stylesGuestSingle().componentTitle}>Most fat</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameFat}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostFat) ? (mostFat) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {leastCarbsImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: leastCarbsImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Carbohidrates</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameCarbs}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (leastcarbs) ? (leastcarbs) : ('0') }</Text>
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
                    <Text style={stylesGuestSingle().componentTitle}>Least Sugar</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameSugar}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (leastSugar) ? (leastSugar) : ('0') }</Text>
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
                    <Text style={stylesGuestSingle().componentTitle}>Most Fiber</Text>
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
                    <Text style={stylesGuestSingle().componentTitle}>Most Protein</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameProtein}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (mostProtein) ? (mostProtein) : ('0') }</Text>
                        <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                    </View>
                 </View>
                 <View style={stylesGuestSingle().listItemWrap}>
                    {leastSaltImg  ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: leastSaltImg }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text style={stylesGuestSingle().componentTitle}>Least Salt</Text>
                    <Text style={stylesGuestSingle().componentTitle}>{nameSalt}</Text>
                    <View style={stylesGuestSingle().listItemInfoWrap} >
                        <Text style={stylesGuestSingle().componentAmount} >{ (leastSalt) ? (leastSalt) : ('0') }</Text>
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
                    <Text style={stylesGuestSingle().componentTitle}>Most Vitamins</Text>
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