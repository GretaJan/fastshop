import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
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
import ResultProduct from './ResultProduct';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);

const ResultsOfBestWorst = ({ result, clearResults, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const { match, mismatch } = result;
    const translateMatch = useState(new Animated.Value(-100))[0];
    const translateMismatch = useState(new Animated.Value(-100))[0];
    const [currSubcategoryId, setCurrSubcategoryId] = useState('');
    const [currProductId, setCurrProductId] = useState('');
    const [currName, setCurrName] = useState('');
    const [currImage, setCurrImage] = useState('');
    const [openProductModel, setOpenProductModel] = useState(false)

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

    function openProductModelFunc(subcategoryId, productId, name, image){
        setCurrSubcategoryId(subcategoryId)
        setCurrProductId(productId)
        setCurrName(name)
        setCurrImage(image)
        setOpenProductModel(true)
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
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModelFunc(match.subcategory_id, match.id, match.name, match.image)} >
                                { match.image ? (
                                    <Image style={diagram().image} source={{ uri: match.image }} />
                                    ) : (
                                    <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-checkmark" color='#32bd81' style={diagram(null, translateMatch).iconTranslation} />
                        </View>
                        <View style={diagram().productsInnerContainer}>
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModel(mismatch.subcategory_id, mismatch.id, mismatch.name, mismatch.image)}>
                                {mismatch.image ? (
                                    <Image style={diagram().image} source={{ uri: mismatch.image }} />
                                    ) : (
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } />
                        </View>
                        <AnimatedTouchable 
                                style={diagram().neutralBtnLiked} 
                                onPress={() => console.log("helloo") }
                                // onPress={ this.likeProduct }
                                // ref={ component => this.likeBtnRef = component }
                            >
                            {/* { !isLiked ? ( */}
                                <MaterialIcon name="heart-outline" style={stylesGuestSingle().iconHeartLike} />
                            {/* ): (
                                <>
                                    <Icon name="heart" style={stylesGuestSingle(null, null, null, null, this.state.checkLikeTransition).iconHeart} />
                                    <EvilIcon name="cart" style={stylesGuestSingle(null, null, null, this.state.listLikeScale).iconCart} />
                                </>
                            )} */}
                        </AnimatedTouchable> 
                        <AnimatedTouchable 
                                style={diagram().neutralBtnLikedTwo} 
                                onPress={() => console.log("helloo") }
                                // onPress={ this.likeProduct }
                                // ref={ component => this.likeBtnRef = component }
                            >
                            {/* { !isLiked ? ( */}
                                <MaterialIcon name="heart-outline" style={stylesGuestSingle().iconHeartLike} />
                            {/* ): (
                                <>
                                    <Icon name="heart" style={stylesGuestSingle(null, null, null, null, this.state.checkLikeTransition).iconHeart} />
                                    <EvilIcon name="cart" style={stylesGuestSingle(null, null, null, this.state.listLikeScale).iconCart} />
                                </>
                            )} */}
                        </AnimatedTouchable> 
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
        <ProductModel
            subcategoryId={ currSubcategoryId }
            productId={ currProductId }
            name={ currName }
            image={ currImage }
            likeProduct={() => likeProduct() }
            selectProduct={() => selectProduct() }
            putToCart={() => putToCart() }
        />
        </>
    )
}

const mapStateToProps = state => ({
    result: state.selectedProducts.result,
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


export default withNavigation(connect(mapStateToProps, {clearResults})(ResultsOfBestWorst))
