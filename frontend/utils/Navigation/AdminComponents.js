import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../src/styles/Colors';

//Components
//categories:
import Categories_Auth from '../components/categories/auth/Categories';
import AddCategory from '../components/categories/auth/AddCategory';
//subcategories
import Subcategories_Auth from '../components/subcategories/auth/Subcategories';
import AddSubcategory from '../components/subcategories/auth/AddSubcategory';
//product
import Products_Auth from '../components/products/auth/Products';
import Product_Auth from '../components/products/auth/Product';
import AddProduct from '../components/products/auth/AddProduct';

const AdminNavigation = createStackNavigator();

export const AdminNavigationScreens = () => (
    <AdminNavigation.Navigator >
        <AdminNavigation.Screen name="Dashboard" component={Categories_Auth} 
        options={{ 
            title: "Dashboard",
            headerStyle: {
                backgroundColor: colors.mainGrey,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.titleBlack, 
              },
              headerTitleAlign: 'center'
        }} />
        <AdminNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} 
                           options={({ route }) => ({ 
                                title: route.params.name,
                                headerStyle: {
                                    backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                                  },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: colors.titleBlack,
                                },
                                headerTitleAlign: 'center'
        })} />  
        <AdminNavigation.Screen name="Products_Auth" component={Products_Auth}  
                    options={({ route }) => ({ 
                                title: route.params.name,
                                headerStyle: {
                                    backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                                  },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: colors.titleBlack,
                                },
                                headerTitleAlign: 'center'
        })} />  
        <AdminNavigation.Screen name="Product_Auth" component={Product_Auth} 
                            options={({ route }) => ({ 
                                title: route.params.name,
                                headerStyle: {
                                    backgroundColor: colors.mainWhiteYellow,
                                  },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: colors.titleBlack,
                                    fontSize: 15
                                },
                                headerTitleAlign: 'center'
         })} /> 
        <AdminNavigation.Screen name="Add_Category" component={AddCategory} 
                                options={{
                                    title: 'Add Category',
                                    headerStyle: {
                                        backgroundColor: colors.mainGrey,
                                        },
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        color: colors.titleBlack,
                                    },
                                    headerTitleAlign: 'center'   
                                }} />
        <AdminNavigation.Screen name="Add_Subcategory" component={AddSubcategory} 
                                options={({route}) => ({
                                    title: 'Add Subategory',
                                    headerStyle: {
                                        backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                                        },
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        color: colors.titleBlack,
                                    },
                                    headerTitleAlign: 'center'   
                                })} />
        <AdminNavigation.Screen name="Add_Product" component={AddProduct} 
                                 options={({route}) => ({
                                    title: 'Add Product',
                                    headerStyle: {
                                        backgroundColor: route.params.background ? route.params.background : colors.mainGrey,
                                        },
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        color: colors.titleBlack,
                                    },
                                    headerTitleAlign: 'center'   
                                })} />
    </AdminNavigation.Navigator> 
)