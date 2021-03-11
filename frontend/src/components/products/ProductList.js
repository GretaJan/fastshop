import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { stylesGuest, stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
 
const { productAnimations } = require('../../components_additional/styles/Animations');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

class ProductList extends Component {
    state = {
        isSelected: false,
        spinSelectBtn: '0deg',
        spinLikeBtn: '0deg',
        rotateSelectBtn: new Animated.Value(0),
        rotateLikeBtn: new Animated.Value(0),
        listSelectScale: new Animated.Value(0),
        listCheckScale: new Animated.Value(0),
        listLikeScale: new Animated.Value(0),
        checkSelectTransition: new Animated.Value(-40),
        checkLikeTransition: new Animated.Value(-40),
    }

    componentDidMount() {
        const { selectedProducts } = this.props;
        if(selectedProducts.length > 0 && selectedProducts.find(item => item.id == this.props.item.id)){
            this.setState({ isSelected: true });
            this.setState({ spinSelectBtn: '180deg' })
            this.setState({ listSelectScale: new Animated.Value(1) })
            this.setState({ checkSelectTransition: new Animated.Value(0) }) 
        } else {
            this.setState({ listCheckScale: new Animated.Value(1) });
        }
    }

    // selectProduct = () => {
    //     this.props.selectProduct(this.props.item.id);
    // }

    goToProduct = () => {
        this.props.goToProduct();
    }

    selectProduct = () => {
        if(this.props.selectedProducts.length <= 30) {
            this.allowSelectProduct()
        } else {
            const msg = 'Please select no more than 30 items.';
            this.props.callModal(this.selectBtnRef, msg)
            // this.setState({overload: 'Please select no more than 30 items.'})
        }        
    }

    allowSelectProduct = () => {
        this.props.selectProduct(this.props.item.id);
        productAnimations.btnAnimationToActive(this.state.rotateSelectBtn, this.state.listSelectScale, this.state.checkSelectTransition)
        let spinTemp = this.state.rotateSelectBtn.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        })
        // let backgroundTemp = this.state.rotateSelectBtn.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['rgba(229, 233, 238, 0)', 'rgba(229, 233, 238, 0.5)']
        // })
        // let backgroundTemp = this.state.rotateSelectBtn.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [0, 1],
        //         extrapolate: 'clamp',
        //     })
        this.setState({ isSelected: true })
        this.setState({ spinSelectBtn: spinTemp })
        this.setState({ listCheckScale: new Animated.Value(0) });
        
    }

    removeSelectProduct = async () => {
 
        //
        // await productAnimations.btnAnimationToInactive(this.state.rotateSelectBtn, this.state.listSelectScale, this.state.checkSelectTransition, this.state.listCheckScale)
        await productAnimations.btnAnimationToInactive(this.state.rotateSelectBtn, this.state.listCheckScale, this.state.listSelectScale)
        this.props.removeProductFromSelected(this.props.item.id)
        this.setState({ isSelected: false })
        let spinTemp = this.state.rotateSelectBtn.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-180deg']
        })
        // let backgroundTemp = this.state.rotateSelectBtn.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['rgba(229, 233, 238, .5)', 'rgba(229, 233, 238, 0)']
        // })
        this.setState({ spinSelectBtn: spinTemp })
        // this.setState({ listSelectScale: new Animated.Value(0) })
        // this.setState({ checkSelectTransition: new Animated.Value(-35) })
    }

    render() {
        const { isSelected, spinSelectBtn, listSelectScale, checkSelectTransition, listCheckScale } = this.state;

        return (
            <View style={stylesGuest().itemWrap} >
                <TouchableOpacity style={stylesGuest().TextPicWrap } onPress={this.goToProduct}  >
                    {this.props.item.image ? (
                        <View style={stylesGuest().imageWrap}>
                            <Image style={stylesGuest().image} source={{ uri: this.props.item.image }} />
                        </View>
                        ) : (
                        <View style={stylesGuest().imageWrap}>
                            <IonIcon style={stylesGuest().imageIcon} name="md-images" />
                        </View> 
                    )}
                    <Text style={stylesGuest().itemText} >{this.props.item.name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={stylesGuest().iconWrap} onPress={this.selectProduct} >
                    <Icon style={stylesGuest().iconItem} name="check-circle-o" />
                </TouchableOpacity> */}
                <AnimatedTouchable 
                    style={stylesGuest(null, spinSelectBtn, isSelected).animatedWrap} 
                    onPress={ !isSelected ? this.selectProduct : this.removeSelectProduct }
                    ref={ component => this.selectBtnRef = component }
                >
                    { !isSelected ? (
                        <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, null, listCheckScale).calcCheck} />
                    ) : (
                        <>
                            <AnimatedMaterialIcon name="format-list-bulleted"  style={stylesGuestSingle(null, null, null, listSelectScale).calcUncheckList} />
                            <AnimatedIonIcon name="ios-checkmark" style={stylesGuestSingle(null, null, null, null, checkSelectTransition).calcUncheckMainPg} />
                        </>
                    )}
                </AnimatedTouchable>
            </View>
        )
    }
}

ProductList.propTypes = {
    selectProduct: PropTypes.func,
    goToProduct: PropTypes.func.isRequired,
    name: PropTypes.string,
    image: PropTypes.any
}

export default ProductList