import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { postProduct } from '../../src/actions/productActions';
import { withNavigation } from 'react-navigation';
import { colors } from '../../components_additional/styles/Colors';
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
            //Verification:
            missingName: null,
            formatName: null,
            formatEnergy: null,
            formatFat: null,
            formatSaturated: null,
            formatCarbs: null,
            formatSugar: null,
            formatFiber: null,
            formatProtein: null,
            formatSalt: null,
            formatVitamins: null,
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

    verification = () => {
        const regexConst = new RegExp('^\d\d+(\.[1-9])?$');
        const regexConst = new RegExp(' ^(\d+)?([.,]?\d{0,2})?$');
        // name: '',
        //     energy: '',
        //     fat: '',
        //     saturated: '',
        //     carbs: '',
        //     sugar: '',
        //     fiber: '',
        //     protein: '',
        //     salt: '',
        //     vitamins: '',
        if (!this.state.name.length) {
            this.setState({missingName: 'Product name is required.'})
        }
        if(this.state.name.length < 3 ) {
            this.setState({missingName: 'Product name must contain at least 3 characters'})
        }
    }

    addProduct = async () => {
        const data = {
            name: this.state.name,
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
        console.log(data);
        await this.props.postProduct(this.props.route.params.subcategoryId, data);
        this.props.navigation.navigate("Products_Auth", {subcategoryId: this.props.route.params.subcategoryId});
    // this.props.navigation.goBack();
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

        render() {
            return (
                <ScrollView style={postProductStyle().container}>
                    <View style={postProductStyle().inputsWrap} >
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Name</Text> */}
                            <TextInput style={postProductStyle().textInputName} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Energy</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="energy" onChangeText={value => { this.setState({energy: value})}} value={this.state.energy} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>kcal</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Fat</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="fat" onChangeText={value => { this.setState({fat: value})}} value={this.state.fat} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Saturated</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="saturated" onChangeText={value => { this.setState({saturated: value})}} value={this.state.saturated} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Carbs</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="carbs" onChangeText={value => { this.setState({carbs: value})}} value={this.state.carbs} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Sugar</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="sugar" onChangeText={value => { this.setState({sugar: value})}} value={this.state.sugar} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Fiber</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="fiber" onChangeText={value => { this.setState({fiber: value})}} value={this.state.fiber} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Protein</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="protein" onChangeText={value => { this.setState({protein: value})}} value={this.state.protein} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Salt</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="salt" onChangeText={value => { this.setState({salt: value})}} value={this.state.salt} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
                        </View>
                        <View style={postProductStyle().singleWrap}>
                            {/* <Text style={postProduct().singleName}>Vitamins</Text> */}
                            <TextInput style={postProductStyle().textInput} type="text" maxLength={4} autoCorrect={false}  placeholder="vitamins" onChangeText={value => { this.setState({vitamins: value})}} value={this.state.vitamins} ref={ref => this.textInputRef = ref} />
                            <Text style={postProductStyle().measure}>g</Text>
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
                            {/* <ButtonStyled color={colors.orangeBright} title={"Add image"} func={this.handleChoosePhoto} /> */}
                        </View>
                        <View style={postProductStyle().buttonsWrap} >
                            <ButtonStyled color={colors.mediumGreen}  width={115} height={55} title={"Save"} func={() => this.addProduct()} />
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