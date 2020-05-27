import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { getCategories, editCategory, deleteCategory } from '../../src/actions/categoryActions';
import ImagePicker from 'react-native-image-picker';
import { withNavigation } from 'react-navigation';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import CircleButton from '../../components_additional/CircleButton';
import ConfirmModal from '../../components_additional/ModalCrud';
import EmptyList from '../../components_additional/EmptyList';

class Categories extends Component {
    state = {
        deleteId: '',
        editId: '', 
        editName: '',
        editBackground: '',
        editImage: null,
        formatName: null,
        missingName: null,
        incorrectName: null,
        formatBackground: null,
        imageData: null,
    }

    componentDidMount() {
        this.props.getCategories();
    }

    goToSubcategories = (item) => {
         this.props.navigation.push("Subcategories_Auth", {categoryId: item.id, name: item.name, background: item.background_color});
    }

    deleteCategory = () => {
        this.props.deleteCategory(this.state.deleteId);
    }

    confirmDelete = (id) => {
        this.setState({deleteId: id})
    }

    cancelDelete = () => {
        this.setState({deleteId: ''})
    }

    triggerEditFunc = (item) => {
        this.setState({
            editId: item.id, 
            editName: item.name, 
            editBackground: item.background_color, 
            editImage: item.image
        })
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
        console.log('data: ', this.state.editName, this.state.editBackground)
        let regexColorWord = new RegExp('^[a-zA-Z]+$');
        let regexHex = new RegExp('#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if (this.state.editName.length === 0) {
            this.setState({missingName: 'Name is required', formatName: null, incorrectName: true});
        } else if(this.state.editName.length < 3 ) {
            this.setState({formatName: '3 characters required', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if(this.state.editBackground.length > 0 || this.state.editBackground !== null ){
            if(!regexColorWord.test(this.state.editBackground) && !regexHex.test(this.state.editBackground) &&
                !regRGB.test(this.state.editBackground) && !regRGBA.test(this.state.editBackground)) {
            this.setState({formatBackground: 'Invalid color format'});
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
            name: this.state.editName,
            background_color: this.state.editBackground,
            image: this.state.imageData !== null ? ("data:" + this.state.imageData.type + ";base64," + this.state.imageData.data) : (this.state.editImage),
            "_method": "put"
        }
        await this.props.editCategory(this.state.editId, data);
        this.props.getCategories();
        this.setState({editId: '', editIName: '', editBackground: ''})

    }

    cancelEdit = () => {
        this.setState({
                    editId: '', 
                    editName: '', 
                    editBackground: '',
                    formatName: null,
                    imageData: null,
                    missingName: null,
                    incorrectName: null,
                    formatBackground: null
                })
    }

    render() {
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages().backgroundContainer} >
                    <Loading />
                </View>
            ) : (
                <View style={authCategory().container}  >
                    {this.state.deleteId !== '' &&
                        <ConfirmModal message="Are you sure you want to delete this item? " 
                                    confirm={this.deleteCategory}
                                    title="Delete action"
                                    close={this.cancelDelete}
                                    background={colors.mainWhiteYellow}
                                    iconColor={colors.lightBurgundy}
                                    borderColor={colors.bordoTransparent}
                                    colorOne={colors.lightBurgundy}
                                    colorTwo={colors.mediumGreen}
                                    horizontal={20} vertical={15}
                        />
                    }
                    <CircleButton func={() => { this.props.navigation.push("Add_Category") }} />
                    { this.props.categories.length == 0 ? (
                        <EmptyList message="The List is empty" />
                        ) : (
                        <FlatList contentContainerStyle={authCategory().flatList} data={this.props.categories} renderItem={({item}) => (
                        <CategoryList key={item} item={item} 
                                imageData={this.state.imageData}
                                editId={this.state.editId}
                                name={this.state.editName}
                                background={this.state.editBackground}
                                formatName={this.state.formatName}
                                incorrectName={this.state.incorrectName}
                                formatBackground={this.state.formatBackground}
                                imageData={this.state.imageData}
                                changeImage={() => this.changeImage}
                                goToSubcategories={() => this.goToSubcategories(item)}
                                deleteCategory = { (item)=> this.confirmDelete(item)} 
                                triggerEditFunc = { ()=> this.triggerEditFunc(item)} 
                                validateSubmit={() => this.validateSubmit(item)}
                                changeImage={() => this.changeImage()}
                                cancelEdit={this.cancelEdit}
                                onChangeNameText={(value) => { console.log(value), this.setState({editName: value})}}
                                onChangeBackground={(value) => { console.log(value), this.setState({editBackground: value})}}
                            />
                        )} >
                        </FlatList>
                        )}
                </View>
            )
        )
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error
});

export default withNavigation(connect(mapStateToProps, { getCategories, editCategory, deleteCategory })(Categories))