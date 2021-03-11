import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { selectProductToCalc, removeProductFromSelected } from '../../redux/actions/comparisonActions';
import { getLikedProducts, likeProduct, unlikeProduct } from '../../redux/actions/userProductActions';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';

//Components
import Header from '../../components_additional/models/Header';
import Loading from '../../components_additional/models/Loading';
import Modal from '../../components_additional/models/Modal';
import DetailRow from './DetailRow';
import ActionIcon from '../../components_additional/models/ActionIcon';
import { Dimensions } from 'react-native';


class ProductDetails extends Component {
    state = {
        loading: true,
        error: '',
        name: '',
        image: '',
        background: '',
        productDetails: [],
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
        isSelected: false,
        isLiked: false,
        modelMsg: '',
        callRegisterModel: false,
        locationX: 0,
        locationY: 0
    }

    callModal = (activeBtn, msg) => {
        activeBtn.measure( (fx, fy, width, height, px, py) => {
            const screenWidth = Dimensions.get('window').width;
            this.setState({ locationX: screenWidth - (Math.round(px - width - (width / 2.2) )) })
            this.setState({ locationY: Math.round(py - (height + 10)) })
        })        
        this.setState({ modelMsg: msg }) 
        
    }

    async componentDidMount() {
        const { selectedProducts } = this.props;
        const { productId, subcategoryId } = this.state;
        getProduct(productId, subcategoryId).then(response => {
            if(response){
                this.setState({ productDetails: [
                        { title: 'Energy', component: response.energy, measure: 'kcal'},
                        { title: 'Fat', component: response.fat, measure: 'g' },
                        { title: 'Saturated fat', component: response.saturated, measure: 'g' },
                        { title: 'Carbohidrates', component: response.carbs, measure: 'g' },
                        { title: 'Sugar', component: response.sugar, measure: 'g' },
                        { title: 'Fiber', component: response.fiber, measure: 'g' },
                        { title: 'Protein', component: response.protein, measure: 'g' },
                        { title: 'Salt', component: response.salt, measure: 'g' },
                    ]});
                this.setState({ name: response.name })
                this.setState({ background: response.background })
                if(selectedProducts.length > 0 && selectedProducts.find(item => item.id == productId))
                    this.setState({ isSelected: true });
            } else {
                this.setState({ error: 'Įvyko klaida.' })
            }
        }).then(() => {
            this.setState({ loading: false })
        });
    }

    likeProduct = async (ref) => {
        const errorMsg = await this.props.likeProduct(this.props.product.category_id, this.state.productId, this.props.token, true);
        if(!errorMsg){
            this.setState({ isLiked: true })
            return true;
        } else {
            this.setState({ errorObj: errorMsg });
            this.callModal(ref, errorMsg)
        }
    } 
    unlikeProduct = () => {
        this.setState({ isLiked: false })
        this.props.unlikeProduct(this.state.productId, this.props.token, true)
    }


    allowSelectProduct = async (ref) => {
        const errorMsg = await this.props.selectProductToCalc(this.props.selectedProducts, this.state.productId);
        if(!errorMsg){
            this.setState({ isSelected: true })
            return true;
        } else {
            this.setState({ errorObj: errorMsg });
            this.callModal(ref, errorMsg)
        }
    }

    removeSelectProduct = () => {
        this.props.removeProductFromSelected(this.state.productId)
        this.setState({ isSelected: false })
    }


    render() {
        const { name, image, background, loading, callRegisterModel, modelMsg } = this.state;
        const { subcategoryId, subcategoryName, categoryId, categoryName } = this.props.route.params;

        return (
            (loading) ? (
                <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
               <>
                    <Header 
                        title={ name }
                        navigate={ () => this.props.navigation.push("Products", {
                            subcategoryId: subcategoryId,
                            name: subcategoryName,
                            background: background,
                            categoryId: categoryId,
                            categoryName: categoryName
                        }) }
                    />
                    <View style={containerStyles(background).screenHeightContainer} >
                        { (modelMsg !== '') && (
                            <Modal title="Error" 
                                message={ modelMsg } 
                                close={() => this.setState({ modelMsg: '' })} 
                                ok="OK" color={colors.bordo} 
                                borderColor={colors.bordoTransparent}
                                locationX={ this.state.locationX }
                                locationY={ this.state.locationY }
                            /> )}
                        <View style={ containerStyles().rowContainerTop }>
                            {image ? (
                                <Image style={stylesGuestSingle().imageStyle} source={{ uri: image }} />
                            ) : (
                                <Image style={stylesGuestSingle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')}  />
                            )}
                            <View style={stylesGuestSingle().btnsWrap } >
                                <View style={stylesGuestSingle().likeBtns}>
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
                                        activateFunc={(ref) => this.allowSelectProduct(ref) }
                                        errorCondition={  this.props.selectedProducts.length > 30  }
                                        errorFunc={ (ref) => this.callModal(ref, 'Please select no more than 30 items.') }
                                        mainIcon='md-checkmark'
                                        activeIcon='format-list-bulleted'
                                        activeColor={ colors.mainBtnGreen }
                                        activeColorSec={ colors.mainBtnOrange }
                                        isActive={ this.state.isSelected }
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={stylesGuestSingle(background).listContainer} > 
                            <FlatList data={ this.state.productDetails } contentContainerStyle={stylesGuestSingle(background).flatlistContainer} renderItem={({ item }) => (
                                <DetailRow props={ item } />
                            )} />
                        </View>
                    </View>
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
    selectedProducts: state.selectedProducts.comparisonArray,
})

export default withNavigation(connect(mapStateToProps, { selectProductToCalc, removeProductFromSelected, likeProduct, unlikeProduct})(ProductDetails))