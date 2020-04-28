import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProduct, editProduct, deleteProduct } from '../../src/actions/productActions';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle, styles } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

//Components
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Product extends Component {
    state = {
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
        image: this.props.product.image,
        name: this.props.product.name,
        energy: this.props.product.energy,
        fat: this.props.product.fat,
        saturated: this.props.product.saturated,
        carbs: this.props.product.carbs,
        sugar: this.props.product.sugar,
        fiber: this.props.product.fiber,
        protein: this.props.product.protein,
        salt: this.props.product.salt,
        vitamins: this.props.product.vitamins,
        image: null,
        background: this.props.product.background_color,
        border_color:  this.props.product.border_color,
        nameInput: false,
        energyInput: false,
        fatInput: false,
        saturatedInput: false,
        carbsInput: false,
        sugarInput: false,
        fiberInput: false,
        proteinInput: false,
        saltInput: false,
        vitaminsInput: false,
        backgroundInput: false,
        borderInput: false,
        imageInput: false,
    }

    static navigationOptions = {
        headerTitle: "PRODUCT DETAILS2",
    };

    async componentDidMount() {
        await this.props.getProduct( this.state.subcategoryId, this.state.productId);
        console.log('image: ', image)
    }

    nameInput = () => {
        this.setState({nameInput: true});
    }

    energyInput = () => {
        this.setState({energyInput: true});
    }

    fatInput = () => {
        this.setState({fatInput: true});
    }

    saturatedInput = () => {
        this.setState({saturatedInput: true});
    }

    carbsInput = () => {
        this.setState({carbsInput: true});
    }

    sugarInput = () => {
        this.setState({sugarInput: true});
    }

    fiberInput = () => {
        this.setState({fiberInput: true});
    }

    proteinInput = () => {
        this.setState({proteinInput: true});
    }

    saltInput = () => {
        this.setState({saltInput: true});
    }

    vitaminsInput = () => {
        this.setState({vitaminsInput: true});
    }
    backgroundInput = () => {
        this.setState({backgroundInput: true});
    }
    borderEdit = () => {
        this.setState({borderInput: true});
    }
    imageEdit = () => {
        this.setState({imageInput: true});
    }
    cancelNameEdit = () => {
        this.setState({nameInput: false});
    }
    cancelEnergyEdit = () => {
        this.setState({energyInput: false});
    }
    cancelFatEdit = () => {
        this.setState({fatInput: false});
    }
    cancelSaturatedEdit = () => {
        this.setState({saturatedInput: false});
    }
    cancelNameEdit = () => {
        this.setState({nameInput: false});
    }
    cancelCarbsEdit = () => {
        this.setState({carbsInput: false});
    }
    cancelSugarEdit = () => {
        this.setState({sugarInput: false});
    }
    cancelFiberEdit = () => {
        this.setState({fiberInput: false});
    }
    cancelProteinEdit = () => {
        this.setState({proteinInput: false});
    }
    cancelSaltEdit = () => {
        this.setState({saltInput: false});
    }
    cancelVitaminsEdit = () => {
        this.setState({vitaminsInput: false});
    }
    cancelBackgroundEdit = () => {
        this.setState({backgroundInput: false});
    }
    cancelBorderEdit = () => {
        this.setState({borderInput: false});
    }
    cancelImageEdit = () => {
        this.setState({imageInput: false});
    }

    validation() {
        if(this.state.name == null) {
            this.setState({name: this.props.product.name})
        }
        if(this.state.energy == '') {
            this.setState({energy: this.props.product.energy})
        }
        if(this.state.fat == '') {
            this.setState({fat: this.props.product.fat})
        }
        if(this.state.saturated == '') {
            this.setState({saturated: this.props.product.saturated})
        }
        if(this.state.carbs == '') {
            this.setState({carbs: this.props.product.carbs})
        }
        if(this.state.sugar == '') {
            this.setState({sugar: this.props.product.sugar})
        }
        if(this.state.fiber == '') {
            this.setState({fiber: this.props.product.fiber})
        }
        if(this.state.protein == '') {
            this.setState({protein: this.props.product.protein})
        }
        if(this.state.salt == '') {
            this.setState({salt: this.props.product.salt})
        }
        if(this.state.vitamins == '') {
            this.setState({vitamins: this.props.product.vitamins})
        }
        if(this.state.image == null) {
            this.setState({image: this.props.product.image})
        }
        if(this.state.background_color == null) {
            this.setState({background: this.props.product.background_color})
        }
        if(this.state.border_color == null) {
            this.setState({border_color: this.props.product.border_color})
        }
    }

    getInputValue = (props) => {
        if(props == 'undefined') {
            return (
            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={props} />
            )
        } else if (props == null) {
            return <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} placeholder="No value"/>
 
        }
    }

    changeImage = () => {
        const options = {
            noData: false
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response});
                this.editProduct();
            }   
        })
    }

    editProduct = async() => {
        // this.validation();
        const data = {
            name: this.state.name,
            energy: this.state.energy,
            fat: this.state.fat,
            saturated:  this.state.saturated,
            carbs: this.state.carbs,
            sugar: this.state.sugar,
            fiber: this.state.fiber,
            protein: this.state.protein,
            salt: this.state.salt,
            vitamins: this.state.vitamins,
            background_color: this.state.background,
            border_color: this.state.border_color,
            image: "data:" + image.type + ";base64," + image.data,
            "_method": "put"
        }
        await this.props.editProduct(this.props.route.params.subcategoryId, this.props.route.params.productId, data); 
        // this.props.getProduct(this.props.route.params.subcategoryId, this.props.route.params.productId);
        // this.setState({edited: true})
        this.cancelNameEdit();
        this.cancelEnergyEdit();
        this.cancelFatEdit();
        this.cancelSaturatedEdit();
        this.cancelNameEdit();
        this.cancelCarbsEdit();
        this.cancelSugarEdit();
        this.cancelFiberEdit();
        this.cancelProteinEdit();
        this.cancelSaltEdit();
        this.cancelVitaminsEdit();
        this.cancelBackgroundEdit();
        this.cancelBorderEdit();
    }

    deleteProduct = async() => {
        console.log(this.props.product.id)
        await this.props.deleteProduct(this.props.product.id);
        this.props.navigation.push("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
    }

    render() {
        const { image, name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, nameInput, imageInput, energyInput, fatInput, 
            saturatedInput, carbsInput, sugarInput, fiberInput, proteinInput, saltInput, vitaminsInput, background, backgroundInput, borderInput } = this.state;
        return (
            <View style={stylesGuestSingle().container} >
                 {this.props.loading ? (
                    <Loading />
                    ) : (
                    this.props.error !== '' ? (
                        <Error message={this.props.error} />
                    ) : ( 
                        <View>
                        {!imageInput ? (
                            image ? (
                                <View>
                                    <View style={stylesGuestSingle().imageContainer} >
                                        <Image style={stylesGuestSingle().image} source={{ uri: image }} />
                                    </View>
                                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEdit}>
                                        <Icon style={authCategory().editBtn} name="pencil"/>
                                    </TouchableOpacity>
                                </View>
                                ) : (
                                    <View>
                                        <View style={stylesGuestSingle().imageContainer} >
                                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        </View> 
                                        <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEdit}>
                                            <Icon style={authCategory().editBtn} name="pencil"/>
                                        </TouchableOpacity>
                                    </View>
                                )   
                                ) : (
                                    image ? (
                                    <View>
                                        <View style={stylesGuestSingle().imageContainer} onPress={() => this.changeImage()} >
                                            <Image style={stylesGuestSingle().image} source={{ uri: image }} />
                                            <Icon style={authCategory().uploadIcon} name="upload"/>
                                        </View>
                                    </View>
                                    ) : (
                                    <View>
                                        <View style={stylesGuestSingle().imageContainer} onPress={() => this.changeImage()} >
                                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                            <Icon style={authCategory().uploadIcon} name="upload"/>
                                        </View> 
                                    </View>
                                    )
                                )}
                                <TouchableOpacity style={stylesGuestSingle().emptyItem} onPress={() => this.deleteProduct()}>
                                    <IonIcon style={stylesGuestSingle().emptyIcon} name="ios-checkmark-circle-outline" />
                                </TouchableOpacity>
                            <View style={stylesGuestSingle().triangle} ></View>
                            <ScrollView style={stylesGuestSingle().listContainer} >
                                {!backgroundInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >Background:</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().backgroundRectangle} ></Text>
                                            <Icon name="pencil" onPress={() => this.backgroundInput()}/>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({background: value})} defaultValue={(background) ? (background) : ('-')} />
                                            <View style={ styles().itemWrap } >
                                                <Icon style={ styles().iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                                <Icon name="times-circle"  onPress={() => this.cancelBackgroundEdit()} />
                                            </View>
                                        </View>
                                    </View>
                                )}
                                {!energyInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (energy) ? (energy) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                                            <Icon name="pencil" onPress={() => this.energyInput()}/>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >Energy</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({energy: value})} defaultValue={(energy) ? (energy) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                                        </View>
                                        <View style={ styles().itemWrap } >
                                            <Icon style={ styles().iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle"  onPress={() => this.cancelEnergyEdit()} />
                                        </View>
                                    </View>
                                )}
                                {!fatInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (fat) ? (fat) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" size={35} color="firebrick" onPress={() => this.fatInput()} />
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >fat</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fat: value})}} defaultValue={(fat) ? (fat) : ('-') } />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles().itemWrap }>
                                            <Icon style={ styles().iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={() => this.cancelFatEdit()} />
                                        </View>
                                    </View>
                                )}
                                {!saturatedInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (saturated) ? (saturated) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.saturatedInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                    <Text style={stylesGuestSingle().componentTitle} >saturated fat</Text>
                                    <View style={stylesGuestSingle().listItemInfoWrap} >
                                        <TextInput  style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({saturated: value})}}  defaultValue={(saturated) ? (saturated) : ('-')} />
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    </View>
                                    <View style={ styles(background_color, this.state.border_color).itemWrap } >
                                        <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="times-circle" onPress={() => this.cancelSaturatedEdit()} />
                                    </View>
                                </View>
                                )}
                                {!carbsInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                    <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (carbs) ? (carbs) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.carbsInput()} />
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                    <Text style={stylesGuestSingle().componentTitle} >Carbohidrates</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({carbs: value})}} defaultValue={(carbs) ? (carbs) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles().itemWrap }>
                                            <Icon style={ styles().iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={() => this.cancelCarbsEdit} />
                                        </View>
                                    </View>
                                )}
                                {!sugarInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (sugar) ? (sugar) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.sugarInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >sugar</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({sugar: value})}} defaultValue={(sugar) ? (sugar) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                            <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={this.cancelSugarEdit} />
                                        </View>
                                    </View>
                                )}
                                {!fiberInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (fiber) ? (fiber) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.fiberInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >fiber</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fiber: value})}} defaultValue={(fiber) ? (fiber) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles().itemWrap }>
                                            <Icon style={ styles().iconItem } name="check-circle"  onPress={this.editProduct} />
                                            <Icon name="times-circle"  onPress={() => this.cancelFiberEdit()} />
                                        </View>
                                    </View>
                                )}
                                {!proteinInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (protein) ? (protein) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.proteinInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >protein</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({protein: value})}} defaultValue={(protein) ? (protein) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                            <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={() => this.cancelProteinEdit()} />
                                        </View>
                                    </View>
                                )}
                                {!saltInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (salt) ? (salt) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.saltInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >salt</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ styles().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({salt: value})}} defaultValue={(salt) ? (salt) : ('-')} />
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles().itemWrap }>
                                            <Icon style={ styles().iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={() => this.cancelSaltEdit()} />
                                        </View>
                                    </View>
                                )}
                                {!vitaminsInput ? (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <Icon name="pencil" onPress={() => this.vitaminsInput()} /> 
                                    </View>
                                ) : (
                                    <View style={stylesGuestSingle().listItemWrap}>
                                        <Text style={stylesGuestSingle().componentTitle} >vitamins</Text>
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                            <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        </View>
                                        <View style={ styles().itemWrap }>
                                            <Icon style={ styles().iconItem } name="check-circle" onPress={this.editProduct} />
                                            <Icon name="times-circle" onPress={() => this.cancelVitaminsEdit()} />
                                        </View>
                                    </View>
                                )}
                            </ScrollView> 
                        </View>
                    ))}
                </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    loading: state.products.loading, 
    error: state.products.error
});

export default withNavigation(connect(mapStateToProps, {getProduct, editProduct, deleteProduct})(Product))
