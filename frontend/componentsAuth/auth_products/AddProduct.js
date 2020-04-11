import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, PushNotificationIOS } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { addProduct } from '../../src/actions/productActions';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    }
})

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
            image: null
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log("image response: ", response);

            if (response.uri) {
                this.setState({image: response.uri})
            }   
        })
    }

    addProduct = async() => {
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
            image: this.state.image,
        }
        var id = this.props.match.params.subcategoryId
        await this.props.addProduct(data, id);
        navigation.push(`/products_auth/${this.props.match.params.subcategoryId}`);
    }

        render() {
            const { image } = this.state;
            return (
                <View>
                    <Text>Add New Product</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="energy" onChangeText={value => { this.setState({energy: value})}} value={this.state.energy} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="fat" onChangeText={value => { this.setState({fat: value})}} value={this.state.fat} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="saturated" onChangeText={value => { this.setState({saturated: value})}} value={this.state.saturated} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="carbs" onChangeText={value => { this.setState({carbs: value})}} value={this.state.carbs} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="sugar" onChangeText={value => { this.setState({sugar: value})}} value={this.state.sugar} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="fiber" onChangeText={value => { this.setState({fiber: value})}} value={this.state.fiber} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="protein" onChangeText={value => { this.setState({protein: value})}} value={this.state.protein} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="salt" onChangeText={value => { this.setState({salt: value})}} value={this.state.salt} ref={ref => this.textInputRef = ref} />
                        <TextInput type="text" autoCorrect={false}  placeholder="vitamins" onChangeText={value => { this.setState({vitamins: value})}} value={this.state.vitamins} ref={ref => this.textInputRef = ref} />
                        {image && (
                            <Image source={{ uri: image.uri }} />
                        )}
                        <Button title="Choose image" onPress={this.handleChoosePhoto} />
                        <Button title="Save" className="btn btn-primary" onPress={this.addProduct} />
                        <Button title="Cancel" className="btn btn-primary" />
                </View>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, id) => {
            dispatch(addProduct(product, id));
        }
    }
}
export default connect(null, mapDispatchToProps)(AddProduct)