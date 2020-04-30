import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Input, Button, Form } from 'react-native-elements';
import { styles } from '../../components_additional/styles/LoginStyles';
import { withNavigation } from 'react-navigation';
import { tryLogin } from '../../src/actions/authActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonStyled from '../../components_additional/Button';
import { colors } from '../../components_additional/styles/Colors';

//components
import Error from '../../components_additional/ErrorMsg';

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            admin_name: '',
            email:'',
            password: '',
            error: null,
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    loginAdmin = async (event) => {
        console.log(event.nativeEvent);
        const data = {
            name: this.state.admin_name,
            email: this.state.email,
            password: this.state.password
        }
        await this.props.tryLogin(data);
       if(this.props.error) {
           this.setState({error: this.props.error})
       } else {
        this.setState({error: null})
       }
        // this.clearInputs();
    }

    cancelLogin = () => {
        this.props.navigation.goBack();
    }

        render() {
            return (
                <View style={styles().container} > 
                    <View style={styles().inputsWrap} >
                        { this.state.error &&
                            <Error message={this.props.error} margin={-40} left={'10%'}/>
                        }
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({admin_name: value})}} value={this.state.admin_name} ref={ref => this.textInputRef = ref} />
                        <TextInput style={styles().textInput} type="email" autoCorrect={false}  placeholder="email" onChangeText={value => { this.setState({email: value})}} value={this.state.email} ref={ref => this.textInputRef = ref}/>
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  secureTextEntry={true} placeholder="password" onChangeText={value => { this.setState({password: value})}} value={this.state.password} ref={ref => this.textInputRef = ref} />
                    </View>
                    <View style={styles().buttonsWrap} >
                        <ButtonStyled color={colors.mediumGreen} title={"Login"} func={this.loginAdmin} />
                        <ButtonStyled color={colors.lightBurgundy} title={"Cancel"} func={ this.cancelLogin }/>
                    </View>
                </View>
            )

    }

}

Login.propTypes = {
    tryLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.auth.error
})

export default withNavigation(connect(mapStateToProps, { tryLogin })(Login))