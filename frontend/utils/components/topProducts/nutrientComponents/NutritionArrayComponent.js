import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { stylesGuest } from '../../../src/styles/SubcategoryStyles';

var icons = {
    Energy: require('../../../src/images/nutrients/energy.png'),
    Fat: require('../../../src/images/nutrients/fat.png'),
    Saturatedfat: require('../../../src/images/nutrients/saturated.png'),
    Carbohidrates: require('../../../src/images/nutrients/carbs.png'),
    Sugar: require('../../../src/images/nutrients/sugar.png'),
    Fiber: require('../../../src/images/nutrients/fiber.png'),
    Protein: require('../../../src/images/nutrients/protein.png'),
    Salt: require('../../../src/images/nutrients/salt.png'),
}

function NutritionArray({ goToNutritionPage }){
    const nutritions = [
        { name: 'Energy',  },
        { name: 'Fat' },
        { name: 'Saturated fat' },
        { name: 'Carbohidrates' },
        { name: 'Sugar' },
        { name: 'Fiber' },
        { name: 'Protein' },
        { name: 'Salt' },
    ];

    return (
        <View>
            { nutritions.map((item, index) => (
                <SingleNutrition 
                    item={ item }
                    index={ index }
                    goToNutritionPage={ goToNutritionPage }
                />
            )) }
        </View>
    )
}

export default NutritionArray

function SingleNutrition({ item, index, goToNutritionPage }){

    return (
        <TouchableOpacity style={stylesGuest(null, item.background, index + 1).itemWrap} key={ index.toString() } onPress={ () => goToNutritionPage(item.name) } >
            <View style={stylesGuest().imageWrap} >
                <Image style={stylesGuest().image} source={{ uri: icons[index] }} />
            </View>
            <View style={stylesGuest().textWrap}>
                <Text style={stylesGuest().itemText} >{ item.name }</Text>
            </View>
        </TouchableOpacity>
    )
}
