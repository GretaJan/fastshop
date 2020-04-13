import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Subcategories extends Component {
    state = {
        // id: this.props.navigation.state.params.categoryId,
        id: this.props.route.params.categoryId,
        // id:  this.props.navigation.getParam('categoryId', null),
        tempArray: this.props.subcategories,
        searchName: ''
    }

    async componentDidMount() {
        await this.props.getSubcategories(this.state.id);
    }

    goToProducts = (id) => {
        this.props.navigation.push("Products", {subcategoryId: id});
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

    goToProducts = (id) => {
        this.props.navigation.push("Products", {subcategoryId: id});
    }

    render() {
        // const { navigation } = this.props;
        // const categoryId = this.props.navigation.getParam('categoryId');
        // console.log('nav id: ', categoryId);
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Error message={this.props.error} />
                ) : (
                <View>
                    <Text>Subcategories folder</Text>
                    <FlatList ListHeaderComponent={this.getInput} data={this.state.tempArray} renderItem={({item}) => (
                        <Subcategory item={item} goToProducts={(item) => this.goToProducts(item)} />
                    )} />
                </View>
                )
            )
        )
    }

}

const mapStateToProps = (state) => {
   return {
    subcategories:state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories))