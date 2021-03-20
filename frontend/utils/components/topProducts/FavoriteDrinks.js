import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

//Components
import ParentReusableComponent from './ParentReusableComponent';

function FavoriteDrinks({ navigation }){

    // useEffect(() => {
    //     getTopFavoriteProducts()
    // })

    return (
        <>
            <ParentReusableComponent 
                requestType="getFavorites"
                categoryId={ 1 }
                navigation={ navigation }
                title="Top Favorite Drinks"
            />
        </>
    )
}

export default withNavigation(FavoriteDrinks)