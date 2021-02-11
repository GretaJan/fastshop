import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { importAppData } from '../redux/actions/generalActions';

// Components:
import Categories from './Categories/Categories';

class Home extends Component {
  // constructor(props){
  //   (props)
  //   this.state = {
  //     confirmGetData: false
  //   }
  // }

  componentDidMount(){
    // if(this.props.categories.length > 0){

    // }
    console.log("HOME")
    this.props.importAppData();
  }

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

const mapStateToProps = state => ({
    categories: state.categories.categories,
    confirmGetData: state.general.confirmGetData
})

export default connect(mapStateToProps, { importAppData })(Home)