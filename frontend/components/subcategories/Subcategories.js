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
    
    static getDerivedStateFromProps(props, state) {
        console.log("SUBCATEGORIES", props.subcategories)
    }

    componentDidMount() {

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
   return {
    subcategories:state.subcategories.subcategories,
   }
}

export default connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories)