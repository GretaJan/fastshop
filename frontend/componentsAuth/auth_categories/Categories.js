import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../src/actions/categoryActions';
import { withRouter } from 'react-router-native';
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
        console.log('cat: ', this.props.categories);
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
        console.log("id: ", id);
        this.props.getCategories();
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
                        <CategoryList key={item} item={item} deleteCategory = {item => this.deleteCategory(item)} />
                        )} >
                        </FlatList>
                    </ScrollView>
                    <Button title="Add category" onPress={() => this.props.history.push('/addCategory')} ></Button>
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

export default withRouter(connect(mapStateToProps, { getCategories, deleteCategory })(Categories))