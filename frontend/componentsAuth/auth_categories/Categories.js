import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import StyledButton from '../../components_additional/Button';


class Categories extends Component {
  
    componentDidMount() {
        this.props.getCategories();
    }

    deleteCategory = async (id) => {
        await this.props.deleteCategory(id);
        this.props.getCategories();
    }

    goToSubcategories = (id) => {
         this.props.navigation.push("Subcategories_Auth", {categoryId: id});
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Error message={this.props.error} />
                ) : (
                <View style={authCategory().container}>
                    <ScrollView>
                        <View style={authCategory().addBtn}>
                            <StyledButton func={() => {this.props.navigation.push("Add_Category"), console.log("press")}} title="Add category" color={"lightblue"} />
                        </View>
                        <FlatList contentContainerStyle={authCategory().flatList} data={this.props.categories} renderItem={({item}) => (
                        <CategoryList key={item} item={item} 
                                goToSubcategories={(item) => this.goToSubcategories(item)}
                                    deleteCategory = {item => this.deleteCategory(item)} />
                        )} >
                        </FlatList>
                    </ScrollView>
                </View>
            ))
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

export default withNavigation(connect(mapStateToProps, { getCategories, deleteCategory })(Categories))