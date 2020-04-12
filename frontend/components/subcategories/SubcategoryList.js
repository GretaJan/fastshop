import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    }
})

class SubcategoryList extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.itemWrap} onPress={() => this.props.navigation.push("Products", {subcategoryId: this.props.item.id})} >
                <Text key={this.props.item.id} >{this.props.item.name}</Text>
                <View style={styles.itemWrap}>
                    <Icon style={styles.iconItem} name="arrow-circle-right" size={20} onPress={this.selectProduct} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(SubcategoryList)