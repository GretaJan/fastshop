import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, requireNativeComponent } from 'react-native';
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

    componentDidUpdate(nextProps) {
        return nextProps.isAuthorized !== this.props.isAuthorized
    } 

    logOut = () => {
        this.props.logOut(this.props.admin, this.props.history)
    }

    headerLinks = () => {

        if(this.props.isAuthorized) {
            console.log("Is auth: ", this.props.admin)
            return [
                <TouchableOpacity style={styles.button} onPress={this.logOut} ><Text style={styles.text}>LOGOUT</Text></TouchableOpacity >
            ]
        } else {
            return [
                <TouchableOpacity style={styles.button} onPress={() =>{ this.props.history.push("/login" ), console.log("Admin: " , this.props.admin.length)}} ><Text  style={styles.text}>LOGIN</Text></TouchableOpacity >
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
    admin: state.auth.admin,
    isAuthorized: state.auth.isAuthorized
})

export default withRouter(connect(mapStateToProps, {logOut})(Header))