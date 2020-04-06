import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../../src/actions/categoryActions';
import { withRouter } from 'react-router-native';

import CategoryList from './CategoryList';

class Categories extends Component {
  
    componentDidMount() {
        console.log('cat!');
        this.props.getCategories();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.categories !== this.props.categories){
    //         console.log("NEW: ", this.props.categories);
    //     } else {
    //         console.log("old: ", this.props.categories);
    //     }
    // }

    componentWillUnmount() {

    }

    render() {

        return (
            <View>
               <FlatList data={this.props.categories} renderItem={({item}) => (
                <CategoryList key={item} item={item} />
               )} >
               </FlatList>
               <Button title="Add category" onPress={() => this.props.history.push('/addCategory')} ></Button>
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

export default withRouter(connect(mapStateToProps, { getCategories })(Categories))