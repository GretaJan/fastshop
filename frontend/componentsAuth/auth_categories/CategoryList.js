import React, {Component} from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { editCategory } from '../../src/actions/categoryActions';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import StyledButton from '../../components_additional/AdminButton';
import ConfirmModal from '../../components_additional/ModalCrud';
import Error from '../../components_additional/ErrorMsg';

class CategoryList extends Component {
    state = {
        name: this.props.item.name,
        imageData: null,
        background: this.props.item.background_color, 
        triggerEdit: false,
        confirm: false,
        formatName: null,
        missingName: null,
        incorrectName: null,
        formatBackground: null,
    }

    goToSubcategories = () => {
        this.props.goToSubcategories(this.props.item.id);
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

        if (this.state.name.length === 0) {
            this.setState({missingName: 'Name is required', formatName: null, incorrectName: true});
        } else if(this.state.name.length < 3 ) {
            this.setState({formatName: '3 characters required', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if(this.state.background.length > 0 || this.state.background !== null ){
            if(!regexColorWord.test(this.state.background) && !regexHex.test(this.state.background) &&
                !regRGB.test(this.state.background) && !regRGBA.test(this.state.background)) {
            this.setState({formatBackground: 'Invalid color format'});
            console.log("fail", this.state.background)
            } else {
                this.setState({formatBackground: null});
            }
        } else {
            this.setState({formatBackground: null});
            console.log("not fail", this.state.formatBackground)
        }

        if(this.state.incorrectName === false && this.state.formatBackground === null) {
            this.editCategory();
            this.cancelEdit();
        }
    }
    editCategory = async () => {
        const data = {
            name: this.state.name,
            background_color: this.state.background,
            image: this.state.imageData !== null ? ("data:" + this.state.imageData.type + ";base64," + this.state.imageData.data) : (this.props.item.image),
            "_method": "put"
        }
        console.log("image:", this.state.imageData, this.props.item.image)
        await this.props.editCategory(this.props.item.id, data);
    }

    deleteFunction = () => {
        this.props.deleteCategory(this.props.item.id);
    }

    render() {
        return (
            !this.state.triggerEdit ? (
                <View style={authCategory().itemContainer} key={this.props.item.id.toString()} >
                    {this.state.confirm && (
                        <ConfirmModal message="Are you sure you want to delete this item? " 
                                    confirm={this.deleteFunction}
                                    title="Delete action"
                                    close={() => this.setState({confirm: false})}
                                    background={colors.mainWhiteYellow}
                                    iconColor={colors.lightBurgundy}
                                    borderColor={colors.bordoTransparent}
                                    colorOne={colors.lightBurgundy}
                                    colorTwo={colors.mediumGreen}
                                    horizontal={20} vertical={15}
                        />
                    )}
                    <View style={authCategory().inactiveBtnsWrap} >
                        <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEdit}>
                            <Icon style={authCategory().editBtn} name="pencil"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={authCategory().removeBtnWrap} onPress={() => this.setState({confirm: true})}>
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
                            <StyledButton horizontal={20} vertical={15} title="Subcategories" func={() => this.props.goToSubcategories()} color={colors.mainYellow} />
                        </View>
                    </View>
                    
                </View>
            ) : (
                <View style={authCategory().itemContainer} key={this.props.item.id.toString()}  >
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
  

export default connect(null, {editCategory})(CategoryList)