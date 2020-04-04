import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withRouter } from 'react-router-native';

//Components
import Subcategory from './SubcategoryList';


class Subcategories extends Component {

    state = {
        id: this.props.match.params.categoryId
    }
    
    static getDerivedStateFromProps(props, state) {
        // console.log("GET DERIVED:" + props.subcategories.name)
    }

    componentDidMount() {

        this.props.getSubcategories(this.state.id);
        // this.props.getCategory(this.props.subcategories.id);
    }

    render() {
        return (
            <View>
                 <Text>Subcategories folder Auth</Text>
                <FlatList data={this.props.subcategories} renderItem={({item}) => (
                    <Subcategory item={item} />
                )} />
                <Button title="Add subcategory" onPress={() => {this.props.history.push(`/addSubcategory/${this.state.id}`), console.log("ID", this.state.id)}} ></Button>
            </View>
        )
    }

}

const mapStateToProps = (state, ownProps ) => {
   return {
    subcategories: state.subcategories.subcategories,
   }
}

export default withRouter(connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories))