import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getTopFavoriteProducts, getNutriProducts } from '../../redux/actions/userProductActions';
import { containerStyles } from '../../src/styles/GeneralStyles';

//Components
import Header from '../../utils/models/Header';
import SingleChild from './SingleChild';
import Loading from '../../utils/models/Loading';
import EmptyList from '../../utils/models/EmptyList';

function ParentReusableComponent({ navigation, title, requestType, categoryId, getTopFavoriteProducts }){
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    function getProducts(){
        if(requestType == 'getFavorites'){
            getTopFavoriteProducts(categoryId).then(response => {
                if(response) setProducts(response)
                    else setError("Įvyko klaida.")
                setLoading(false)
            })
        } else {
            getNutriProducts()
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        loading ? (
            <View style={ containerStyles().screenHeightContainerNoHeaderFullHeight }>
                <View style={ containerStyles().centeredItemVertically }>
                    <Loading />
                </View>
            </View>
        ) : (
            <>
                <Header
                    title={ title } 
                    navigate={ () => navigation.goBack() } 
                />
                { products && products.length > 0  ? (
                    <View style={ containerStyles().screenHeightContainerNoHeaderFullHeight }>
                        <SingleChild 
                            products={ products }
                        />
                    </View>
                ) : (
                    <View style={ containerStyles().screenHeightContainerNoHeader }>
                        <View style={ containerStyles().centeredItemVertically }>
                            <EmptyList message="Sąrašas tuščias." />
                        </View>
                    </View>
                )}
            </>
        )
    )
}

export default connect(null, { getTopFavoriteProducts })(ParentReusableComponent)