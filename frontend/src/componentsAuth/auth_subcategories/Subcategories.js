import React, { Component } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory, editSubcategory } from '../../redux/actions/subcategoryActions';
import ImagePicker from 'react-native-image-picker';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { styles } from '../../components_additional/styles/SubcategoryStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';
import EmptyList from '../../components_additional/EmptyList';
import CircleButton from '../../components_additional/CircleButton';
import ConfirmModal from '../../components_additional/ModalCrud';

class Subcategories extends Component {

    state = {
        id: this.props.route.params.categoryId,
        backgroundColor: this.props.route.params.backgroundColor,
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false,
        deleteId: '',
        // Edit
        editId: '',
        editCategoryId: '',
        editName: '',
        image: null,
        imageData: null,
        editImage: null,
        editBackground: '', 
        formatName: null,
        missingName: null,
        incorrectName: null,
        formatBackground: null,
    }

    static navigationOptions = {
        headerTitle: "Hello",
        headerStyle: {
            backgroundColor: 'red',
        },
    }   

    componentDidMount(){
        this.props.getSubcategories(this.state.id, this.props.currentPages);
    }
    // componentWillUnmount(){
    //     this.props.unmountSubcategories();
    //     console.log("subsss unmount", this.props.subcategories )
    // }

    loadMore = () => {
        setTimeout(() => {
            this.props.getSubcategories(this.props.route.params.categoryId, this.props.currentPage + 1);
        })
    }
    renderFooter = () => {
        return (
             <Loading />
        )
    } 
    searchFunction = searchName => {
        this.setState({inputTriggered: true});
        const matchedData = this.props.subcategories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textInput = searchName.toLowerCase();
            return itemData.indexOf(textInput) > -1;
        });
        if(searchName == '') {
            this.setState({
                // tempArray: this.props.subcategories,
                inputTriggered: false,
                searchName: searchName
            })
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            })
        }
    }

    getInput = () => {
        return (
            <View style={searchBar().searchBarContainer}>
                <Icon style={searchBar().searchBarIcon} name="search" size={20} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }

    triggerEdit = (item) => {
        this.setState({
            editId: item.id,
            editCategoryId: item.category_id,
            editName: item.name,
            editBackground: item.background,
            image: item.image
        })
    }


    changeImage = (item) => {
        const options = {
            noData: false
        }
        if(item.id == this.state.editId) {
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
    }

    validateSubmit = () => {
        let regexColorWord = new RegExp('^[a-zA-Z]{3,}$');
        let regexHex = new RegExp('#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})');
        let regRGBA = new RegExp('^rgba[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?, ?[0-9]\.?[0-9]*?[)]$');
        let regRGB = new RegExp('^rgb[(][0-9]{1,3} ?, ?[0-9]{1,3} ?, ? [0-9]{1,3} ?[)]$');

        if (this.state.editName === '') {
            this.setState({missingName: 'Name is required', formatName: null, incorrectName: true});
        } else if(this.state.editName.length < 3 ) {
            this.setState({formatName: '3 characters required', missingName: null, incorrectName: true});
        } else {
            this.setState({missingName: null, formatName: null, incorrectName: false});
        }
        if( this.state.editBackground !== null ){
            if(!regexColorWord.test(this.state.editBackground) && !regexHex.test(this.state.editBackground) &&
                !regRGB.test(this.state.editBackground) && !regRGBA.test(this.state.editBackground)) {
            this.setState({formatBackground: 'Invalid color format'});
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
            name: this.state.editName,
            background: this.state.editBackground,
            image: this.state.imageData !== null ? ("data:" + this.state.imageData.type + ";base64," + this.state.imageData.data) : (this.state.image),
            "_method": "put"
        }
        await this.props.editSubcategory(this.state.editCategoryId, this.state.editId, data, this.props.subcategories);
    }

    deleteSubcategory = async () => {
        await this.props.deleteSubcategory(this.state.deleteId);
        this.props.getSubcategories(this.state.id);
        this.setState({deleteId: ''})
    }

    confirmDeleteSubcategory = (item) => {
        this.setState({deleteId: item})
    }
    cancelDelete = () => {
        this.setState({deleteId: ''})
    }

    goToProducts = (item) => {
        this.props.navigation.push("Products_Auth", {subcategoryId: item.id, name: item.name, background: item.background});
    }
    cancelEdit = () => {
        this.setState({
            editId: '', 
            editCategoryId: '', 
            editName: '', 
            editBackground: '',
            imageData: null,
            formatName: null,
            missingName: null,
            incorrectName: null,
            formatBackground: null
    })
    }

    render() {
        const {background} = this.props.route.params;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>
            ) : (
                <View style={styles(background).container}>
                    {this.state.deleteId !== '' && (  
                        <ConfirmModal message="Are you sure you want to delete this item? " 
                                confirm={this.deleteSubcategory}
                                title="Delete action"
                                close={this.cancelDelete}
                                background={colors.mainWhiteYellow}
                                iconColor={colors.lightBurgundy}
                                borderColor={colors.bordoTransparent}
                                colorOne={colors.lightBurgundy}
                                colorTwo={colors.mediumGreen}
                                horizontal={20} vertical={15}
                        />
                    )}
                    {this.getInput()}
                    <CircleButton func={() => { this.props.navigation.push("Add_Subcategory", {categoryId: this.state.id, background: background}) }} />
                    {this.props.subcategories.length == 0 ? (
                        <EmptyList message="The List is empty" background={background} />
                        ) : (
                            <FlatList data={ !this.state.inputTriggered ? this.props.subcategories : this.state.tempArray} 
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={!this.props.lastPage ? this.handleLoadMore : null}
                                    onEndReachedThreshold={0.01}
                                    ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                    renderItem={({item}) => (
                                        <Subcategory item={item}
                                            editId={this.state.editId}
                                            editName={this.state.editName}
                                            imageData={this.state.imageData}
                                            editBackground={this.state.editBackground}
                                            formatName={this.state.formatName}
                                            missingName={this.state.missingName}
                                            incorrectName={this.state.incorrectName}
                                            formatBackground={this.state.formatBackground}
                                            triggerEdit={() => this.triggerEdit(item)}
                                            validateSubmit={() => this.validateSubmit()}
                                            onChangeName={(value) => this.setState({editName: value})}
                                            changeImage={() => this.changeImage(item)}
                                            editSubcategory={() => this.editSubcategory()}
                                            cancelEdit={() => this.cancelEdit()}
                                            deleteSubcategory={(item) => this.confirmDeleteSubcategory(item)} 
                                            goToProducts={() => this.goToProducts(item)}
                                        />
                                )} />              
                    )}
                </View>
            )
        )
    }
}

const mapStateToProps = (state) => {
   return {
    subcategories: state.subcategories.subcategories,
    currentPage: state.subcategories.currentPage,
    lastPage: state.subcategories.lastPage,
    loading: state.subcategories.loading,
    loadingNext: state.subcategories.loadingNext,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, editSubcategory, deleteSubcategory})(Subcategories))