import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TextInput, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { addCategory } from '../../redux/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import { styles } from '../../components_additional/styles/AuthStyles';
import { colors } from '../../components_additional/styles/Colors';
import { categoryAdd } from '../../components_additional/styles/CategoryStyles';
import ButtonStyled from '../../components_additional/models/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Error from '../../components_additional/models/ErrorMsg';

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

    addInput = (name, value) => {
        this.setState({[name] : value});
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
        let regexColor = new RegExp('^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');
        if (this.state.name.length === 0) {
            this.setState({missingName: 'Product name is required', formatName: null, incorrectName: true});
        } else if(this.state.name.length < 3 && this.state.name.length > 50) {
            this.setState({formatName: 'Must contain at least 3 characters', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if(this.state.background.length > 0) {
            if (!regexColor.test(this.state.background)) {
            this.setState({formatBackground: 'Invalid color format'});
                } else {
                this.setState({formatBackground: null});
            }
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
            background: this.state.background,
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
                            <TextInput style={categoryAdd(this.state.incorrectName).textInput} type="text" autoCorrect={false}  placeholder="name" onChangeText={value => this.addInput('name', value)} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        </View>
                        <View style={categoryAdd().singleWrap}>
                            {this.state.formatBackground && <Error message={this.state.formatBackground} left={'10%'}/> }
                            <TextInput style={categoryAdd(this.state.formatBackground).textInput} type="text" autoCorrect={false}  placeholder="background color" onChangeText={value => this.addInput('background', value) } value={this.state.background} ref={ref => this.textInputRef = ref} />
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
                    </View>
                    <View style={styles().buttonsWrap} >
                        <ButtonStyled color={colors.mediumGreen} title={"Save"} func={this.validateSubmit} />
                        <ButtonStyled color={colors.lightBurgundy}  title={"Cancel"} func={ this.cancelAdd }/>
                    </View>
                </View>
            )

    }
}

AddCategory.propTypes = {
    name: PropTypes.string,
    background: PropTypes.string,
    image: PropTypes.any,
}

export default withNavigation(connect(null, { addCategory })(AddCategory))