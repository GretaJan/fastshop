import React, {Component} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { editCategory } from '../../src/actions/categoryActions';

const styles = {
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

}

class CategoryList extends Component {
    state = {
        name: this.props.item.name,
        nameInput: false
    }

    goToSubcategories = () => {
        this.props.goToSubcategories(this.props.item.id);
    }

    nameInput = () => {
        this.setState({nameInput: true})
    }

    cancelNameEdit = () => {
        this.setState({nameInput: false})
    }

    editCategory = async() => {

        const data = {
            name: this.state.name,
            "_method": "put"
        }
        await this.props.editCategory(this.props.item.id, data);
        this.cancelNameEdit();
    }

    deleteFunction = () => {
        this.props.deleteCategory(this.props.item.id);
    }

    render() {
        return (
            <View>
            {(!this.state.nameInput) &&
                <View style={styles.itemWrap} >
                    <Text key={this.props.item.id} onPress={this.goToSubcategories}>{this.state.name}</Text>
                    {/* <Button style={styles.button} title="Edit" onPress={this.nameInput} />  */}
                    <View>
                        <Image style={{width: 50, height: 50}} source={{ uri: this.props.item.image }} />
                    </View>
                    <View style={styles.itemWrap}>
                        <Icon name="edit" size={35} color="firebrick" onPress={this.nameInput} />
                        <Icon name="remove" size={35} color="firebrick"  onPress={this.deleteFunction}/>
                    </View>
                </View>
            }{(this.state.nameInput) &&
                <View style={styles.itemWrap}>
                    <TextInput style={styles.itemText} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
                    <View style={styles.itemWrap}>
                        <Icon style={styles.iconItem} name="check-circle" size={35} color="firebrick" onPress={this.editCategory} />
                        <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelNameEdit} />
                    </View>
                 </View>
            }
             </View>
        )
    }
}
  

export default connect(null, {editCategory})(CategoryList)