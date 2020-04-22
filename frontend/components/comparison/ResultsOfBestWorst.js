import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import ButtonStyled from '../../components_additional/Button';

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

const ResultsOfBestWorst = ({ bestQualityName, imgGood, energyGood, fatGood, saturatedGood, carbsGood, sugarGood, fiberGood, proteinGood, saltGood, vitaminsGood, 
                    lowestQualityName, imgBad, saturatedBad, fatBad, sugarBad, fiberBad, proteinBad, saltBad, vitaminsBad, clearResults }) => {

        return (
            <View>
                <View style={stylesGuestSingle().container} >
                    {imgGood ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: imgGood }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text>{bestQualityName}</Text>
                    <View style={stylesGuestSingle().buttonDropdown} >View components</View>
                    <ScrollView style={stylesGuestSingle().dropdownContainer} >
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (energyGood) ? (energyGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fatGood) ? (fatGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (saturatedGood) ? (saturatedGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (carbsGood) ? (carbsGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (sugarGood) ? (sugarGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fiberGood) ? (fiberGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (proteinGood) ? (proteinGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (saltGood) ? (saltGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (vitaminsGood) ? (vitaminsGood) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <Text>We do not recommend:</Text> 
                    {imgBad ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={{ uri: imgBad }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Text>{lowestQualityName}</Text>
                    <View style={stylesGuestSingle().buttonDropdown} >View components</View>
                    <ScrollView style={stylesGuestSingle().dropdownContainer} >
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (energyBad) ? (energyBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fatBad) ? (fatBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (saturatedBad) ? (saturatedBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (carbsBad) ? (carbsBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (sugarBad) ? (sugarBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (fiberBad) ? (fiberBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (proteinBad) ? (proteinBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (saltBad) ? (saltBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                        <View style={stylesGuestSingle().listItemWrap}>
                            <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                            <View style={stylesGuestSingle().listItemInfoWrap} >
                                <Text style={stylesGuestSingle().componentAmount} >{ (vitaminsBad) ? (vitaminsBad) : ('-') }</Text>
                                <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <ButtonStyled title="Clear results" func={clearResults} />
                </View>
            </View>
    )
}

export default ResultsOfBestWorst