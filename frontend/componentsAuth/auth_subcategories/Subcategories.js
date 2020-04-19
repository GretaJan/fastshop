import React, { Component } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';


class Subcategories extends Component {

    state = {
        id: this.props.route.params.categoryId,
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
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
            <View>
                <Icon name="search" size={20} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
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

    goToProducts = (id) => {
        this.props.navigation.push("Products_Auth", {subcategoryId: id});
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Error message={this.props.error} />
                ) : (
                    <View>
                        {this.getInput()}
                        {!this.state.inputTriggered ? (
                            <FlatList data={this.props.subcategories} renderItem={({item}) => (
                                <Subcategory item={item} 
                                            deleteSubcategory={(item) => this.deleteSubcategory(item)} 
                                            goToProducts={(item) => this.goToProducts(item)}
                                />
                        )} />
                        ) : (
                            <FlatList data={this.state.tempArray} renderItem={({item}) => (
                                <Subcategory item={item} 
                                            deleteSubcategory={(item) => this.deleteSubcategory(item)} 
                                            goToProducts={(item) => this.goToProducts(item)}
                                />
                            )} />
                        )}
                        <Button title="Add subcategory" onPress={() => { this.props.navigation.push("Add_Subcategory", {categoryId: this.state.id}) }} ></Button>
                    </View>
                )
            )
        )
    }
}

const mapStateToProps = (state) => {
   return {
    subcategories: state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, getCategory, deleteSubcategory})(Subcategories))