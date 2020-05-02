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
            background: '',
            image: null,
            //Validation:
            missingName: null,
            formatName: null,
            incorrectName: null,
            formatBackground: null
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

    validateSubmit = () => {
        let regexColorWord = new RegExp('^[^0-9]*$');
        let regexHex = new RegExp('#[a-zA-z0-9]*');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

 
        if (this.state.name.length === 0) {
            this.setState({missingName: 'Product name is required', formatName: null, incorrectName: true});
            console.log("name", this.state.name.length)
        } else if(this.state.name.length < 3 ) {
            this.setState({formatName: 'Must contain at least 3 characters', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if(this.state.background.length > 0 && (!regexColorWord.test(this.state.background)  ||
            !regexHex.test(this.state.background)  || !regRGB.test(this.state.background)  || !regRGBA.test(this.state.background) 
                )) {
            this.setState({formatBackground: 'Invalid color format'});
        } else {
            this.setState({formatBackground: null});
        }

        if(this.state.incorrectName === false && this.state.formatBackground === null) {
            this.addCategory();
        }
    }
    addCategory = async () => {
        const { image, name } = this.state;

        const data = {
            image: image !== null ? ("data:" + image.type + ";base64," + image.data) : null,
            name: name
        }

        await this.props.addCategory(data);
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
                    <View style={categoryAdd().inputsWrap} >
                        <View style={categoryAdd().singleWrap}>
                            {this.state.missingName && <Error message={this.state.missingName}  left={'10%'} /> }
                            {this.state.formatName && <Error message={this.state.formatName} left={'10%'}/> }
                            <TextInput style={categoryAdd(this.state.incorrectName).textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        </View>
                        <View style={categoryAdd().singleWrap}>
                            {this.state.formatBackground && <Error message={this.state.formatBackground} left={'10%'}/> }
                            <TextInput style={categoryAdd(this.state.formatBackground).textInput} type="text" autoCorrect={false}  placeholder="background color" onChangeText={value => { this.setState({background: value})}} value={this.state.background} ref={ref => this.textInputRef = ref} />
                        </View>
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
                        <ButtonStyled color={colors.mediumGreen} title={"Save"} func={this.validateSubmit} />
                        <ButtonStyled color={colors.lightBurgundy}  title={"Cancel"} func={ this.cancelAdd }/>
                    </View>
                </View>
            )

    }
}

export default withNavigation(connect(null, { addCategory })(AddCategory))