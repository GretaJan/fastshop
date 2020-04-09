import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../../src/actions/categoryActions';
//Components
import CategoryList from './CategoryList';
import Search from '../../components_additional/SearchInput';

class Categories extends Component {
    state = {
        tempArray: this.props.categories,
        searchName: ''
    }
  
    componentDidMount() {
        this.props.getCategories();
    }

    findFunction = searchName => {
        const matchedData = this.props.categories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textData = searchName.toLowerCase();
            return itemData.indexOf(textData) > -1; 
        });
        if(searchName == '') {
            this.setState({
                tempArray: this.props.categories,
                searchName: searchName
            });
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            });
        }
       
    }

    getInput = () => {
        return <TextInput placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />
    }

    render() {

        return (
            <View>
{/*                 
                <FlatList data={this.props.categories} renderItem={({item}) => ( */}
                {/* <Search name={this.state.name} array={this.props.categories} findFunction={() => this.findFunction(this.props.categories)} /> */}
                {/* <Search array={this.props.categories} title={"categories"} /> */}
                {/* <TextInput placeholder={"Search in" + {title}} onChangeText={(value) => {setName(value), findFunction(name, array)}} /> */}
                <FlatList ListHeaderComponent={this.getInput} data={this.state.tempArray} renderItem={({item}) => (
                    <CategoryList key={item} item={item} />
                    )} >
                </FlatList>
            </View>
        )
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(Categories);