import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

// Components:
import Categories from './components/Categories';

class App extends Component {


  render() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'navajowhite'
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

      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.title}>SpeedShop</Text>
          <Categories />
        </View>
      </Provider>
    )
  }
}

export default App