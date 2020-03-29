import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../src/actions/categoryActions';

class Categories extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

    render() {
        return (
            <View>
                <Text> hello </Text>
                <FlatList data={this.props.categories} renderItem={({item}) =>(
                 <Text> {item} </Text>
                )}>
                    
                </FlatList>
            </View>
        )
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories.categoriesArray
  
});

export default connect(mapStateToProps, { getCategories })(Categories);