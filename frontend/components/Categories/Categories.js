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
        originalArray: this.props.categories,
        tempArray: [],
        searchName: ''
    }
  
    componentDidMount() {
        this.props.getCategories();
    }

    // findFunction = (item) => {
    //     item.map(item => {
    //         if(item.indexOf(this.state.name)) {
    //             this.setState({nameArray: this.state.nameArray.concat(name)});
    //         }
    //     })     
    // }
    findFunction = name => {
        this.setState({searchName: name}), 
        () => {
            if(name === '') {
            this.setState({
                originalArray: [...this.state.tempArray]
            })
            //  return;
            console.log(originalArray);
            } else {
                this.state.tempArray = this.state.originalArray;
            }
        } 
            
        this.state.originalArray = this.state.tempArray.filter(function(item) {
            console.log("name2: ", item)
            return item.name.includes(name)
        }).map((name) => name);

    }

    getInput = () => {
        // return <Search array={this.props.categories} title={"categories"} />
        return <TextInput placeholder={"Search in categories..."} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />
    }

    render() {

        return (
            <View>
{/*                 
                <FlatList data={this.props.categories} renderItem={({item}) => ( */}
                {/* <Search name={this.state.name} array={this.props.categories} findFunction={() => this.findFunction(this.props.categories)} /> */}
                {/* <Search array={this.props.categories} title={"categories"} /> */}
                {/* <TextInput placeholder={"Search in" + {title}} onChangeText={(value) => {setName(value), findFunction(name, array)}} /> */}
                <FlatList ListHeaderComponent={this.getInput} data={this.state.originalArray} renderItem={({item}) => (
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