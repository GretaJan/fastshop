import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { withNavigation } from 'react-navigation';
import { editSubcategory } from '../../src/actions/subcategoryActions';

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

class SubcategoryList extends Component {
    state = {
        name: this.props.item.name,
        nameInput: false,
        editedState: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // if(nextProps.item.name !== nextProps.item.name ) {
        //     this.setState({name: nextProps.item.name})
        // }
        return {
            
        }

    }

    nameInput = () => {
        this.setState({nameInput: true})
    }

    cancelNameEdit = () => {
        this.setState({nameInput: false})
    }

    editSubcategory = () => {

        const data = {
            name: this.state.name,
            "_method": "put"
        }
        this.props.editSubcategory(this.props.item.id, this.props.item.category_id, data);
        this.cancelNameEdit();
        this.setState({editedState: true})
    }

    deleteFunction = () => {
        this.props.deleteSubcategory(this.props.item.id);
    }

    goToProducts = () => {
        this.props.goToProducts(this.props.item.id);
    }

    render() {
        return (
            <View>
            {(!this.state.nameInput) &&
                <View style={styles.itemWrap} >
                <Text key={this.props.item.id} onPress={this.goToProducts}>{this.state.name}</Text>
                    {/* <Button style={styles.button} title="Edit" onPress={this.nameInput} />  */}
                    <View style={styles.itemWrap}>
                        <Icon name="edit" size={35} color="firebrick" onPress={this.nameInput} />
                        <Icon name="remove" size={35} color="firebrick" onPress={this.deleteFunction} />
                    </View>
                </View>
            }{(this.state.nameInput) &&
                <View style={styles.itemWrap}>
                    <TextInput style={styles.itemText} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
                    <View style={styles.itemWrap}>
                        <Icon style={styles.iconItem} name="check-circle" size={35} color="firebrick" onPress={this.editSubcategory} />
                        <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelNameEdit} />
                    </View>
                 </View>
            }
             </View>
        )
    }
}

export default (connect(null, {editSubcategory})(SubcategoryList))