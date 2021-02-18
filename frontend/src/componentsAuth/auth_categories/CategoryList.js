import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import StyledButton from '../../components_additional/models/AdminButton';
import Error from '../../components_additional/models/ErrorMsg';

class CategoryList extends Component {

    goToSubcategories = () => {
        this.props.goToSubcategories(this.props.item.id);
    }

    triggerEditFunc = () => {
        this.props.triggerEditFunc()
    }

    changeStateText = (name, value) => {
        this.props.changeStateText(name, value);
    }

    changeImage = () => {
        this.props.changeImage();
    }

    cancelEdit = () => {
        this.props.cancelEdit(this.props.item.id)
    }

    validateSubmit = () => {
        this.props.validateSubmit()
    }

    deleteFunction = () => {
        this.props.deleteCategory(this.props.item.id);
    }

    render() {
        return (
            this.props.editId !== this.props.item.id ? (
                <View style={authCategory().itemContainer} testID="categoriesChild">
                    <View style={authCategory().inactiveBtnsWrap} >
                        <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEditFunc}>
                            <Icon style={authCategory().editBtn} name="pencil"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={authCategory().removeBtnWrap} onPress={this.deleteFunction}>
                            <Icon style={authCategory().removeBtn} name="trash-o" />
                        </TouchableOpacity>
                    </View>
                    <View style={authCategory().inactiveItemWrap}>
                        <View style={authCategory().imageWrap} >
                            {this.props.imageData && this.props.item.id === this.props.editId ? (
                                <Image style={authCategory().imageActiveStyle} source={{ uri: this.props.imageData.uri}} />
                                ) : (
                                this.props.item.image ? (
                                    <Image style={authCategory().imageActiveStyle} source={{ uri: this.props.item.image }} />
                                ) : (
                                    <Image style={authCategory().imageActiveStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                                )  
                            )}
                        </View> 
                        <View style={authCategory().nameTxtWrap}>
                            <Text style={authCategory().nameTxt}>{this.props.item.name}</Text>
                        </View>
                        <View style={authCategory().goToSubBtn }>
                            <StyledButton horizontal={20} vertical={15} title="Subcategories" func={() => this.props.goToSubcategories()} color={colors.mainGrey} />
                        </View>
                    </View>
                    
                </View>
            ) : (
                <View style={authCategory().itemContainer}  >
                    <View style={authCategory().inactiveBtnsWrap} >
                        <TouchableOpacity style={authCategory().editBtnWrap} onPress={() => this.validateSubmit()} >
                            <Icon style={authCategory().editBtn} name="check-circle" />
                        </TouchableOpacity>
                        <TouchableOpacity style={authCategory().cancelBtnWrap} onPress={() =>  this.cancelEdit()} >
                            <Icon style={authCategory().removeBtn} name="times-circle"/>
                        </TouchableOpacity>
                    </View>
                    <View style={authCategory().inactiveItemWrap}>
                        <TouchableOpacity style={authCategory().imageWrapActive} onPress={() => this.changeImage() } >
                        {this.props.imageData && this.props.item.id === this.props.editId ? (
                            <Image style={authCategory().imageActiveStyle} source={{ uri: this.props.imageData.uri }} />
                        ) : (
                            this.props.item.image ? (
                                <Image style={authCategory().imageActiveStyle} source={{ uri: this.props.item.image }} />
                            ) : (
                                <Image style={authCategory().imageActiveStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                            )
                        )}
                         <Icon style={authCategory().uploadIcon} name="upload"/>
                        </TouchableOpacity> 
                        <View style={authCategory().nameTxtWrap}>
                            {this.props.missingName && <Error message={this.props.missingName} /> }
                            {this.props.formatName && <Error message={this.props.formatName}/> }
                            <TextInput style={authCategory(null, this.props.incorrectName).nameEdit} type="text" autoCorrect={false} onChangeText={value => this.changeStateText('editName', value)} defaultValue={this.props.item.name} value={this.props.editName}/>
                        </View>
                        <Text>Background color:</Text>
                        <View style={authCategory().backgroundEditWrap}>
                        {this.props.formatBackground && <Error message={this.props.formatBackground} margin={-37}/> }
                            <Text style={authCategory(this.props.item.background, null).backgroundColor}></Text>
                            <TextInput style={authCategory(null, this.props.formatBackground).backgroundEdit} type="text" autoCorrect={false} onChangeText={value => this.changeStateText('editBackground', value) }  defaultValue={this.props.item.background} value={this.props.editBackground}/>
                        </View>
                    </View>
                 </View>
            )
        )
    }
}
  
CategoryList.propTypes = {
    name: PropTypes.string,
    image: PropTypes.any,
    background: PropTypes.string
}

export default CategoryList