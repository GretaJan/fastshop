import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, PushNotificationIOS } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { addSubcategory } from '../../src/actions/subcategoryActions';
import { withNavigation } from 'react-navigation';


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

class AddSubcategory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.categoryId,
            name: '',
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

    goBack = () => {
        this.props.navigation.goBack();
    }

    addSubcategory = async() => {
        const data = {
            name: this.state.name,
            image: this.state.image,
        }
        var id = this.props.route.params.categoryId
        await this.props.addSubcategory(data, id);
        this.props.navigation.push("Subcategories_Auth", {categoryId: this.state.id});
    }

        render() {
            const { image } = this.state;
            return (
                <View>
                    <Text>Add New Subcategory</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        {/* <Label>Add image</Label> */}
                        {image && (
                            <Image source={{ uri: image.uri }} />
                        )}
                        <Button title="Choose image" onPress={this.handleChoosePhoto} />
                        <Button title="Save" className="btn btn-primary" onPress={this.addSubcategory} />
                        <Button title="Cancel" onPress={this.goBack} className="btn btn-primary" />
                </View>
            )

    }

}

export default withNavigation(connect(null, { addSubcategory })(AddSubcategory))