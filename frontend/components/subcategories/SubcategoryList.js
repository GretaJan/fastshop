import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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

    goToProducts = () => {
        this.props.goToProducts(this.props.item.id);
    }

    render() {
        return (
            <TouchableOpacity key={this.props.item.id} style={styles.itemWrap} onPress={this.goToProducts } >
                <Text key={this.props.item.id} >{this.props.item.name}</Text>
                {this.props.item.image ? (
                    <View>
                        <Image style={{width: 50, height: 50}} source={{ uri: this.props.item.image }} />
                    </View>
                    ) : (
                    <View>
                        <Image style={{width: 50, height: 50}} source={require('../../components_additional/images/noimage.jpeg')}  />
                    </View> 
                )}
                <View style={styles.itemWrap}>
                    <Icon style={styles.iconItem} name="arrow-circle-right" size={20} onPress={this.selectProduct} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default SubcategoryList