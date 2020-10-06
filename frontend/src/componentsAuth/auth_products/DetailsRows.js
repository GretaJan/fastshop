import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { stylesGuestSingle, authProduct } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
//Components 
import Error from '../../components_additional/ErrorMsg';

const ProductComponents = ( { props, triggeredName, changeText, triggerEdit, editName, editBackground, editEnergy, editDecimals, errorMsg, cancelEdit } ) => {
    return (
        <View style={authProduct().listItemWrap}>
            <Text style={authProduct().componentTitle} >{ props.title }</Text>
            {triggeredName !== props.title ? (
                <TouchableOpacity style={authProduct().nameItemInfoWrap} onPress={() => triggerEdit()} >
                    <Text style={authProduct().nameItemBackground} >{ props.component !== null ? props.component : '-' }</Text>
                    { (props.title !== 'Background' || props.title !== 'Name') && (
                        <Text style={stylesGuestSingle().componentMeasure} >{props.measure}</Text>
                    )}
                    <Icon style={ authProduct().iconEdit } name="pencil" />
                </TouchableOpacity>
                ) : (
                    <View style={authProduct().listItemInfoWrap} >
                        { errorMsg !== '' && triggeredName === props.title && <Error message={ errorMsg } /> }
                        <TextInput style={ authProduct(null, errorMsg).itemInput } type="text" autoCorrect={false} onChangeText={value => changeText(value) } defaultValue={ props.component !== '' ? (props.component) : ('')} />
                        <View style={ authProduct().iconsWrap } >
                            <TouchableOpacity style={authProduct().saveWrap} onPress={() => {
                                triggeredName === 'Name' && editName()
                                triggeredName === 'Background' && editBackground()
                                triggeredName === 'Energy' && editEnergy()
                                triggeredName !== 'Name' && triggeredName !== 'Background' && triggeredName !== 'Energy' && editDecimals()
                            }}>
                                <Icon style={ authProduct().iconSave } name="check-circle"  />
                            </TouchableOpacity>
                            <TouchableOpacity style={authProduct().cancelBtnImg} onPress={() => cancelEdit()} >
                                <Icon style={ authProduct().iconCancel } name="times-circle" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
        </View>  
    )
}

export default ProductComponents