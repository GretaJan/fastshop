import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';

function HOC (ComposedComponent) {
    class Authentication extends Component {

        componentDidMount() {
            if(!this.props.isAuthorized) {
                console.log("is not Athroized")
                this.props.history.push('/login');
            }
        }

        componentDidUpdate(nextProps){
            if(!nextProps.isAuthorized){
                this.props.history.push('/login');
            }
        }

        render() {
            return (
                <View>
                    <ComposedComponent {...this.props} />
                </View>
            )
        }
    }

    const mapStateToProps = (state) => ({
        isAuthorized: state.auth.isAuthorized
    })

    return withRouter(connect(mapStateToProps, {})(Authentication))
}

export default HOC