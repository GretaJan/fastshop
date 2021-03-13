import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { addProduct } from '../../../redux/actions/productActions';
import { withNavigation } from 'react-navigation';
import { colors } from '../../../src/styles/Colors';
import { categoryAdd } from '../../../src/styles/CategoryStyles';
import { postProductStyle } from '../../../src/styles/ProductStyles';
import ButtonStyled from '../../../utils/models/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AddProductRow from './AddProductRow';
import update from 'react-addons-update'; 

class AddProduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            componentsArray: [
                { name: 'name' },
                { name: 'background' },
                { name: 'energy', measure: 'kcal' },
                { name: 'fat', measure: 'g' },
                { name: 'saturated', measure: 'g' },
                { name: 'carbs', measure: 'g' },
                { name: 'sugar', measure: 'g' },
                { name: 'fiber', measure: 'g' },
                { name: 'protein', measure: 'g' },
                { name: 'salt', measure: 'g' },
            ],
            image: null,
            //Verification:
            missingName: null,
            formatName: null,
            incorrectName: false,
            formatEnergy: null,
            decimalFormatFat: null,
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

    setInputValue = (currentItem, value) => {
        let newArray;
        this.state.componentsArray.map((item, index) => {
            if(currentItem === index){
                newArray = update(this.state.componentsArray, {
                    [index]:{
                        $merge: { input: value }
                    }
                });
            }
        })
        this.setState({ componentsArray : newArray });
    } 

    validateSubmit = () => {
        let regexConstEnergy = new RegExp('^[0-9]*$');
        let decimalFormat = new RegExp('^([1-9]|([1-9][0-9]))(\.|\,)[0-9]{1,2}$');
        let colorFormat = new RegExp('^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');
        let newArray;
        let errorMsg;
        let data = {};
        this.state.componentsArray.map((item, index) => {
            let hasError = false;
            if(item.name === 'name') {
              if(item.input === undefined) {
                errorMsg = 'Product name is required';
                hasError = true;
              } else if(item.input.length < 3 && item.input.length > 50){
                    errorMsg = 'Must contain at least 3 and no more than 50 chars';
                    hasError = true;
                } else {
                    data[item.name] = item.input
                }
            } else if(item.name === 'background' && item.input !== undefined) {
                if(!colorFormat.test(item.input)){
                    errorMsg = 'Incorrect color format';
                    hasError = true;
                } else {
                    data[item.name] = item.input;
                }
            } else if(item.name === 'energy' && item.input !== undefined) {
                if(!regexConstEnergy.test(item.input)) {
                    errorMsg = 'Must contain digits only';
                    hasError = true;
                } else {
                    data[item.name] = item.input;
                }
            } else {
                if(item.input !== undefined && !decimalFormat.test(item.input)){
                    errorMsg = 'Must contain decimals only';
                    hasError = true;
                } else {
                    data[item.name] = this.convertDecimal(item.input);
                }
            }
            if(hasError) {
                newArray = update(this.state.componentsArray, {
                    [index] : {
                            $merge: { error: errorMsg }
                    }
                })
                this.setState({ componentsArray: newArray })
            }
        });
     
        var checkContainsErrors = 0;
        let isChecked = 0;
        this.state.componentsArray.map((item, index) => {
            if(item.error !== 'undefined'){
                console.log('item.errrorrr', item.error)
                checkContainsErrors++;
                isChecked++;
            }
            if(isChecked === (index++) && checkContainsErrors === 0 ){
                this.addProduct(data); 
                this.props.navigation.navigate("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
            }
        });
        
    }

    addProduct = (data) => {
        data.image = this.state.image ? "data:" + this.state.image.type + ";base64," + this.state.image.data : null,
        this.props.addProduct(this.props.route.params.subcategoryId, data);
    }
    //decimal with comma change to dots
    convertDecimal = (value) => {
        let decimalFormatComma = new RegExp('^[0-9]{1,2}\,[0-9]{1,2}$');
        if(decimalFormatComma.test(value)){
            let getComma = value.split(',');
            value = getComma[0] + '.' + getComma[1];
        }
        return value;
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={postProductStyle(null, this.props.route.params.background).container}>
                    <FlatList contentContainerStyle={postProductStyle().inputsWrap} data={this.state.componentsArray}  keyExtractor={(item, index) => index.toString()} numColumns={2} renderItem={({item, index}) => ( 
                        <AddProductRow props={ item } 
                                    index={ index }
                                    inputChange={(index, value) => this.setInputValue(index, value) }
                        /> 
                    )} />
                <View style={postProductStyle().imageBtnsFlex}>
                    <View style={postProductStyle().imageBtnWrap} >
                        {this.state.image ? (
                            <TouchableOpacity style={postProductStyle().imageWrap} onPress={this.handleChoosePhoto}  >
                                <Image style={postProductStyle().imageStyle} source={{ uri: this.state.image.uri }} />
                                <Icon style={categoryAdd().uploadIcon} name="upload"/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={postProductStyle().imageWrap} onPress={this.handleChoosePhoto} >
                                <Image style={postProductStyle().imageStyle} source={require('../../../src/images/noimage.jpeg')} />
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

AddProduct.propTypes = {
    addProduct: PropTypes.func,
    name: PropTypes.string,
    energy:  PropTypes.number,
    fat:  PropTypes.number,
    saturated:  PropTypes.number,
    carbs:  PropTypes.number,
    sugar: PropTypes.number,
    fiber: PropTypes.number,
    protein: PropTypes.number,
    salt: PropTypes.number,
    image: PropTypes.any,
    background: PropTypes.string,
}

export default withNavigation(connect(null, { addProduct })(AddProduct))