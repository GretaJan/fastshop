import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';


// Components:
import Categories from './Categories/Categories';

class Home extends Component {


  render() {
    const styles = StyleSheet.create({
      container: {
      },
      title: {
        color: '#D2691E',
        fontSize: 40,
        fontWeight: "700"
      }
    });

    return (
        <View style={styles.container}>
          <Categories />
        </View>
    )
  }
}

export default Home