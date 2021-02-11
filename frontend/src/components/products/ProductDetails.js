import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { productSelected, removeProductFromSelected } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import Loading from '../../components_additional/Loading';
import Modal from '../../components_additional/Modal';
import DetailRow from './DetailRow';

const { productAnimations } = require('../../components_additional/styles/Animations');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

class ProductDetails extends Component {
    state = {
        productDetails: [],
        productId: this.props.route.params.productId,
        isSelected: false,
        isLiked: false,
        spinSelectBtn: '0deg',
        spinLikeBtn: '0deg',
        rotateSelectBtn: new Animated.Value(0),
        rotateLikeBtn: new Animated.Value(0),
        listSelectScale: new Animated.Value(0),
        listLikeScale: new Animated.Value(0),
        checkSelectTransition: new Animated.Value(-30),
        checkLikeTransition: new Animated.Value(-30),
    }

    async componentDidMount() {
        await this.props.getProduct(this.state.productId);
        this.setState({productDetails: [
            { title: 'Energy', component: this.props.product.energy, measure: 'kcal'},
            { title: 'Fat', component: this.props.product.fat, measure: 'g' },
            { title: 'Saturated fat', component: this.props.product.saturated, measure: 'g' },
            { title: 'Carbohidrates', component: this.props.carbs, measure: 'g' },
            { title: 'Sugar', component: this.props.product.sugar, measure: 'g' },
            { title: 'Fiber', component: this.props.product.fiber, measure: 'g' },
            { title: 'Protein', component: this.props.product.protein, measure: 'g' },
            { title: 'Salt', component: this.props.product.salt, measure: 'g' },
        ]});
        if(productSelected.length > 0 && this.props.selectedProducts.find(item => item.id == this.state.productId))
            this.setState({ isSelected: true });
    }

    likeProduct = async () => {
        this.setState({ isSelected: true })
        await productAnimations.btnAnimation(this.state.rotateLikeBtn, this.state.listLikeScale, this.state.checkLikeTransition)
        let spinTemp = this.state.rotateBtn.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        })
        console.log("spinTemp", this.state.listScale)
        this.setState({ spinSelectBtn: spinTemp })
    }

    selectProduct = async () => {
        this.setState({ isSelected: true })
        await productAnimations.btnAnimation(this.state.rotateSelectBtn, this.state.listSelectScale, this.state.checkSelectTransition)
        let spinTemp = this.state.rotateSelectBtn.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        })
        this.setState({ spinSelectBtn: spinTemp })
    }

    removeSelectProduct = () => {
        this.props.removeProductFromSelected(this.state.productId)
        this.setState({ isSelected: false })
    }


    render() {
        const { image, background } = this.props.product;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                (this.props.error !== '') ? (
                    <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.navigate("Login")} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    </View>
                ) : (
                <View style={stylesGuestSingle(this.props.route.params.background).container} >
                    {image ? (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().imageStyle} source={{ uri: image }} />
                        </View>
                        ) : (
                        <View style={stylesGuestSingle().imageContainer} >
                            <Image style={stylesGuestSingle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View>  
                    )}
                        <View style={stylesGuestSingle().btnsWrap } >
                            <View style={stylesGuestSingle().likeBtns}>
                                <AnimatedTouchable style={stylesGuestSingle(null, this.state.isLiked, this.state.spinLikeBtn).neutralBtnLiked} onPress={() => this.likeProduct()}>
                                { !this.state.isLiked ? (
                                    <MaterialIcon name="heart-outline" style={stylesGuestSingle().iconHeartLike} />
                                ): (
                                    <>
                                        <Icon name="heart" style={stylesGuestSingle(null, null, null, null, this.state.checkLikeTransition).iconHeart} />
                                        <EvilIcon name="cart" style={stylesGuestSingle(null, null, null, this.state.listLikeScale).iconCart} />
                                    </>
                                )}
                                </AnimatedTouchable> 
                            </View>
                            <View style={stylesGuestSingle().calcBtns}>
                                <AnimatedTouchable style={stylesGuestSingle(null, this.state.isSelected, this.state.spinSelectBtn).neutralBtnSelected} onPress={() => this.selectProduct()} >
                                { !this.state.isSelected ? (
                                    <IonIcon name="ios-checkmark" style={stylesGuestSingle().calcCheck} />
                                ) : (
                                    <>
                                        <AnimatedMaterialIcon name="format-list-bulleted" style={stylesGuestSingle(null, null, null, this.state.listSelectScale).calcUncheckList} />
                                        <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, this.state.checkSelectTransition).calcUncheck} />
                                    </>
                                )}
                                </AnimatedTouchable>
                            </View>
                        </View>
                        <View style={stylesGuestSingle(background).triangle} ></View>
                        <View style={stylesGuestSingle(background).underTriangle} ></View>
                        <View style={stylesGuestSingle(background).listContainer} >
                            <FlatList data={ this.state.productDetails } contentContainerStyle={stylesGuestSingle(background).flatlistContainer} renderItem={({ item }) => (
                                <DetailRow props={ item } />
                            )} />
                        </View>
                    </View>
            )
        )
        )
    }
}

ProductDetails.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productSelected: PropTypes.func.isRequired,
    productDetails: PropTypes.arrayOf(PropTypes.shape({
        // title: PropTypes.string.isRequired,
        component: PropTypes.number,
        // measure: PropTypes.string.isRequired
    })),
    image: PropTypes.any,
    background: PropTypes.string
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    selectedProducts: state.selectedProducts.comparisonArray,
    error: state.products.error,
    loading: state.products.loading,
})

export default withNavigation(connect(mapStateToProps, {getProduct, productSelected, removeProductFromSelected})(ProductDetails))