import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, PushNotificationIOS } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { addCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

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

class AddCategory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            image: null
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: false,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response})
            }   
        })
    }

    addCategory = async () => {
        const { image, name } = this.state;

        const data = {
            image: "data:" + image.type + ";base64," + image.data,
            name: name
        }

        this.props.addCategory(data);
        this.props.navigation.push("Dashboard");

    }

        render() {
            return (
                <View>
                    <Text>Add New Category</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        {/* <Label>Add image</Label> */}
                        {this.state.image && (
                            <View>
                                <Image style={{width: 50, height: 50}} source={{ uri: this.state.image.uri }} />
                            </View>
                        )}
                        <Button title="Choose image" onPress={this.handleChoosePhoto} />
                        <Button title="Save" className="btn btn-primary" onPress={this.addCategory} />
                        <Button title="Cancel" className="btn btn-primary" />
                </View>
            )

    }

}

export default withNavigation(connect(null, { addCategory })(AddCategory))