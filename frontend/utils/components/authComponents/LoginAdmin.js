import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { styles } from '../../../utils/styles/AuthStyles';
import { tryLogin } from '../../../redux/actions/authActions';
import ButtonStyled from '../../../utils/models/Button';
import { colors } from '../../../utils/styles/Colors';

//components
import Error from '../../../utils/models/ErrorMsg';
import AuthAnimation from '../../../utils/models/AnimatedAuth';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            admin_name: '',
            email:'',
            password: '',
        }
    }

    loginAdmin = async () => {
        const data = {
            name: this.state.admin_name,
            email: this.state.email,
            password: this.state.password
        }
        await this.props.tryLogin(data);
       
        // this.clearInputs();
    }

    cancelLogin = () => {
        this.props.navigation.goBack();
    }

        render() {
            return (
                <View>
                    { this.props.authenticate &&
                        <AuthAnimation />
                    }
                    <View style={styles().inputsWrap} >
                        { this.props.error &&
                            <Error message={this.props.error} margin={-40} left={'8%'}/>
                        }
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({admin_name: value})}} value={this.state.admin_name} />
                        <TextInput style={styles().textInput} type="email" autoCorrect={false}  placeholder="email" onChangeText={value => { this.setState({email: value})}} value={this.state.email} />
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  secureTextEntry={true} placeholder="password" onChangeText={value => { this.setState({password: value})}} value={this.state.password}  />
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
    error: state.auth.error,
    authenticate: state.authenticate
})

export default withNavigation(connect(mapStateToProps, { tryLogin })(Login))