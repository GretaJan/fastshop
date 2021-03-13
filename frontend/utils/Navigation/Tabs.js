import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    NavigationContainer,
 } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import  NetInfo  from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import OctIcon from 'react-native-vector-icons/dist/Octicons';
import { styles, signinStyle } from '../src/styles/TabStyles';
import { importAppData } from '../redux/actions/generalActions';
import { colors }  from '../src/styles/Colors';
import ListIndicator from './ListIndicator';

// Components:
import Register from '../utils/models/Register';
import Categories from '../components/categories/global/Categories';
import { GuestNavigationScreens } from './GuestUserComponents';
import { AdminNavigationScreens } from './AdminComponents';
import { CalculatorScreen } from './CalculatorComponents';
import { SettingsScreen } from './UserSettings';


function Tabs({ 
    token,
    user,
    dataUploaded,
    importAppData,
    dataUploadDate,
    loadingData,
}) {
    const Tabs = createBottomTabNavigator();
    const [ loading, setLoading ] = useState(true);
    const [ openDataModel, setOpenDataModel ] = useState(true);
    const [ importDataLoading, setImportDataLoading ] = useState(true);
    const [ registerModel, setRegisterModel ] = useState(false);
    const LoginScreenNav = createStackNavigator();
    const navigationRef = useRef();
    const routeNameRef = useRef();

    useEffect( () => {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                const currentDate = new Date();
                if(!dataUploaded){
                    importAppData(token);
                } else if(currentDate.getTime() >= dataUploadDate.getTime()){
                    setOpenDataModel(true)
                }
            }
        })  
        if(!token && user !== 'logged_out') setRegisterModel(true)
        setLoading(false)
        // ///////
        // if(isConnected){
        //     console.log("conn")
        //     const currentDate = new Date();
        //     if(!dataUploaded){
        //         importAppData(token);
        //     } else if(currentDate.getTime() >= dataUploadDate.getTime()){
        //         setOpenDataModel(true)
        //     }
        // }
        // const currentDate = new Date();
        // if(!dataUploaded){
        //             importAppData(token);
        //         } else if(currentDate.getTime() >= dataUploadDate.getTime()){
        //             setOpenDataModel(true)
        //         }
    }, [token])


    function dataTransferModelMsg(){
        if(loadingData) return "Loading data...";
        else return "Load new data?";
    }

    const LoginScreen = () => (
        <LoginScreenNav.Navigator>
            <LoginScreenNav.Screen name="Login" component={ Categories } 
              options={{
                title: "Login to Dashboard",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.titleBlack,
                },
                headerStyle: {
                    backgroundColor: colors.mainGrey,
                },
                headerTitleAlign: 'center'
            }} />                                      
        </LoginScreenNav.Navigator>
    );

    const MyTheme = {
        colors: {
            background: colors.mainGrey
        },
      };

    return ( 
        <>
            {/* { openDataModel && (
                <ConfirmModal message={ dataTransferModelMsg() }
                    confirm={() => importAppData(token)}
                    title="Clear list"
                    close={() => setOpenDataModel(false)}
                    background={colors.mainWhiteYellow}
                    iconColor={colors.lightBurgundy}
                    borderColor={colors.bordoTransparent}
                    colorOne={colors.lightBurgundy}
                    colorTwo={colors.mediumGreen}
                    horizontal={20} vertical={15}
                /> )} */}
               
                <NavigationContainer theme={ MyTheme }>
                    {(!token) ? (
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
                                    <IonIcon 
                                        name="ios-home" 
                                        style={styles().iconItem} 
                                    />
                                ),
                                }
                            } />
                            <Tabs.Screen name="SelectedProducts" component={CalculatorScreen} 
                                options = {{ 
                                    tabBarLabel: () => (null),
                                    tabBarIcon: () => (
                                    <View>
                                        <IonIcon name="ios-calculator" style={styles().iconItem} />
                                        <View style={styles().counter}>
                                            <ListIndicator style={styles().counterNo}/> 
                                        </View>
                                    </View>
                                )
                                }}
                            />
                            <Tabs.Screen name="Login" component={ Categories } 
                                options = {{ 
                                    tabBarLabel: () => (null),
                                }}       
                            />
                        </Tabs.Navigator>           
                    ) : (
                        user.isAdmin === 0 ? (
                            <Tabs.Navigator 
                                tabBarOptions={{
                                    style: { 
                                        backgroundColor: colors.mainBlack,
                                        height: 60,
                                } }}>
                                <Tabs.Screen name="Home" component={GuestNavigationScreens}
                                    options = {{ 
                                        tabBarLabel: () => (null),
                                        tabBarIcon: () => (
                                            <IonIcon 
                                                name="ios-home" 
                                                style={styles().iconItem} 
                                            />
                                        ),
                                    }
                                } />
                                <Tabs.Screen name="SelectedProducts" component={CalculatorScreen} 
                                    options = {{ 
                                        tabBarLabel: () => (null),
                                        tabBarIcon: () => (
                                        <View>
                                            <IonIcon name="ios-calculator" style={styles().iconItem} />
                                            <View style={styles().counter}>
                                                <ListIndicator style={styles().counterNo}/> 
                                            </View>
                                        </View>
                                    )
                                    }}
                                />
                                <Tabs.Screen 
                                    name="Settings"
                                    component={ SettingsScreen }
                                    options = {{
                                        tabBarLabel: () => (null),
                                        tabBarIcon: () => (
                                            <Icon name="list-alt" style={styles().iconItem} />
                                        )
                                    }} 
                                /> 
                            </Tabs.Navigator>
                        ) : (
                            <Tabs.Navigator tabBarOptions={{
                                style: { 
                                    backgroundColor: colors.titleBlack,
                                    height: 60,
                                } }}>
                                <Tabs.Screen name="Dashboard" component={AdminNavigationScreens} 
                                    options = {{
                                        tabBarLabel: () => (null),
                                        tabBarIcon: () => (
                                            <Icon name="list-alt" style={styles().iconItem} />
                                        )}
                                } />
                                <Tabs.Screen name="SelectedProducts" component={CalculatorScreen} 
                                    options = {{ 
                                        tabBarLabel: () => (null),
                                        tabBarIcon: () => (
                                        <View>
                                            <IonIcon name="ios-calculator" style={styles().iconItem} />
                                            <View style={styles().counter}>
                                                <ListIndicator style={styles().counterNo}/> 
                                            </View>
                                        </View>
                                    )
                                    }}
                                />
                            </Tabs.Navigator> 
                        )
                    )}
                </NavigationContainer> 
                    { !token && (
                        <TouchableOpacity style={signinStyle().container} onPress={ () => setRegisterModel(state => !state) }>
                            <OctIcon name="sign-in" style={signinStyle().iconItem} />
                        </TouchableOpacity>
                    ) }
                    { registerModel && (
                        <Register refreshPage={ () => this.forceUpdate()} close={ () =>  setRegisterModel(false) }/>
                    )}
            </>
        )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    categories: state.dataUpload.categories,
    loadingData: state.dataUpload.loadingData,
    dataUploadDate: state.dataUpload.dataUploadDate,
})

export default connect(mapStateToProps, { importAppData })(Tabs)
