import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { searchBar } from '../../components_additional/styles/ModalStyles';
import { buyListSingle } from '../../components_additional/styles/CalendarStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function SearchBar({ func, parentValue, additionalFunc }){

    return (
        <View style={ containerStyles().rowContainer }>
            <View style={searchBar().searchBarContainer} >
                <View style={ searchBar().iconWrap }>
                    <Icon style={searchBar().searchBarIcon} name="search" />
                </View>
                <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => func(value)} value={ parentValue } />
            </View>
            { additionalFunc && (
                <TouchableOpacity style={ searchBar().animatedWrap } onPress={ additionalFunc}>
                    <MaterialIcon name="playlist-remove" style={ searchBar().removeList } />
                </TouchableOpacity> 
            )}
        </View>
    )
}

export default SearchBar