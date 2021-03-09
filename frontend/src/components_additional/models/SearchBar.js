import React from 'react';
import { View, TextInput } from 'react-native';
import { searchBar } from '../../components_additional/styles/ModalStyles';
import { stylesGuest } from '../../components_additional/styles/ProductStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function SearchBar({ func, parentValue }){

    return (
        <View style={searchBar().searchBarContainer} >
            <View style={ searchBar().iconWrap }>
                <Icon style={searchBar().searchBarIcon} name="search" />
            </View>
            {/* { this.state.showSearchInput && ( */}
            <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => func(value)} value={ parentValue } />
        </View>
    )
}

export default SearchBar