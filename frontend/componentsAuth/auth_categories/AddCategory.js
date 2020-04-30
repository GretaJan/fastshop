import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { addCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import { styles } from '../../components_additional/styles/LoginStyles';
import { colors } from '../../components_additional/styles/Colors';
import StyledButton from '../../components_additional/AdminButton';
import { categoryAdd, authCategory } from '../../components_additional/styles/CategoryStyles';
import ButtonStyled from '../../components_additional/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Error from '../../components_additional/ErrorMsg';

class AddCategory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            image: null
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: false,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response})
            }   
        })
    }

    addCategory = async () => {
        const { image, name } = this.state;

        const data = {
            image: image !== null ? ("data:" + image.type + ";base64," + image.data) : null,
            name: name
        }

        this.props.addCategory(data);
        this.props.navigation.push("Dashboard");

    }

    clearInputs = () => {
        this.textInputRef.clear();
    }
    
    cancelAdd = () => {
        this.props.navigation.goBack();
    }

        render() {
            return (
                <View style={styles().container} > 
                    <View style={styles().inputsWrap} >
                        <Error message="nain" />
                        <TextInput style={styles().textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                    </View>
                    <View style={categoryAdd().imageBtnWrap} >
                    {this.state.image ? (
                            <TouchableOpacity style={categoryAdd().imageWrap} onPress={this.handleChoosePhoto}  >
                                <Error message="nain" />
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
                        <ButtonStyled color={colors.mediumGreen} title={"Save"} func={this.addCategory} />
                        <ButtonStyled color={colors.lightBurgundy}  title={"Cancel"} func={ this.cancelAdd }/>
                    </View>
                </View>
            )

    }

}

export default withNavigation(connect(null, { addCategory })(AddCategory))