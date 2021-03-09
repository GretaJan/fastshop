import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { likeProduct, unlikeProduct } from '../../redux/actions/userProductActions';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { containerStyles, textStyle } from '../../components_additional/styles/GeneralStyles';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { clearResults, saveCombination } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import ResultsBestWorstChild from './ResultsBestWorstChild';
import ProductModel from '../../components_additional/models/ProductModel';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);

const ResultsOfBestWorst = ({ result, clearResults, likeProduct, unlikeProduct, token, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const { match, mismatch } = result;
    const translateMatch = useState(new Animated.Value(-100))[0];
    const translateMismatch = useState(new Animated.Value(-100))[0];
    const [productModel, setProductModel] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // callDiagramAnimation();
        comparisonAnimations.imageIconTranslation(translateMatch, translateMismatch);

    }, [])

    function scrollUp() {
        scrollTopRef.scrollTo({y: 0, animated: true});
    }
    
    function invokeClearResults() {
        clearResults();
        setTimeout(() => {
            navigate("SelectedProducts");
        }, 0)
    }
    
    function invokeSaveCombination() {
        saveCombination(match, mismatch)
    }

    function openProductModelFunc(prop){
        const { id } = prop;
        setIsLiked(isLiked)
        setProductModel({
            subcategoryId: prop.subcategory_id,
            categoryId: prop.category_id,
            id: id,
            name: prop.name,
            image: prop.image,
        })
    }

    async function likeProductLocal(){
        const errorMsg = await likeProduct(productModel.categoryId, productModel.id, token, true)
        if(!errorMsg){
            setIsLiked(true);
            return true;
        }
        return errorMsg;
    }


    function unlikeProductLocal(){
        unlikeProduct(productModel.id, true)
    }

    return (
        <>
        <ScrollView style={ containerStyles().simpleContainer } ref={scrollView => scrollTopRef = scrollView}>
            { Object.keys(result).length === 0 ? (
                <View style={diagram().container}>
                </View>
                ) : (
                <>
                    <View style={diagram().productsContainer} >
                        <View style={diagram().productsInnerContainer}>
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModelFunc(match)} >
                                { match.image ? (
                                    <Image style={diagram().image} source={{ uri: match.image }} />
                                    ) : (
                                    <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-checkmark" color='#32bd81' style={diagram(null, translateMatch).iconTranslation} />
                        </View>
                        <View style={diagram().productsInnerContainer}>
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModelFunc(mismatch)}>
                                {mismatch.image ? (
                                    <Image style={diagram().image} source={{ uri: mismatch.image }} />
                                    ) : (
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } />
                        </View>
                    </View>
                      {/* Diagram */}
                    <View style={diagram().diagramContainer}>
                        <ResultsBestWorstChild 
                            title='Energy'
                            matchComponent={ match.energy }
                            matchComponentArr={ match.energyArr }
                            mismatchComponent={ mismatch.energy }
                            mismatchComponentArr={ mismatch.energyArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fat'
                            matchComponent={ match.fat }
                            matchComponentArr={ match.fatArr }
                            mismatchComponent={ mismatch.fat }
                            mismatchComponentArr={ mismatch.fatArr }
                        />
                        <ResultsBestWorstChild 
                            title='Saturated fat'
                            matchComponent={ match.saturated }
                            matchComponentArr={ match.saturatedArr }
                            mismatchComponent={ mismatch.saturated }
                            mismatchComponentArr={ mismatch.saturatedArr }
                        />
                        <ResultsBestWorstChild 
                            title='Carbohidrates'
                            matchComponent={ match.carbs }
                            matchComponentArr={ match.carbsArr }
                            mismatchComponent={ mismatch.carbs }
                            mismatchComponentArr={ mismatch.carbsArr }
                        />
                        <ResultsBestWorstChild 
                            title='Sugar'
                            matchComponent={ match.sugar }
                            matchComponentArr={ match.sugarArr }
                            mismatchComponent={ mismatch.sugar }
                            mismatchComponentArr={ mismatch.sugarArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fiber'
                            matchComponent={ match.fiber }
                            matchComponentArr={ match.fiberArr }
                            mismatchComponent={ mismatch.fiber }
                            mismatchComponentArr={ mismatch.fiberArr }
                        />
                        <ResultsBestWorstChild 
                            title='Protein'
                            matchComponent={ match.protein }
                            matchComponentArr={ match.proteinArr }
                            mismatchComponent={ mismatch.protein }
                            mismatchComponentArr={ mismatch.proteinArr }
                        />
                        <ResultsBestWorstChild 
                            title='Salt'
                            matchComponent={ match.salt }
                            matchComponentArr={ match.saltArr }
                            mismatchComponent={ mismatch.salt }
                            mismatchComponentArr={ mismatch.saltArr }
                        />  
                        <TouchableOpacity style={(diagram().scrollUp)} onPress={ scrollUp }>
                            <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeSaveCombination }>
                            <Text style={diagram().optionsBtnText}>Save Results</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeClearResults }>
                            <Text style={diagram().optionsBtnText}>Clear Results</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
        { productModel && (
            <ProductModel
                prop={ productModel }
                token={ token }
                isLiked={ isLiked }
                likeProduct={ likeProductLocal }
                unlikeProduct={ unlikeProductLocal }
                putToCart={() => putToCart() }
                close={ () => setProductModel(null) }
                navigate={ navigate }
            />
        ) }
        </>
    )
}

const mapStateToProps = state => ({
    result: state.selectedProducts.result,
    token: state.auth.token
})

// function useInterval(callback, delay) {
//     const getCallback = useRef();

//     useEffect(() => {
//         getCallback.current = callback;
//     }, [callback]);
//     useEffect(() => {
//         function tick() {
//             getCallback.current();
//         }
//         if(delay !== null) {
//             let id = setInterval(tick, 0);
//             return () => clearInterval(id);
//         }
//     }, [delay])
// }


export default withNavigation(connect(mapStateToProps, {clearResults, likeProduct, unlikeProduct})(ResultsOfBestWorst))
