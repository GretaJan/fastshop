import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { selectProductToCalc, removeProductFromSelected } from '../../redux/actions/comparisonActions';
import { likeProduct } from '../../redux/actions/userProductActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import Loading from '../../components_additional/models/Loading';
import Modal from '../../components_additional/models/Modal';
import DetailRow from './DetailRow';
import RegisterModal from '../../components_additional/models/Register';
import ActionIcon from '../../components_additional/models/ActionIcon';

// const { productAnimations } = require('../../components_additional/styles/Animations');
// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
// const AnimatedIcon = Animated.createAnimatedComponent(Icon);
// const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
// const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

class ProductDetails extends Component {
    state = {
        productDetails: [],
        productId: this.props.route.params.productId,
        isSelected: false,
        isLiked: false,
        // spinSelectBtn: '0deg',
        // spinLikeBtn: '0deg',
        // rotateSelectBtn: new Animated.Value(0),
        // rotateLikeBtn: new Animated.Value(0),
        // listSelectScale: new Animated.Value(0),
        // listCheckScale: new Animated.Value(0),
        // listLikeScale: new Animated.Value(0),
        // checkSelectTransition: new Animated.Value(-30),
        // checkLikeTransition: new Animated.Value(-30),
        modelMsg: '',
        callRegisterModel: false,
        locationX: 0,
        locationY: 0
    }

    async componentDidMount() {
        const { selectedProducts } = this.props;
        await this.props.getProduct(this.state.productId);
        console.log("this.props.toekn: ", this.props.token)
        this.setState({ isLiked: this.props.product.isLiked })
        this.setState({productDetails: [
            { title: 'Energy', component: this.props.product.energy, measure: 'kcal'},
            { title: 'Fat', component: this.props.product.fat, measure: 'g' },
            { title: 'Saturated fat', component: this.props.product.saturated, measure: 'g' },
            { title: 'Carbohidrates', component: this.props.product.carbs, measure: 'g' },
            { title: 'Sugar', component:this.props.product.sugar, measure: 'g' },
            { title: 'Fiber', component: this.props.product.fiber, measure: 'g' },
            { title: 'Protein', component: this.props.product.protein, measure: 'g' },
            { title: 'Salt', component: this.props.product.salt, measure: 'g' },
        ]});
        
        if(selectedProducts.length > 0 && selectedProducts.find(item => item.id == this.state.productId)){
            this.setState({ isSelected: true });
        }
        //     this.setState({ spinSelectBtn: '180deg' })
        //     this.setState({ listSelectScale: new Animated.Value(1) })
        //     this.setState({ checkSelectTransition: new Animated.Value(0) }) 
        // } else {
        //     this.setState({ listCheckScale: new Animated.Value(1) });
        // }
    }

    likeProduct = async (ref) => {
        console.log('actii')
        await this.props.likeProduct(this.props.route.params.subcategoryId, this.state.productId, this.props.token, this.props.account, true);
        if(this.props.likeError == ''){
            this.setState({ isLiked: true })
        } else {
            this.setState({ errorObj: likeActionResp });
            this.callModal(ref, likeActionResp)
        }
    } 
    unlikeProduct = () => {
        this.setState({ isLiked: false })
        this.props.unlikeProduct(this.props.route.params.subcategoryId, this.state.productId, this.props.token, true)
    }


    callModal = (activeBtn, msg) => {
        activeBtn.measure( (fx, fy, width, height, px, py) => {
            this.setState({ locationX: Math.round(px - width - 5) })
            this.setState({ locationY: Math.round(py - (height - 30)) })
        })        
        this.setState({ modelMsg: msg }) 
        
    }

    // selectProduct = () => {
    //     if(this.props.selectedProducts.length <= 30) {
    //         this.allowSelectProduct()
    //     } else {
    //         const msg = 'Please select no more than 30 items.';
    //         this.callModal(this.selectBtnRef, msg)
    //     }        
    // }

    allowSelectProduct = () => {
        this.props.selectProductToCalc(this.props.selectedProducts, this.state.productId);
        this.setState({ isSelected: true })
        // productAnimations.btnAnimationToActive(this.state.rotateSelectBtn, this.state.listSelectScale, this.state.checkSelectTransition)
        // let spinTemp = this.state.rotateSelectBtn.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['0deg', '180deg']
        // })
        // this.setState({ isSelected: true })
        // this.setState({ spinSelectBtn: spinTemp })
        // this.setState({ listCheckScale: new Animated.Value(0) });
    }

    removeSelectProduct = () => {
        this.props.removeProductFromSelected(this.state.productId)
        this.setState({ isSelected: false })
        // //
        // await productAnimations.btnAnimationToInactive(this.state.rotateSelectBtn, this.state.listCheckScale, this.state.listSelectScale)
        // let spinTemp = this.state.rotateSelectBtn.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['0', '-180deg']
        // })
        // this.setState({ spinSelectBtn: spinTemp })
    }


    render() {
        const { image, background } = this.props.product;
        const { token } = this.props;
        const { callRegisterModel, modelMsg, isSelected, isLiked, listCheckScale, checkSelectTransition, listSelectScale } = this.state;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
               <>
                <View style={containerStyles(this.props.route.params.background).screenHeightContainer} >
                    { (modelMsg !== '') && (
                        <Modal title="Error" 
                            message={ modelMsg } 
                            close={() => this.setState({ modelMsg: '' })} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            locationX={ this.state.locationX }
                            locationY={ this.state.locationY }
                        /> )}
                    <View style={stylesGuestSingle().topContainer}>
                        {image ? (
                            <Image style={stylesGuestSingle().imageStyle} source={{ uri: image }} />
                        ) : (
                            <Image style={stylesGuestSingle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')}  />
                        )}
                        <View style={stylesGuestSingle().btnsWrap } >
                            <View style={stylesGuestSingle().likeBtns}>
                                {/* <AnimatedTouchable 
                                    style={stylesGuestSingle(null, this.state.isLiked, this.state.spinLikeBtn).neutralBtnLiked} 
                                    onPress={ this.likeProduct }
                                    ref={ component => this.likeBtnRef = component }
                                >
                                { !isLiked ? (
                                    <MaterialIcon name="heart-outline" style={stylesGuestSingle().iconHeartLike} />
                                ): (
                                    <>
                                        <Icon name="heart" style={stylesGuestSingle(null, null, null, null, this.state.checkLikeTransition).iconHeart} />
                                        <EvilIcon name="cart" style={stylesGuestSingle(null, null, null, this.state.listLikeScale).iconCart} />
                                    </>
                                )}
                                </AnimatedTouchable>  */}
                                <ActionIcon
                                    deactivateFunc={ this.unlikeProduct }
                                    activateFunc={ (ref) => this.likeProduct(ref) }
                                    errorCondition={ !this.props.token }
                                    errorFunc={ (ref) => this.callModal(ref, 'Please register in order to complete this action.') }
                                    mainIcon='ios-heart'
                                    activeIcon='cart-outline'                         
                                    activeColor={ colors.mainBtnOrange }
                                    activeColorSec={ colors.mainBtnGreen }
                                    isActive={ this.state.isLiked }
                                />
                            </View>
                            <View style={stylesGuestSingle().calcBtns}>
                                <ActionIcon
                                    deactivateFunc={ this.removeSelectProduct }
                                    activateFunc={ this.allowSelectProduct }
                                    errorCondition={  this.props.selectedProducts.length > 30  }
                                    // errorFunc={ (ref) => console.log(ref) }
                                    errorFunc={ (ref) => this.callModal(ref, 'Please select no more than 30 items.') }
                                    mainIcon='md-checkmark'
                                    activeIcon='format-list-bulleted'
                                    activeColor={ colors.mainBtnGreen }
                                    activeColorSec={ colors.mainBtnOrange }
                                    isActive={ this.state.isSelected }
                                />
                                {/* <AnimatedTouchable 
                                        style={stylesGuestSingle(null, isSelected, this.state.spinSelectBtn).neutralBtnSelected} 
                                        onPress={ !isSelected ? this.selectProduct : this.removeSelectProduct }
                                        ref={ component => this.selectBtnRef = component }
                                    >
                                    { !isSelected ? (
                                        <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, null, listCheckScale).calcCheck} />
                                    ) : (
                                        <>
                                            <AnimatedMaterialIcon name="format-list-bulleted" style={stylesGuestSingle(null, null, null, listSelectScale).calcUncheckList} />
                                            <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, checkSelectTransition).calcUncheck} />
                                        </>
                                    )}
                                </AnimatedTouchable> */}
                            </View>
                        </View>
                    </View>
                    {/* <View style={stylesGuestSingle(background).triangle} ></View>
                    <View style={stylesGuestSingle(background).underTriangle} ></View>*/}
                    <View style={stylesGuestSingle(background).listContainer} > 
                        <FlatList data={ this.state.productDetails } contentContainerStyle={stylesGuestSingle(background).flatlistContainer} renderItem={({ item }) => (
                            <DetailRow props={ item } />
                        )} />
                    </View>
                    </View>
                    { callRegisterModel && (
                        <Register 
                            refreshPage={() => this.forceUpdate()} 
                            close={() => this.setState({ callRegisterModel: false })}
                        />
                    ) }
                </>
            )
        )
    }
}

ProductDetails.propTypes = {
    getProduct: PropTypes.func.isRequired,
    selectProductToCalc: PropTypes.func.isRequired,
    productDetails: PropTypes.arrayOf(PropTypes.shape({
        // title: PropTypes.string.isRequired,
        component: PropTypes.number,
        // measure: PropTypes.string.isRequired
    })),
    image: PropTypes.any,
    background: PropTypes.string
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    account: state.auth.user.current_account,
    product: state.products.product,
    selectedProducts: state.selectedProducts.comparisonArray,
    error: state.products.error,
    likeError: state.products.likeError,
    loading: state.products.loading,
})

export default withNavigation(connect(mapStateToProps, {getProduct, selectProductToCalc, removeProductFromSelected, likeProduct})(ProductDetails))