import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withRouter } from 'react-router-native';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';


class Subcategories extends Component {

    state = {
        id: this.props.match.params.categoryId
    }

    componentDidMount() {

        this.props.getSubcategories(this.state.id);
        // this.props.getCategory(this.props.subcategories.id);
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
                            <Subcategory item={item} />
                        )} />
                        <Button title="Add subcategory" onPress={() => {this.props.history.push(`/addSubcategory/${this.state.id}`), console.log("ID", this.state.id)}} ></Button>
                    </View>
                )
            )
        )
    }

}

const mapStateToProps = (state, ownProps ) => {
   return {
    subcategories: state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withRouter(connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories))