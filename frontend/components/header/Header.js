import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import { Button } from 'react-native-elements';
import { withRouter } from "react-router-native";
import { logOut } from '../../src/actions/authActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        height: 55
        // justifyContent: 'center'
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 5,
    },
    itemOne: {
        width: '33.33%',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'orange',
    },
    itemTwo: {
        width: '33.33%',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'green',
    },
    itemThree: {
        width: '33.33%',
        backgroundColor: 'blue',
        textAlignVertical: 'center',
    },
    iconThree: {
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'relative',
        marginTop: 8
    },
    counter: {
        position: 'absolute',
        top: 2,
        right: 41,
        backgroundColor: 'orange',
        width: 25,
        height: 25,
        borderRadius: 25/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        right: 1,
        top: 2
    },
    itemOneAuth: {
        width: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'orange',
    },
    itemTwoAuth: {
        width: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'green',
    },

});

class Header extends Component {

    componentDidUpdate(nextProps) {
        return nextProps.isAuthorized !== this.props.isAuthorized
    } 

    logOut = () => {
        this.props.logOut(this.props.admin, this.props.history)
    }

    headerLinks = () => {

        if(this.props.isAuthorized) {
            return [
                <View style={styles.itemWrap}>
                    <Icon style={styles.itemOneAuth} name="home" size={40} onPress={() => this.props.history.push('/dashboard')} />
                    <Icon style={styles.itemTwoAuth} name="sign-out" size={40} onPress={this.logOut} />
                </View>
            ]
        } else {
            return [
                <View style={styles.itemWrap}>
                    <Icon style={styles.itemTwo} name="sign-in" size={40} onPress={() => this.props.history.push('/login')} />
                    <View style={styles.itemThree} >
                        <Icon style={styles.iconThree} name="list-alt" size={40} onPress={() => this.props.history.push('/selectedProducts')} />
                        <View style={styles.counter}>
                            <Text style={styles.counterNo} > 0{this.props.selectedProducts.length}</Text>
                        </View>
                    </View>
                </View>
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
    isAuthorized: state.auth.isAuthorized,
    selectedProducts: state.selectedProducts.comparisonArray
})

export default withRouter(connect(mapStateToProps, {logOut})(Header))