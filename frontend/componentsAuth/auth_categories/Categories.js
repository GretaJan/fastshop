import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../../src/actions/categoryActions';

import CategoryList from './CategoryList';

class Categories extends Component {
  
    componentDidMount() {
        this.props.getCategories();
    }

    render() {

        return (
            <View>
               <FlatList data={this.props.categories} renderItem={({item}) => (
                <CategoryList key={item} item={item} />
               )} >
               </FlatList>
            </View>
        )
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(Categories);