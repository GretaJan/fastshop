import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';

class SubcategoryList extends Component {

    render() {
        return (
            <Text key={this.props.item.id} onPress={() => this.props.history.push(`/products/${this.props.item.id}`)}>{this.props.item.name}</Text>
        )
    }
}

export default withRouter(SubcategoryList)