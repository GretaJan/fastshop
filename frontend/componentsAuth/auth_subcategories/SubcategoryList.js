import React, {Component} from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { editSubcategory } from '../../src/actions/subcategoryActions';
import {styles} from '../../components_additional/styles/SubcategoryStyles';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import StyledButton from '../../components_additional/AdminButton';
import ConfirmModal from '../../components_additional/ConfirmModal';

class SubcategoryList extends Component {
    state = {
        name: this.props.item.name,
        image: this.props.item.image,
        imageData: null,
        backgroundColor: this.props.background_color, 
        borderColor: this.props.border_color, 
        triggerEdit: false,
        changedImg: false,
        confirm: false
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
        this.setState({changedImg: false});
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({
                                imageData: response,
                                changedImg: true,
                            });
            } else {
                this.setState({changedImd: false});
            }
        })
    }

    editSubcategory = async () => {

        const data = {
            name: this.state.name,
            background_color: this.state.backgroundColor == undefined ? null :this.state.backgroundColor,
            border_color: this.state. border_color == undefined ? null : this.state. borderColor,
            image: this.state.changedImg ? ("data:" + this.state.imageData.type + ";base64," + this.state.imageData.data) : (this.state.image),
            "_method": "put"
        }
        await this.props.editSubcategory(this.props.item.id, this.props.item.category_id, data);
        this.cancelEdit();
    }

    deleteFunction = () => {
        this.props.deleteSubcategory(this.props.item.id);
    }

//     render() {
//         return (
//             <View key={this.props.item.id.toString()} >
//             {(!this.state.triggerEdit) &&
//                 <View style={styles(null, null).itemWrap} >
//                 <Text onPress={this.goToProducts}>{this.state.name}</Text>
//                     <Text style={styles(this.props.background_color, this.props.item.border_color).backgroundColorIs}>Background</Text>
//                     <Text style={styles(this.props.background_color, this.props.item.border_color).border_color}>Border</Text>
//                     {this.state.image ? (
//                         <View>
//                             <Image style={{width: 50, height: 50}} source={{ uri: this.props.item.image }} />
//                         </View>
//                         ) : (
//                         <View>
//                             <Image style={{width: 50, height: 50}} source={require('../../components_additional/images/noimage.jpeg')}  />
//                         </View> 
//                     )}
//                     <Button title="Edit image" onPress={this.changeImage} />
//                     <View style={styles(null, null).itemWrap} >
//                         <Icon name="pencil" size={35} color="firebrick" onPress={this.triggerEdit} />
//                         <Icon name="remove" size={35} color="firebrick" onPress={this.deleteFunction} />
//                     </View>
//                 </View>
//             }{(this.state.triggerEdit) &&
//                 <View style={styles(null, null).itemWrap} >
//                     <TextInput style={styles(null, null).itemText} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
//                     <View style={styles(null, null).itemWrap} >
//                         <Icon style={styles(null, null).iconItem} name="check-circle" size={35} color="firebrick" onPress={this.editSubcategory} />
//                         <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelEdit} />
//                     </View>
//                  </View>
//             }
//              </View>
//         )
//     }
// }

// 

render() {
    return (
        !this.state.triggerEdit ? (
            <View style={authCategory().itemContainer} key={this.props.item.id.toString()} >
                <Modal  transparent={true}
                    visible={this.state.confirm}
                    onRequestClose={() => {
                    Alert.alert('Modal has now been closed.');
                    }}>  
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
                </Modal>
                <View style={authCategory().inactiveItemWrap}>
                    {this.state.image ? (
                        <View style={authCategory().imageWrap} >
                            {this.state.changedImg ? (
                                   <Image style={authCategory().imageStyle} source={{ uri: "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data }} />
                            ) : (
                                <Image style={authCategory().imageStyle} source={{ uri: this.state.image }} />
                            )}
                        </View>
                        ) : (
                        <View style={authCategory().imageWrap} >
                            <Image style={authCategory().imageActiveStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                        </View> 
                    )}
                    <View style={authCategory().nameTxtWrap}>
                        <Text style={authCategory().nameTxt}>{this.props.item.name}</Text>
                    </View>
                    <View style={authCategory().goToSubBtn }>
                        <StyledButton horizontal={20} vertical={15} title="Products" func={() => this.props.goToProducts()} color={colors.orange} />
                    </View>
                </View>
                <View style={authCategory().inactiveBtnsWrap} >
                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={this.triggerEdit}>
                        <Icon style={authCategory().editBtn} name="pencil"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={authCategory().removeBtnWrap} onPress={() => this.setState({confirm: true})}>
                        <Icon style={authCategory().removeBtn} name="trash-o" />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View style={authCategory().itemContainer} key={this.props.item.id.toString()}  >
                <View style={authCategory().inactiveItemWrap}>
                    {this.state.image ? (
                        this.state.changedImg ? (
                            <TouchableOpacity style={authCategory().imageWrapActive} onPress={() => this.changeImage()} >
                                <Image style={authCategory().imageActiveStyle} source={{ uri: "data:" + this.state.imageData.type + ";base64," + this.state.imageData.data }} />
                                <Icon style={authCategory().uploadIcon} name="upload"/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={authCategory().imageWrapActive} onPress={() => this.changeImage()} >
                                <Image style={authCategory().imageActiveStyle} source={{ uri: this.props.item.image }} />
                                <Icon style={authCategory().uploadIcon} name="upload"/>
                            </TouchableOpacity>
                        )
                        ) : (
                            <TouchableOpacity style={authCategory().imageWrapActive} onPress={() => this.changeImage()} >
                                <Image style={authCategory().imageActiveStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                                <Icon style={authCategory().uploadIcon} name="upload"/>
                            </TouchableOpacity> 
                    )}
                    <View style={authCategory().nameTxtWrap}>
                        <TextInput style={authCategory().nameEdit} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
                    </View>
                    <Text>Background color:</Text>
                    <View style={authCategory().backgroundEditWrap}>
                        <Text style={authCategory(this.props.item.background_color , null).backgroundColor}></Text>
                        <TextInput style={authCategory().backgroundEdit} type="text" autoCorrect={false} onChangeText={value => { this.setState({ backgroundColor: value })}}  defaultValue={this.props.item.background_color} value={this.state.backgroundColor}/>
                    </View>
                </View>
                <View style={authCategory().inactiveBtnsWrap} >
                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={() => this.editSubcategory()} >
                        <Icon style={authCategory().editBtn} name="check-circle" />
                    </TouchableOpacity>
                    <TouchableOpacity style={authCategory().editBtnWrap} onPress={() =>  this.cancelEdit()} >
                        <Icon style={authCategory().removeBtn} name="times-circle"/>
                    </TouchableOpacity>
                </View>
             </View>
        )
    )
}
}

export default (connect(null, {editSubcategory})(SubcategoryList))