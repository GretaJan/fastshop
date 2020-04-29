import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getProduct, editProduct, deleteProduct } from '../../src/actions/productActions';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { stylesGuestSingle, authProduct } from '../../components_additional/styles/ProductStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

//Components
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Product extends Component {
    state = {
        id: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
        image: this.props.product.image,
        imageData: null,
        name: '',
        energy: '',
        fat: '',
        saturated: '',
        carbs: '',
        sugar: '',
        fiber: '',
        protein: '',
        salt: '',
        vitamins: '',
        background: '',
        border_color:  '',
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
        title: this.props.route.params.name,
    }

     componentDidMount() {
        console.log("list: ", this.props.product, " id: ", this.state.id, "cat ID: ", this.state.subcategoryId); 
         this.props.getProduct( this.props.route.params.productId, this.props.route.params.subcategoryId);

            // this.setState({
            //     image: this.props.product.image,
            //     name: this.props.product.name,
            //     energy: this.props.product.energy,
            //     fat: this.props.product.fat,
            //     saturated: this.props.product.saturated,
            //     carbs: this.props.product.carbs,
            //     sugar: this.props.product.sugar,
            //     fiber: this.props.product.fiber,
            //     protein: this.props.product.protein,
            //     salt: this.props.product.salt,
            //     vitamins: this.props.product.vitamins,
            //     background: this.props.product.background_color,
            //     border_color:  this.props.product.border_color,
            // })
  
    
    }

    imageInput = () => {
        this.setState({imageInput: true});
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
                this.setState({
                            imageData: response,
                            });
            } 
        })
    }

    editName = () => {
        this.props.navigation.setParams({ name: this.state.name });
        this.editProduct();
    }

    editProduct = async() => {
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
            image: this.state.changedImg ? "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data : this.props.product.image,
            "_method": "put"
        }
        await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
       
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
        this.cancelImageEdit();
        this.cancelBackgroundEdit();
        this.cancelBorderEdit();
    }

    finish = () => {
 // this.validation();
       
    }


    deleteProduct = async() => {
        await this.props.deleteProduct(this.props.product.id);
        this.props.navigation.push("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
    }

    render() {
        const {image,  nameInput, imageInput, energyInput, fatInput, 
            saturatedInput, carbsInput, sugarInput, fiberInput, proteinInput, saltInput, vitaminsInput, background, backgroundInput, imageData } = this.state;
        // const {image, background_color} = this.props.product;
        const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins,  background_color } = this.props.product;

        return (
                 this.props.loading ? (
                    // <Loading background={colors.mainWhiteYellow} />
                    <Text>Load</Text>
                    ) : (
                    this.props.error !== '' ? (
                        <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                            <Error message={this.props.error} />
                        </View>
                    ) : ( 
                        <View style={stylesGuestSingle().container}>
                        {!imageInput ? (
                            image ? (
                                <TouchableOpacity style={authProduct().imageIconWrap} onPress={() => this.imageInput()} >
                                    <View style={stylesGuestSingle().imageContainer}>
                                        <Image style={stylesGuestSingle().image} source={{ uri: image }} />
                                    </View>
                                    <Icon style={authProduct().editImgIcon} name="pencil"/>
                                </TouchableOpacity>
                                ) : (
                                    <View style={authProduct().imageIconWrap}  >
                                        <TouchableOpacity style={stylesGuestSingle().imageContainer} onPress={() => this.imageInput()} >
                                            <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')} onPress={() => this.imageInput()} />
                                        </TouchableOpacity> 
                                            <Icon style={authProduct().editImgIcon} name="pencil"/>
                                    </View>
                                )   
                            ) : (
                                image ? (
                                <View style={authProduct().imageIconWrap} >
                                    <TouchableOpacity style={stylesGuestSingle().imageContainer} onPress={() => this.changeImage()} >
                                        { imageData ? (
                                            <Image style={stylesGuestSingle().image} source={{ uri: imageData.uri }} />
                                        ) : (
                                            <Image style={stylesGuestSingle().image} source={{ uri: image }} />
                                        )}
                                        <Icon style={authProduct().uploadIcon} name="upload"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ authProduct().iconsImgWrap } >
                                        <Icon style={ authProduct().iconImgSave } name="check-circle" onPress={() => this.editProduct()} />
                                        <Icon style={ authProduct().iconImgCancel } name="times-circle" style={ authProduct().iconCancel } onPress={() => this.cancelImageEdit()} />
                                    </TouchableOpacity>
                                </View>
                                ) : (
                                <View style={authProduct().imageIconWrap} >
                                    <TouchableOpacity style={stylesGuestSingle().imageContainer} onPress={() => this.changeImage()} >
                                        <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                        <Icon style={authProduct().uploadIcon} name="upload"/>
                                    </TouchableOpacity> 
                                    <TouchableOpacity style={ authProduct().iconsImgWrap } >
                                        <Icon style={ authProduct().iconSave } name="check-circle" onPress={() => this.editProduct()} />
                                        <Icon style={ authProduct().iconCancel } name="times-circle"  onPress={() => this.cancelImageEdit()} />
                                    </TouchableOpacity>
                                </View>
                                )
                            )}
                            <TouchableOpacity style={authProduct().emptyItem} onPress={() => this.deleteProduct()}>
                                <Icon style={authProduct().emptyIcon} name="trash-o" />
                            </TouchableOpacity>
                            <View style={authProduct(background_color).triangle} ></View>
                            <View style={authProduct(background_color).underTriangle} ></View>
                            <ScrollView style={authProduct(background_color).listContainer} >
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Name</Text>
                                {!nameInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.nameInput()} >
                                        <Text style={authProduct().listItemBackground} >{name ? name : '-' }</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" />
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({name: value})} defaultValue={(name) ? (name) : ('-')} />
                                            <View style={ authProduct().iconsWrap } >
                                                <Icon style={ authProduct().iconSave } name="check-circle" onPress={this.editName} />
                                                <Icon style={ authProduct().iconCancel } name="times-circle"  onPress={() => this.cancelNameEdit()} />
                                            </View>
                                        </View>
                                    )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Background</Text>
                                {!backgroundInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.backgroundInput()} >
                                        <Text style={authProduct().listItemBackground} >{background ? background : '-' }</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" />
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({background: value})} defaultValue={(background) ? (background) : ('-')} />
                                            <View style={ authProduct().iconsWrap } >
                                                <Icon style={ authProduct().iconSave } name="check-circle" onPress={this.editProduct} />
                                                <Icon style={ authProduct().iconCancel } name="times-circle"  onPress={() => this.cancelBackgroundEdit()} />
                                            </View>
                                        </View>
                                    )}
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Energy</Text>
                                {!energyInput ? (
                                <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.energyInput()} >
                                    <Text style={stylesGuestSingle().componentAmount}>{ (energy) ? (energy) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil"/>
                                </TouchableOpacity>
                                    ) : (
                                    <View style={stylesGuestSingle().listItemInfoWrap}>
                                        <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({energy: value})} defaultValue={(energy) ? (energy.toString()) : ('-')} />
                                        <TouchableOpacity style={ authProduct().iconsWrap } >
                                            <Icon style={ authProduct().iconSave } name="check-circle" onPress={() =>{ this.editProduct(), console.log("hey")}} />
                                            <Icon  style={ authProduct().iconCancel } name="times-circle"  onPress={() => this.cancelEnergyEdit()} />
                                        </TouchableOpacity>
                                    </View>
                                    )}
                            </View>
                            <View style={stylesGuestSingle().listItemWrap}>
                                <Text style={authProduct().componentTitle} >fat</Text>
                                {!fatInput ? (
                                <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.fatInput()} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (fat) ? (fat) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil"  />
                                </TouchableOpacity>
                                ) : (
                                    <View style={stylesGuestSingle().listItemInfoWrap} >
                                        <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fat: value})}} defaultValue={(fat) ? (fat) : ('-') } />
                                        <View style={ authProduct().iconsWrap }>
                                            <Icon style={ authProduct().iconSave } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon  style={ authProduct().iconCancel }name="times-circle" onPress={() => this.cancelFatEdit()} />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >saturated fat</Text>
                                {!saturatedInput ? (
                                <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.saturatedInput()}>
                                    <Text style={stylesGuestSingle().componentAmount} >{ (saturated) ? (saturated) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                </TouchableOpacity>
                                    ) : (
                                    <View style={stylesGuestSingle().listItemInfoWrap} >
                                        <TextInput  style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({saturated: value})}}  defaultValue={(saturated) ? (saturated) : ('-')} />
                                        <View style={ authProduct().iconsWrap } >
                                            <Icon style={ authProduct().iconSave } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                            <Icon  style={ authProduct().iconCancel }name="times-circle" onPress={() => this.cancelSaturatedEdit()} />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Carbohidrates</Text>
                                {!carbsInput ? (
                                <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.carbsInput()} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (carbs) ? (carbs) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit }name="pencil" />
                                </TouchableOpacity>
                                ) : (
                                    <View style={stylesGuestSingle().listItemInfoWrap} >
                                        <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({carbs: value})}} defaultValue={(carbs) ? (carbs) : ('-')} />
                                        <View style={ authProduct().iconsWrap }>
                                            <Icon style={ authProduct().iconSave } name="check-circle" onPress={() => this.editProduct()} />
                                            <Icon  style={ authProduct().iconCancel } name="times-circle" onPress={() => this.cancelCarbsEdit()} />
                                        </View>
                                    </View>
                                )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >sugar</Text>
                                    {!sugarInput ? (
                                    <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.sugarInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (sugar) ? (sugar) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil"  /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({sugar: value})}} defaultValue={(sugar) ? (sugar) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <Icon style={ authProduct().iconSave } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                                <Icon  style={ authProduct().iconCancel }name="times-circle" onPress={this.cancelSugarEdit} />
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >fiber</Text>
                                    {!fiberInput ? (
                                    <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.fiberInput()}  >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (fiber) ? (fiber) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fiber: value})}} defaultValue={(fiber) ? (fiber) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <Icon style={ authProduct().iconSave } name="check-circle"  onPress={this.editProduct} />
                                                <Icon  style={ authProduct().iconCancel } name="times-circle"  onPress={() => this.cancelFiberEdit()} />
                                            </View>
                                        </View>    
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >protein</Text>
                                    {!proteinInput ? (
                                    <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.proteinInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (protein) ? (protein) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({protein: value})}} defaultValue={(protein) ? (protein) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <Icon style={ authProduct().iconSave } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                                <Icon  style={ authProduct().iconCancel } name="times-circle" onPress={() => this.cancelProteinEdit()} />
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >salt</Text>
                                    {!saltInput ? (
                                    <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap}  onPress={() => this.saltInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (salt) ? (salt) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit }name="pencil"/> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={stylesGuestSingle().listItemInfoWrap} >
                                            <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({salt: value})}} defaultValue={(salt) ? (salt) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <Icon style={ authProduct().iconSave } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                                <Icon  style={ authProduct().iconCancel } name="times-circle" onPress={() => this.cancelSaltEdit()} />
                                            </View>
                                        </View> 
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >vitamins</Text>
                                    {!vitaminsInput ? (
                                    <TouchableOpacity style={stylesGuestSingle().listItemInfoWrap} onPress={() => this.vitaminsInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil"/> 
                                    </TouchableOpacity>
                                ) : (
                                    <View style={stylesGuestSingle().listItemInfoWrap} >
                                        <TextInput style={ authProduct().itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({vitamins: value})}} defaultValue={(vitamins) ? (vitamins) : ('-')} />
                                        <View style={ authProduct().iconsWrap }>
                                            <Icon style={ authProduct().iconSave } name="check-circle" onPress={this.editProduct} />
                                            <Icon  style={ authProduct().iconCancel } name="times-circle" onPress={() => this.cancelVitaminsEdit()} />
                                        </View>
                                    </View>
                                    )}
                                </View>
                            </ScrollView> 
                        </View>
                    )
                )
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    loading: state.products.loading, 
    error: state.products.error
});

export default withNavigation(connect(mapStateToProps, {getProduct, editProduct, deleteProduct})(Product))
