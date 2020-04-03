import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Input, Button, Form } from 'react-native-elements';
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

    componentDidMount(){
        console.log('cat2!');
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    addCategory = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            image: this.state.image,
        }
        console.log('name: ', this.state.name);
        this.props.addCategory(data, this.props.history);
        this.clearInputs();
    }

        render() {
            return (
                <View>
                    <Text>Add New Category</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        {/* <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({_name: value})}} value={this.state._name} ref={ref => this.textInputRef = ref} /> */}
                        <Button className="btn btn-primary" onPress={this.addCategory} >Login</Button>
                        <Button className="btn btn-primary" >Cancel</Button>
                </View>
            )

    }

}

export default withRouter(connect(null, { addCategory })(AddCategory))