import React, {Component} from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { withNavigation } from 'react-navigation';
import { editSubcategory } from '../../src/actions/subcategoryActions';
import {styles} from '../../components_additional/styles/SubcategoryStyles';


// const styles = {
//     container: {
//         marginTop: 8,
//         // marginLeft: 10,
//         // marginRight: 10
//     },
//     itemWrap: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         backgroundColor:'lightgrey',
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingTop: 5,
//     },
//     itemText: {
//         width: 'auto',
//         fontSize: 20
//     },
//     itemButton: {
//         flexBasis: '40'
//     },
//     iconItem: {
//         paddingRight: 10
//     }

// }

class SubcategoryList extends Component {
    state = {
        name: this.props.item.name,
        image: this.props.item.image,
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

    changeImage = () => {
        const options = {
            noData: false
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({image: response});
                this.editSubcategory();
            }   
        })
    }

    editSubcategory = () => {

        const data = {
            name: this.state.name,
            image: "data:" + image.type + ";base64," + image.data,
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
            <View key={this.props.item.id.toString()} >
            {(!this.state.nameInput) &&
                <View style={styles(null, null).itemWrap} >
                <Text onPress={this.goToProducts}>{this.state.name}</Text>
                    <Text style={styles(this.props.item.background_color, this.props.item.border_color).backgroundColorIs}>Background</Text>
                    <Text style={styles(this.props.item.background_color, this.props.item.border_color).border_color}>Border</Text>
                    {this.state.image ? (
                        <View>
                            <Image style={{width: 50, height: 50}} source={{ uri: this.props.item.image }} />
                        </View>
                        ) : (
                        <View>
                            <Image style={{width: 50, height: 50}} source={require('../../components_additional/images/noimage.jpeg')}  />
                        </View> 
                    )}
                    <Button title="Edit image" onPress={this.changeImage} />
                    <View style={styles(null, null).itemWrap} >
                        <Icon name="edit" size={35} color="firebrick" onPress={this.nameInput} />
                        <Icon name="remove" size={35} color="firebrick" onPress={this.deleteFunction} />
                    </View>
                </View>
            }{(this.state.nameInput) &&
                <View style={styles(null, null).itemWrap} >
                    <TextInput style={styles(null, null).itemText} type="text" autoCorrect={false} onChangeText={value => { this.setState({name: value})}}  defaultValue={this.props.item.name} value={this.state.name}/>
                    <View style={styles(null, null).itemWrap} >
                        <Icon style={styles(null, null).iconItem} name="check-circle" size={35} color="firebrick" onPress={this.editSubcategory} />
                        <Icon name="times-circle" size={35} color="firebrick" onPress={this.cancelNameEdit} />
                    </View>
                 </View>
            }
             </View>
        )
    }
}

export default (connect(null, {editSubcategory})(SubcategoryList))