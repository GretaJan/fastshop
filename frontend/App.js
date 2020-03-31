import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';


// Components:
import Home from './components/Home';
import Subcategories from './components/subcategories/Subcategories';

class App extends Component {


  render() {

    return (
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/subcategories" component={Subcategories} />
        </Switch>
      </NativeRouter>
    )
  }
}

export default App

