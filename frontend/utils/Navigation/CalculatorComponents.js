import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// COMPARISON
import SelectedProducts from '../components/comparison/selectedProducts';
import SelectedProductsResults from '../components/comparison/ResultsOfBestWorst';
import Criteria from '../components/comparison/Criteria';
import DescAscend from '../components/comparison/DescAscend';

const CalculatorNav = createStackNavigator();

export const CalculatorScreen = () => (
    <CalculatorNav.Navigator>
        <CalculatorNav.Screen
            name="SelectedProducts" 
            component={ SelectedProducts } 
            options={{
                headerShown: false
            }}
        />
        <CalculatorNav.Screen 
            name="DescAscend" 
            component={ DescAscend } 
            options={{
                headerShown: false
            }}
         />
        <CalculatorNav.Screen 
            name="Criteria" 
            component={ Criteria } 
            options={{
                headerShown: false
            }}
        />
        <CalculatorNav.Screen 
            name="Results" 
            component={ SelectedProductsResults } 
            options={{
                headerShown: false
            }}
        />
    </CalculatorNav.Navigator>
)