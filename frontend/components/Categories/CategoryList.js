import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { getCategory } from '../../src/actions/categoryActions';

class CategoryList extends Component {

    getCategory = (id) => {
        // () => this.props.history.push(`/subcategories/${item}`
        this.props.getCategory(id);

    }

    render() {
        return (
            <Text key={this.props.item.id} onPress={this.getCategory(this.props.item.id)}>{this.props.item.name}</Text>
        )
    }
}

export default withRouter(connect(null, {getCategory})(CategoryList))