import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../styles/Colors';
import { styles } from '../styles/TabStyles';
//Components
import Categories from '../../components/Categories/Categories';
import Subcategories from '../../components/subcategories/Subcategories';
import Products from '../../components/products/Products';
import Product from '../../components/products/ProductDetails';
import LoginAdmin from '../../components/auth/LoginAdmin';

const GuestNavigation = createStackNavigator();

export const GuestNavigationScreens = () => (
    <GuestNavigation.Navigator initialRouteName="Categories">
    <GuestNavigation.Screen name="Categories" component={Categories} 
        options={{
            headerShown: false
        }}
    />
    <GuestNavigation.Screen name="Subcategories" component={Subcategories} 
                        // options={({ route }) => ({
                        //     title: route.params.name,  
                        //     headerStyle: {
                        //     backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                        // },
                        options={{
                            headerShown: false
                        }}
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        //     color: colors.titleBlack,
                        // },
                        // headerTitleAlign: 'center'
    />
    <GuestNavigation.Screen name="Products" component={Products} 
                        // options={({route}) => ({
                        //     title: route.params.name,
                        //     headerStyle: {
                        //         backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                        //     },
                        //     headerTitleStyle: {
                        //         fontWeight: 'bold',
                        //         color: colors.titleBlack,
                        //     },
                        //     headerTitleAlign: 'center'
                        //     })} 
                        options={{
                            headerShown: false
                        }}
    /> 
    <GuestNavigation.Screen name="Product" component={Product} 
                            // options={({route}) => ({
                            //     title: route.params.name,
                            //     headerTitleStyle: {
                            //         fontWeight: 'bold',
                            //         color: colors.titleBlack,
                            //         fontSize: 14,
                            //         maxWidth: '95%',
                            //         marginLeft: 21,
                            //     },
                            //     headerStyle: {
                            //         // backgroundColor: colors.mainWhiteYellow,
                            //         backgroundColor: colors.transparentMedium,
                            //     },
                            //     headerTitleAlign: 'center'   
                            // })} 
                            options={{
                                headerShown: false
                            }}
    /> 
    </GuestNavigation.Navigator>
)

