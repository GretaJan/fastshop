import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { withRouter } from "react-router-native";
import { logOut } from '../../src/actions/authActions';


const styles = StyleSheet.create({
    container: {
        margin: 0
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    }
})

class Header extends Component {

    logOut = () => {
        logOut(this.props.token, this.props.history)
    }

    headerLinks = () => {

        if(this.props.token !== null) {
            return [
                <TouchableOpacity style={styles.button} onPress={() => this.props.history.push("/login" )} ><Text style={styles.text}>LOGOUT</Text></TouchableOpacity >
            ]
        } else {
            return [
                <TouchableOpacity style={styles.button} onPress={() => this.props.history.push("/login" )} ><Text  style={styles.text}>LOGIN</Text></TouchableOpacity >
            ]
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {this.headerLinks()}
            </View>
        )
    }

}

Header.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };


const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default withRouter(connect(mapStateToProps, {logOut})(Header))