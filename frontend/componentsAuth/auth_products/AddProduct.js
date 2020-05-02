import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { postProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';
import { colors } from '../../components_additional/styles/Colors';
import { styles } from '../../components_additional/styles/LoginStyles';
import { categoryAdd, authCategory } from '../../components_additional/styles/CategoryStyles';
import { postProductStyle } from '../../components_additional/styles/ProductStyles';
import ButtonStyled from '../../components_additional/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Error from '../../components_additional/ErrorMsg';

class AddProduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
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
            image: null,
            background: '',
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
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: false
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response})
            }   
        })
    }

    validateSubmit = () => {
        const { missingName, formatName, incorrectName, formatEnergy, formatFat, formatSaturated, formatCarbs, formatSugar, formatFiber, formatProtein, formatSalt, formatVitamins, formatBackground } = this.state;
        let regexConstEnergy = new RegExp('^[0-9]*$');
        let regexConstDecimals = new RegExp('^[0-9]+[,.][0-9]$');  
        let regexColorWord = new RegExp('^[a-zA-Z]+$');
        let regexHex = new RegExp('#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if(this.state.name.length === 0 || this.state.name.length < 3 || (this.state.energy.length > 0 && !regexConstEnergy.test(this.state.energy)) || (this.state.fat.length > 0 && !regexConstDecimals.test(this.state.fat))
            || this.state.saturated.length > 0 && !regexConstDecimals.test(this.state.saturated) || (this.state.carbs.length > 0 && !regexConstDecimals.test(this.state.carbs)) ||
            (this.state.sugar.length > 0 && !regexConstDecimals.test(this.state.sugar)) || ((this.state.sugar.length > 0 && !regexConstDecimals.test(this.state.sugar))) ||
            (this.state.fiber.length > 0 && !regexConstDecimals.test(this.state.fiber)) || (this.state.protein.length > 0 && !regexConstDecimals.test(this.state.protein)) ||
            (this.state.salt.length > 0 && !regexConstDecimals.test(this.state.salt)) || this.state.vitamins.length > 0 && !regexConstDecimals.test(this.state.vitamins)) {
            if (this.state.name.length === 0) {
                this.setState({missingName: 'Product name is required', formatName: null, incorrectName: true});
            } else if(this.state.name.length < 3 ) {
                this.setState({formatName: 'Must contain at least 3 characters', missingName: null, incorrectName: true});
            } else {
                this.setState({missingName: null, formatName: null, incorrectName: false});
                console.log("yre");
            }
            if(this.state.energy.length > 0 && !regexConstEnergy.test(this.state.energy)) {
                this.setState({formatEnergy: 'Must contain digits only'})
            } else {
                this.setState({formatEnergy: null});
            }
            if(this.state.fat.length > 0 && !regexConstDecimals.test(this.state.fat)) {
                this.setState({formatFat: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatFat: null});
            } 
            if(this.state.saturated.length > 0 && !regexConstDecimals.test(this.state.saturated)) {
                this.setState({formatSaturated: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSaturated: null});
            }
            if(this.state.carbs.length > 0 && !regexConstDecimals.test(this.state.carbs)) {
                this.setState({formatCarbs: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatCarbs: null});
            }
            if(this.state.sugar.length > 0 && !regexConstDecimals.test(this.state.sugar)) {
                this.setState({formatSugar: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSugar: null});
            }
            if(this.state.fiber.length > 0 && !regexConstDecimals.test(this.state.fiber)) {
                this.setState({formatFiber: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatFiber: null});
            }
            if(this.state.protein.length > 0 && !regexConstDecimals.test(this.state.protein)) {
                this.setState({formatProtein: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatProtein: null});
            }
            if(this.state.salt.length > 0 && !regexConstDecimals.test(this.state.salt)) {
                this.setState({formatSalt: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatSalt: null});
            }
            if(this.state.vitamins.length > 0 && !regexConstDecimals.test(this.state.vitamins)) {
                this.setState({formatVitamins: 'Format: 0.0/00.0'});
            } else {
                this.setState({formatVitamins: null});
            }
            if(this.state.background.length > 0 ) {
                if(!regexColorWord.test(this.state.background) && !regexHex.test(this.state.background) &&
                        !regRGB.test(this.state.background) && !regRGBA.test(this.state.background)) {
                this.setState({formatBackground: 'Invalid color format'});
                } else {
                    this.setState({formatBackground: null});
                }
            } else {
                this.setState({formatBackground: null});
            }
        } else {
            this.addProduct(); 
            this.props.navigation.navigate("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
        }
    }

    addProduct = () => {
        const data = {
            name: this.state.name,
            background_color: this.state.background,
            energy: this.state.energy,
            fat: this.state.fat,
            saturated: this.state.saturated,
            carbs: this.state.carbs,
            sugar: this.state.sugar,
            fiber: this.state.fiber,
            protein: this.state.protein,
            salt: this.state.salt,
            vitamins: this.state.vitamins,
            image: this.state.image ? "data:" + this.state.image.type + ";base64," + this.state.image.data : null,
        }
        this.props.postProduct(this.props.route.params.subcategoryId, data);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

        render() {
            return (
                <ScrollView style={postProductStyle(null, this.props.route.params.background).container}>
                    <View style={postProductStyle().inputsWrap} >
                        <View style={postProductStyle().singleWrap}>
                            {this.state.missingName && <Error message={this.state.missingName} /> }
                            {this.state.formatName && <Error message={this.state.formatName} /> }
                            <TextInput style={postProductStyle(this.state.incorrectName).textInputName} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatEnergy && <Error message={this.state.formatEnergy} /> }
                            <TextInput style={postProductStyle(this.state.formatEnergy).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="energy" onChangeText={value => { this.setState({energy: value})}} value={this.state.energy} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>kcal</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatFat && <Error message={this.state.formatFat} /> }
                            <TextInput style={postProductStyle(this.state.formatFat).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="fat" onChangeText={value => { this.setState({fat: value})}} value={this.state.fat} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatSaturated && <Error message={this.state.formatSaturated} /> }
                            <TextInput style={postProductStyle(this.state.formatSaturated).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="saturated" onChangeText={value => { this.setState({saturated: value})}} value={this.state.saturated} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatCarbs && <Error message={this.state.formatCarbs} /> }
                            <TextInput style={postProductStyle(this.state.formatCarb).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="carbs" onChangeText={value => { this.setState({carbs: value})}} value={this.state.carbs} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatSugar && <Error message={this.state.formatSugar} /> }
                            <TextInput style={postProductStyle(this.state.formatSugar).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="sugar" onChangeText={value => { this.setState({sugar: value})}} value={this.state.sugar} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatFiber && <Error message={this.state.formatFiber} /> }
                            <TextInput style={postProductStyle(this.state.formatFiber).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="fiber" onChangeText={value => { this.setState({fiber: value})}} value={this.state.fiber} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatProtein && <Error message={this.state.formatProtein} /> }
                            <TextInput style={postProductStyle(this.state.formatProtein).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="protein" onChangeText={value => { this.setState({protein: value})}} value={this.state.protein} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatSalt && <Error message={this.state.formatSalt} /> }
                            <TextInput style={postProductStyle(this.state.formatSalt).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="salt" onChangeText={value => { this.setState({salt: value})}} value={this.state.salt} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {this.state.formatVitamins && <Error message={this.state.formatVitamins} /> }
                            <TextInput style={postProductStyle(this.state.formatVitamins).textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="vitamins" onChangeText={value => { this.setState({vitamins: value})}} value={this.state.vitamins} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap} >
                            {this.state.formatBackground && <Error message={this.state.formatBackground} /> }
                            <TextInput style={postProductStyle(this.state.formatBackground).textInputBackground} type="text" maxLength={30} autoCorrect={false}  placeholder="backround color" onChangeText={value => { this.setState({background: value})}} value={this.state.background} ref={ref => this.textInputRef = ref} />
                        </View>
                    </View>
                    <View style={postProductStyle().imageBtnsFlex}>
                        <View style={postProductStyle().imageBtnWrap} >
                            {this.state.image ? (
                                <TouchableOpacity style={postProductStyle().imageWrap} onPress={this.handleChoosePhoto}  >
                                    <Image style={postProductStyle().imageStyle} source={{ uri: this.state.image.uri }} />
                                    <Icon style={categoryAdd().uploadIcon} name="upload"/>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={postProductStyle().imageWrap} onPress={this.handleChoosePhoto} >
                                    <Image style={postProductStyle().imageStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                                    <Icon style={categoryAdd().uploadIcon} name="upload"/>
                                </TouchableOpacity> 
                            )}
                        </View>
                        <View style={postProductStyle().buttonsWrap} >
                            <ButtonStyled color={colors.mediumGreen}  width={115} height={55} title={"Save"} func={() => this.validateSubmit()} />
                            <ButtonStyled color={colors.lightBurgundy}  width={115} height={55} title={"Cancel"} func={() => this.goBack() } />
                        </View>
                    </View>    
                    
                </ScrollView>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postProduct: (id, product) => {
            dispatch(postProduct(id, product));
        }
    }
}
export default withNavigation(connect(null, mapDispatchToProps)(AddProduct))