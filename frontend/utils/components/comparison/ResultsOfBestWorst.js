import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { likeProduct, unlikeProduct, saveResults } from '../../redux/actions/userProductActions';
import { diagram, productWrap} from '../../src/styles/CompareStyles';
import { containerStyles, textStyle } from '../../src/styles/GeneralStyles';
import { clearResults, saveCombination } from '../../redux/actions/comparisonActions';

//Components
Header
import Header from '../../utils/models/Header';
import ResultsBestWorstChild from './ResultsBestWorstChild';
import ProductModel from '../../utils/models/ProductModel';
import ConfirmModal from '../../utils/models/ModalCrud';

const { comparisonAnimations } = require('../../src/styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

const ResultsOfBestWorst = ({ result, clearResults, likeProduct, unlikeProduct, saveResults, token, navigation: { navigate } }) => {
    let scrollTopRef = useRef(null);
    const { match, mismatch } = result;
    const translateMatch = useState(new Animated.Value(-100))[0];
    const translateMismatch = useState(new Animated.Value(-100))[0];
    const [productModel, setProductModel] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [clearConfirm, setClearConfirm] = useState(false);
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);

    useEffect(() => {
        comparisonAnimations.imageIconTranslation(translateMatch, translateMismatch);
        return setProductModel(null)
    }, [])

    async function likeProductLocal(){
        const errorMsg = await likeProduct(productModel.categoryId, productModel.id, token, true)
        if(!errorMsg){
            setIsLiked(true);
            return true;
        }
        return errorMsg;
    }

    const buttonPosition = useCallback(event => {
        const { width, height, x, y } = event.nativeEvent.layout;
            setLocationX(Math.round(x - (width / 2)))
            setLocationY(Math.round(y + height - 65))
    }, [])

    function goToProductPage(){
        navigate("Product", 
        { 
            subcategoryId: productModel.subcategoryId, 
            productId: productModel.id, 
            resultPage: true 
        })
    }

    return (
        <>
            <Header 
                title="Result"
                navigate={ () => navigate("Criteria") }
            />
            { (match && mismatch) && (
            <View style={ containerStyles().simpleContainer }>
                <View style={ containerStyles().rowContainerTopSmaller }>
                    <View style={diagram().productsInnerContainer}>
                        <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModelFunc(match)} >
                            { match.image ? (
                                <Image style={diagram().image} source={{ uri: match.image }} />
                                ) : (
                                <Image style={diagram().image} source={require('../../src/images/noimage.jpeg')}  />
                            )}
                        </TouchableOpacity>
                        <AnimatedIonIcon name="md-checkmark" color='#32bd81' style={diagram(null, translateMatch).iconTranslation} />
                    </View>
                    <View style={diagram().productsInnerContainer}>
                        <TouchableOpacity style={diagram().activeItemWrap} onPress={() => openProductModelFunc(mismatch)}>
                            {mismatch.image ? (
                                <Image style={diagram().image} source={{ uri: mismatch.image }} />
                                ) : (
                                    <Image style={diagram().image} source={require('../../src/images/noimage.jpeg')}  />
                            )}
                        </TouchableOpacity>
                        <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } />
                    </View>
                </View>
                <ScrollView ref={scrollView => scrollTopRef = scrollView}>
                    { Object.keys(result).length === 0 ? (
                        <View style={diagram().container}>
                        </View>
                        ) : (
                        <>
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
                            </View>
                            <View style={ productWrap(1, 0, true).btnsContainer } >
                                <Text style={ productWrap().transparentStripe } ></Text>
                                {(!result.created_at) ? (
                                    <View style={ productWrap().btnOne }>
                                        <TouchableOpacity  
                                            style={productWrap().iconWrapOne} 
                                            onLayout={ buttonPosition }
                                            onPress={ saveResultsLocal } 
                                        >
                                            <IonIcon name="md-list" style={productWrap().iconItem}  />
                                        </TouchableOpacity>
                                        <View style={productWrap().textWrap} >
                                            <Text style={textStyle().h2} >Save results</Text>
                                            <Text>Click Me!</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={productWrap().btnOne}>                            
                                        <TouchableOpacity style={productWrap().iconWrapOne} onPress={ removeResultsLocal } >
                                            <IonIcon name="ios-stats" style={productWrap().iconItem} />
                                        </TouchableOpacity>
                                        <View style={productWrap().textWrap} >
                                            <Text style={textStyle().h2}>Remove results</Text>
                                            <Text>Click Me!</Text>
                                        </View>
                                    </View> 
                                )}
                                <View style={productWrap().btnTwo}>
                                    <TouchableOpacity 
                                        testID="test-btn" 
                                        onLayout={ buttonPosition }
                                        style={productWrap().iconWrapTwo} 
                                        onPress={ () => setClearConfirm(true) } 
                                    >
                                        <IonIcon name="ios-calculator" style={productWrap().iconItem} />
                                    </TouchableOpacity>
                                    <View style={productWrap().textWrap} >
                                        <Text style={textStyle().h2}>Clear results</Text>
                                        <Text>Do Not Click Me!</Text>
                                    </View>
                                </View> 
                                <TouchableOpacity style={(diagram().scrollUp)} onPress={ scrollUp }>
                                    <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
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
                        navigateFunc={ goToProductPage }
                    />
                )}
                { clearConfirm && (
                    <ConfirmModal 
                        message="Are you sure you want to clear results? " 
                        confirm={ invokeClearResults }
                        title="CLEAR RESULTS"
                        close={() => setClearConfirm(false)}
                        iconName="md-close"
                    /> 
                )}
            </View>
            )}
        </>
    )

    function scrollUp() {
        scrollTopRef.scrollTo({ y: 0, animated: true });
    }
    
    function invokeClearResults() {
        clearResults();
        navigate("SelectedProducts");
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

    function unlikeProductLocal(){
        unlikeProduct(productModel.id, true)
    }

    function sliceFunc(digit){
        return (`0${digit}`).slice(-2);
    }

    function saveResultsLocal(){
        const currentDateInit = new Date();
        const dateYears = `${currentDateInit.getFullYear()}-${sliceFunc(currentDateInit.getMonth() + 1)}-${sliceFunc(currentDateInit.getDate())}`;
        const dateHours = `${sliceFunc(currentDateInit.getHours())}:${sliceFunc(currentDateInit.getMinutes())}:${sliceFunc(currentDateInit.getSeconds())}`
        const createdAt = `${ dateYears } ${ dateHours }`;
        const resultIds = {
            matchId: match.id,
            mismatchId: mismatch.id,
            created_at: createdAt
        }
        saveResults(resultIds, token)
    }

    function removeResultsLocal(){
        console.log("result", result)
        const data = result.created_at;
        console.log("daaa", data)
        saveResults(data, token)
    }

}

const mapStateToProps = state => ({
    result: state.selectedProducts.result,
    token: state.auth.token
})


export default withNavigation(connect(mapStateToProps, { clearResults, likeProduct, unlikeProduct, saveResults })(ResultsOfBestWorst))
