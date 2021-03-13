import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { closeErrorWarning } from '../../../redux/actions/generalActions';
import { stylesGuest } from '../../../src/styles/CategoryStyles';
import { containerStyles } from '../../../src/styles/GeneralStyles';

//Components
import Category from './Category';
import EmptyList from '../../../utils/models/EmptyList';
import Header from '../../../utils/models/Header';

export class Categories extends Component {

    goToSubcategories = (item) => {
        this.props.navigation.push("Subcategories", {categoryId: item.id, name: item.name, background: item.background});
    }

    render() {
        return (
                <>
                    <Header 
                        title="Nutritaste"
                        navigate={ null }
                    />
                    <View style={ containerStyles().screenHeightContainerNoHeader }>
                        <View style={stylesGuest().container} >
                            <Text style={stylesGuest().descriptionText }>Find the best product match for preferred nutrition criteria.</Text>
                            {(this.props.categories === undefined || this.props.categories.length == 0) ? (
                                <EmptyList message="The List is empty" />
                            ) : (
                                <FlatList 
                                    contentContainerStyle={stylesGuest().flatList} 
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.categories} 
                                    renderItem={({item}) => (
                                    <Category 
                                        item={item} 
                                        goToSubcategories={() => this.goToSubcategories(item)}         
                                    />
                                )} />
                            )}
                        </View>
                    </View>
                </>
            )
        }
    }

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.any,
        background: PropTypes.string
    }))
}

const mapStateToProps = (state) => ({
    categories: state.dataUpload.categories,
});

export default withNavigation(connect(mapStateToProps, { closeErrorWarning })(Categories))
