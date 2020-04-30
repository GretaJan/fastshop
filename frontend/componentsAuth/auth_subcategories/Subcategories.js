import React, { Component } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory } from '../../src/actions/subcategoryActions';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { styles } from '../../components_additional/styles/SubcategoryStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';
import EmptyList from '../../components_additional/EmptyList';
import CircleButton from '../../components_additional/CircleButton';

class Subcategories extends Component {

    state = {
        id: this.props.route.params.categoryId,
        backgroundColor: this.props.route.params.backgroundColor,
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

    static navigationOptions = {
        headerTitle: "Hello",
        headerStyle: {
            backgroundColor: 'red',
        },
    }


    componentDidMount(){
    
        this.props.getSubcategories(this.state.id);
     
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

    componentDidMount() {
        this.props.getSubcategories(this.state.id);
    }

    deleteSubcategory = async (id) => {
        await this.props.deleteSubcategory(id);
        this.props.getSubcategories(this.state.id);
    }

    goToProducts = (item) => {
        this.props.navigation.push("Products_Auth", {subcategoryId: item.id, name: item.name, background: item.background_color});
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
                    {this.getInput()}
                    <CircleButton func={() => { this.props.navigation.push("Add_Subcategory", {categoryId: this.state.id}) }} />
                    {this.props.subcategories.length == 0 ? (
                        <EmptyList message="The List is empty" background={background} />
                        ) : (
                        !this.state.inputTriggered ? (
                            <FlatList data={this.props.subcategories} renderItem={({item}) => (
                                <Subcategory item={item}
                                            deleteSubcategory={(item) => this.deleteSubcategory(item)} 
                                            goToProducts={() => this.goToProducts(item)}
                                />
                        )} />
                        ) : (
                            <FlatList data={this.state.tempArray} renderItem={({item}) => (
                                <Subcategory item={item} 
                                            deleteSubcategory={(item) => this.deleteSubcategory(item)} 
                                            goToProducts={() => this.goToProducts(item)}
                                />
                            )} />
                        )
                    )}
                </View>
            )
        )
    }
}

const mapStateToProps = (state) => {
    console.log("products:::: ",state.products.products)
   return {
    subcategories: state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, getCategory, deleteSubcategory})(Subcategories))