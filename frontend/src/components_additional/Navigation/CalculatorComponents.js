import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors }  from '../styles/Colors';
// COMPARISON
import SelectedProducts from '../../components/comparison/selectedProducts';
import SelectedProductsResults from '../../components/comparison/ResultsOfBestWorst';
import Criteria from '../../components/comparison/Criteria';
import DescAscend from '../../components/comparison/DescAscend';

const CalculatorNav = createStackNavigator();

export const CalculatorScreen = () => (
    <CalculatorNav.Navigator>
        <CalculatorNav.Screen
            name="SelectedProducts" 
            component={ SelectedProducts } 
            // options={{
            //     title: "Calculate",
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //         color: colors.titleBlack,
            //     },
            //     headerStyle: {
            //         backgroundColor: colors.mainGrey,
            //     },
            //     headerTitleAlign: 'center',
        // }} 
            options={{
                headerShown: false
            }}
        />
        <CalculatorNav.Screen 
            name="Results" 
            component={ SelectedProductsResults } 
            // options = {{
            //     title: "Results",
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //         color: colors.titleBlack,
            //     },
            //     headerStyle: {
            //         backgroundColor: colors.mainGrey,
            //     },
            //     headerTitleAlign: 'center',
            // }} 
            options={{
                headerShown: false
            }}
        />
        <CalculatorNav.Screen 
            name="DescAscend" 
            component={ DescAscend } 
            // options = {{
            //     title: "Sort by Criteria",
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //         color: colors.titleBlack,
            //     },
            //     headerStyle: {
            //         backgroundColor: colors.mainGrey,
            //     },
            //     headerTitleAlign: 'center',
            // }} 
            options={{
                headerShown: false
            }}
         />
        <CalculatorNav.Screen 
            name="Criteria" 
            component={ Criteria } 
            // options = {{
            //     title: "Calculate by Criteria",
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //         color: colors.titleBlack,
            //     },
            //     headerStyle: {
            //         backgroundColor: colors.mainGrey,
            //     },
            //     headerTitleAlign: 'center',
            // }} 
            options={{
                headerShown: false
            }}
        />
    </CalculatorNav.Navigator>
)