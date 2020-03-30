import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

class CategoryList extends Component {

    render() {
        return (
            <View>
                <Text>{this.props.item}</Text>
            </View>
        )
    }
}

export default CategoryList