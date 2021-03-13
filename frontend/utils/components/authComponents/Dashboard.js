import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Components
import Categories from '../categories/auth/Categories';

class HomeAuth extends Component {


  render() {

    return (
        <View>
          <Categories />
        </View>
    )
  }
}

export default HomeAuth