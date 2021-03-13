import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { getCategories, editCategory, deleteCategory } from '../../../redux/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import { authCategory } from '../../../src/styles/CategoryStyles';
import { backgroundForPages } from '../../../src/styles/AdditionalStyles';
import { colors } from '../../../src/styles/Colors';

//Components
import CategoryList from './CategoryList';
import Loading from '../../../utils/models/Loading';
import CircleButton from '../../../utils/models/CircleButton';
import ConfirmModal from '../../../utils/models/ModalCrud';
import EmptyList from '../../../utils/models/EmptyList';
import Modal from '../../../utils/models/Modal';

export class Categories extends Component {
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
        hasError: false
    }

    componentDidMount() {
        this.props.getCategories();
    }

    goToSubcategories = (item) => {
         this.props.navigation.push("Subcategories_Auth", {categoryId: item.id, name: item.name, background: item.background});
    }

    deleteCategory = () => {
        this.props.deleteCategory(this.state.deleteId);
    }

    showDeleteModal = () => {
        return (
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
        )
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
            editBackground: item.background, 
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
    changeState = (name, value) => {
        this.setState({ [name] : value });
    }

    validateSubmit = () => {
        let regexColor = new RegExp('^[a-zA-Z]{3,}$|#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})|^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$|^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if (this.state.editName.length === 0) {
            this.setState({missingName: 'Name is required', formatName: null, incorrectName: true});
        } else if(this.state.editName.length < 3 ) {
            this.setState({formatName: '3 characters required', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if(this.state.editBackground !== null ){
            if(!regexColor.test(this.state.editBackground)) {
            this.setState({formatBackground: 'Invalid color format'});
            } else {
                this.setState({formatBackground: null});
            }
        } else {
            this.setState({formatBackground: null});
        }

        if(this.state.incorrectName === false && this.state.formatBackground === null) {
            this.editCategory();
            this.cancelEdit();
        }
    }

    editCategory = async () => {
        const data = {
            name: this.state.editName,
            background: this.state.editBackground,
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
        if(this.state.hasError) {
            return <h1>Smth wehnd wrong</h1>
        }
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages().backgroundContainer} >
                    <Loading />
                </View>
            ) : (
                (this.props.error !== '') ? (
                    <View style={backgroundForPages().backgroundContainer} >
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.navigate("Login")} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    </View>
                ) : (
                    <View style={authCategory().container}  >
                        {this.state.deleteId !== '' && this.showDeleteModal }
                        <CircleButton func={() => { this.props.navigation.push("Add_Category") }} />
                        { this.props.categories.length === 0 ? (
                            <EmptyList message="The List is empty" />
                            ) : (
                            <FlatList contentContainerStyle={authCategory().flatList} data={this.props.categories} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => (
                                <CategoryList item={item} 
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
                                        changeStateText={(name, value) => this.changeState(name, value) }
                                    />
                                )} >
                            </FlatList>
                            )}
                    </View>
                )
            )
        )
    }
}

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        background: PropTypes.string,
        image: PropTypes.any
    }))
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error
});

export default withNavigation(connect(mapStateToProps, { getCategories, editCategory, deleteCategory })(Categories))
