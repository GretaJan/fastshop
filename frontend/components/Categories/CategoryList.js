import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

class CategoryList extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.itemWrap} onPress={() => {this.props.history.push(`/subcategories/${this.props.item.id}`)}}>
                <Text key={this.props.item.id} >{this.props.item.name}</Text>
                <Icon name="arrow-circle-right" size={20} />
            </TouchableOpacity >
        )
    }
}

export default withRouter(CategoryList)