import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { addSubcategory } from '../../src/actions/subcategoryActions';
import { withNavigation } from 'react-navigation';
import { styles } from '../../components_additional/styles/LoginStyles';
import { colors } from '../../components_additional/styles/Colors';
import { categoryAdd, authCategory } from '../../components_additional/styles/CategoryStyles';
import ButtonStyled from '../../components_additional/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class AddSubcategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.categoryId,
            name: '',
            image: null
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: false
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response})
            }   
        })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    addSubcategory = async() => {
        const { image, name } = this.state;

        const data = {
            name: name,
            image: "data:" + image.type + ";base64," + image.data,
        }
        let id = this.props.route.params.categoryId;
        await this.props.addSubcategory(data, id);
        this.props.navigation.push("Subcategories_Auth", {categoryId: id});
    }

        render() {
            return (
                <View style={styles().container} > 
                    <View style={styles().inputsWrap} >
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                    </View>
                    <View style={categoryAdd().imageBtnWrap} >
                    {this.state.image ? (
                            <TouchableOpacity style={categoryAdd().imageWrap} onPress={this.handleChoosePhoto}  >
                                <Image style={categoryAdd().imageStyle} source={{ uri: this.state.image.uri }} />
                                <Icon style={categoryAdd().uploadIcon} name="upload"/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={categoryAdd().imageWrap} onPress={this.handleChoosePhoto} >
                                <Image style={categoryAdd().imageStyle} source={require('../../components_additional/images/noimage.jpeg')} />
                                <Icon style={categoryAdd().uploadIcon} name="upload"/>
                            </TouchableOpacity> 
                        )}
                        {/* <ButtonStyled color={colors.orangeBright} title={"Add image"} func={this.handleChoosePhoto} /> */}
                    </View>
                    <View style={styles().buttonsWrap} >
                        <ButtonStyled color={colors.mediumGreen} title={"Save"} func={this.addSubcategory} />
                        <ButtonStyled color={colors.lightBurgundy}  title={"Cancel"} func={ this.goBack } />
                    </View>
              </View>
            )

    }

}

export default withNavigation(connect(null, { addSubcategory })(AddSubcategory))