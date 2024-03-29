import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { saveUserToken } from '../../redux/actions/authActions';
import { textStyle, modalStyles, inputStyles, btnStyles } from '../../src/styles/GeneralStyles';
import { URL } from '../../redux/actions/types';
import axios from 'axios';
// components
import Error from './Error';
import TempPopup from './TempPopup';

const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);
const { modalAnimations } = require('../../src/styles/Animations.js');

function loginFunc(passedUrl, data){

    return axios.post(`${ URL }/${passedUrl}`, data).then(response => {
        return response.data;
    }).catch(err => {
        const errorResp = err.response
        let currentError;
        if(errorResp){
            if(errorResp.status == 422){
                const emailErr = errorResp.data.errors.email[0];
                currentError = {
                    error: emailErr
                }
            } else if(errorResp.status == 401){
                currentError = {
                    codeError: errorResp.data
                } 
            }
            else if(errorResp.status == 405){
                currentError = {
                    expiredError: errorResp.data
                } 
            }
        } else {
            currentError = {
                error: errorResp
            }
        }
        return currentError;
    })
}

function Register({ saveUserToken, refreshPage, close }){
    const scale = useRef(new Animated.Value(0)).current;
    const [email, setEmail] = useState(''); 
    const [codeInput, setCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [codeResent, setCodeResent] = useState('');

    useEffect(() => {
        modalAnimations.modalScale(scale);
    }, [])

    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
             <AnimatedPressable style={ modalStyles(scale, true).animatedContainer } >
                <Text style={ textStyle().h3 }>Login or create a new account</Text>
                    { !codeInput ? (
                        <>
                        <View style={ inputStyles().inputContainer }>
                            {error !== '' && ( <Error message={ error } /> ) }
                            <TextInput 
                                value={ email } 
                                onChangeText={ (value) => setEmail(value) }
                                style={ inputStyles(error).inputGreen }
                            />
                        </View>
                        <TouchableOpacity 
                                onPress={ () => sendCodeToEmail(false) } 
                                style={ btnStyles().inputBtnGreen }
                            >
                            <Text style={ btnStyles().inputBtnText } >Confirm</Text>
                        </TouchableOpacity>
                    </>
                    ) : (
                        <>
                            <View style={ inputStyles().inputContainer }>
                                <Text style={ textStyle().p } >Please enter the code we sent you to Your email</Text>
                                <View style={ inputStyles(error).disabledEmailField }>
                                    <Text style={ textStyle().emailTxt } >{ email }</Text>
                                </View>
                                {error !== '' && ( <Error message={ error } /> ) }
                                <TextInput
                                    value={ code } 
                                    onChangeText={ (value) => setCode(value) }
                                    style={ inputStyles(error).inputGreen }
                                />
                            </View>
                            <View style={ btnStyles().buttonsRowWrap }>
                                <TouchableOpacity 
                                    onPress={ sendCode } 
                                    style={ btnStyles().inputBtnGreen }
                                >
                                    <Text style={ btnStyles().inputBtnText } >Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={ () => sendCodeToEmail(true) } 
                                    style={ btnStyles().inputBtnGrey }
                                >
                                    <Text style={ btnStyles().inputBtnText } >Send code</Text>
                                </TouchableOpacity>
                            </View>
                            { codeResent !== '' && (<TempPopup message={ codeResent } />) }
                        </>
                    ) }
            </AnimatedPressable>
        </TouchableOpacity>
    )

    async function sendCodeToEmail(resentCode){
        setError('');
        let sendData = {
            email: email
        }
        const data = await loginFunc('login-or-register', sendData)
        if(data.token) {
            saveUserToken(data.token, data.user);
            refreshPage();
        } else if(data.type == 'simple_user'){
            setCodeInput(true)
            if(resentCode) {
                setCodeResent('Code resent');
                setTimeout(() => {
                    setCodeResent('');
                }, 300)
            }
        } else if(data == 'is_admin'){
            setAdminInputs(true)
        } else {
            setError(data.error)
        }
    }
    async function sendCode(){
        setError('');
        let sendData = {
            email: email,
            password: code
        }
        const data = await loginFunc('login-user', sendData)
        if(data.token) {
            saveUserToken(data.token, data.user);
            refreshPage();
        } else {
            if(data.expiredError){
                setError(data.expiredError)
            } else {
                setError(data.codeError)
            }
        }
    }
}

export default connect(null, { saveUserToken })(Register)