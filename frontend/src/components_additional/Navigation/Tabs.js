import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    NavigationContainer,
 } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import OctIcon from 'react-native-vector-icons/dist/Octicons';
import { styles, signinStyle } from '../styles/TabStyles';
import { connect } from 'react-redux';
import { importAppData } from '../../redux/actions/generalActions';
import { logOut } from '../../redux/actions/authActions';
import { colors }  from '../styles/Colors';
import ListIndicator from './ListIndicator';
import  NetInfo  from '@react-native-community/netinfo';


// Components:
import Register from '../Register';
import Categories from '../../components/Categories/Categories';
import ConfirmModal from '../../components_additional/ModalCrud';
import { GuestNavigationScreens } from './GuestUserComponents';
import { AdminNavigationScreens } from './AdminComponents';
import { CalculatorScreen } from './CalculatorComponents';
import { Router } from 'react-router-native';


function Tabs({ 
    token,
    dataUploaded,
    importAppData,
    dataUploadDate,
    loadingData,
    logOut,
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
                    // this.setState({openDataModel: true})
                    setOpenDataModel(true)
                }
            }
        })  
        if(!token){
            // this.setState({ registerModel: true })
            setRegisterModel(true)
        } 
        setLoading(false)
        // console.log("navigationRef.current.getCurrentRoute().name", navigationRef.current.getRootState().routes[routes.length - 1])
        // console.log("navigationRef.current.getCurrentRoute().name", navigationRef.current)
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

    const NullComp = () => {
        return null;
    }

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
                <NavigationContainer>
                    {(token) ? (
                        <Tabs.Navigator tabBarOptions={{
                            style: { 
                                backgroundColor: colors.mainBlack,
                                height: 60,
                               
                            },
                            // activeTintColor: colors.mainBtnGreen,
                            // inactiveTintColor: colors.mainGrey,
                            // activeBackgroundColor: colors.mainBtnGreen,
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
                                    // <Icon name="list-alt" size={40} />
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
                            <Tabs.Screen name="Logout" component={null} component={ Categories }
                                options = {{ 
                                    tabBarLabel: () => (null),
                                    tabBarIcon: () => (
                                        <Icon name="sign-out" style={styles().iconItem} />
                                    )}
                                }
                                listeners={
                                    { tabPress: () => (
                                        logOut(token)
                                    )}
                                }                 
                            />
                        </Tabs.Navigator> 
                    )}
                </NavigationContainer> 
                { registerModel && (
                    <Register refreshPage={ () => forceUpdate()} close={ () =>  setRegisterModel(false) }/>
                )} 
                {
                    <TouchableOpacity style={signinStyle().container} onPress={ () => setRegisterModel(state => !state) }>
                        {/* <Icon name="sign-in" style={signinStyle().iconItem} /> */}
                        <OctIcon  name="sign-in" style={signinStyle(registerModel).iconItem} />
                    </TouchableOpacity>
                }
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

export default connect(mapStateToProps, { logOut, importAppData })(Tabs)
