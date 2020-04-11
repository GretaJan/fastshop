import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

function HOC (ComposedComponent) {
    class Authentication extends Component {

        componentDidMount() {
            if(!this.props.isAuthorized) {
                this.props.history.push('/login');
            }
        }

        componentDidUpdate(nextProps){
            if(!nextProps.isAuthorized){
               navigation.push('/login');
            }
        }

        render() {
            return (
                <View>
                    <ComposedComponent {...this.props}/>
                </View>
            )
        }
    }

    const mapStateToProps = (state) => ({
        isAuthorized: state.auth.isAuthorized
    })

    return connect(mapStateToProps, {})(Authentication)
}

export default HOC