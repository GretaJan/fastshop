import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';

//Components
import Subcategory from './SubcategoryList';


class Subcategories extends Component {
    state = {
        id: this.props.match.params.categoryId,
        tempArray: this.props.subcategories,
        searchName: ''
    }

    async componentDidMount() {
        await this.props.getSubcategories(this.state.id);
    }

    searchFunction = searchName => {
        const matchedData = this.props.subcategories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textInput = searchName.toLowerCase();
            return itemData.indexOf(textInput) > -1;
        });
        if(searchName == '') {
            this.setState({
                tempArray: this.props.subcategories,
                searchName: searchName
            })
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            })
        }
    }

    getInput = () => {
        return <TextInput placeholder="Search by name" onChangeText={value => this.searchFunction(value)} value={this.state.searchName} />
    }

    render() {
        return (
            <View>
                 <Text>Subcategories folder</Text>
                <FlatList ListHeaderComponent={this.getInput} data={this.state.tempArray} renderItem={({item}) => (
                    <Subcategory item={item} />
                )} />
            </View>
        )
    }

}

const mapStateToProps = (state, ownProps ) => {
   return {
    subcategories:state.subcategories.subcategories,
   }
}

export default connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories)