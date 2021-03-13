import React from 'react';
import { View, TextInput } from 'react-native';
import { postProductStyle } from '../../../src/styles/ProductStyles';
import Error from '../../../utils/models/ErrorMsg';

const AddProductRow = ({ props, index, inputChange }) => {
    const errorMsg = (msg) => {
        return (
            <Error message={msg} />
        )
    }

    return (
        <View style={postProductStyle().singleWrap}>
            {props.error !== undefined && errorMsg(props.error) }
            <TextInput style={postProductStyle(props.error).textInputName} type="text" autoCorrect={false}  placeholder={props.name} onChangeText={(value) => inputChange(index, value)} value={props.input} />
        </View>
    )
}

export default AddProductRow