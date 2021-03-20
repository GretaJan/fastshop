import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { stylesGuest } from '../../../src/styles/CategoryStyles';;

//Components
import Category from './Category';
import EmptyList from '../../../utils/models/EmptyList';


export class Categories extends Component {

    goToSubcategories = (item) => {
        this.props.goToSubcategories(item)
    }

    render() {
        return (
                <View style={ stylesGuest().categoriesComponentWrap }>
                    {(this.props.categories === undefined || this.props.categories.length == 0) ? (
                        <EmptyList message="The List is empty" />
                    ) : (
                        <FlatList 
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
            )
        }
    }

export default Categories
