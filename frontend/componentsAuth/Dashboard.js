import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { Provider } from 'react-redux';
// import store from '../store';

// Components:
import Categories from './auth_categories/Categories';

class HomeAuth extends Component {


  render() {

    const styles = StyleSheet.create({
      container: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: 'navajowhite',
        // paddingTop: 70
      },
      title: {
        // color: 'darkorange',
        // color: '#57D900',
        // Food-font-color:  '#00FF9A',
        color: '#D2691E',
        fontSize: 40,
        fontWeight: "700"
      }
    });

    return (
        <View style={styles.container}>
          <Text style={styles.title}>SpeedShop Dashboard</Text>
          <Categories />
        </View>
    )
  }
}

export default HomeAuth