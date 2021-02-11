import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { saveUserToken } from '../../redux/actions/authActions';
import { URL } from '../../redux/actions/types';
import axios from 'axios';
import Error from '../../components_additional/Error';

function Register({ saveUserToken, navigation: { navigate } }){
    const [email, setEmail] = useState(''); 
    const [error, setError] = useState('');

    function saveEmail(){
        setError('');
        axios.post(`${ URL }/register-user`, {
            email: email
        }).then(response => {
            console.log("")
            console.log("dat", response.data)
            saveUserToken(response.data);
        }).then(() => {
            navigate("Categories")
        }).catch(err => {
            const errorResp = err.response
            if(errorResp){
                if(errorResp.status == 422){
                    const emailErr = errorResp.data.errors.email[0];
                    setError(emailErr)
                    console.log(emailErr)
                }
            } else {
                setError(errorResp)
            }
            console.log(error);
            // setError(error.response)
        })
    }

    return (
        <View>  
            {error !== undefined && <Error message={ error } /> }
            <TextInput 
                value={ email } 
                onChangeText={ (value) => setEmail(value) }
            />
            <TouchableOpacity onPress={ saveEmail } >
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default withNavigation(connect(null, { saveUserToken })(Register))