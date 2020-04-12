import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';


const styles = StyleSheet.create({
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

class CategoryList extends Component {

    // render() {
    //     const { route } = this.props;

    //     export default function(props) {
    //         return (
    //             <TouchableOpacity style={styles.itemWrap} onPress={() => { route.subcategories.this.props.item.id }}>
    //                 <Text key={this.props.item.id} >{this.props.item.name}</Text>
    //                 <Icon name="arrow-circle-right" size={20} />
    //             </TouchableOpacity >
    //         )
    //     }
        
    // }

    render() {
        return (
            <TouchableOpacity style={styles.itemWrap} onPress={() => { this.props.navigation.push("Subcategories", {categoryId: this.props.item.id}) }}>
                <Text key={this.props.item.id} >{this.props.item.name}</Text>
                <Icon name="arrow-circle-right" size={20} />
            </TouchableOpacity >
        )  
    }
}

export default withNavigation(CategoryList)