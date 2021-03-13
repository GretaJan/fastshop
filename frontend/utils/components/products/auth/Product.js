import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
var update = require('react-addons-update')
import { getProduct, editProduct, deleteProduct } from '../../../redux/actions/productActions';
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { stylesGuestSingle, authProduct } from '../../../src/styles/ProductStyles';
import { backgroundForPages } from '../../../src/styles/AdditionalStyles';
import { colors } from '../../../src/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Components
import Loading from '../../../utils/models/Loading';
import ConfirmModal from '../../../utils/models/ModalCrud';
import Row from './DetailsRows';
import Error from '../../../utils/models/ErrorMsg';

class Product extends Component {
    state = {
        id: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
        title: this.props.route.params.name,
        image: null,
        productComponents: [],
        imageData: null,
        imageInput: false,
        errorMsg: '',
        triggeredName: '',
        componentValue: '',
        confirm: false,
        title: ''
    }

    async componentDidMount() {
        await this.props.getProduct( this.props.route.params.subcategoryId, this.props.route.params.productId);
        this.setState({
            image: this.props.product.product.image,
            productComponents: [
                { title: 'Name', component: this.props.product.product.name },
                { title: 'Background', component: this.props.product.product.background },
                { title: 'Energy', component: this.props.product.product.energy, measure: 'kcal' },
                { title: 'Fat', component: this.props.product.product.fat, measure: 'g' },
                { title: 'Saturated fat', component: this.props.product.product.saturated, measure: 'g' },
                { title: 'Carbohidrates', component: this.props.product.product.carbs, measure: 'g' },
                { title: 'Sugar', component: this.props.product.product.sugar, measure: 'g' },
                { title: 'Fiber', component: this.props.product.product.fiber, measure: 'g' },
                { title: 'Protein', component: this.props.product.product.protein, measure: 'g' },
                { title: 'Salt', component: this.props.product.product.salt, measure: 'g' },
            ]});
    }

    imageInput = () => {
        this.setState({
            imageInput: true,
            errorMsg: '',
            triggeredName: '',
            componentValue: '',
        });
    }

    changeImage = () => {
        const options = {
            noData: false
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({
                    imageData: response,
                });
            } 
        })
    }

    editName = () => {
        const { componentValue } = this.state;
        if (componentValue === '') {
            this.setState({errorMsg: 'Product name is required' });
        } else if(componentValue.length < 3 ) {
            this.setState({ errorMsg: 'Must contain at least 3 characters' });
        } else {
            this.setState({errorMsg: '' });
            this.props.navigation.setParams({ name: componentValue });
            this.updateProduct(componentValue);
        }
       
    }
    editBackground = () => {
        const { componentValue } = this.state;
        let colorFormat = new RegExp('^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');
        if(componentValue !== '' && !colorFormat.test(componentValue)) {
            this.setState({errorMsg: 'Invalid color format'});
        } else {
            this.setState({errorMsg: ''});
            this.updateProduct(componentValue);
        }

    }

    editEnergy = () => {
        const { componentValue } = this.state;
        let regexConstEnergy = new RegExp('^[0-9]*$');
        if(componentValue !== '' && !regexConstEnergy.test(componentValue)) {
            this.setState({errorMsg: 'Must contain digits only'})
        } else {
            this.setState({errorMsg: ''});
            this.updateProduct(componentValue);
        }
    }

    editDecimals = () => {
        const { componentValue } = this.state;
        let decimalFormat = new RegExp('^([1-9]|([1-9][0-9]))(\.|\,)[0-9]{1,2}$');
        let decimalFormatComma = new RegExp('^([1-9]|([1-9][0-9]))\,[0-9]{1,2}$');
        if(componentValue !== '' && !decimalFormat.test(componentValue)) {
            this.setState({errorMsg: 'Format: 0.0/00.0'});
        } else {
            let value = componentValue;
            this.setState({errorMsg: ''});
            if(decimalFormatComma.test(value)){
                let findComma = value.split(',');
                let dotValue = findComma[0] + '.' + findComma[1];
                value = dotValue;
            }
            this.updateProduct(value);
        }
    }
    updateProduct = (value) => {
        const { triggeredName, productComponents } = this.state;

        let newArray;
        productComponents.map((item, index) => {
            if(item.title === triggeredName) {
                newArray = update(productComponents, {
                    [index]: {
                        component: {
                            $set: value
                        }
                    }
                });
            }
        })
        this.setState({ productComponents : newArray })
        const data = {
            [triggeredName.toLowerCase()] : value,
            "_method": "put", 
        }
        this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data, this.token); 
        this.cancelEdit();
    }
    editImage = async() => {
        const data = {
            image: this.state.imageData ? "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data : this.props.product.image,
            "_method": "put"
        }
        await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
        this.cancelImageEdit();
    }
    triggerEdit = (item) => {
        this.setState({ errorMsg: '', triggeredName : item.title })
    }

    inputChange = (value) => {
        this.setState({ componentValue: value })
    }

    cancelEdit = () => {
        this.setState({ triggeredName: '',
                        componentValue: '',
                        errorMsg: '',
                     })
    }

    cancelImageEdit = () => {
        this.setState({
                        imageInput: false,
                        errorMsg: ''
                    });
    }
    deleteProduct = () => {
        this.props.deleteProduct(this.props.product.id);
        this.props.navigation.push("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
    }

    closeModal = () => {
        this.setState({confirm: false});
    }

    render() {
        const { imageInput, imageData } = this.state;
        const { image, background } = this.props.product;

        return (
                this.props.loading ? (
                <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                this.props.error !== '' ? (
                    <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                        <Error message={this.props.error} />
                    </View>
                ) : ( 
                    <ScrollView>
                    <View style={stylesGuestSingle().container}>
                        {this.state.confirm && (
                            <ConfirmModal message="Are you sure you want to delete this item? " 
                                    confirm={this.deleteProduct}
                                    title="Delete action"
                                    close={() => this.setState({confirm: false})}
                                    background={colors.mainWhiteYellow}
                                    iconColor={colors.lightBurgundy}
                                    borderColor={colors.bordoTransparent}
                                    colorOne={colors.lightBurgundy}
                                    colorTwo={colors.mediumGreen}
                                    horizontal={20} vertical={15}
                                        />
                                    
                        )}
                    {!imageInput ? (
                        <View style={authProduct().imageIconWrap} >
                            <TouchableOpacity style={stylesGuestSingle().imageContainer}  onPress={() => this.imageInput()}>
                        {imageData ? (
                                <Image style={stylesGuestSingle().imageStyle} source={{ uri: imageData.uri }} />
                            ) : (
                                image ? (
                                    <Image style={stylesGuestSingle().imageStyle} source={{ uri: image}} onPress={() => this.imageInput()} />
                                    ) : (
                                    <Image style={stylesGuestSingle().imageStyle} source={require('../../../src/images/noimage.jpeg')} onPress={() => this.imageInput()} />
                                )
                            )}   
                                </TouchableOpacity> 
                            <TouchableOpacity style={authProduct().editBtnWrapImg} onPress={() => this.imageInput()} >
                                <Icon style={authProduct().editImgIcon} name="pencil"/>
                            </TouchableOpacity>
                        </View>
                        ) : (
                            <View style={authProduct().imageIconWrap} >
                                <TouchableOpacity style={stylesGuestSingle().imageContainer} onPress={() => this.changeImage()} >
                                {imageData ? (
                                        <Image style={stylesGuestSingle().imageStyle} source={{ uri: imageData.uri }} />
                                    ) : (
                                        image ? (
                                            <Image style={stylesGuestSingle().imageStyle} source={{uri: image}} />
                                        ) : (
                                            <Image style={stylesGuestSingle().imageStyle} source={require('../../../src/images/noimage.jpeg')} />
                                        )
                                    )}
                                    <Icon style={authProduct().uploadIcon} name="upload"/>
                                </TouchableOpacity> 
                                <View style={ authProduct().editBtnsWrapImg } >
                                    <TouchableOpacity style={authProduct().editBtnImg} onPress={() => this.editImage()}>
                                        <Icon style={ authProduct().iconImgSave } name="check-circle" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelImageEdit()}>
                                        <Icon style={ authProduct().iconImgCancel } name="times-circle" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )} 
                            <TouchableOpacity style={authProduct().emptyItem} onPress={() => this.setState({confirm: true})}>
                                <Icon style={authProduct().emptyIcon} name="trash-o" />
                            </TouchableOpacity>
                            <View style={authProduct(background).triangle} ></View>
                            <View style={authProduct(background).underTriangle} ></View>
                            <View style={authProduct(background).listContainer} >
                                <FlatList data={ this.state.productComponents } 
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                        <Row props={ item } 
                                            triggeredName={this.state.triggeredName}
                                            errorMsg={this.state.errorMsg}
                                            triggerEdit={() => this.triggerEdit(item)}
                                            componentValue={this.state.componentValue}
                                            editName={() =>  this.editName() }
                                            editBackground={() =>  this.editBackground() }
                                            editEnergy={() =>  this.editEnergy() }
                                            editDecimals={() =>  this.editDecimals() }
                                            changeText={(value) => this.inputChange(value)}
                                            cancelEdit={() => this.cancelEdit() }
                                        />
                                    )} />   
                            </View> 
                        </View>
                    </ScrollView>
                )
            )
        )
    }
}

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productComponents: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        component: PropTypes.number,
        measure: PropTypes.string.isRequired
    })),
    image: PropTypes.any,
    background: PropTypes.string
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    product: state.products.product,
    loading: state.products.loading, 
    error: state.products.error
});

export default withNavigation(connect(mapStateToProps, {getProduct, editProduct, deleteProduct})(Product))
