import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { View, Text } from 'react-native';
// import { NavigationContainter } from "@react-navigation/native";
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
const { store, persistor } = configureStore();

import Tabs from './components_additional/Navigation/Tabs';


// let AppNavigation = ( { isAuthorized } ) => {

//   const GuestNavigation = createStackNavigator();
//   const AuthNavigation = createStackNavigator();
//   const Footer = createBottomTabNavigator();
//   const AuthFooter = createBottomTabNavigator();

//   return (
//         <NavigationContainter>
//            <GuestNavigation.Navigator>
//              <GuestNavigation.Screen name="Login" component={LoginPage} />
//              <GuestNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
//              <GuestNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
//              <GuestNavigation.Screen name="Products_Auth" component={Products_Auth} />
//              <GuestNavigation.Screen name="Product_Auth" component={Product_Auth} />
//            </GuestNavigation.Navigator> 
//            <AuthNavigation.Navigator>
//                <AuthNavigation.Screen name="Login" component={LoginPage} />
//                 <AuthNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
//                <AuthNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
//               <AuthNavigation.Screen name="Products_Auth" component={Products_Auth} />
//              <AuthNavigation.Screen name="Product_Auth" component={Product_Auth} />  
//            </AuthNavigation.Navigator>
//            <Footer.Navigator>
//                <Footer.Screen name="Home" component={Home}/>
//                <Footer.Screen name="Login" component={LoginPage} />
//                <Footer.Screen name="SelectedProducts" component={SelectedProducts} />
//            </Footer.Navigator>
//         </NavigationContainter>
//     )
// }

// class AppNavigation extends Component {
//   render() {
//     return (
//       <View><Text>Text</Text></View>
//     )
//   }
// }
// let AppNavigation = () => {
//   const GuestNavigation = createStackNavigator();
//   const AuthNavigation = createStackNavigator();
//   const Footer = createBottomTabNavigator();
//   const AuthFooter = createBottomTabNavigator();
//     return (
//       <NavigationContainter>
//       <AuthNavigation.Navigator>
//                     <AuthNavigation.Screen name="Login" component={LoginPage} />
//                        <AuthNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
//                       <AuthNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
//                      <AuthNavigation.Screen name="Products_Auth" component={Products_Auth} />
//                     <AuthNavigation.Screen name="Product_Auth" component={Product_Auth} />  
//                   </AuthNavigation.Navigator> 
//                   </NavigationContainter>
//     )
//   }

// const mapStateToProps = (state) => ({
//   admin: state.auth.admin,
//   isAuthorized: state.auth.isAuthorized,
//   selectedProducts: state.selectedProducts.comparisonArray

// })

// AppNavigation = connect(mapStateToProps, {logOut})(AppNavigation)


// const App = () => {
//     return (
//       <Provider store={store}>
//          <PersistGate loading={null} persistor={persistor}>
//             <AppNavigation />
//           </PersistGate>
//       </Provider>
//     )
 
// }

// export default App

// class AppNavigation extends Component {
//   render() {
//     const GuestNavigation = createStackNavigator();
//     const AuthNavigation = createStackNavigator();
//     const Footer = createBottomTabNavigator();
//     const AuthFooter = createBottomTabNavigator();
//       return (
//         <NavigationContainter>
//           <GuestNavigation.Navigator>
//           <GuestNavigation.Screen name="Login" component={LoginPage} />
//               <GuestNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
//             <GuestNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
//             <GuestNavigation.Screen name="Products_Auth" component={Products_Auth} />
//           <GuestNavigation.Screen name="Product_Auth" component={Product_Auth} />  
//         </GuestNavigation.Navigator> 
//         </NavigationContainter>

//       )
//   }
 
//   }
// export default AppNavigation

// const GuestNavigation = createStackNavigator();
// const AuthNavigation = createStackNavigator();
// const Footer = createBottomTabNavigator();
// const AuthFooter = createBottomTabNavigator();

// const AppNavigation = () => {
//       return (
//         <Provider store={store}>
//          <PersistGate loading={null} persistor={persistor}>
//         <NavigationContainter>
//           <GuestNavigation.Navigator>
//           <GuestNavigation.Screen name="Login" component={LoginPage} />
//               <GuestNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
//             <GuestNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
//             <GuestNavigation.Screen name="Products_Auth" component={Products_Auth} />
//           <GuestNavigation.Screen name="Product_Auth" component={Product_Auth} />  
//         </GuestNavigation.Navigator> 
//         </NavigationContainter>
//         </PersistGate>
//         </Provider>

//       )
//   }
// export default AppNavigation

const App = () => {
        return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <Routes /> */}
              <Tabs />
            </PersistGate>
          </Provider>
        )
    }
  export default App