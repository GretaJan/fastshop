import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { diagram } from '../../components_additional/styles/CompareStyles';
import ButtonStyled from '../../components_additional/Button';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';


const ResultsOfBestWorst = ({ result, navigation: { navigate } }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [scroll, setScroll] = useState(false);


    const { healthy, unhealthy } = result;
    const oneSaturated = result.healthy.saturated == null ? parseInt(0) : parseFloat(result.healthy.saturated);
    const twoSaturated = result.unhealthy.saturated == null ? parseInt(0) : parseFloat(result.unhealthy.saturated);
    const oneFiber = result.healthy.fiber == null ? parseInt(0) : parseFloat(result.healthy.fiber);
    const twoFiber = result.unhealthy.fiber == null ? parseInt(0) : parseFloat(result.unhealthy.fiber);
    const oneProtein = result.healthy.protein == null ? parseInt(0) : parseFloat(result.healthy.protein);
    const twoProtein = result.unhealthy.protein == null ? parseInt(0) : parseFloat(result.unhealthy.protein);
    const oneVitamins = result.healthy.vitamins == null ? parseInt(0) : parseFloat(result.healthy.vitamins);
    const twoVitamins = result.unhealthy.vitamins == null ? parseInt(0) : parseFloat(result.unhealthy.vitamins);

    const oneSugar = result.healthy.sugar == null ? parseInt(0) : parseFloat(result.healthy.sugar);
    const twoSugar = result.unhealthy.sugar == null ? parseInt(0) : parseFloat(result.unhealthy.sugar);
    const oneCarbs = result.healthy.carbs == null ? parseInt(0) : (parseFloat(result.healthy.carbs) - oneSugar);
    const twoCarbs = result.unhealthy.carbs == null ? parseInt(0) : (parseFloat(result.unhealthy.carbs) - twoSugar);
    const oneSalt = result.healthy.salt == null ? parseInt(0) : parseFloat(result.healthy.salt);
    const twoSalt = result.unhealthy.salt == null ? parseInt(0) : parseFloat(result.unhealthy.salt);

    const goodQualitiesHealthy = oneSaturated + oneFiber + oneProtein + oneVitamins;
    const goodQualitiesUnhealthy = twoSaturated + twoFiber + twoProtein + twoVitamins;
    const badQualitiesHealthy = oneCarbs + oneSugar + oneSalt;
    const badQualitiesUnhealthy = twoCarbs + twoSugar + twoSalt;

    // const handleOnScroll = event => {
    //     const offset = event.nativeEvent.contentOffset.y;
    //     if(offset >= 95) {
    //         setScroll(true);
    //     } else if (offset < 95) {
    //         setScroll(false);
    //     }
    // }

    const scrollUp = () => {
        // React.useEffect(() => { window.scrollTo(0, 0); }, []);
        console.log("result", result)
        
        // InteractionManager.runAfterInteractions(() => this.scroll.current.scrollTo({ x }));
        // console.log("event", event.nativeEvent.contentOffset.y)
        // let offset = event.nativeEvent.contentOffset.y;
        // offset = 0;

    }

        return (
                <ScrollView style={diagram().container} >
                    <View style={diagram().mainContentContainer}>
                        <View style={diagram().productsContainer} >
                            <TouchableOpacity style={diagram().itemGoodWrap} onPress={() => navigate("Product", {subcategoryId: healthy.subcategory_id, productId: healthy.id})} >
                                { healthy.image ? (
                                    <View style={diagram().imageContainerGood} >
                                        <Image style={diagram().image} source={{ uri: healthy.image }} />
                                    </View>
                                    ) : (
                                    <View style={diagram().imageContainerGood} >
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                    </View> 
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{healthy.name}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={diagram().itemBadWrap} onPress={() => navigate("Product", {subcategoryId: unhealthy.subcategory_id, productId: unhealthy.id})}>
                                {unhealthy.image ? (
                                    <View style={diagram().imageContainerBad} >
                                        <Image style={diagram().image} source={{ uri: unhealthy.image }} />
                                    </View>
                                    ) : (
                                    <View style={diagram().imageContainerBad} >
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                    </View> 
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{unhealthy.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                        {/* Diagram */}
                        <View style={diagram().mainDiagramWrap}>
                            <View style={diagram().mainLinesWrap} >
                                <Text style={diagram().mainComponentTitle}>Healthy Feed</Text>
                            </View>
                            <View style={diagram().mainDiagramLineWrap}>
                                <View style={diagram().mainNumberDiagramWrap}>
                                    <View style={diagram().mainSingleLineWrap}>
                                        <Text style={diagram(goodQualitiesHealthy ).mainLineOne}></Text>
                                    </View>
                                    <View style={diagram().mainItemNumberWrap} >
                                        <Text style={diagram().mainNumber} >{goodQualitiesHealthy}</Text>
                                        <Text style={diagram().mainMeasure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().mainNumberDiagramWrap}>
                                    <View style={diagram().mainSingleLineWrap}>
                                        <Text style={diagram(goodQualitiesUnhealthy).mainLineTwo}></Text>
                                    </View>
                                    <View style={diagram().mainItemNumberWrap} >
                                        <Text style={diagram().mainNumber} >{goodQualitiesUnhealthy}</Text>
                                        <Text style={diagram().mainMeasure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().mainDiagramWrap}>
                            <View style={diagram().mainLinesWrap} >
                                <Text style={diagram().mainComponentTitle}>Less Healthy Feed</Text>
                            </View>
                            <View style={diagram().mainDiagramLineWrap}>
                                <View style={diagram().mainNumberDiagramWrap}>
                                    <View style={diagram().mainSingleLineWrap}>
                                        <Text style={diagram(badQualitiesHealthy).mainLineOne}></Text>
                                    </View>
                                    <View style={diagram().mainItemNumberWrap} >
                                        <Text style={diagram().mainNumber} >{badQualitiesHealthy}</Text>
                                        <Text style={diagram().mainMeasure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().mainNumberDiagramWrap}>
                                    <View style={diagram().mainSingleLineWrap}>
                                        <Text style={diagram(badQualitiesUnhealthy).mainLineTwo}></Text>
                                    </View>
                                    <View style={diagram().mainItemNumberWrap} >
                                        <Text style={diagram().mainNumber} >{badQualitiesUnhealthy}</Text>
                                        <Text style={diagram().mainMeasure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={(diagram().dropDownIconWrapNoScroll)} onPress={() => setShowDropDown(!showDropDown)}>
                            <IonIcon style={diagram().ViewMoreIcon} name={showDropDown ? ("ios-arrow-up") : ("ios-arrow-down")} />
                        </TouchableOpacity>
                    </View>
                    {showDropDown && (
                    <View style={diagram().diagramContainer}>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Energy</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.energy == null ? '0' : healthy.energy).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.energy  == null ? '0' : healthy.energy}</Text>
                                        <Text style={diagram().measure} >kcal</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.energy == null ? '0' : unhealthy.energy).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.energy  == null ? '0' : unhealthy.energy}</Text>
                                        <Text style={diagram().measure} >kcal</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Fat</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.fat == null ? '0' : healthy.fat).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.fat  == null ? '0' : healthy.fat}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.fat == null ? '0' : unhealthy.fat).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.fat  == null ? '0' : unhealthy.fat}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Saturated fat</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.saturated == null ? '0' : healthy.saturated).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.saturated  == null ? '0' : healthy.saturated}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.saturated == null ? '0' : unhealthy.saturated).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.saturated  == null ? '0' : unhealthy.saturated}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Carbohidrates</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.carbs == null ? '0' : healthy.carbs).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.carbs  == null ? '0' : healthy.carbs}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.carbs == null ? '0' : unhealthy.carbs).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.carbs  == null ? '0' : unhealthy.carbs}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Sugar</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.sugar == null ? '0' : healthy.sugar).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.sugar  == null ? '0' : healthy.sugar}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.sugar == null ? '0' : unhealthy.sugar).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.sugar  == null ? '0' : unhealthy.sugar}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Fiber</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.fiber == null ? '0' : healthy.fiber).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.fiber  == null ? '0' : healthy.fiber}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.fiber == null ? '0' : unhealthy.fiber).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.fiber  == null ? '0' : unhealthy.fiber}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Protein</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.protein == null ? '0' : healthy.protein).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.protein  == null ? '0' : healthy.protein}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.protein == null ? '0' : unhealthy.protein).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.protein  == null ? '0' : unhealthy.protein}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Salt</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.salt == null ? '0' : healthy.salt).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.salt  == null ? '0' : healthy.salt}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.salt == null ? '0' : unhealthy.salt).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.salt  == null ? '0' : unhealthy.salt}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={diagram().diagramWrap}>
                            <View style={diagram().linesWrap} >
                                <Text style={diagram().componentTitle} >Vitamins</Text>
                            </View>
                            <View style={diagram().diagramLineWrap}>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(healthy.vitamins == null ? '0' : healthy.vitamins).lineOne}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{healthy.vitamins  == null ? '0' : healthy.vitamins}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                                <View style={diagram().numberDiagramWrap}>
                                    <View style={diagram().singleLineWrap}>
                                        <Text style={diagram(unhealthy.vitamins == null ? '0' : unhealthy.vitamins).lineTwo}></Text>
                                    </View>
                                    <View style={diagram().itemNumberWrap} >
                                        <Text style={diagram().number} >{unhealthy.vitamins == null ? '0' : unhealthy.vitamins}</Text>
                                        <Text style={diagram().measure} >g</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={(diagram().scrollUp)} onPress={() => scrollUp()}>
                            <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
                        </TouchableOpacity>
                    </View>
                    )}  
            </ScrollView>
    )
}

const mapStateToProps = state => (console.log("rsultssss", state.selectedProducts.result),{
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps)(ResultsOfBestWorst))