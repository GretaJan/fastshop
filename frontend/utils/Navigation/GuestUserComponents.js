import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Home from '../components/Home';
import Subcategories from '../components/subcategories/global/Subcategories';
import Products from '../components/products/global/Products';
import Product from '../components/products/global/ProductDetails';
//Top components
import FavoriteDrinks from '../components/topProducts/FavoriteDrinks';
import FavoriteFoods from '../components/topProducts/FavoriteFoods';
import NutriDrinks from '../components/topProducts/NutriDrinks';
import NutriFoods from '../components/topProducts/NutriFoods';

const GuestNavigation = createStackNavigator();

export const GuestNavigationScreens = () => (
    <GuestNavigation.Navigator initialRouteName="Categories">
        <GuestNavigation.Screen name="Categories" component={Home} 
        options={{
            headerShown: false
        }}
    />
    <GuestNavigation.Screen 
                        name="Subcategories" component={Subcategories} 
                        options={{
                            headerShown: false
                        }}
    />
    <GuestNavigation.Screen 
                        name="Products" component={Products} 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen 
                        name="Product" component={Product} 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen 
                        name="FavoriteDrinks" component={ FavoriteDrinks } 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen 
                        name="FavoriteFoods" component={ FavoriteFoods } 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen 
                        name="NutriDrinks" component={ NutriDrinks } 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen 
                        name="NutriFoods" component={ NutriFoods } 
                        options={{
                            headerShown: false
                        }}
    /> 
    </GuestNavigation.Navigator>
)

