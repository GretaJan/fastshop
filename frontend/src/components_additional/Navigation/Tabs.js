import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { styles } from '../styles/TabStyles';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/authActions';
import { colors }  from '../styles/Colors';
import ListIndicator from './ListIndicator';

// Components:
import Categories from '../../components/Categories/Categories';
import Subcategories from '../../components/subcategories/Subcategories';
import Products from '../../components/products/Products';
import Product from '../../components/products/Product';
import LoginPage from '../../components/auth/Login';

//Auth Components:
import Categories_Auth from '../../componentsAuth/auth_categories/Categories';
import Subcategories_Auth from '../../componentsAuth/auth_subcategories/Subcategories';
import Products_Auth from '../../componentsAuth/auth_products/Products';
import Product_Auth from '../../componentsAuth/auth_products/Product';
//CRUD
import AddCategory from '../../componentsAuth/auth_categories/AddCategory';
import AddSubcategory from '../../componentsAuth/auth_subcategories/AddSubcategory';
import AddProduct from '../../componentsAuth/auth_products/AddProduct';
// COMPARISON
import SelectedProducts from '../../components/comparison/selectedProducts';
import SelectedProductsResults from '../../components/comparison/ResultsOfBestWorst';
import Criteria from '../../components/comparison/Criteria';
import DescAscend from '../../components/comparison/DescAscend';

class Tabs extends Component {
    componentDidMount(){       
    console.log('auth', this.props.isAuthorized)
}
    componentDidUpdate(nextProps) {
        return nextProps.isAuthorized !== this.props.isAuthorized;
        console.log('auth', this.props.isAuthorized)
    } 


    logOut = () => {
        this.props.logOut(this.props.admin)
    }   

render() {
    const Tabs = createBottomTabNavigator();
    const GuestNavigation = createStackNavigator();
    const SelectedProductsNav = createStackNavigator();
    const AdminNavigation = createStackNavigator();
    const LoginScreenNav = createStackNavigator();

    const GuestNavigationScreens = () => (
        <GuestNavigation.Navigator initialRouteName="Categories">
            <GuestNavigation.Screen name="Categories" component={Categories} 
                options={{
                    title: "SPEEDSHOP",
                    headerStyle: {
                        backgroundColor: colors.mainYellow,
                      },
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        color: colors.titleBlack,
                      },
                      headerTitleAlign: 'center'
                    }} />
            <GuestNavigation.Screen name="Subcategories" component={Subcategories} 
                                options={({ route }) => ({
                                    title: route.params.name,  
                                    headerStyle: {
                                    backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
                                },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: colors.titleBlack,
                                },
                                headerTitleAlign: 'center'
            })} />
            <GuestNavigation.Screen name="Products" component={Products} 
                                options={({route}) => ({
                                    title: route.params.name,
                                    headerStyle: {
                                        backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
                                    },
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        color: colors.titleBlack,
                                    },
                                    headerTitleAlign: 'center'
                                    })} /> 
            <GuestNavigation.Screen name="Product" component={Product} 
                                    options={({route}) => ({
                                        title: route.params.name,
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                            fontSize: 14,
                                            maxWidth: '95%',
                                            marginLeft: 21,
                                        },
                                        headerStyle: {
                                            backgroundColor: colors.mainWhiteYellow,
                                        },
                                        headerTitleAlign: 'center'   
                                    })} /> 
        </GuestNavigation.Navigator>
    )

    const SelectedProductsScreen = () => (
        <SelectedProductsNav.Navigator>
            <SelectedProductsNav.Screen name="SelectedProducts" component={SelectedProducts} 
                                    options={{
                                        title: "Calculate",
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                        },
                                        headerStyle: {
                                            backgroundColor: colors.mainYellow,
                                        },
                                        headerTitleAlign: 'center',
            }} />
            <SelectedProductsNav.Screen name="Results" component={SelectedProductsResults} 
                                    options = {{
                                        title: "Results",
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                        },
                                        headerStyle: {
                                            backgroundColor: colors.mainYellow,
                                        },
                                        headerTitleAlign: 'center',
                                  
            }} />
            <SelectedProductsNav.Screen name="DescAscend" component={DescAscend} 
                                    options = {{
                                        title: "Sort by Criteria",
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                        },
                                        headerStyle: {
                                            backgroundColor: colors.mainYellow,
                                        },
                                        headerTitleAlign: 'center',
                                  
            }} />
            <SelectedProductsNav.Screen name="Criteria" component={Criteria} 
                                    options = {{
                                        title: "Calculate by Criteria",
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                        },
                                        headerStyle: {
                                            backgroundColor: colors.mainYellow,
                                        },
                                        headerTitleAlign: 'center',
                                  
            }} />
        </SelectedProductsNav.Navigator>
    )
    const LoginScreen = () => (
        <LoginScreenNav.Navigator>
            <LoginScreenNav.Screen name="Login" component={LoginPage} 
              options={{
                title: "Login to Dashboard",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainYellow,
                },
                headerTitleAlign: 'center'
            }} />                                      
        </LoginScreenNav.Navigator>
    );

    const AdminNavigationScreens = () => (
        <AdminNavigation.Navigator >
            <AdminNavigation.Screen name="Dashboard" component={Categories_Auth} 
            options={{ 
                title: "Dashboard",
                headerStyle: {
                    backgroundColor: colors.mainYellow,
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
                                        backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
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
                                        backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
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
                                            backgroundColor: colors.mainYellow,
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
                                            backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
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
                                            backgroundColor: route.params.background ? route.params.background : colors.mainYellow,
                                            },
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: colors.titleBlack,
                                        },
                                        headerTitleAlign: 'center'   
                                    })} />
        </AdminNavigation.Navigator> 
    )
    return ( 
        <NavigationContainer>
            {(!this.props.isAuthorized) ? (
                <Tabs.Navigator tabBarOptions={{
                    style: { 
                        backgroundColor: colors.mainBlack,
                        height: 60,
                    },
                  }}>
                    <Tabs.Screen name="Home" component={GuestNavigationScreens}
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <IonIcon name="ios-home" style={styles().iconItem} />
                        )}
                    } />
                    <Tabs.Screen name="Login" component={LoginScreen} 
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <Icon name="sign-in" style={styles().iconItem} />
                        )
                    }} />
                    <Tabs.Screen name="SelectedProducts" component={SelectedProductsScreen} 
                    options = {{ 
                            tabBarLabel: () => (null),
                            tabBarIcon: () => (
                            // <Icon name="list-alt" size={40} />
                            <View>
                                <IonIcon name="ios-calculator" style={styles().iconItem} />
                                <View style={styles().counter}>
                                    <ListIndicator style={styles().counterNo}/> 
                                </View>
                            </View>
                        )
                        }} />
                </Tabs.Navigator>           
            ) : (
                <Tabs.Navigator tabBarOptions={{
                    style: { 
                        backgroundColor:  colors.titleBlack,
                        height: 60,
                    } }}>
                    <Tabs.Screen name="Dashboard" component={AdminNavigationScreens} 
                        options = {{
                            tabBarLabel: () => (null),
                            tabBarIcon: () => (
                                <Icon name="list-alt" style={styles().iconItem} />
                            )}
                    } />
                    <Tabs.Screen name="Logout" component={null} component={Categories}
                        options = {{ 
                            tabBarLabel: () => (null),
                            tabBarIcon: () => (
                                <Icon name="sign-out" style={styles().iconItem} />
                            )}
                        }
                        listeners={
                            { tabPress: () => (
                                this.logOut()
                            )}
                        }                 
                    />
                </Tabs.Navigator> 
            )}
        </NavigationContainer> 
    ) 
 }
}

const mapStateToProps = state => ({
    admin: state.auth.admin,
    isAuthorized: state.auth.isAuthorized,
})

export default connect(mapStateToProps, { logOut })(Tabs)
