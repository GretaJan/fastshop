import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Home from '../components/Home';
import Subcategories from '../components/subcategories/global/Subcategories';
import Products from '../components/products/global/Products';
import Product from '../components/products/global/ProductDetails';
//Top components
import TopComponents from '../components/topProducts/TopComponents';
import TopNutritionsArray from '../components/topProducts/nutrientComponents/NutritionsArray';

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
                        name="TopComponents" component={ TopComponents } 
                        options={{
                            headerShown: false
                        }}
    /> 
    {/* <GuestNavigation.Screen 
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
    />  */}
    {/* Top nutrients */}
    {/* <GuestNavigation.Screen 
                        name="Top Food Nutrients" component={ TopFoodNutrient } 
                        options={{
                            headerShown: false
                        }}
    />  */}
    <GuestNavigation.Screen 
                        name="Top Nutritions" component={ TopNutritionsArray } 
                        options={{
                            headerShown: false
                        }}
    />
    </GuestNavigation.Navigator>
)

