import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import { authCategory } from '../../components_additional/styles/CategoryStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';

//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import CircleButton from '../../components_additional/CircleButton';
import Modal from '../../components_additional/Modal';
import EmptyList from '../../components_additional/EmptyList';

class Categories extends Component {
  
    componentDidMount() {
        this.props.getCategories();
    }

    goToSubcategories = (item) => {
         this.props.navigation.push("Subcategories_Auth", {categoryId: item.id, name: item.name, background: item.background_color});
    }

    render() {
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages().backgroundContainer} >
                    <Loading />
                </View>
            ) : (
                this.props.categories.length == 0 ? (
                        <EmptyList message="The List is empty" />
                    ) : (
                    <View style={authCategory().container}>
                        <CircleButton func={() => { this.props.navigation.push("Add_Category") }} />
                        <FlatList contentContainerStyle={authCategory().flatList} data={this.props.categories} renderItem={({item}) => (
                        <CategoryList key={item} item={item} 
                                goToSubcategories={() => this.goToSubcategories(item)}
                                    deleteCategory = { (item)=> this.deleteCategory(item)} />
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
    error: state.categories.error
});

export default withNavigation(connect(mapStateToProps, { getCategories, deleteCategory })(Categories))