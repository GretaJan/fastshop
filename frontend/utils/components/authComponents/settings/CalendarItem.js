import React from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity } from 'react-native';
import { stylesGuest } from '../../../src/styles/SubcategoryStyles';

function CalendarItem({ logOut, token, navigation }){

    return (
        <View style={stylesGuest().horizontalWrap}>
            <TouchableOpacity onPress={ () => navigation("Calendar") } style={stylesGuest().itemWrap}>
                <Text>Product List Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation("Calendar") } style={stylesGuest().itemWrap}>
                <Text>Favorite Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation("Calendar") } style={stylesGuest().itemWrap}>
                <Text>Kalendorius</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation("Calendar") } style={stylesGuest().itemWrap}>
                <Text>Kalendorius</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation("Calendar") } style={stylesGuest().itemWrap}>
                <Text>Kalendorius</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation("Profile") } style={stylesGuest().itemWrap}>
                <Text>Kalendorius</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => logOut(token) } style={stylesGuest().itemWrap}>
                <Text>Atsijungti</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CalendarItem