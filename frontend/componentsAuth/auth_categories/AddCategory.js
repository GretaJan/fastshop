import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Input, Button, Label } from 'react-native-elements';
import { withRouter } from 'react-router-native';
import { addCategory } from '../../src/actions/categoryActions';


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

    addCategory = () => {
        const data = {
            name: this.state.name,
            image: this.state.image,
        }
        console.log('name: ', this.state.name);
        this.props.addCategory(data);
        this.props.history.push('/dashboard')
    }

        render() {
            return (
                <View>
                    <Text>Add New Category</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        <Label>Add image</Label>
                      
                        <Button className="btn btn-primary" onPress={this.addCategory} >Login</Button>
                        <Button className="btn btn-primary" >Cancel</Button>
                </View>
            )

    }

}


export default withRouter(connect(null, { addCategory })(AddCategory))