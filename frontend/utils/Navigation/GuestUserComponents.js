import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Categories from '../components/categories/global/Categories';
import Subcategories from '../components/subcategories/global/Subcategories';
import Products from '../components/products/global/Products';
import Product from '../components/products/global/ProductDetails';

const GuestNavigation = createStackNavigator();

export const GuestNavigationScreens = () => (
    <GuestNavigation.Navigator initialRouteName="Categories">
    <GuestNavigation.Screen name="Categories" component={Categories} 
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
    </GuestNavigation.Navigator>
)

