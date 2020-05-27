import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
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
import LoadingError from '../../components_additional/Error';
import ConfirmModal from '../../components_additional/ModalCrud';
import Error from '../../components_additional/ErrorMsg';

class Product extends Component {
    state = {
        id: this.props.route.params.productId,
        subcategoryId: this.props.route.params.subcategoryId,
        image: this.props.product.image,
        imageData: null,
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
        background: this.props.product.background,
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
        confirm: false,
         //Verification:
         missingName: null,
         formatName: null,
         incorrectName: false,
         formatEnergy: null,
         formatFat: null,
         formatSaturated: null,
         formatCarbs: null,
         formatSugar: null,
         formatFiber: null,
         formatProtein: null,
         formatSalt: null,
         formatVitamins: null,
         formatBackground: null,
    }

     componentDidMount() {
         this.props.getProduct( this.props.route.params.subcategoryId, this.props.route.params.productId);

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

    editName = async() => {
        if (this.state.name.length === 0) {
            this.setState({missingName: 'Product name is required', formatName: null, incorrectName: true});
        } else if(this.state.name.length < 3 ) {
            this.setState({formatName: 'Must contain at least 3 characters', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
            this.props.navigation.setParams({ name: this.state.name });
            const data = {
                name: this.state.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.props.product.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            console.log("name: ",this.state.name, ' ', this.props.product.id )
            this.cancelNameEdit();
        }
    }
    editBackground = async () => {
        let regexColorWord = new RegExp('^[a-zA-Z]+$');
        let regexHex = new RegExp('#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if(this.state.background.length > 0 ) {
            if (!regexColorWord.test(this.state.background) && !regexHex.test(this.state.background) &&
                !regRGB.test(this.state.background) && !regRGBA.test(this.state.background) 
                ) {
                this.setState({formatBackground: 'Invalid color format'});
                console.log("background", regexHex.test(this.state.background))
            } else {
                this.setState({formatBackground: null});
                this.setState({formatBackground: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.state.background,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelBackgroundEdit();
            }
        } else {
            this.setState({formatBackground: null});
            const data = {
                name: this.props.product.name,
                background_color: this.state.background,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.props.product.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelBackgroundEdit();
        }

    }

    editEnergy = () => {
        let regexConstEnergy = new RegExp('^[0-9]*$');
        if(this.state.energy.length > 0 && !regexConstEnergy.test(this.state.energy)) {
            this.setState({formatEnergy: 'Must contain digits only'})
        } else {
            this.setState({formatEnergy: null});
            this.editProduct();
            this.cancelEnergyEdit();
        }
    }
    editFat = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.fat.length > 0) {
            if (!regexConstDecimals.test(this.state.fat)) {
                this.setState({formatFat: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatEnergy: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.state.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelFatEdit();
            }
        } else {
            this.setState({formatEnergy: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.state.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelFatEdit();
        }

    }

    editSaturated = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.saturated.length > 0) 
            if(!regexConstDecimals.test(this.state.saturated)) {
            this.setState({formatSaturated: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSaturated: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.state.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelSaturatedEdit();
        } else {
            this.setState({formatSaturated: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.state.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.props.product.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelSaturatedEdit();
        }
    }
    editCarbs = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.carbs.length > 0) {
            if(!regexConstDecimals.test(this.state.carbs)) {
            this.setState({formatCarbs: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatCarbs: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.state.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelCarbsEdit();
            }
        } else {
            this.setState({formatCarbs: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.state.carbs,
                sugar: this.props.product.sugar,
                fiber: this.props.product.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelCarbsEdit();
        }
    }
    editSugar = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.sugar.length > 0) { 
            if(!regexConstDecimals.test(this.state.sugar)) {
            this.setState({formatSugar: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSugar: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.state.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelSugarEdit();
            }
        } else {
            this.setState({formatSugar: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.state.sugar,
                fiber: this.props.product.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelSugarEdit();
        }
    }
    editFiber = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.fiber.length > 0){ 
            if(!regexConstDecimals.test(this.state.fiber)) {
            this.setState({formatFiber: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatFiber: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.state.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelFiberEdit();
            }
        } else {
            this.setState({formatFiber: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.state.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelFiberEdit();
        }
    }
    editProtein = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.protein.length > 0) { 
            if(!regexConstDecimals.test(this.state.protein)) {
            this.setState({formatProtein: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatProtein: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.state.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelProteinEdit();
            }
        } else {
            this.setState({formatFiber: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.state.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelFiberEdit();
        }
    }
    editSalt = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.salt.length > 0) {
            if(!regexConstDecimals.test(this.state.salt)) {
            this.setState({formatSalt: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSalt: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.state.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.props.product.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelSaltEdit();
            }
        } else {
            this.setState({formatFiber: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.state.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelFiberEdit();
        }
    }
    editVitamins = async() => {
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');
        if(this.state.vitamins.length > 0) {
            if(!regexConstDecimals.test(this.state.vitamins)) {
            this.setState({formatVitamins: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatVitamins: null});
                const data = {
                    name: this.props.product.name,
                    background_color: this.props.product.background_color,
                    energy: this.props.product.energy,
                    fat: this.props.product.fat,
                    saturated:  this.props.product.saturated,
                    carbs: this.props.product.carbs,
                    sugar: this.props.product.sugar,
                    fiber: this.props.product.fiber,
                    protein: this.props.product.protein,
                    salt: this.props.product.salt,
                    vitamins: this.state.vitamins,
                    image: this.props.product.image,
                    "_method": "put", 
                }
                await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
                this.cancelVitaminsEdit();
            }
        } else {
            this.setState({formatFiber: null});
            const data = {
                name: this.props.product.name,
                background_color: this.props.product.background_color,
                energy: this.props.product.energy,
                fat: this.props.product.fat,
                saturated:  this.props.product.saturated,
                carbs: this.props.product.carbs,
                sugar: this.props.product.sugar,
                fiber: this.state.fiber,
                protein: this.props.product.protein,
                salt: this.props.product.salt,
                vitamins: this.props.product.vitamins,
                image: this.props.product.image,
                "_method": "put", 
            }
            await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
            this.cancelFiberEdit();
        }
    }
    editProduct = () => {
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
            image: this.state.imageData ? "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data : this.props.product.image,
            "_method": "put"
        }
        this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
    }
    editImage = async() => {
        const data = {
            name: this.props.product.name,
            background_color: this.props.product.background_color,
            energy: this.props.product.energy,
            fat: this.props.product.fat,
            saturated: this.props.product.saturated,
            carbs: this.props.product.carbs,
            sugar: this.props.product.sugar,
            fiber: this.props.product.fiber,
            protein: this.props.product.protein,
            salt: this.props.product.salt,
            vitamins: this.props.product.vitamins,
            image: this.state.imageData ? "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data : this.props.product.image,
            "_method": "put"
        }
        await this.props.editProduct(this.props.product.subcategory_id, this.props.product.id, data); 
        this.cancelImageEdit();
    }

    deleteProduct = () => {
        this.props.deleteProduct(this.props.product.id);
        this.props.navigation.push("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
    }

    closeModal = () => {
        this.setState({confirm: false});
    }

    render() {
        const { nameInput, imageInput, energyInput, fatInput, 
            saturatedInput, carbsInput, sugarInput, fiberInput, proteinInput, saltInput, vitaminsInput, background, backgroundInput, imageData, 
            incorrectName, formatEnergy, formatFat, formatSaturated, formatCarbs, formatSugar, formatFiber, formatProtein, formatSalt,
            formatVitamins, formatBackground} = this.state;
        // const {image, background_color} = this.props.product;
        const { name, image, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, background_color } = this.props.product;

        return (
                 this.props.loading ? (
                    <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                        <Loading />
                    </View>
                    ) : (
                    this.props.error !== '' ? (
                        <View style={backgroundForPages(colors.mainWhiteYellow).backgroundContainer} >
                            <LoadingError message={this.props.error} />
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
                                    <Image style={stylesGuestSingle().image} source={{ uri: imageData.uri }} />
                                    
                                //     <TouchableOpacity style={authProduct().editBtnWrapImg} onPress={() => this.imageInput()} >
                                //         <Icon style={authProduct().editImgIcon} name="pencil"/>
                                //     </TouchableOpacity>
                                // </View>
                                ) : (
                                    image ? (
                                        <Image style={stylesGuestSingle().image} source={{ uri: image}} onPress={() => this.imageInput()} />
                                        ) : (
                                        <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')} onPress={() => this.imageInput()} />
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
                                            <Image style={stylesGuestSingle().image} source={{ uri: imageData.uri }} />
                                        ) : (
                                            image ? (
                                                <Image style={stylesGuestSingle().image} source={{uri: image}} />
                                            ) : (
                                                <Image style={stylesGuestSingle().image} source={require('../../components_additional/images/noimage.jpeg')} />
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
                            <View style={authProduct(background_color).triangle} ></View>
                            <View style={authProduct(background_color).underTriangle} ></View>
                            <View style={authProduct(background_color).listContainer} >
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentNameTitle} >Name</Text>
                                {!nameInput ? (
                                    <TouchableOpacity style={authProduct().nameItemInfoWrap} onPress={() => this.nameInput()} >
                                        <Text style={authProduct().nameItemBackground} >{name ? name : '-' }</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" />
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            {this.state.missingName && <Error message={this.state.missingName} /> }
                                            {this.state.formatName && <Error message={this.state.formatName} /> }
                                            <TextInput style={ authProduct(null, incorrectName).nameItemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({name: value})} defaultValue={(name) ? (name) : ('-')} />
                                            <View style={ authProduct().iconsWrap } >
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editName()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle"  />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelNameEdit()} >
                                                    <Icon style={ authProduct().iconCancel } name="times-circle" />
                                                </TouchableOpacity>
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
                                            {formatBackground && <Error message={formatBackground} /> }
                                            <TextInput style={ authProduct(null, formatBackground).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({background: value})} defaultValue={(background) ? (background) : ('-')} />
                                            <View style={ authProduct().iconsWrap } >
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editBackground()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelBackgroundEdit()} >
                                                    <Icon style={ authProduct().iconCancel } name="times-circle" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Energy</Text>
                                {!energyInput ? (
                                <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.energyInput()} >
                                    <Text style={stylesGuestSingle().componentAmount}>{ (energy) ? (energy) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >kcal</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil"/>
                                </TouchableOpacity>
                                    ) : (
                                    <View style={authProduct().listItemInfoWrap}>
                                        {formatEnergy && <Error message={formatEnergy} /> }
                                        <TextInput style={ authProduct(null, formatEnergy).itemInput } type="text" autoCorrect={false} onChangeText={value => this.setState({energy: value})} defaultValue={(energy) ? (energy.toString()) : ('-')} />
                                        <View style={ authProduct().iconsWrap } >
                                            <TouchableOpacity style={authProduct().saveWrap}onPress={() => this.editEnergy()}>
                                                <Icon style={ authProduct().iconSave } name="check-circle"  />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelEnergyEdit()}  >
                                                <Icon style={ authProduct().iconCancel } name="times-circle"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Fat</Text>
                                {!fatInput ? (
                                <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.fatInput()} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (fat) ? (fat) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil"  />
                                </TouchableOpacity>
                                ) : (
                                    <View style={authProduct().listItemInfoWrap} >
                                        {formatFat && <Error message={formatFat} /> }
                                        <TextInput style={ authProduct(null, formatFat).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fat: value})}} defaultValue={(fat) ? (fat) : ('-') } />
                                        <View style={ authProduct().iconsWrap }>
                                            <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editFat()}>
                                                <Icon style={ authProduct().iconSave } name="check-circle" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={authProduct().cancelBtnImg}  onPress={() => this.cancelFatEdit()} >
                                                <Icon  style={ authProduct().iconCancel }name="times-circle" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Saturated fat</Text>
                                {!saturatedInput ? (
                                <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.saturatedInput()}>
                                    <Text style={stylesGuestSingle().componentAmount} >{ (saturated) ? (saturated) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                </TouchableOpacity>
                                    ) : (
                                    <View style={authProduct().listItemInfoWrap} >
                                        {formatSaturated && <Error message={formatSaturated} /> }
                                        <TextInput  style={ authProduct(null, formatSaturated).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({saturated: value})}}  defaultValue={(saturated) ? (saturated) : ('-')} />
                                        <View style={ authProduct().iconsWrap } >
                                            <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editSaturated()}>
                                                <Icon style={ authProduct().iconSave } name="check-circle" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelSaturatedEdit()} >
                                                <Icon style={ authProduct().iconCancel } name="times-circle"  />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={authProduct().listItemWrap}>
                                <Text style={authProduct().componentTitle} >Carbohidrates</Text>
                                {!carbsInput ? (
                                <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.carbsInput()} >
                                    <Text style={stylesGuestSingle().componentAmount} >{ (carbs) ? (carbs) : ('-') }</Text>
                                    <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                    <Icon  style={ authProduct().iconEdit }name="pencil" />
                                </TouchableOpacity>
                                ) : (
                                    <View style={authProduct().listItemInfoWrap} >
                                        {formatCarbs && <Error message={formatCarbs} /> }
                                        <TextInput style={ authProduct(null, formatCarbs).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({carbs: value})}} defaultValue={(carbs) ? (carbs) : ('-')} />
                                        <View style={ authProduct().iconsWrap }>
                                            <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editCarbs()}>
                                                <Icon style={ authProduct().iconSave } name="check-circle" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelCarbsEdit()} >
                                                <Icon  style={ authProduct().iconCancel } name="times-circle" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >sugar</Text>
                                    {!sugarInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.sugarInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (sugar) ? (sugar) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil"  /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            {formatSugar && <Error message={formatSugar} /> }
                                            <TextInput style={ authProduct(null,formatSugar).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({sugar: value})}} defaultValue={(sugar) ? (sugar) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editSugar()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelSugarEdit()} >
                                                    <Icon  style={ authProduct().iconCancel }name="times-circle"  />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >fiber</Text>
                                    {!fiberInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.fiberInput()}  >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (fiber) ? (fiber) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            {formatFiber && <Error message={formatFiber} /> }
                                            <TextInput style={ authProduct(null, formatFiber).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({fiber: value})}} defaultValue={(fiber) ? (fiber) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editFiber()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={this.cancelFiberEdit} >
                                                    <Icon  style={ authProduct().iconCancel } name="times-circle" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>    
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >protein</Text>
                                    {!proteinInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.proteinInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (protein) ? (protein) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil" /> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            {formatProtein && <Error message={formatProtein} /> }
                                            <TextInput style={ authProduct(null, formatProtein).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({protein: value})}} defaultValue={(protein) ? (protein) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editProtein()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelProteinEdit()} >
                                                    <Icon  style={ authProduct().iconCancel } name="times-circle" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >salt</Text>
                                    {!saltInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap}  onPress={() => this.saltInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (salt) ? (salt) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit }name="pencil"/> 
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={authProduct().listItemInfoWrap} >
                                            {formatSalt && <Error message={formatSalt} /> }
                                            <TextInput style={ authProduct(null, formatSalt).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({salt: value})}} defaultValue={(salt) ? (salt) : ('-')} />
                                            <View style={ authProduct().iconsWrap }>
                                                <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editSalt()}>
                                                    <Icon style={ authProduct().iconSave } name="check-circle" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelSaltEdit()} >
                                                    <Icon  style={ authProduct().iconCancel } name="times-circle" />
                                                </TouchableOpacity>
                                            </View>
                                        </View> 
                                    )}
                                </View>
                                <View style={authProduct().listItemWrap}>
                                    <Text style={authProduct().componentTitle} >vitamins</Text>
                                    {!vitaminsInput ? (
                                    <TouchableOpacity style={authProduct().listItemInfoWrap} onPress={() => this.vitaminsInput()} >
                                        <Text style={stylesGuestSingle().componentAmount} >{ (vitamins) ? (vitamins) : ('-') }</Text>
                                        <Text style={stylesGuestSingle().componentMeasure} >g</Text>
                                        <Icon  style={ authProduct().iconEdit } name="pencil"/> 
                                    </TouchableOpacity>
                                ) : (
                                    <View style={authProduct().listItemInfoWrap} >
                                        {formatVitamins && <Error message={formatVitamins} /> }
                                        <TextInput style={ authProduct(null, formatVitamins).itemInput } type="text" autoCorrect={false} onChangeText={value => { this.setState({vitamins: value})}} defaultValue={(vitamins) ? (vitamins) : ('-')} />
                                        <View style={ authProduct().iconsWrap }>
                                            <TouchableOpacity style={authProduct().saveWrap} onPress={() => this.editVitamins()}>
                                                <Icon style={ authProduct().iconSave } name="check-circle" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => this.cancelVitaminsEdit()} >
                                                <Icon  style={ authProduct().iconCancel } name="times-circle" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    )}
                                </View>
                            </View> 
                            </View>
                        </ScrollView>
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
