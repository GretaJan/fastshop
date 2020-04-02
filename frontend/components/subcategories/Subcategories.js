import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';

//Components
import Subcategory from './SubcategoryList';


class Subcategories extends Component {

    state = {
        id: this.props.match.params.categoryId
    }
    

    componentDidMount() {
        console.log("category:", this.state.id);

        this.props.getSubcategories(this.state.id);
        // this.props.getCategory(this.props.subcategories.id);
    }

    render() {
        return (
            <View>
                 <Text>Subcategories folder</Text>
                <FlatList data={this.props.subcategories} renderItem={({item}) => (
                    <Subcategory item={item} />
                )} />
            </View>
        )
    }

}

const mapStateToProps = (state, ownProps ) => {
   let categoryId = ownProps.match.params.categoryId;
   return {
    subcategories: state.subcategories.subcategories,
    // id: state.subcategories.subcategories.find(subcategories => {subcategories === categoryId; console.log('what is subcategories' + subcategories)})
   }
}

export default connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories)