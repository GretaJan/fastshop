import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

const styles = {
    container: {
        flex: 1
    }
}

class Categories extends Component {
  
    componentDidMount() {
        this.props.getCategories();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.categories !== this.props.categories){
    //         console.log("NEW: ", this.props.categories);
    //     } else {
    //         console.log("old: ", this.props.categories);
    //     }
    // }

    // static getDerivedStateFromProps()

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
                <View style={styles.container}>
                    <ScrollView>
                        <FlatList data={this.props.categories} renderItem={({item}) => (
                        <CategoryList key={item} item={item} 
                                    goToSubcategories={({item}) => this.goToSubcategories(item)} 
                                    deleteCategory = {item => this.deleteCategory(item)} />
                        )} >
                        </FlatList>
                    </ScrollView>
                    <Button title="Add category" onPress={() => this.props.navigation.push("Add_Category")} ></Button>
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