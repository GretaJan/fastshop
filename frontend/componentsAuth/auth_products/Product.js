import React, { Component } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {styles} from '../../components_additional/styles/ProductStyles';
import { getProduct, editProduct, deleteProduct } from '../../src/actions/productActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { withNavigation } from 'react-navigation';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';

//Components:
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Product extends Component {
 

    state = {
        productId: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
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
        background_color: this.props.product.background_color,
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

    async componentDidMount() {
        await this.props.getProduct(this.state.subcategoryId, this.state.productId);
        console.log("BackgroundColor: ", this.props.product.background_color)

        // this.setState({
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
        //     image: this.props.product.image,
        // });
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
    backgroundEdit = () => {
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
            this.setState({background_color: this.props.product.background_color})
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

    deleteProduct = async() => {
        console.log(this.props.product.id)
        await this.props.deleteProduct(this.props.product.id);
        this.props.navigation.push("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
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
            background_color: this.state.background_color,
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

    render() {
        const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, image, nameInput, energyInput, fatInput, 
            saturatedInput, carbsInput, sugarInput, fiberInput, proteinInput, saltInput, vitaminsInput, background_color, backgroundInput, borderInput, imageInput } = this.state;
   
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
            (this.props.error !== '') ? (
                <Error message={this.props.error} />
            ) : ( 
                <View style={ styles(null, null).container }>
                    {(!nameInput) &&
                        <View style={ styles(null, null).itemWrap } >
                            <Text style={ styles(null, null).itemText }>{ name }</Text>
                            <Icon name="edit" size={35} color="firebrick" onPress={this.nameInput}/>
                        </View>
                    }{(nameInput) &&
                        <View style={ styles(null, null).itemWrap }>
                            <TextInput style={ styles(null, null).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({name: value})} defaultValue={this.state.name} />
                            <TextInput style={ styles(null, null).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({background_color: value})} defaultValue={background_color} />
                            <TextInput style={ styles(null, null).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({border_color: value})} defaultValue={this.state.border_color} />
                            <View style={ styles(null, null).itemWrap }>
                                <Icon style={ styles(null, null).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelNameEdit} />
                            </View>
                        </View>
                    }
                    <View>                            
                        <Icon style={ styles(null, null).iconItem } name="check" size={35} color="firebrick" onPress={() => this.deleteProduct} />
                    </View>
                    {(!this.state.backgroundInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            {(this.props.product.background_color) && <Text style={ styles(background_color, this.state.border_color).itemText } >Background color: </Text> }
                            {(!this.props.product.background_color) && <Text style={ styles(background_color, this.state.border_color).itemText }>No Background: </Text> }
                            <Text style={ (this.props.product.background_color) ? ( styles(background_color, this.state.border_color).backgroundColorIs) : (styles(background_color, this.state.border_color).backgroundColorNull) }></Text>
                        </View>                              
                    } 
                    {(this.state.backgroundInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({background_color: value})} defaultValue={background_color} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelBackgroundEdit} />
                            </View>
                        </View> 
                    }
                    {(!this.state.borderInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            {(this.props.product.border_color) && <Text style={ styles(background_color, this.state.border_color).itemText } >Border color: </Text> }
                            {(!this.props.product.border_color ) &&  <Text style={ styles(background_color, this.state.border_color).itemText } >No border: </Text> }
                            <Text style={ (this.props.product.border_color) ? ( styles(background_color, this.state.border_color).borderColorIs) : (styles(background_color, this.state.border_color).borderColorNull) }></Text>
                        </View>
                    } 
                    {(this.state.borderInput) &&
                    <View style={ styles(background_color, this.state.border_color).itemWrap } >
                        <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({border_color: value})} defaultValue={this.state.border_color} />
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                            <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelBorderEdit} />
                        </View>
                    </View>
                    }
                    {(!energyInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            { (this.props.product.energy) && <Text style={ styles(background_color, this.state.border_color).itemText } >{energy}</Text>}
                            { (!this.props.product.energy) && <Text style={ styles(background_color, this.state.border_color).itemText } >No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.energyInput}/>
                        </View>
                    }
                    {(energyInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>  
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({energy: value})} defaultValue={energy} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap } >
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelEnergyEdit} />
                            </View>
                        </View>  
                    } 
                    {(!fatInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            { (this.props.product.fat) && <Text style={ styles(background_color, this.state.border_color).itemText }>{fat}</Text>}
                            { (!this.props.product.fat) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.fatInput} />
                        </View>
                    }
                    {(fatInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fat: value})}} defaultValue={fat} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelFatEdit} />
                            </View>
                        </View>
                    }
                    {(!saturatedInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            {(this.props.product.saturated) && <Text style={ styles(background_color, this.state.border_color).itemText }>{ saturated }</Text>}
                            {(!this.props.product.saturated) && <Text style={ styles(background_color, this.state.border_color).itemText } >No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.saturatedInput} /> 
                        </View>
                    }
                    {(saturatedInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput  style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({saturated: value})}}  defaultValue={saturated} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap } >
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelSaturatedEdit} />
                            </View>
                        </View>
                    }
                    {(!carbsInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            {(this.props.product.carbs) && <Text style={ styles(background_color, this.state.border_color).itemText }>{ carbs }</Text>}
                            {(!this.props.product.carbs) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.carbsInput} />
                        </View>
                    }
                    {(carbsInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({carbs: value})}} defaultValue={carbs} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelCarbsEdit} />
                            </View>
                        </View>
                    }
                    {(!sugarInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap } >
                            {(sugar) && <Text style={ styles(background_color, this.state.border_color).itemText }>{sugar}</Text>}
                            {(!sugar) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.sugarInput} /> 
                        </View>
                    }
                    {(sugarInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({sugar: value})}} defaultValue={sugar} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelSugarEdit} />
                            </View>
                        </View>
                    }
                    {(!fiberInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            {(fiber) && <Text style={ styles(background_color, this.state.border_color).itemText }>{fiber }</Text>}
                            {(!fiber) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.fiberInput} /> 
                        </View>
                    }
                    {(fiberInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fiber: value})}} defaultValue={fiber} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelFiberEdit} />
                            </View>
                        </View>
                    }
                    {(!proteinInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            {(protein) && <Text style={ styles(background_color, this.state.border_color).itemText }>{protein}</Text> }
                            {(!protein) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text> }
                            <Icon name="edit" size={35} color="firebrick" onPress={this.proteinInput} /> 
                        </View>
                    }
                    {(proteinInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({protein: value})}} defaultValue={protein} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelProteinEdit} />
                            </View>
                        </View>
                    }
                    {(!saltInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            {(salt) && <Text style={ styles(background_color, this.state.border_color).itemText }>{this.props.product.salt}</Text>}
                            {(!salt) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.saltInput} /> 
                        </View>
                    }
                    {(saltInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({salt: value})}} defaultValue={salt} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelSaltEdit} />
                            </View>
                        </View>
                    }
                    {(!vitaminsInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            {(vitamins) && <Text style={ styles(background_color, this.state.border_color).itemText }>{vitamins}</Text>}
                            {(!vitamins) && <Text style={ styles(background_color, this.state.border_color).itemText }>No value</Text>}
                            <Icon name="edit" size={35} color="firebrick" onPress={this.vitaminsInput} /> 
                        </View>
                    }
                    {(vitaminsInput) &&
                        <View style={ styles(background_color, this.state.border_color).itemWrap }>
                            <TextInput style={ styles(background_color, this.state.border_color).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({vitamins: value})}} defaultValue={vitamins} />
                            <View style={ styles(background_color, this.state.border_color).itemWrap }>
                                <Icon style={ styles(background_color, this.state.border_color).iconItem } name="check-circle" size={35} color="firebrick" onPress={this.editProduct} />
                                <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelVitaminsEdit} />
                            </View>
                        </View>
                    }
                    {(image ? (
                        <Image style={ styles(background_color, this.state.border_color).image }source={{ uri: image.uri}}/>
                    ) : (
                        <Image style={ styles(background_color, this.state.border_color).image } source={require('../../components_additional/images/noimage.jpeg')} />
                    ))}
                    <Text onPress={ this.changeImage } >Change image</Text>
                </View>
            ))
        )
    }
}

const mapStateToProps = (state) => (console.log("New: ", state.products.product),{
    product: state.products.product,
    loading: state.products.loading, 
    error: state.products.error
})

export default withNavigation(connect(mapStateToProps, {getProduct, editProduct, deleteProduct})(Product))

