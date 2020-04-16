import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';


class Subcategories extends Component {

    state = {
        id: this.props.route.params.categoryId
    }

    componentDidMount() {
        console.log("ID", this.props.route.params);
        this.props.getSubcategories(this.state.id);
    }

    deleteSubcategory = async (id) => {
        await this.props.deleteSubcategory(id);
        this.props.getSubcategories(this.state.id);
    }

    goToProducts = (id) => {
        this.props.navigation.push("Products_Auth", {subcategoryId: id});
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Error message={this.props.error} />
                ) : (
                    <View>
                        <Text>Subcategories folder Auth</Text>
                        <FlatList data={this.props.subcategories} renderItem={({item}) => (
                            <Subcategory item={item} 
                                        deleteSubcategory={(item) => this.deleteSubcategory(item)} 
                                        goToProducts={(item) => this.goToProducts(item)}
                            />
                        )} />
                        <Button title="Add subcategory" onPress={() => { this.props.navigation.push("Add_Subcategory", {categoryId: this.state.id}) }} ></Button>
                    </View>
                )
            )
        )
    }
}

const mapStateToProps = (state) => {
   return {
    subcategories: state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, getCategory, deleteSubcategory})(Subcategories))