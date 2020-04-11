import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Input, Button, Form } from 'react-native-elements';
import { tryLogin } from '../../src/actions/authActions';

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

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            admin_name: '',
            email:'',
            password: ''
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    loginAdmin = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.admin_name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.tryLogin(data, this.props.history);
        this.clearInputs();
    }

        render() {
            return (
                <View>
                    <Text>Loggin Page</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({admin_name: value})}} value={this.state.admin_name} ref={ref => this.textInputRef = ref} />
                        <TextInput type="email" autoCorrect={false}  placeholder="email" onChangeText={value => { this.setState({email: value})}} value={this.state.email} ref={ref => this.textInputRef = ref}/>
                        <TextInput type="text" autoCorrect={false}  secureTextEntry={true} placeholder="password" onChangeText={value => { this.setState({password: value})}} value={this.state.password} ref={ref => this.textInputRef = ref} />
                        <Button title="LOGIN" className="btn btn-primary" onPress={this.loginAdmin} />
                        <Button title="CANCEL" className="btn btn-primary" onPress={() => navigation.push("Home") } />
                </View>
            )

    }

}

Login.propTypes = {
    tryLogin: PropTypes.func.isRequired
}

export default connect(null, { tryLogin })(Login)