import React, {useState, Component} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { diagram } from '../../components_additional/styles/CompareStyles';
import ButtonStyled from '../../components_additional/Button';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';


class ResultsOfBestWorst extends Component{
    state = {
        showDropDown: false,
        scroll: false
    }
    // const [showDropDown, setShowDropDown] = useState(false);
    // const [scroll, setScroll] = useState(false);



    // const handleOnScroll = event => {
    //     const offset = event.nativeEvent.contentOffset.y;
    //     if(offset >= 95) {
    //         setScroll(true);
    //     } else if (offset < 95) {
    //         setScroll(false);
    //     }
    // }

    scrollUp = () => {
        // React.useEffect(() => { window.scrollTo(0, 0); }, []);
        
        // InteractionManager.runAfterInteractions(() => this.scroll.current.scrollTo({ x }));
        // console.log("event", event.nativeEvent.contentOffset.y)
        // let offset = event.nativeEvent.contentOffset.y;
        // offset = 0;

    }
        render() {     
        const { healthy, unhealthy } = this.props.result;
            const oneSaturated = this.props.result.healthy.saturated == null ? parseInt(0) : parseFloat(this.props.result.healthy.saturated);
    const twoSaturated = this.props.result.unhealthy.saturated == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.saturated);
    const oneFiber = this.props.result.healthy.fiber == null ? parseInt(0) : parseFloat(this.props.result.healthy.fiber);
    const twoFiber = this.props.result.unhealthy.fiber == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.fiber);
    const oneProtein = this.props.result.healthy.protein == null ? parseInt(0) : parseFloat(this.props.result.healthy.protein);
    const twoProtein = this.props.result.unhealthy.protein == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.protein);
    const oneVitamins = this.props.result.healthy.vitamins == null ? parseInt(0) : parseFloat(this.props.result.healthy.vitamins);
    const twoVitamins = this.props.result.unhealthy.vitamins == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.vitamins);

    const oneSugar = this.props.result.healthy.sugar == null ? parseInt(0) : parseFloat(this.props.result.healthy.sugar);
    const twoSugar = this.props.result.unhealthy.sugar == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.sugar);
    const oneCarbs = this.props.result.healthy.carbs == null ? parseInt(0) : (parseFloat(this.props.result.healthy.carbs) - oneSugar);
    const twoCarbs = this.props.result.unhealthy.carbs == null ? parseInt(0) : (parseFloat(this.props.result.unhealthy.carbs) - twoSugar);
    const oneSalt = this.props.result.healthy.salt == null ? parseInt(0) : parseFloat(this.props.result.healthy.salt);
    const twoSalt = this.props.result.unhealthy.salt == null ? parseInt(0) : parseFloat(this.props.result.unhealthy.salt);

    const goodQualitiesHealthy = oneSaturated + oneFiber + oneProtein + oneVitamins;
    const goodQualitiesUnhealthy = twoSaturated + twoFiber + twoProtein + twoVitamins;
    const badQualitiesHealthy = oneCarbs + oneSugar + oneSalt;
    const badQualitiesUnhealthy = twoCarbs + twoSugar + twoSalt;

        
            return (
                    <ScrollView style={diagram().container} >
                        <View style={diagram().mainContentContainer}>
                            <View style={diagram().productsContainer} >
                                <TouchableOpacity style={diagram().itemGoodWrap} onPress={() => this.props.navigation.navigate("Product", {subcategoryId: healthy.data.subcategory_id, productId: healthy.data.id})} >
                                    { healthy.data.image ? (
                                        <View style={diagram().imageContainerGood} >
                                            <Image style={diagram().image} source={{ uri: healthy.data.image }} />
                                        </View>
                                        ) : (
                                        <View style={diagram().imageContainerGood} >
                                            <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        </View> 
                                    )}
                                    <View style={diagram().title} >
                                        <Text style={diagram().text}>{healthy.data.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={diagram().itemBadWrap} onPress={() => this.props.navigation.navigate("Product", {subcategoryId: unhealthy.data.subcategory_id, productId: unhealthy.data.id})}>
                                    {unhealthy.image ? (
                                        <View style={diagram().imageContainerBad} >
                                            <Image style={diagram().image} source={{ uri: unhealthy.data.image }} />
                                        </View>
                                        ) : (
                                        <View style={diagram().imageContainerBad} >
                                            <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        </View> 
                                    )}
                                    <View style={diagram().title} >
                                        <Text style={diagram().text}>{unhealthy.data.name}</Text>
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
                            <TouchableOpacity style={(diagram().dropDownIconWrapNoScroll)} onPress={() => useState({showDropDown: !this.state.showDropDown})}>
                                <IonIcon style={diagram().ViewMoreIcon} name={this.state.showDropDown ? ("ios-arrow-up") : ("ios-arrow-down")} />
                            </TouchableOpacity>
                        </View>
                        {this.state.showDropDown && (
                        <View style={diagram().diagramContainer}>
                            <View style={diagram().diagramWrap}>
                                <View style={diagram().linesWrap} >
                                    <Text style={diagram().componentTitle} >Energy</Text>
                                </View>
                                <View style={diagram().diagramLineWrap}>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(healthy.data.energy == null ? '0' : healthy.data.energy).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.energy  == null ? '0' : healthy.data.energy}</Text>
                                            <Text style={diagram().measure} >kcal</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.energy == null ? '0' : unhealthy.data.energy).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.energy  == null ? '0' : unhealthy.data.energy}</Text>
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
                                            <Text style={diagram(healthy.data.fat == null ? '0' : healthy.data.fat).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.fat  == null ? '0' : healthy.data.fat}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.fat == null ? '0' : unhealthy.data.fat).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.fat  == null ? '0' : unhealthy.data.fat}</Text>
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
                                            <Text style={diagram(healthy.data.saturated == null ? '0' : healthy.data.saturated).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.saturated  == null ? '0' : healthy.data.saturated}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.saturated == null ? '0' : unhealthy.data.saturated).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.saturated  == null ? '0' : unhealthy.data.saturated}</Text>
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
                                            <Text style={diagram(healthy.data.carbs == null ? '0' : healthy.data.carbs).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.carbs  == null ? '0' : healthy.data.carbs}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.carbs == null ? '0' : unhealthy.carbs).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.carbs  == null ? '0' : unhealthy.data.carbs}</Text>
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
                                            <Text style={diagram(healthy.data.sugar == null ? '0' : healthy.data.sugar).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.sugar  == null ? '0' : healthy.data.sugar}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.sugar == null ? '0' : unhealthy.data.sugar).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.sugar  == null ? '0' : unhealthy.data.sugar}</Text>
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
                                            <Text style={diagram(healthy.data.fiber == null ? '0' : healthy.fiber).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.fiber  == null ? '0' : healthy.data.fiber}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.fiber == null ? '0' : unhealthy.data.fiber).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.fiber  == null ? '0' : unhealthy.data.fiber}</Text>
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
                                            <Text style={diagram().number} >{healthy.data.protein  == null ? '0' : healthy.data.protein}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.protein == null ? '0' : unhealthy.data.protein).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.protein  == null ? '0' : unhealthy.data.protein}</Text>
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
                                            <Text style={diagram(healthy.data.salt == null ? '0' : healthy.data.salt).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.salt  == null ? '0' : healthy.data.salt}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.salt == null ? '0' : unhealthy.data.salt).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.data.salt  == null ? '0' : unhealthy.data.salt}</Text>
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
                                            <Text style={diagram(healthy.data.vitamins == null ? '0' : healthy.data.vitamins).lineOne}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{healthy.data.vitamins  == null ? '0' : healthy.data.vitamins}</Text>
                                            <Text style={diagram().measure} >g</Text>
                                        </View>
                                    </View>
                                    <View style={diagram().numberDiagramWrap}>
                                        <View style={diagram().singleLineWrap}>
                                            <Text style={diagram(unhealthy.data.vitamins == null ? '0' : unhealthy.data.vitamins).lineTwo}></Text>
                                        </View>
                                        <View style={diagram().itemNumberWrap} >
                                            <Text style={diagram().number} >{unhealthy.vitamins == null ? '0' : unhealthy.data.vitamins}</Text>
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
}

const mapStateToProps = state => (console.log("rsultssss", state.selectedProducts.result),{
    result: state.selectedProducts.result,
})

export default withNavigation(connect(mapStateToProps)(ResultsOfBestWorst))