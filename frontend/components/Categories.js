import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../src/actions/categoryActions';

import CategoryList from './CategoryList';

class Categories extends Component {
  
    componentDidMount() {
      
            this.props.getCategories()
    //   console.log("WHAT A CATE: ", this.props.categories)
    }

    render() {

        return (
            <View>
               <FlatList data={this.props.categories} renderItem={({item}) => 
                //    <Text>{item}</Text>
                <CategoryList item={item.name} />
               }>
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
    categories: state.categories.categories
});

export default connect(mapStateToProps, { getCategories })(Categories);