import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../src/actions/categoryActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import { colors } from '../../components_additional/styles/Colors';
import { getSubcategories } from '../../src/actions/subcategoryActions';

//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';

class Categories extends Component {
    state = {
        tempArray: this.props.categories,
        searchName: '',
        showSearchInput: false
    }
  
    componentDidMount() {
        this.props.getCategories();
        this.props.getSubcategories();
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
        return (
            <View style={stylesGuest().searchBarContainer} >
                <Icon style={stylesGuest().searchBarIcon} name="search" size={25} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={stylesGuest().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }

    goToSubcategories = (id) => {
        this.props.navigation.push("Subcategories", {categoryId: id});
    }

    render() {

        return (
            (this.props.loading) ? (
                <Loading />
                ) : (
                (this.props.error !== '') ? (
                    <Modal title="Warning" 
                        message={this.props.error} 
                        close={() => this.props.navigation.navigate("Login")} 
                        ok="OK" color={colors.bordo} 
                        borderColor={colors.bordoTransparent}
                        horizontal={20} vertical={10}/>
                ) : (
                    <View style={stylesGuest().container} >
                        {(this.props.categories.length == 0) ? (
                            <Modal title="Warning" 
                                message="The list is empty. PLease go back." 
                                close={() => this.props.navigation.push("Login")} 
                                ok="OK" color={colors.mainYellow} 
                                borderColor={colors.mainYellowTransparent}
                                horizontal={20} vertical={10}/>
                        ) : (
                            <FlatList contentContainerStyle={stylesGuest().flatList} data={this.props.categories} renderItem={({item}) => (
                                <CategoryList key={item} item={item} 
                                                goToSubcategories={(item) => this.goToSubcategories(item)} 
                                />
                                )} >
                            </FlatList>
                        )}
                    </View>
                )
            )
        )
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ( console.log("sub", state.subcategories.subcategories),{
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error,
    
});

export default withNavigation(connect(mapStateToProps, { getCategories, getSubcategories })(Categories))