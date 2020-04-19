import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../src/actions/categoryActions';
//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Categories extends Component {
    state = {
        tempArray: this.props.categories,
        searchName: ''
    }
  
    componentDidMount() {
        this.props.getCategories();
    }

    findFunction = searchName => {
        const matchedData = this.props.categories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textData = searchName.toLowerCase();
            return itemData.indexOf(textData) > -1; 
        });
        if(searchName == '') {
            this.setState({
                tempArray: this.props.categories,
                searchName: searchName
            });
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            });
        }
       
    }

    getInput = () => {
        return <TextInput placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />
    }

    goToSubcategories = (id) => {
        this.props.navigation.push("Subcategories", {categoryId: id});
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
                    <FlatList ListHeaderComponent={this.getInput} data={this.state.tempArray} renderItem={({item}) => (
                        <CategoryList key={item} item={item} 
                                        goToSubcategories={(item) => this.goToSubcategories(item)} 
                        />
                        )} >
                    </FlatList>
                </View>
                )
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
    error: state.categories.error,
    selectedProducts: state.selectedProducts.comparisonArray
});

export default withNavigation(connect(mapStateToProps, { getCategories })(Categories))