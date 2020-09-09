import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import { Button } from 'react-native-elements';
import { withRouter } from "react-router-native";
import { logOut } from '../../redux/actions/authActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Components
import Home from '../Home';
import Dashboard from '../../componentsAuth';
import Login from '../auth/Login';
import Selected_Products from '../comparison/selectedProducts';

const AppStackNavigator = createStackNavigator({
    Home: Home,
    Dashboard: Dashboard,
    Login: Login,
    Selected_Products: Selected_Products
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
            return [
                <View style={styles.itemWrap}>
                    <Icon style={styles.itemOneAuth} name="home" size={40} onPress={() => this.props.history.push('/dashboard')} />
                    <Icon style={styles.itemTwoAuth} name="sign-out" size={40} onPress={this.logOut} />
                </View>
            ]
        } else {
            return [
                <View style={styles.itemWrap}>
                    <Icon style={styles.itemOne} name="home" size={40} onPress={() => this.props.history.push('/')} />
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