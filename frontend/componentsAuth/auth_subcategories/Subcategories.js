import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/reducers';

//Components
import Subcategory from './SubcategoryList';


class Subcategories extends Component {

    componentDidMount() {
        this.props.getSubcategories();
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

const mapStateToProps = state => ({
    subcategories: state.subcategories.subcategories
})

export default connect(mapStateToProps, {getSubcategories})(Subcategories)