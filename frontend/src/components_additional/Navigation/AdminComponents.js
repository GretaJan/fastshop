import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../styles/Colors';
import { styles } from '../styles/TabStyles';

//Components
//Auth Components:
import Categories_Auth from '../../componentsAuth/auth_categories/Categories';
import Subcategories_Auth from '../../componentsAuth/auth_subcategories/Subcategories';
import Products_Auth from '../../componentsAuth/auth_products/Products';
import Product_Auth from '../../componentsAuth/auth_products/Product';
//CRUD
import AddCategory from '../../componentsAuth/auth_categories/AddCategory';
import AddSubcategory from '../../componentsAuth/auth_subcategories/AddSubcategory';
import AddProduct from '../../componentsAuth/auth_products/AddProduct';

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