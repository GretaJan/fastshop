import React, {Component} from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { editSubcategory } from '../../src/actions/subcategoryActions';
import {styles} from '../../components_additional/styles/SubcategoryStyles';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';
import Error from '../../components_additional/ErrorMsg';

//Components
import StyledButton from '../../components_additional/AdminButton';

class SubcategoryList extends Component {
    state = {
        name: this.props.item.name,
        imageData: null,
        background: this.props.item.background_color, 
        triggerEdit: false,
        formatName: null,
        missingName: null,
        incorrectName: null,
        formatBackground: null,
    }

    goToProducts = () => {
        this.props.goToProducts();
    }

    triggerEdit = () => {
        this.setState({triggerEdit: true})
    }

    cancelEdit = () => {
        this.setState({triggerEdit: false})
    }

    changeImage = () => {
        const options = {
            noData: false
        }
        this.setState({imageData: null})
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({
                                imageData: response,
                            });
            } else {
                this.setState({imageData: null})
            }
        })
    }

    validateSubmit = () => {
        let regexColorWord = new RegExp('^[a-zA-Z]+$');
        let regexHex = new RegExp('#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if (this.state.name === '') {
            this.setState({missingName: 'Name is required', formatName: null, incorrectName: true});
        } else if(this.state.name.length < 3 ) {
            this.setState({formatName: '3 characters required', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if( this.state.background !== null ){
            if(!regexColorWord.test(this.state.background) && !regexHex.test(this.state.background) &&
                !regRGB.test(this.state.background) && !regRGBA.test(this.state.background)) {
            this.setState({formatBackground: 'Invalid color format'});
            console.log("fail", this.state.background)
            } else {
                this.setState({formatBackground: null});
            }
        } else {
            this.setState({formatBackground: null});
        }

        if(this.state.incorrectName === false && this.state.formatBackground === null) {
            this.editSubcategory();
            this.cancelEdit();
        }
    }

    editSubcategory = async () => {

        const data = {
            name: this.state.name,
            background_color: this.state.background,
            image: this.state.imageData !== null ? ("data:" + this.state.imageData.type + ";base64," + this.state.imageData.data) : (this.props.item.image),
            "_method": "put"
        }
        await this.props.editSubcategory(this.props.item.category_id, this.props.item.id, data);
    }

    deleteFunction = () => {
        this.props.deleteSubcategory(this.props.item.id);
    }

render() {
    return (
        !this.state.triggerEdit ? (
            <View style={authCategory().itemContainer} key={this.props.item.id.toString()} >
                <View style={authCategory().inactiveBtnsWrap} >
                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEdit}>
                        <Icon style={authCategory().editBtn} name="pencil"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={authCategory().removeBtnWrap} onPress={this.deleteFunction}>
                        <Icon style={authCategory().removeBtn} name="trash-o" />
                    </TouchableOpacity>
                </View>
                <View style={authCategory().inactiveItemWrap}>
                    <View style={authCategory().imageWrap} >
                    {this.state.imageData ? (
                        <Image style={authCategory().imageActiveStyle} source={{ uri: this.state.imageData.uri}} />
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
                        <StyledButton horizontal={20} vertical={15} title="Products" func={() => this.props.goToProducts()} color={colors.mainWhiteYellow} />
                    </View>
                </View>
            </View>
        ) : (
            <View style={authCategory().itemContainer} key={this.props.item.id.toString()} >
                  <View style={authCategory().inactiveBtnsWrap} >
                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={() => this.validateSubmit()} >
                        <Icon style={authCategory().editBtn} name="check-circle" />
                    </TouchableOpacity>
                    <TouchableOpacity style={authCategory().cancelBtnWrap} onPress={() =>  this.cancelEdit()} >
                        <Icon style={authCategory().removeBtn} name="times-circle"/>
                    </TouchableOpacity>
                </View>
                <View style={authCategory().inactiveItemWrap}>
                    <TouchableOpacity style={authCategory().imageWrapActive} onPress={() => this.changeImage()} >
                        {this.state.imageData ? (
                            <Image style={authCategory().imageActiveStyle} source={{ uri: this.state.imageData.uri }} />
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
                        {this.state.missingName && <Error message={this.state.missingName} /> }
                        {this.state.formatName && <Error message={this.state.formatName}/> }
                        <TextInput style={authCategory(null, this.state.incorrectName).nameEdit} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
                    </View>
                    <Text>Background color:</Text>
                    <View style={authCategory().backgroundEditWrap}>
                        {this.state.formatBackground && <Error message={this.state.formatBackground} margin={-37}/> }
                        <Text style={authCategory(this.props.item.background_color, null).backgroundColor}></Text>
                        <TextInput style={authCategory(null, this.state.formatBackground).backgroundEdit} type="text" autoCorrect={false} onChangeText={value => { this.setState({ background: value })}}  defaultValue={this.props.item.background_color} value={this.state.background}/>
                    </View>
                </View>
             </View>
        )
    )
}
}

export default (connect(null, {editSubcategory})(SubcategoryList))